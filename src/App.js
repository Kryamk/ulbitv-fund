import React, { useState, useEffect } from 'react';
// import Counter from './components/Counter';
// import CounterClass from './components/CounterClass';
import './styles/App.css';
import PostList from './components/PostList';
import PostForm from './components/PostForm';

function App() {

	const [posts, setPosts] = useState([
		{ id: 1, title: 'Javascript 1', body: 'Description' },
		{ id: 2, title: 'Javascript 2', body: 'Description' },
		{ id: 3, title: 'Javascript 3', body: 'Description' },
	])


	const createPost = (post) => {
		setPosts([...posts, post]);
	}
	// const removePost = (id) => {
	// 	let newPosts = posts.filter(post => post.id !== id);
	// 	setPosts(newPosts);
	// }
	const removePost = (post) => {
		let newPosts = posts.filter(p => p.id !== post.id);
		setPosts(newPosts);
	}

	// useEffect(() => {
	//   first

	//   return () => {
	// 	second
	//   }
	// }, [third])


	return (
		<div className="App">

			<PostForm create={createPost} />
			{posts.length !== 0
				?
				<PostList posts={posts} title={'Посты про Javascript'} remove={removePost} />
				:
				<h1 style={{ textAlign: 'center' }}>Посты не найдены</h1>
			}


		</div>
	);
}

export default App;
