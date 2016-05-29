import React from 'react';
import DataTable from '../components/table/DataTable';
import {constants} from '../lib/constants';

export default React.createClass({

  renderScreen: function (props) {
    console.log(props);
    const {waitingForResponse, userData, activationData} = props;
    
    if(waitingForResponse) {
      return;    
    }
    
    if(userData.error) {
      return(
        <div>ERROR: {userData.error}</div>
      );
    }

    if (userData.isFullyLoggedIn) {
            
      if (!userData.is2fa) {
        // if activation data payload is populated
        // there could be google auth or U2F activation intent
        if (activationData.uri) {
          if (activationData.type === constants.authTypes.GOOGLE_AUTH) {
            return (
              <div>SET GOOGLE AUTHENTICATOR. Scan the image, enter the code</div>
            );
          }
          if (activationData.type === constants.authTypes.U2F) {
            return (
              <div>SET UB Key. Wait for your UB key to respond</div>
            );
          }
          // unknown 2FA authentication method...going to default case

        // not 2FA user, no activation intent, show Account Overview
        } else {          
          return (
            <div>
              <div>
                <button class="btn btn-primary">Activate Google Authenticator</button>
              </div>
              <div>
                <button class="btn btn-primary">Activate UB Key</button>
              </div>
            </div>
          );
        }
        
      // Fully logged in 2FA user
      } else {
        if (userData.type === constants.authTypes.GOOGLE_AUTH) {
          return (
            <div>Your current authentication method is set to Google Authenticator</div>
          );
        }
        if (userData.type === constants.authTypes.U2F) {
          return (
            <div>Your current authentication method is set to UB Key</div>
          )
        }
        // unknown 2FA authentication method...going to default case
      }
      
    // not logged in user, show 2FA screen       
    } else {
      if (userData.type === constants.authTypes.GOOGLE_AUTH) {
        return (
          <div>Log in using Google Authenticator</div>
        );
      }
      if (userData.type === constants.authTypes.U2F) {
        return (
          <div>Log in using your UB Key</div>
        );
      }
      // unknown 2FA authentication method...going to default case      
    }

    // default
    return (  
      <p>??????</p>
    );
  },  

  render: function() {
    return(
      <div>
        {this.props.waitingForResponse ? <div>LOADING...</div> : <p>done</p>}
        <p>{JSON.stringify(this.props)}</p>
        {this.renderScreen(this.props)}
      </div>
    );
  }
});