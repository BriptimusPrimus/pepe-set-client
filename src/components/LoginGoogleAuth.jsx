import React from 'react';

export default class LoginGoogleAuth extends React.Component {
  onSubmitBtnClick(e, codeInput) {
    e.preventDefault();
    if (!codeInput.value.trim()) {
      return;
    }    
    this.props.onGoogleAuthLoginClick(codeInput.value);
  }
  showError() {
    if (this.props.errNotification && this.props.errNotification.trim() !== '') {
      return {visibility: 'visible'} 
    } else {
      return {visibility: 'hidden'}
    }
  }  
  render() {
    let codeInput;
    
    return(
      <section>
        <div>
          <h3 className="text-primary text-center">Log in with Google Authenticator</h3>
        </div>      
        <form name="enrollment" className="form-horizontal">
          
          <div className="form-group">
            <label for="code" className="col-sm-2 control-label">Enter Code</label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="code"
                placeholder="Code"
                ref={node => {codeInput = node}}
              />
              <p className="bg-danger" style={this.showError()}>{this.props.errNotification}</p>
            </div>
          </div>
          
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button 
                type="submit" 
                className="btn btn-primary"
                onClick={(e) => this.onSubmitBtnClick(e, codeInput)}
              >
                Submit
              </button>
            </div>
          </div>
          
        </form>
      </section>
    );
  }
}