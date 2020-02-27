import React from 'react';

export default class LogInOut extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		let placeholder = 'Anything you type in here will be saved to your user profile.';

		let input = (this.props.body.active)
			? <textarea placeholder={placeholder} onChange={this.props.handleTextInput} defaultValue={this.props.body.registration.data.userData}></textarea>
			: <textarea placeholder={placeholder} readOnly></textarea>;

		return (
			<div id='UserData'>
				<h2>user.data.userData</h2>
				{input}
			</div>
		);
	}
}
