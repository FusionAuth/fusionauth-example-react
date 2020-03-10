import React from 'react';

export default class Response extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id='Response'>
        <h2>FusionAuth Response</h2>
        <pre>{JSON.stringify(this.props.body, null, '\t')}</pre>
      </div>
    );
  }
}
