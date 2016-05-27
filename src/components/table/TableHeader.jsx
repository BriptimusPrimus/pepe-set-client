import React from 'react';

export default class TableHeader extends React.Component {
  render() {
    return(
      <thead>
        <tr>
          <th className="text-center">Key</th>
          <th className="text-center">Type</th>
          <th className="text-center">Active</th>
          <th className="text-center"></th>
        </tr>
      </thead>
    );
  }
}