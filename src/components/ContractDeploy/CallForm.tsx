import React, { useEffect, useState, MutableRefObject, useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, ButtonType, TextArea } from '../index';
import { ABIDescription, ABIParameter, ConstructorInput, IAccount, TransactionResult } from 'types';
import { abiHelpers } from '../../lib';
import { AppContext } from '../../appContext';

interface IProps {
  constructorInputRef: MutableRefObject<ConstructorInput | ConstructorInput[] | null>;
  deployedResult: TransactionResult | undefined;
  abi: ABIDescription[];
  currAccount: string;
  vscode: any;
}

type FormContract = {
  contractAddress: string;
  methodName: string;
  methodInputs: Array<ABIParameter>;
  payableAmount: number;
  gasSupply: number;
};

const CallForm: React.FC<IProps> = (props: IProps) => {
  const [callFunctionToggle, setCallFunctionToggle] = useState(true);
  const [methodName, setMethodName] = useState<string>('');
  const [isPayable, setIsPayable] = useState(false);
  const [payableAmount] = useState<number>(0);

  const { testNetID } = useContext(AppContext);

  const { control, register: contractReg, handleSubmit: handleContractSubmit, getValues, setValue } = useForm<
    FormContract
  >({ shouldUnregister: false });

  useEffect(() => {
    window.addEventListener('message', (event) => {
      const { data } = event;
      if (data.ganacheCallResult) {
        setCallFunctionToggle(false);
      }
    });
  }, []);

  useEffect(() => {
    const { deployedResult } = props;
    setValue('contractAddress', deployedResult ? deployedResult.contractAddress : '0x');
  }, [props.deployedResult]);

  const handleMethodnameInput = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCallFunctionToggle(false);
    const { abi } = props;
    const methodName: string = event.target.value;
    const methodABI: ABIDescription = abiHelpers.getMethodABI(abi, methodName);
    if (methodABI) {
      setMethodName(methodName);
      setIsPayable(methodABI.stateMutability === 'payable');
      const inputs = methodABI.inputs?.map((input) => {
        return { ...input, value: '' };
      });
      setValue('methodInputs', inputs as Array<ABIParameter>);
    }
  };
  const handleCall = () => {
    const { vscode, abi, currAccount } = props;
    setCallFunctionToggle(true);
    vscode.postMessage({
      command: 'ganache-contract-method-call',
      payload: {
        abi,
        address: getValues('contractAddress'),
        methodName,
        params: getValues('methodInputs') || [],
        gasSupply: props.constructorInputRef.current,
        // TODO: add value supply in case of payable functions
        value: payableAmount,
        from: currAccount,
      },
      testNetId: testNetID,
    });
  };
  return (
    <form onSubmit={handleContractSubmit(handleCall)} className="form_align">
      <input
        type="text"
        className="custom_input_css"
        placeholder="Enter contract address"
        style={{ marginRight: '5px' }}
        name="contractAddress"
        defaultValue={getValues('contractAddress')}
        ref={contractReg}
      />
      <input
        type="text"
        className="custom_input_css"
        placeholder="Enter contract function name"
        name="methodName"
        ref={contractReg}
        onChange={handleMethodnameInput}
      />
      {methodName !== '' && (
        <div className="json_input_container" style={{ marginTop: '10px' }}>
          <Controller
            name="methodInputs"
            render={() => (
              <TextArea
                value={getValues('methodInputs')}
                onChange={(input: Array<ABIParameter>) => setValue('methodInputs', input)}
              />
            )}
            control={control}
          />
        </div>
      )}
      {isPayable && (
        <input
          type="number"
          className="custom_input_css"
          placeholder="Enter payable amount"
          style={{ margin: '5px' }}
          name="payableAmount"
          ref={contractReg}
          defaultValue={payableAmount}
        />
      )}
      <Button buttonType={ButtonType.Input} disabled={callFunctionToggle}>
        Call function
      </Button>
    </form>
  );
};

export default CallForm;
