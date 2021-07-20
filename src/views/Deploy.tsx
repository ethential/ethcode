import React, { useEffect, useState, useRef, useContext } from 'react';
import JSONPretty from 'react-json-pretty';
import './Deploy.css';
import { ABIDescription, ConstructorInput } from 'types';
import { Button, ButtonType } from '../components';
import CallForm from '../components/Deploy/CallForm';
import DeployForm from '../components/Deploy/DeployForm';
import { AppContext } from '../appContext';

export interface IProps {
  bytecode: string;
  abi: Array<ABIDescription>;
  vscode: any;
  errors: Error;
}

const Deploy: React.FC<IProps> = ({ abi, bytecode, vscode }: IProps) => {
  const [gasEstimateToggle, setGasEstimateToggle] = useState(false);
  const [gasEstimate, setGasEstimate] = useState(0);
  const [txtHash, setTxtHash] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const constructorInputRef = useRef<ConstructorInput[] | null>(null);

  // Context
  const {
    testNetID,
    currAccount,
    pvtKey,
    callResult,
    setCallResult,
    deployedResult,
    unsignedTx,
    setUnsgTxn,
  } = useContext(AppContext);

  useEffect(() => {
    window.addEventListener('message', (event) => {
      const { data } = event;

      if (data.deployedResult) {
        setTxtHash(data.deployedResult);
      }
      if (data.gasEstimate) {
        setGasEstimateToggle(false);
        setGasEstimate(data.gasEstimate);
      }
      if (data.buildTxResult) {
        // TODO: fix unsigned tx is not updated after once
        setUnsgTxn(data.buildTxResult);
      }
      if (data.unsignedTx) {
        setUnsgTxn(data.unsignedTx);
      }
      if (data.callResult) {
        setCallResult(data.callResult);
      }
      if (data.error) {
        setError(data.error);
      }
    });
  }, []);

  const handleGetGasEstimate = () => {
    setGasEstimateToggle(true);
    try {
      vscode.postMessage({
        command: 'run-get-gas-estimate',
        payload: {
          abi,
          bytecode,
          params: constructorInputRef.current,
          from: currAccount,
        },
        testNetId: testNetID,
      });
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div>
      <div className="deploy_container">
        <div className="byte-code">
          <pre className="large-code">{JSON.stringify(bytecode)}</pre>
        </div>
        <div className="abi-definition">
          <pre className="large-code">{JSON.stringify(abi)}</pre>
        </div>
        <div>
          {currAccount && (
            <DeployForm
              vscode={vscode}
              bytecode={bytecode}
              abi={abi}
              gasEstimate={gasEstimate}
              constructorInputRef={constructorInputRef}
            />
          )}
          <Button buttonType={ButtonType.Button} onClick={handleGetGasEstimate} disabled={gasEstimateToggle}>
            Get gas estimate
          </Button>
        </div>
        {/* Call Function */}
        <div>
          {currAccount && (
            <CallForm
              vscode={vscode}
              abi={abi}
              currAccount={currAccount}
              testNetId={testNetID}
              deployedResult={deployedResult}
            />
          )}
        </div>

        {/* Call function Result */}
        {callResult && Object.entries(callResult).length > 0 && (
          <div className="tag call-result">
            <span>{callResult ? 'Call result:' : 'Call error:'}</span>
            <div>
              {callResult ? (
                <pre className="large-code">{callResult}</pre>
              ) : (
                <pre className="large-code" style={{ color: 'red' }}>
                  {JSON.stringify(error)}
                </pre>
              )}
            </div>
          </div>
        )}

        {unsignedTx && (
          <div className="tag">
            <h4 className="contract-name inline-block highlight-success">Unsigned Transaction:</h4>
            <div className="json_input_container" style={{ marginTop: '10px' }}>
              <pre className="large-code">
                <JSONPretty id="json-pretty" data={unsignedTx} />
              </pre>
            </div>
          </div>
        )}

        <div className="account_row">
          <div className="tag">
            <h4>Public key</h4>
          </div>
          <div className="input-container">
            <input className="input custom_input_css" type="text" value={currAccount} placeholder="public key" />
          </div>
        </div>

        <div className="account_row">
          <div className="tag">
            <h4>Private key</h4>
          </div>
          <div className="input-container">
            <input
              className="input custom_input_css"
              type="text"
              disabled
              placeholder="private key"
              value={pvtKey || ''}
            />
          </div>
        </div>

        {/* Error Handle */}
        <div className="error_message">
          {error && (
            <pre className="large-code" style={{ color: 'red' }}>
              {
                // @ts-ignore
                JSON.stringify(error)
              }
            </pre>
          )}
        </div>
      </div>
      {/* Final Transaction Hash */}
      {pvtKey && (
        <div className="account_row">
          <div className="tag">
            <h4>Transaction hash</h4>
          </div>
          <div className="input-container">
            <input className="input custom_input_css" type="text" value={txtHash} placeholder="transaction hash" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Deploy;
