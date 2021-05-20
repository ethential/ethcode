import React, { useEffect, useState, useRef, useContext } from 'react';
import './ContractDeploy.css';
import JSONPretty from 'react-json-pretty';
import { useSelector, useDispatch } from 'react-redux';
import { ABIDescription, ConstructorInput, GlobalStore } from 'types';
import { setCallResult } from '../../actions';
import { Button, ButtonType } from '../common/ui';
import CallForm from './CallForm';
import DeployForm from './DeployForm';
import { AppContext } from '../../appContext';

interface IProps {
  bytecode: string;
  abi: Array<ABIDescription>;
  vscode: any;
  openAdvanceDeploy: () => void;
}

const ContractDeploy: React.FC<IProps> = ({ bytecode, abi, vscode, openAdvanceDeploy }: IProps) => {
  const [gasEstimateToggle, setGasEstimateToggle] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const constructorInputRef = useRef<ConstructorInput[] | null>(null);
  const [gasEstimate, setGasEstimate] = useState(0);

  // Context
  const { testNetID } = useContext(AppContext);

  // redux
  // UseSelector to extract state elements.
  const { callResult, deployedResult, currAccount } = useSelector((state: GlobalStore) => ({
    testNetId: state.debugStore.testNetId,
    deployedResult: state.contractsStore.deployedResult,
    callResult: state.contractsStore.callResult,
    currAccount: state.accountStore.currAccount,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener('message', (event) => {
      const { data } = event;

      if (data.ganacheCallResult) {
        dispatch(setCallResult(data.ganacheCallResult));
      }
      if (data.error) {
        setError(data.error);
      }
      if (data.gasEstimate) {
        setGasEstimateToggle(false);
        setGasEstimate(data.gasEstimate);
      }
    });
  }, []);

  useEffect(() => {
    setError(error);
  }, [error]);

  const handleGetGasEstimate = () => {
    setGasEstimateToggle(true);
    try {
      vscode.postMessage({
        command: 'run-get-gas-estimate',
        payload: {
          abi,
          bytecode,
          params: constructorInputRef.current,
          from: currAccount ? (currAccount.checksumAddr ? currAccount.checksumAddr : currAccount.value) : '0x',
        },
        testNetId: testNetID,
      });
    } catch (error) {
      setError(error);
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
          <div>
            {currAccount && (
              <DeployForm
                vscode={vscode}
                abi={abi}
                bytecode={bytecode}
                gasEstimate={gasEstimate}
                currAccount={currAccount}
                constructorInputRef={constructorInputRef}
                openAdvanceDeploy={openAdvanceDeploy}
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
                constructorInputRef={constructorInputRef}
                deployedResult={deployedResult}
              />
            )}
          </div>
        </div>
        <div className="error_message">
          {error && (
            <div>
              <span className="contract-name inline-block highlight-success">Error Message:</span>
              <div>
                <pre className="large-code-error">{JSON.stringify(error)}</pre>
              </div>
            </div>
          )}
        </div>
        {callResult && Object.entries(callResult).length > 0 && (
          <div className="call-result">
            <span>
              {/* 
              // @ts-ignore */}
              {callResult || (callResult && callResult.callResult) ? 'Call result:' : 'Call error:'}
            </span>
            <div>
              {/* TODO: add better way to show result and error */}
              {callResult && <pre className="large-code">{callResult}</pre>}
            </div>
          </div>
        )}
      </div>
      {deployedResult && Object.entries(deployedResult).length > 0 && (
        <div className="transaction_receipt">
          <span className="contract-name inline-block highlight-success">Transaction Receipt:</span>
          <div>
            <pre className="large-code">
              <JSONPretty id="json-pretty" data={deployedResult} />
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractDeploy;
