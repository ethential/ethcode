import React, { MutableRefObject, useContext, useEffect, useState, FormEvent, MouseEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, ButtonType, TextArea } from '..';
import { ABIDescription, ConstructorInput, ABIParameter } from 'types';
import { abiHelpers } from '../../lib';
import { AppContext } from '../../appContext';

interface IProps {
  bytecode: string;
  abi: Array<ABIDescription>;
  vscode: any;
  gasEstimate: number;
  constructorInputRef: MutableRefObject<Array<ConstructorInput> | null>;
}

type TDeployForm = {
  gasSupply: number;
  constructorInput: Array<ABIParameter>;
};

const DeployForm: React.FC<IProps> = ({ vscode, abi, bytecode, gasEstimate, constructorInputRef }: IProps) => {
  const [buildTxToggle, setBuildTxToggle] = useState(true);
  const { control, register, getValues, setValue, handleSubmit } = useForm<TDeployForm>();
  // Context
  const { testNetID, currAccount, pvtKey, unsignedTx, constructorInputs, setError } = useContext(AppContext);
  if (constructorInputs) setValue('constructorInput', constructorInputs);

  // set gas estimate
  useEffect(() => {
    setValue('gasSupply', gasEstimate);
    setBuildTxToggle(false);
  }, [gasEstimate]);

  const handleBuildTxn = (e: FormEvent | MouseEvent) => {
    e.preventDefault();
    const publicKey = currAccount;
    // create unsigned transaction here
    try {
      vscode.postMessage({
        command: 'build-rawtx',
        payload: {
          from: publicKey,
          abi,
          bytecode,
          params: getValues('constructorInput') || [],
          gasSupply: getValues('gasSupply'),
        },
        testNetId: testNetID,
      });
    } catch (error) {
      setError(error);
    }
  };

  const signAndDeploy = () => {
    try {
      vscode.postMessage({
        command: 'sign-deploy-tx',
        payload: {
          unsignedTx,
          pvtKey,
        },
        testNetId: testNetID,
      });
    } catch (error) {
      setError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(signAndDeploy)}>
      <div className="form-container">
        <div className="json_input_container" style={{ marginLeft: '-10px' }}>
          <Controller
            name="constructorInput"
            render={() => (
              <TextArea
                value={getValues('constructorInput')}
                inputRef={constructorInputRef}
                onChange={(input: Array<ConstructorInput>) => {
                  setValue('constructorInput', input);
                }}
              />
            )}
            control={control}
          />
        </div>
      </div>
      <div className="gas_supply">
        <label className="label_name" style={{ marginRight: '10px' }}>
          Gas Supply:
        </label>
        <input
          type="number"
          placeholder='click on "get gas estimate" '
          className="input custom_input_css"
          id="deployGas"
          ref={register}
          name="gasSupply"
        />
      </div>
      {/* Build unsigned transaction */}
      <div className="input-container">
        <Button
          buttonType={ButtonType.Button}
          disabled={gasEstimate > 0 ? buildTxToggle : true}
          onClick={handleBuildTxn}
        >
          Build transaction
        </Button>
        <Button buttonType={ButtonType.Input}>Sign & Deploy</Button>
      </div>
    </form>
  );
};

export default DeployForm;
