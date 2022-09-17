import React, { useState } from 'react'

export default function Counter() {
	let [likes, setLikes] = useState(0);
	let [value, setValue] = useState('text');

	let increment = () => {
		setLikes(likes += 1);
	}
	function decrement() {
		setLikes(likes -= 1);
	}
	return (
		<div className='counter'>
			<h1>Likes: {likes}</h1>
			<h1>{value}</h1>
			<input type="text" value={value} onChange={e => setValue(e.target.value)} />
			<button onClick={increment}>Plus</button>
			<button onClick={decrement}>Minus</button>
		</div>
	)
}
