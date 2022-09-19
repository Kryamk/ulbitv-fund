import React, { useState, useEffect } from 'react';
// import Counter from './components/Counter';
// import CounterClass from './components/CounterClass';
import './styles/App.css';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/MyModal/MyModal';
import MyButton from './components/UI/button/MyButton';
import { usePosts } from './hooks/usePosts';
import PostService from './API/PostService';
import Loader from './components/UI/Loader/Loader';

function App() {
	console.log('render App');
	const [posts, setPosts] = useState([])
	const [filter, setFilter] = useState({ sort: '', query: '', })
	const [modal, setModal] = useState(false)
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
	const [isPostsLoading, setIsPostsLoading] = useState(false)

	useEffect(() => {
		fetchPosts();
	}, [])

	async function fetchPosts() {
		setIsPostsLoading(true)
		const posts = await PostService.getAll();
		setPosts(posts);
		setIsPostsLoading(false)
	}


	const createPost = (post) => {
		setPosts([...posts, post]);
		setModal(false);
	}
	const removePost = (post) => {
		let newPosts = posts.filter(p => p.id !== post.id);
		setPosts(newPosts);
	}

	return (
		<div className="App">
			<MyButton onClick={() => setModal(true)} style={{ marginTop: 30 }}>Modal</MyButton>
			<MyModal visible={modal} setVisible={setModal}>
				<PostForm create={createPost} />
			</MyModal>
			<hr style={{ margin: '15px 0' }} />
			<PostFilter filter={filter} setFilter={setFilter} />
			{isPostsLoading
				? <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}><Loader /></div>
				: <PostList posts={sortedAndSearchedPosts} title={'Посты про Javascript'} remove={removePost} />
			}

		</div>
	);
}

export default App;







/* //filter in App
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
*/
