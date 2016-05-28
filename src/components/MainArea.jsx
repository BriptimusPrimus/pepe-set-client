import React from 'react';
import DataTable from './table/DataTable';

export default React.createClass({
  renderScreen: function () {
    const a = false;
    return a ?
      (<DataTable data={this.props.data}/>) :
      (<div>LOADING...</div>)
  },

  render: function() {
    return(
      <div className="panel panel-default row">
        <div className="col-xs-0 col-sm-1 col-md-2"></div>
        <section className="col-xs-12 col-sm-10 col-md-8">
          <h2 className="text-primary text-center">Security Keys App</h2>
          <div className="well">
            {this.renderScreen()}
          </div>
        </section>
        <div className="col-xs-0 col-sm-1 col-md-2"></div>
      </div>
    );
  } 
});