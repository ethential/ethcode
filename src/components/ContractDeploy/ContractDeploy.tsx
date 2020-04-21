import React, { Component } from "react";
import "./ContractDeploy.css";
import JSONPretty from 'react-json-pretty';
import { connect } from "react-redux";
import { setCallResult } from "../../actions";
import { IAccount } from "types";
import { Button } from '../common/ui';

interface IProps {
  contractName: string;
  bytecode: any;
  abi: any;
  vscode: any;
  compiled: any;
  error: Error | null;
  gasEstimate: number;
  deployedResult: string;
  compiledResult: object;
  callResult: object;
  deployAccount: IAccount;
  testNetId: string;
  openAdvanceDeploy: any;
  setCallResult: (result: any) => void;
}
interface IState {
  constructorInput: object[];
  gasSupply: number;
  error: Error | null;
  deployed: object;
  methodName: string;
  deployedAddress: string;
  methodArray: object;
  methodInputs: string;
  testNetId: string;
  disable: boolean;
  gasEstimateToggle: boolean;
  callFunctionToggle: boolean;
}

class ContractDeploy extends Component<IProps, IState> {
  public state: IState = {
    constructorInput: [],
    gasSupply: 0,
    error: null,
    deployed: {},
    methodName: '',
    deployedAddress: '',
    methodArray: {},
    methodInputs: '',
    testNetId: '',
    disable: true,
    gasEstimateToggle: false,
    callFunctionToggle: true
  };
  constructor(props: IProps, state: IState) {
    super(props);
    this.handleDeploy = this.handleDeploy.bind(this);
    this.handleCall = this.handleCall.bind(this);
    this.handleGetGasEstimate = this.handleGetGasEstimate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleConstructorInputChange = this.handleConstructorInputChange.bind(this);
    this.handleMethodnameInput = this.handleMethodnameInput.bind(this);
    this.handleMethodInputs = this.handleMethodInputs.bind(this);
    this.handleContractAddrInput = this.handleContractAddrInput.bind(this);
  }

