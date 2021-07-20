import React, { MutableRefObject, useEffect, useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, ButtonType, TextArea } from '../index';
import { ABIDescription, ConstructorInput, ABIParameter } from 'types';
import { AppContext } from '../../appContext';

interface IProps {
  bytecode: string;
  abi: Array<ABIDescription>;
  vscode: any;
  currAccount: string;
  gasEstimate: number;
  constructorInputRef: MutableRefObject<ConstructorInput[] | null>;
}

interface TDeployForm {
  gasSupply: number;
  constructorInput: Array<ABIParameter>;
}

const DeployForm: React.FC<IProps> = (props: IProps) => {
  // Context
  const { testNetID, constructorInputs } = useContext(AppContext);

  const { control, register, handleSubmit, getValues, setValue } = useForm<TDeployForm>();
  if (constructorInputs) setValue('constructorInput', constructorInputs);

  // set gas estimate
  useEffect(() => {
    setValue('gasSupply', props.gasEstimate);
  }, [props.gasEstimate]);

  const handleDeploy = () => {
    const { vscode, bytecode, abi, currAccount } = props;
    vscode.postMessage({
      command: 'run-deploy',
      payload: {
        abi,
        bytecode,
        params: getValues('constructorInput') || [],
        gasSupply: getValues('gasSupply'),
        from: currAccount,
      },
      testNetId: testNetID,
    });
  };
  return (
    <form onSubmit={handleSubmit(handleDeploy)}>
      <div className="form-container">
        <div className="json_input_container">
          <Controller
            name="constructorInput"
            render={() => (
              <TextArea
                value={getValues('constructorInput')}
                inputRef={props.constructorInputRef}
                onChange={(input: Array<ConstructorInput>) => setValue('constructorInput', input)}
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
      <div style={{ marginBottom: '5px' }}>
        <Button buttonType={ButtonType.Input}>Deploy</Button>
      </div>
    </form>
  );
};

export default DeployForm;
