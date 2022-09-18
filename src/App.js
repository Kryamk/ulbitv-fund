import React, { useState, useEffect } from 'react';
// import Counter from './components/Counter';
// import CounterClass from './components/CounterClass';
import './styles/App.css';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import MySelect from './components/UI/MySelect/MySelect';

function App() {

	const [posts, setPosts] = useState([
		{ id: 1, title: 'Javascript', body: 'one' },
		{ id: 2, title: 'Python', body: 'two' },
		{ id: 3, title: 'C++', body: 'three' },
	])

	const [selectedSort, setSelectedSort] = useState('');

	const createPost = (post) => {
		setPosts([...posts, post]);
	}
	const removePost = (post) => {
		let newPosts = posts.filter(p => p.id !== post.id);
		setPosts(newPosts);
	}
	const sortPosts = (sort) => {
		setSelectedSort(sort)
		setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])))
	}


	return (
		<div className="App">

			<PostForm create={createPost} />
			<div>
				<hr style={{ margin: '15px 0' }} />
				<MySelect
					defaultValue='Сортировка'
					options={[{ value: 'title', name: 'По названию' }, { value: 'body', name: 'По описанию' }]}
					value={selectedSort}
					onChange={sortPosts}
				// onChange={setSelectedSort}
				/>
			</div>
			{posts.length
				?
				<PostList posts={posts} title={'Посты про Javascript'} remove={removePost} />
				:
				<h1 style={{ textAlign: 'center' }}>Посты не найдены</h1>
			}


		</div>
	);
}

export default App;
