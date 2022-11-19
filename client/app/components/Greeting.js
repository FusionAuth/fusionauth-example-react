import React from 'react';

export default class Greeting extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let message = (this.props.body.tid)
      ? `Hi, ${this.props.body.email}!`
      : "You're not logged in.";

    return (
      <span>{message}</span>
    );
  }
}