  componentDidMount() {
    this.setState({ testNetId: this.props.testNetId });
    this.setState({ deployed: this.props.compiledResult });
    const { abi } = this.props;
    
    window.addEventListener("message", event => {
      const { data } = event;

      if (data.ganacheCallResult) {
        this.props.setCallResult(data.ganacheCallResult);
        this.setState({ callFunctionToggle: false });
      }
      if (data.error) {
        this.setState({ error: data.error });
      }
    });

    let methodArray: object = {};
    for (let i in abi) {
      if (abi[i].type === 'constructor' && abi[i].inputs.length > 0) {
        const constructorInput = JSON.parse(JSON.stringify(abi[i].inputs));
        for (let j in constructorInput) {
          constructorInput[j]['value'] = "";
        }
        this.setState({ constructorInput: constructorInput });
      } else {
        let methodname = abi[i]['name'];
        // @ts-ignore
        methodArray[methodname] = abi[i]['inputs'];
        // @ts-ignore
        for (let i in methodArray[methodname]) {
          // @ts-ignore
          if(methodArray[methodname].length > 0) {
            // @ts-ignore
            methodArray[methodname][i]['value'] = "";
          }
        }
      }
    }
    this.setState({ methodArray: methodArray });
  }
  componentDidUpdate(prevProps: any) {
    const { gasEstimate, deployedResult, error, abi, callResult } = this.props;
    if (this.props.testNetId !== this.state.testNetId && this.props.testNetId !== 'ganache') {
      this.setState({ disable: true });
    } else if (this.props.testNetId !== this.state.testNetId) {
      this.setState({ disable: false });
    }
    if (error !== prevProps.error) {
      this.setState({ error: error });
    }
    if (this.props.testNetId !== this.state.testNetId) {
      this.setState({ testNetId: this.props.testNetId });
    }
    else if (deployedResult !== prevProps.deployedResult) {
      const deployedObj = JSON.parse(deployedResult);
      this.setState({ deployed: deployedObj, deployedAddress: deployedObj.contractAddress, disable: false });
    }
    else if ((this.state.gasSupply === 0 && gasEstimate !== this.state.gasSupply) || gasEstimate !== prevProps.gasEstimate) {
      this.setState({ gasSupply: gasEstimate, disable: false, gasEstimateToggle: false });
    }
  }
  private handleDeploy() {
    const { vscode, bytecode, abi } = this.props;
    const { gasSupply, constructorInput, testNetId } = this.state;
    this.setState({ error: null, deployed: {}, disable: true });
    vscode.postMessage({
      command: "run-deploy",
      payload: {
        abi,
        bytecode,
        params: constructorInput,
        gasSupply
      },
      testNetId
    });
  }
  private handleCall() {
    const { vscode, abi, deployAccount } = this.props;
    const { gasSupply, methodName, deployedAddress, methodInputs, testNetId } = this.state;
    this.setState({ error: null, callFunctionToggle: true });
    vscode.postMessage({
      command: "ganache-contract-method-call",
      payload: {
        abi,
        address: deployedAddress,
        methodName: methodName,
        params: JSON.parse(methodInputs),
        gasSupply,
        deployAccount: deployAccount.checksumAddr ? deployAccount.checksumAddr : deployAccount.value
      },
      testNetId
    });
  }
  private handleGetGasEstimate() {
    const { vscode, bytecode, abi } = this.props;
    const { constructorInput, testNetId } = this.state;
    this.setState({ gasEstimateToggle: true });
    try {
      vscode.postMessage({
        command: "run-get-gas-estimate",
        payload: {
          abi,
          bytecode,
          params: constructorInput
        },
        testNetId
      });
    } catch (err) {
      this.setState({ error: err });
    }
  }
  private handleChange(event: any) {
    this.setState({ gasSupply: event.target.value });
  }
  private handleConstructorInputChange(event: any) {
    const { constructorInput } = this.state;
    if (constructorInput.length > 3) {
      this.setState({ constructorInput: JSON.parse(event.target.value) });
    } else {
      const item = constructorInput[event.target.id];
      // @ts-ignore
      item['value'] = event.target.value;
      constructorInput[event.target.id] = item;
      this.setState({ constructorInput });
    }
  }
  private handleContractAddrInput(event: any) {
    this.setState({ deployedAddress: event.target.value });
  }
  private handleMethodnameInput(event: any) {
    this.setState({ callFunctionToggle: false });
    const { methodArray } = this.state;
    // @ts-ignore
    if(methodArray.hasOwnProperty(event.target.value)) {
      this.setState({
        methodName: event.target.value,
        // @ts-ignore
        methodInputs: JSON.stringify(methodArray[event.target.value], null, '\t')
      });
    }
  }
  private handleMethodInputs(event: any) {
    this.setState({ methodInputs: event.target.value });
  }
  public render() {
    const { gasSupply, error, constructorInput, deployed, methodName, methodInputs, deployedAddress, disable, gasEstimateToggle, callFunctionToggle } = this.state;
    const { callResult, testNetId } = this.props;
    return (
      <div>
        <div>
          <form onSubmit={this.handleDeploy}>
            <div className="form-container">
              {
                (constructorInput && constructorInput.length > 0) &&
                <div>
                  {
                    (constructorInput.length <= 3) ?
                      <div>
                        {
                          constructorInput.map((x: object, index) => {
                            return (
                              <div className="constructorInput input-flex" style={{ marginTop: '10px', marginBottom: '10px' }}>
                                {/* 
                                // @ts-ignore */}
                                <label className="label_name">{x.name}:</label>
                                {/* 
                                // @ts-ignore */}
                                <input className="custom_input_css" type={x.type} placeholder={`${x.name} arguments (${x.type})`} id={index} name={x.name} onChange={(e) => this.handleConstructorInputChange(e)} />
                              </div>
                            );
                          })
                        }
                      </div> :
                      <div className="json_input_container" style={{ marginLeft: '-10px' }}>
                        <textarea className="json_input custom_input_css" value={JSON.stringify(constructorInput, null, '\t')} onChange={(e) => this.handleConstructorInputChange(e)}>
                        </textarea>
                      </div>
                  }
                </div>
              }
            </div>
            <div className="gas_supply">
              <label className="label_name" style={{ marginRight: '10px' }}>Gas Supply:</label>
              {
                (gasSupply > 0) ?
                  <input type="number" placeholder='click on "get gas estimate" ' className="input custom_input_css" value={gasSupply} id="deployGas" onChange={(e) => this.handleChange(e)} /> :
                  <input type="number" placeholder='click on "get gas estimate" ' className="input custom_input_css" value="" id="deployGas" onChange={(e) => this.handleChange(e)} />
              }
            </div>
            <div style={{ marginBottom: '5px' }}>
              {testNetId !== 'ganache' ?
                <Button
                  onClick={this.props.openAdvanceDeploy}>
                  Advance Deploy
                </Button> :
                (gasSupply > 0) ? <Button ButtonType="input" disabled={disable} value="Deploy" /> :
                <Button ButtonType="input" disabled={true} value="Deploy" />
              }
            </div>
          </form>
          <div>
            <form onSubmit={this.handleGetGasEstimate}>
              <Button ButtonType="input" disabled={gasEstimateToggle} value="Get gas estimate" />
            </form>
          </div>
          <div>
            <form onSubmit={this.handleCall} className="form_align" >
              <input type="text" className="custom_input_css" placeholder='Enter contract address' style={{ marginRight: '5px' }} name="contractAddress" value={deployedAddress} onChange={this.handleContractAddrInput} />
              <input type="text" className="custom_input_css" placeholder='Enter contract function name' name="methodName" onChange={this.handleMethodnameInput} />
              {
                methodName !== '' && methodInputs !== '[]' &&
                <div className="json_input_container" style={{ marginTop: '10px' }}>
                  <textarea className="json_input custom_input_css" value={methodInputs} onChange={this.handleMethodInputs}></textarea>
                </div>
              }
              <Button ButtonType="input" disabled={callFunctionToggle} value="Call function" />
            </form>
          </div>
        </div>
        <div className="error_message">
          {
            error &&
            <div>
              <span className="contract-name inline-block highlight-success">
                Error Message:
            </span>
              <div>
                <pre className="large-code-error">{JSON.stringify(error)}</pre>
              </div>
            </div>
          }
        </div>
        {
          // @ts-ignore
          Object.entries(callResult).length > 0 &&
          <div className="call-result">
            <span>
              {/* 
              // @ts-ignore */}
              {(callResult || (callResult && callResult.callResult)) ? 'Call result:' : 'Call error:'}
            </span>
            <div>
              {/* TODO: add better way to show result and error */}
              {
                callResult &&
                <pre className="large-code">{ callResult }</pre>
              }
            </div>
          </div>
        }
        {
          Object.entries(deployed).length > 0 &&
          <div className="transaction_receipt">
            <span className="contract-name inline-block highlight-success">
              Transaction Receipt:
            </span>
            <div>
              <pre className="large-code">
                <JSONPretty id="json-pretty" data={deployed}></JSONPretty>
              </pre>
            </div>
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps({ debugStore, compiledStore }: any) {
  const { testNetId } = debugStore;
  const { compiledresult, callResult } = compiledStore;
  return {
    testNetId,
    compiledResult: compiledresult,
    callResult
  };
}

export default connect(mapStateToProps, {
  setCallResult
})(ContractDeploy);
