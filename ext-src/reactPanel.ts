import * as path from 'path';
import { WebviewPanel, Disposable, ViewColumn, window, Uri, commands, Memento } from 'vscode';
import { Logger, actionToast, getNonce } from './utils';

const logger = new Logger();

/**
 * Manages react webview panels
 */
// eslint-disable-next-line import/prefer-default-export
export class ReactPanel {
  /**
   * Track the currently panel. Only allow a single panel to exist at a time.
   */
  public static currentPanel: ReactPanel | undefined;

  private static readonly viewType = 'ethcode';

  private readonly _panel: WebviewPanel;

  private readonly _extensionPath: string;

  private _disposables: Disposable[] = [];

  private _disposed = false;

  private constructor(extensionPath: string, column: ViewColumn, workspaceState: Memento) {
    this._extensionPath = extensionPath;

    // Create and show a new webview panel
    this._panel = window.createWebviewPanel(ReactPanel.viewType, 'ETHcode', column, {
      // Enable javascript in the webview
      enableScripts: true,

      // And restric the webview to only loading content from our extension's `media` directory.
      localResourceRoots: [Uri.file(path.join(this._extensionPath, 'build'))],
    });

    // Set the webview's initial html content
    this._panel.webview.html = this._getHtmlForWebview();

    // Listen for when the panel is disposed
    // This happens when the user closes the panel or when the panel is closed programatically
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    // Handle messages from the webview
    this._panel.webview.onDidReceiveMessage(
      (message: any) => {
        logger.log(`Worker message: ${JSON.stringify(message)}`);
        if (message.command === 'auth-updated') {
          const actionName = 'Reload';
          actionToast(
            'Authentication status updated. Please reload if you have changed your authtoken!',
            actionName
          ).then((item: string | undefined) => {
            if (item === actionName) commands.executeCommand('workbench.action.reloadWindow');
          });
        } else if (message.command === 'run-deploy') {
          commands.executeCommand('ethcode.account.sign-deploy');
        } else if (message.command.endsWith('contract-method-call')) {
          commands.executeCommand('ethcode.conract.call');
        } else if (message.command === 'run-get-gas-estimate') {
          commands.executeCommand('ethcode.transaction.gas.get').then((gasEstimate) => {
            this._panel.webview.postMessage({ gasEstimate });
          });
        } else if (message.command === 'getAccount') {
          const account = workspaceState.get('account');
          this._panel.webview.postMessage({ account });
        } else if (message.command === 'get-balance') {
          const balance = workspaceState.get('balance');
          this._panel.webview.postMessage({ balance });
        } else if (message.command === 'build-rawtx') {
          commands.executeCommand('ethcode.transaction.build');
        } else if (message.command === 'sign-deploy-tx') {
          commands.executeCommand('ethcode.account.sign-deploy');
        } else if (message.command === 'send-ether') {
          commands.executeCommand('ethcode.account.send');
        } else if (message.command === 'get-contract') {
          const contract = workspaceState.get('contract');
          this._panel.webview.postMessage({ contract });
        } else if (message.command === 'get-network') {
          const networkId = workspaceState.get('networkId');
          this._panel.webview.postMessage({ networkId });
        } else if (message.command === 'get-constructor-input') {
          const constructorInputs = workspaceState.get('constructor-inputs');
          this._panel.webview.postMessage({ constructorInputs });
        }
      },
      null,
      this._disposables
    );
  }

  public postMessage(msg: any) {
    this._panel.webview.postMessage(msg);
  }

  public static createOrShow(extensionPath: string, workspaceState: Memento) {
    const column = window.activeTextEditor ? ViewColumn.Beside : undefined;

    // If we already have a panel, show it.
    // Otherwise, create a new panel.
    if (ReactPanel.currentPanel) {
      try {
        ReactPanel.currentPanel._panel.reveal(column);
      } catch (error) {
        logger.error(error);
      }
    } else {
      try {
        ReactPanel.currentPanel = new ReactPanel(extensionPath, column || ViewColumn.Active, workspaceState);
      } catch (error) {
        logger.error(error);
      }
    }
  }

  public dispose() {
    if (this._disposed) {
      return;
    }
    ReactPanel.currentPanel = undefined;

    // Clean up our resources
    this._panel.dispose();
    this._disposed = true;

    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  private _getHtmlForWebview() {
    // eslint-disable-next-line global-require, import/no-dynamic-require,  @typescript-eslint/no-var-requires
    const manifest = require(path.join(this._extensionPath, 'build', 'asset-manifest.json')).files;
    const mainScript = manifest['main.js'];
    const mainStyle = manifest['main.css'];
    const scriptPathOnDisk = Uri.file(path.join(this._extensionPath, 'build', mainScript));
    const scriptUri = scriptPathOnDisk.with({ scheme: 'vscode-resource' });
    const stylePathOnDisk = Uri.file(path.join(this._extensionPath, 'build', mainStyle));
    const styleUri = stylePathOnDisk.with({ scheme: 'vscode-resource' });
    // Use a nonce to whitelist which scripts can be run
    const nonce = getNonce();

    return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
        <meta name="theme-color" content="#000000">
        <title>ETH code</title>
        <link rel="stylesheet" type="text/css" href="${styleUri}">
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src vscode-resource: https:; script-src 'nonce-${nonce}';style-src vscode-resource: 'unsafe-inline' http: https: data:;">
        <base href="${Uri.file(path.join(this._extensionPath, 'build')).with({ scheme: 'vscode-resource' })}/">
      </head>

      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root"></div>
        <script nonce="${nonce}" src="${scriptUri}"></script>
      </body>
      </html>`;
  }
}
