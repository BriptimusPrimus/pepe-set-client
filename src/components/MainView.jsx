import React from 'react';
import {constants} from '../lib/constants';

import EnrollmentFormGoogleAuth from './EnrollmentFormGoogleAuth';
import AuthMethodSelection from './AuthMethodSelection';
import LoginGoogleAuth from './LoginGoogleAuth';
import AccountOverview from './AccountOverview';

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
            return <EnrollmentFormGoogleAuth onActivateGoogleAuthClick={props.onActivateGoogleAuthClick}/>
          }
          if (activationData.type === constants.authTypes.U2F) {
            return <div>SET UB Key. Wait for your UB key to respond</div>            
          }
          // unknown 2FA authentication method...going to default case

        // not 2FA user, no activation intent, show Account Overview
        } else {
          return <AuthMethodSelection onSetGoogleAuthClick={props.onSetGoogleAuthClick}/>          
        }
        
      // Fully logged in 2FA user
      } else {
        if (userData.type === constants.authTypes.GOOGLE_AUTH) {
          return <AccountOverview authMethod={constants.authTypes.GOOGLE_AUTH}/>          
        }
        if (userData.type === constants.authTypes.U2F) {
          return <AccountOverview authMethod={constants.authTypes.U2F}/>         
        }
        // unknown 2FA authentication method...going to default case
      }
      
    // not logged in user, show 2FA screen       
    } else {
      if (userData.type === constants.authTypes.GOOGLE_AUTH) {
        return (
          <LoginGoogleAuth onGoogleAuthLoginClick={props.onGoogleAuthLoginClick}/>
        );
      }
      if (userData.type === constants.authTypes.U2F) {
        return <div>Log in using your UB Key</div>
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
        {this.props.waitingForResponse ? <div>LOADING...</div> : <p></p>}
        <p>{JSON.stringify(this.props)}</p>
        {this.renderScreen(this.props)}
      </div>
    );
  }
});