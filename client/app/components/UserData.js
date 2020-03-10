import React from 'react';

export default class LogInOut extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // placeholder text for the textarea
    let placeholder = 'Anything you type in here will be saved to your FusionAuth user data.';

    // the user's data.userData (or an empty string if uninitialized)
    let userData = (this.props.body.registration && this.props.body.registration.data)
      ? this.props.body.registration.data.userData
      : '';

    // textarea (locked if user not logged in)
    let input = (this.props.body.token)
      ? <textarea placeholder={placeholder} onChange={this.props.handleTextInput} defaultValue={userData}></textarea>
      : <textarea placeholder={placeholder} readOnly></textarea>;

    // section title
    let title = (this.props.body.token)
      ? <h2>Your User Data</h2>
      : <h2>Sign In to Edit Your User Data</h2>;

    // JSX return
    return (
      <div id='UserData'>
        {title}
        {input}
      </div>
    );
  }
}
