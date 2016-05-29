import React from 'react';

export default class AuthMethodSelection extends React.Component {
  activateGoogleAuth(e) {
    e.preventDefault();
    this.props.onSetGoogleAuthClick();
  }
  render() {
    return(
      <form name="enrollment">
        <p>{JSON.stringify(this.props)}</p>
        <div className="form-group">
          <button type="submit"
            className="btn btn-primary btn-lg btn-block"
            onClick={(e) => this.activateGoogleAuth(e)}
          >
            Activate Google Authenticator
          </button>
        </div>
        
        <div className="form-group">
          <button type="submit" className="btn btn-primary btn-lg btn-block">Activate UB Key</button>
        </div>        
        
      </form>      
    );
  }
}