import React, { Component } from 'react'
export default class CounterClass extends Component {
	constructor(props) {
		super(props);
		this.state = {
			likes: 0,
			value: 'test'
		}
		this.decrement = this.decrement.bind(this);
	}

	increment = () => {
		this.setState({ likes: this.state.likes + 1 });
	}
	decrement() {
		this.setState({ likes: this.state.likes - 1 });
	}

	render() {
		console.log('render');
		return (
			<div className='counter'>
				<h1>Likes: {this.state.likes}</h1>
				<h1>{this.state.value}</h1>
				<input type="text" value={this.state.value} onChange={e => this.setState({value: e.target.value})} />
				<button onClick={this.increment}>Plus</button>
				<button onClick={this.decrement}>Minus</button>
			</div>
		)
	}
}
