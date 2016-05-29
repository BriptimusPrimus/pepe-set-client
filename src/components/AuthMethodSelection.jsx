import React from 'react';

export default class AuthMethodSelection extends React.Component {
  onActivateGoogleAuthClick(e) {
    e.preventDefault();
    this.props.onSetGoogleAuthClick();
  }
  onActivateUbKeyClick(e) {
    e.preventDefault();
  }  
  render() {
    return(
      <form name="enrollment">
        <div className="form-group">
          <button 
            type="submit"
            className="btn btn-primary btn-lg btn-block"
            onClick={(e) => this.onActivateGoogleAuthClick(e)}
          >
            Activate Google Authenticator
          </button>
        </div>
        
        <div className="form-group">
          <button 
            type="submit"
            className="btn btn-primary btn-lg btn-block"
            onClick={(e) => this.onActivateUbKeyClick(e)}
          >
            Activate UB Key
          </button>
        </div>        
        
      </form>      
    );
  }
}