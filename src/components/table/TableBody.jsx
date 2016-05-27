import React from 'react';
import TableRow from './TableRow';

export default class TableBody extends React.Component {
  getData() {
    return this.props.data;
  }

  render() {
    return(
      <tbody>
        {this.getData().map(row =>
          <TableRow key={row.id} row={row} />
        )}
      </tbody>      
    );
  }
}