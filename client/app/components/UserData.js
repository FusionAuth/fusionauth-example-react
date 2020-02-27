import React from 'react';

export default class LogInOut extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		let placeholder = 'Anything you type in here will be saved to your FusionAuth user data.';

		let input = (this.props.body.token)
			? <textarea placeholder={placeholder} onChange={this.props.handleTextInput} defaultValue={this.props.body.registration.data.userData}></textarea>
			: <textarea placeholder={placeholder} readOnly></textarea>;

		let title = (this.props.body.token)
			? <h2>Your User Data</h2>
			: <h2>Sign In to Edit Your User Data</h2>;

		return (
			<div id='UserData'>
				{title}
				{input}
			</div>
		);
	}
}
