import React from 'react';

export default class EnrollmentFormGoogleAuth extends React.Component {
  render() {
    return(
      <section>
        <div>
          <h3 className="text-primary text-center">Set Google Authenticator</h3>
        </div>      
        <form name="enrollment" className="form-horizontal">
        
          <div className="form-group">
            <label for="bitmap-image" className="col-sm-2 control-label">Scan this image</label>
            <div className="col-sm-10" id="google-bitmap">
              <img src="#" className="form-control img-responsive img-rounded" id="bitmap-image" alt="Bitmap Image"/>            
            </div>          
          </div>
          
          <div className="form-group">
            <label for="code" className="col-sm-2 control-label">Enter Code</label>
            <div className="col-sm-10">
              <input type="password" className="form-control" id="code" placeholder="Code"/>
            </div>
          </div>
          
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </div>
          
        </form>
      </section>
    );
  }
}