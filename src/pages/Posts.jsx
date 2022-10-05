import React, { useState, useEffect, useRef } from 'react';
// import Counter from './components/Counter';
// import CounterClass from './components/CounterClass';
import '../styles/App.css';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/MyModal/MyModal';
import MyButton from '../components/UI/button/MyButton';
import { usePosts } from '../hooks/usePosts';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';
import { useFetching } from '../hooks/useFetching';
import { getPageCount } from '../utils/pages';
import Pagination from '../components/UI/pagination/Pagination';
import { useObserver } from '../hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';

function Posts() {
	// console.log('render Posts');
	const [posts, setPosts] = useState([])
	const [filter, setFilter] = useState({ sort: '', query: '', })
	const [modal, setModal] = useState(false)
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
	const [totalPages, setTotalPages] = useState(0)
	const [limit, setLimit] = useState(10)
	const [page, setPage] = useState(1)
	const lastElement = useRef();



	const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
		const response = await PostService.getAll(limit, page);
		setPosts([...posts, ...response.data]);
		// setPosts(response.data);
		const totalCount = response.headers['x-total-count']
		setTotalPages(getPageCount(totalCount, limit));
	})


	useObserver(lastElement, page < totalPages, isPostsLoading, () => {
		setPage(page + 1)
	})


	useEffect(() => {
		fetchPosts(limit, page)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, limit])


	const createPost = (post) => {
		setPosts([...posts, post]);
		setModal(false);
	}
	const removePost = (post) => {
		let newPosts = posts.filter(p => p.id !== post.id);
		setPosts(newPosts);
	}
	const changePage = (page) => {
		setPage(page);
		// fetchPosts(limit,page)
	}

	return (
		<div className="App">
			<MyButton onClick={() => setModal(true)} style={{ marginTop: 30 }}>Modal</MyButton>
			<MyModal visible={modal} setVisible={setModal}>
				<PostForm create={createPost} />
			</MyModal>
			<hr style={{ margin: '15px 0' }} />
			<PostFilter filter={filter} setFilter={setFilter} />
			<MySelect
				value={limit}
				onChange={value => setLimit(value)}
				defaultValue='Лимит'
				options={[
					{ value: 5, name: 5 },
					{ value: 10, name: 10 },
					{ value: 20, name: 20 },
					{ value: -1, name: 'Все' },
				]}
			/>
			{postError &&
				<h1>Произошла ошибка ${postError}</h1>
			}
			<PostList posts={sortedAndSearchedPosts} title={'Посты про Javascript'} remove={removePost} />
			<div ref={lastElement} style={{ height: 20, background: 'tomato' }}></div>
			{isPostsLoading &&
				<div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}><Loader /></div>
			}
			{/* {isPostsLoading
				? <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}><Loader /></div>
				: <PostList posts={sortedAndSearchedPosts} title={'Посты про Javascript'} remove={removePost} />
			} */}
			<Pagination totalPages={totalPages} page={page} changePage={changePage} />

		</div>
	);
}

export default Posts;

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
