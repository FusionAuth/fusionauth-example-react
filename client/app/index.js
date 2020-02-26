import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Greeting from './components/Greeting.js';
import LogInOut from './components/LogInOut.js';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			body: {} // this is the body from FusionAuth's /introspect endpoint
		};
	}

	componentDidMount() {
		fetch('http://localhost:9000/user', {
			credentials: 'include' // fetch won't send cookies unless you set credentials
		})
			.then(response => response.json())
			.then((response) => {
				this.setState({
					body: response
				});
			})
	}

	render() {
		return (
			<div>
				<Greeting body={this.state.body}/>
				<LogInOut body={this.state.body} uri='http://localhost:9000'/> {/*TODO: move uri definition*/}
			</div>
		);
	}
}

ReactDOM.render(<App/>, document.getElementById('app'));
