import React from 'react';

export default class LogInOut extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("this.props.body", this.props.body);
    let message = (this.props.body.tid)
      ? 'sign out'
      : 'sign in';

    let path = (this.props.body.tid)
      ? '/logout'
      : '/login';

    return (
      <a href={this.props.uri + path}>{message}</a>
    );
  }
}
