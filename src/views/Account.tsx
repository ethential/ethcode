import React, { useContext } from 'react';
import './Account.css';
import { AppContext } from '../appContext';

type IProps = {
  vscode: any;
};

const Account: React.FC<IProps> = ({ vscode }: IProps) => {
  const { currAccount, accountBalance, error } = useContext(AppContext);

  return (
    <div className="account_container">
      {/* Account Selection */}
      <div className="account_row">
        <div className="label-container">
          <label className="label">Account </label>
        </div>
        <div className="input-container">
          <span>{currAccount}</span>
        </div>
      </div>

      <div className="account_row">
        <div className="label-container">
          <label className="label">Balance </label>
        </div>
        <div className="input-container">
          <div className="input-container">
            <span>{accountBalance} wei</span>
          </div>
        </div>
      </div>

      {/* Error Handle */}
      <div>
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
  );
};

export default Account;
