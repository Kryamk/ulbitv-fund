import React, { useState, useMemo } from 'react';
// import Counter from './components/Counter';
// import CounterClass from './components/CounterClass';
import './styles/App.css';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import MySelect from './components/UI/MySelect/MySelect';
import MyInput from './components/UI/input/MyInput';

function App() {
	console.log('render App');
	const [posts, setPosts] = useState([
		{ id: 1, title: 'Javascript', body: 'one' },
		{ id: 2, title: 'Python', body: 'two' },
		{ id: 3, title: 'C++', body: 'three' },
	])

	const [selectedSort, setSelectedSort] = useState('');
	const [searchQuery, setSearchQuery] = useState('');


	// function getSortedPosts() {
	// 	console.log('getSortedPosts');
	// 	if(selectedSort) {
	// 		return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
	// 	}
	// 	return posts;
	// }
	// const sortedPosts = getSortedPosts();



	const sortedPosts = useMemo(() => {
		console.log('getSortedPosts');
		if (selectedSort) {
			return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
		}
		return posts;
	}, [selectedSort, posts])

	const sortedAndSearchedPosts = useMemo(()=>{
		return sortedPosts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()))
	}, [searchQuery, sortedPosts])
	// const sortedAndSearchedPosts = sortedPosts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()))




	const createPost = (post) => {
		setPosts([...posts, post]);
	}
	const removePost = (post) => {
		let newPosts = posts.filter(p => p.id !== post.id);
		setPosts(newPosts);
	}
	const sortPosts = (sort) => {
		setSelectedSort(sort)
		// setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort]))) // только сортировка
	}


	return (
		<div className="App">

			<PostForm create={createPost} />
			<div>
				<hr style={{ margin: '15px 0' }} />
				<MyInput
					placeholder='Поиск'
					value={searchQuery}
					onChange={(e) => { setSearchQuery(e.target.value) }}
				/>
				<MySelect
					defaultValue='Сортировка'
					options={[{ value: 'title', name: 'По названию' }, { value: 'body', name: 'По описанию' }]}
					value={selectedSort}
					onChange={sortPosts}
				// onChange={setSelectedSort} // только сортировка
				/>
			</div>
			{sortedAndSearchedPosts.length
				?
				<PostList posts={sortedAndSearchedPosts} title={'Посты про Javascript'} remove={removePost} />
				// <PostList posts={posts} title={'Посты про Javascript'} remove={removePost} /> // только сортировка
				:
				<h1 style={{ textAlign: 'center' }}>Посты не найдены</h1>
			}


		</div>
	);
}

export default App;
