import React from 'react';

export default class LogInOut extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		let message = (this.props.body.introspect)
			? 'sign out'
			: 'sign in';

		let path = (this.props.body.introspect)
			? '/logout'
			: '/login';

		return (
			<a href={this.props.uri + path}>{message}</a>
		);
	}
}
