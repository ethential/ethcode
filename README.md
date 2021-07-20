# [Ethereum](https://ethereum.org/) plugin for [VSCode](https://code.visualstudio.com/)
[![Join the chat at https://gitter.im/Ethential/ethcode](https://badges.gitter.im/Ethential/ethcode.svg)](https://gitter.im/Ethential/ethcode?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Discord chat](https://img.shields.io/discord/722971683388129290?color=7389D8&logo=discord&logoColor=ffffff)](https://discord.gg/87sE7Bm)

Ethcode is a vscode extension for compiling, deploy, execute solidity and vyper smart contracts/programs in Ethereum blockchian. It supports multiple test networks. Ethcode has inbuilt support for Remix transaction debug and solidity unit testing.

## Website
https://ethcode.dev/
## Docs
https://docs.ethcode.dev/
## Installation
VisualStudio Marketplace - https://marketplace.visualstudio.com/items?itemName=ethential.ethcode

## System support
* Linux, Mac, Windows

## Usage instructions
### Activate plugin with activation command
* Command: `ethcode.activate`
* Description: Activates Ethcode extension.

![Screenshot from 2019-09-28 23-04-40](https://user-images.githubusercontent.com/13261372/78938476-e9f22180-7acf-11ea-8705-5a7f755a962a.png)

### Load compiled JSON
* Command: `ethcode.combined-json.load`, `ethcode.standard-json.load`
* Description: Generate constructor inputs.

![Screenshot from 2021-07-01 19-41-30](https://user-images.githubusercontent.com/13261372/124138953-c7697100-daa4-11eb-9064-5756dba06606.png)

![Screenshot from 2021-07-01 19-41-44](https://user-images.githubusercontent.com/13261372/124138945-c59fad80-daa4-11eb-954a-f47bbf0d0fec.png)

### Create constructor inputs
* Command: `ethcode.contract.input.create`
* Description: Generate constructor inputs.

![Screenshot from 2021-07-01 19-55-50](https://user-images.githubusercontent.com/13261372/124141448-10bac000-daa7-11eb-978e-0746a51b4a08.png)

This will create a `constructor-input.json` file inside your workspace.

```
[
  {
    "internalType": "string",
    "name": "_greeting",
    "type": "string",
    "value": "Hello World!"
  }
]
```
As the JSON suggests the value for the input is provided with the `value` field.

### Load constructor inpusts
* Command: `ethcode.contract.input.load`
* Description: Load constructor inputs.

![Screenshot from 2021-07-01 20-48-35](https://user-images.githubusercontent.com/13261372/124149165-f506e800-daad-11eb-9753-eb1ff58d6ef1.png)

### Build transaction
* Command: `ethcode.transaction.build`
* Description: Build raw transaction.

![Screenshot from 2021-07-01 20-06-58](https://user-images.githubusercontent.com/13261372/124142793-2bd9ff80-daa8-11eb-8a72-31e6bde86d79.png)


### Deploy contracts.
* Command: `ethcode.account.sign-deploy`
* Description: Deploy transaction to network.

![Screenshot from 2021-07-01 20-29-01](https://user-images.githubusercontent.com/13261372/124146369-52e60080-daab-11eb-99ff-acd46cf0d43d.png)

### Create account
* Command: `ethcode.account.create`
* Description: Create ethereum account. You will be prompted for password. Accounts are created inside ethcode extension directory.

![Screenshot from 2021-07-01 21-00-45](https://user-images.githubusercontent.com/13261372/124150942-aa866b00-daaf-11eb-9d31-db538c140d23.png)

![Screenshot from 2021-07-01 21-00-54](https://user-images.githubusercontent.com/13261372/124150937-a9553e00-daaf-11eb-84ab-51a546ad3742.png)

### List accounts
* Command: `ethcode.account.list`
* Description: List ethereum accounts.

![Screenshot from 2021-07-01 21-21-22](https://user-images.githubusercontent.com/13261372/124153761-66489a00-dab2-11eb-9d17-a8b97468a556.png)

### Use account
* Command: `ethcode.account.set`
* Description: Choose ethereum account for use.

![Screenshot from 2021-07-01 21-23-05](https://user-images.githubusercontent.com/13261372/124153955-a0b23700-dab2-11eb-955a-9fca6c640a0b.png)

### Use network
* Command: `ethcode.network.set`
* Description: Choose ethereum network for use.

![Screenshot from 2021-07-01 21-26-05](https://user-images.githubusercontent.com/13261372/124154347-09011880-dab3-11eb-9e54-eb2952894ef8.png)

----------------------------------------------------------------------------

## [Vyper](https://vyper.readthedocs.io/) support
Please install vyper compiler for compiling vyper contracts in ethcode. Instructions for vyper compiler installation can be found on official vyper documentation - https://vyper.readthedocs.io/en/latest/installing-vyper.html

## Help
Please help ethcode developers continue their work.

Ethereum donation address: [0xd22fE4aEFed0A984B1165dc24095728EE7005a36](https://etherscan.io/address/0xd22fE4aEFed0A984B1165dc24095728EE7005a36)

## Development
### Run following commands in the terminal

```shell
yarn install
yarn run build
```
And then press F5, in Extension Development Host session, run `Ethereum: Solidity compile` command from command palette.

### Generate Typescript types for protobuf
```shell
PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"
OUT_DIR="./ext-src/"
protoc --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" --js_out="import_style=commonjs,binary:${OUT_DIR}" --ts_out="${OUT_DIR}" services/ethereum.proto
```

## Packaging
```shell
vsce package --yarn
```

## Publishing
Step 1: Login to https://dev.azure.com/0mkar/ and generate PAT

Step 2:
```
vsce login ethential
vsce publish 0.1.4 -p <access token> --yarn
git push origin v0.1.4
```

## Under the hood

Things we did on top of Create React App TypeScript template

* We inline `index.html` content in `ext-src/extension.ts` when creating the webview
* We set strict security policy for accessing resources in the webview.
  * Only resources in `/build` can be accessed
  * Only resources whose scheme is `vscode-resource` can be accessed.
* For all resources we are going to use in the webview, we change their schemes to `vscode-resource`
* Since we only allow local resources, absolute path for styles/images (e.g., `/static/media/logo.svg`) will not work. We add a `.env` file which sets `PUBLIC_URL` to `./` and after bundling, resource urls will be relative.
* We add baseUrl `<base href="${vscode.Uri.file(path.join(this._extensionPath, 'build')).with({ scheme: 'vscode-resource' })}/">` and then all relative paths work.

## Code formatting
Add following lines in vscode `settings.json`
```
"typescript.format.insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets": false,
"typescript.format.insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces": true,
"typescript.format.semicolons": "insert"
```

## References
* https://github.com/Microsoft/vscode-go/wiki/Building,-Debugging-and-Sideloading-the-extension-in-Visual-Studio-Code
* https://code.visualstudio.com/api/working-with-extensions/bundling-extension
* https://stackoverflow.com/questions/50885128/how-can-i-debug-a-child-process-fork-process-from-visual-studio-code
* https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_automatically-attach-debugger-to-nodejs-subprocesses
