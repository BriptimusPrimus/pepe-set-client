import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

export default class DataTable extends React.Component {
  render() {
    return(
      <table className="table table-striped table-condensed table-bordered">
        <TableHeader/>
        <TableBody data={this.props.data}/>
      </table>
    );
  }
}