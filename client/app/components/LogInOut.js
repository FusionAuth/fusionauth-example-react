import React from 'react';

export default class LogInOut extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let message = (this.props.body.token)
      ? 'sign out'
      : 'sign in';

    let path = (this.props.body.token)
      ? '/logout'
      : '/login';

    return (
      <a href={this.props.uri + path}>{message}</a>
    );
  }
}
