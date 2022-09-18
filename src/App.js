import React, { useState, useEffect } from 'react';
// import Counter from './components/Counter';
// import CounterClass from './components/CounterClass';
import './styles/App.css';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';


function App() {


	const [posts, setPosts] = useState([
		{ id: 1, title: 'Javascript 1', body: 'Description' },
		{ id: 2, title: 'Javascript 2', body: 'Description' },
		{ id: 3, title: 'Javascript 3', body: 'Description' },
	])
	const [post, setPost] = useState({ title: '', body: '' });

	const postRemove = (id) => {
		let newPosts = posts.filter(post => post.id !== id);
		setPosts(newPosts);
	}

	const addNewPost = (e) => {
		e.preventDefault();
		// const newPost = { id: Date.now(), title: post.title, body: post.body }
		// setPosts([...posts, newPost]);
		setPosts([...posts, {...post, id: Date.now() }]);
		setPost({ title: '', body: '' });
	}

	useEffect(() => {
		console.log('render');
	}, [])


	return (
		<div className="App">


			<form>
				<MyInput type="text" placeholder='Название поста' value={post.title} onChange={(e) => setPost({ ...post, title: e.target.value })} />
				<MyInput type="text" placeholder='Описание поста' value={post.body} onChange={(e) => setPost({ ...post, body: e.target.value })} />
				<MyButton onClick={addNewPost}>Создать пост</MyButton>
			</form>
			<PostList posts={posts} title={'Посты про Javascript'} postRemove={postRemove} />


		</div>
	);
}

export default App;
