import React from 'react';

export default class TableRow extends React.Component {
  getRecord() {
    return this.props.row || {};
  }
  capitalizeFirstLetter(str) {
    return str[0].toUpperCase() + str.slice(1);
  }
  render() {
    const record = this.getRecord();
    const active = record.active ? 'Yes' : 'No';
    return(
      <tr>
        <td className="text-center">
          {record.keyName}
        </td>
        <td className="text-center">
          {record.type}
        </td>
        <td className="text-center">
          {active}
        </td>
        <td className="text-center">
          <a href="#">Activate</a>
        </td>
      </tr>
    );
  }
}