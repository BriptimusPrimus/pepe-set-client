import React from 'react';
import MainContainerFactory from './MainContainer'

export default React.createClass({
  render: function() {
    const MainContainer = MainContainerFactory(this.props.pepeSetService);
    return(
      <div className="panel panel-default row">
        <div className="col-xs-0 col-sm-1 col-md-2"></div>
        <section className="col-xs-12 col-sm-10 col-md-8">
          <h1 className="text-primary text-center">Security Keys App</h1>
          <div className="well">
            <MainContainer/>
          </div>
        </section>
        <div className="col-xs-0 col-sm-1 col-md-2"></div>
      </div>
    );
  }
});