import React from 'react';
import DataTable from '../components/table/DataTable';

export default React.createClass({
  renderScreen: function () {
    const a = false;
    return a ?
      (<DataTable data={this.props.tableData}/>) :
      (<div>LOADING...</div>)
  },

  render: function() {
    return(
      this.renderScreen()
    );
  } 
});