import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
	render() {
		return (
			<div>
				<p>Hello World</p>
				<a href="http://localhost:9000/login">sign in</a> {/*TODO: move link to state variable*/}
			</div>
		);
	}
}

ReactDOM.render(<App/>, document.getElementById('app'));
