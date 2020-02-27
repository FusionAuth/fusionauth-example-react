import React from 'react';

export default class Greeting extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		let message = (this.props.body.introspect)
			? `Hi, ${this.props.body.introspect.email}!`
			: `You're not logged in.`;

		return (
			<span>{message}</span>
		);
	}
}
