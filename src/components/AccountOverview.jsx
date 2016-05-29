import React from 'react';
import {constants} from '../lib/constants';

export default class AccountOverview extends React.Component {
  getAuthMethod() {
    if (this.props.authMethod === constants.authTypes.GOOGLE_AUTH) {
      return ' Google Authenticator';
    }
    if (this.props.authMethod === constants.authTypes.U2F) {
      return ' UB Key'
    }
    return ' Unknown';
  }
  render() {
    return(
      <section>
        <div>
          <h3 className="text-primary text-center">
            Your current authentication method is set to {this.getAuthMethod()}
          </h3>
        </div>        
      </section>
    );
  }
}