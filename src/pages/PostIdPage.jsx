import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';
import { useFetching } from '../hooks/useFetching';

export default function PostIdPage() {
	const params = useParams();
	const [post, setPost] = useState({})
	const [postComments, setPostComments] = useState([])

	const [fetchPostById, isLoading, error] = useFetching(async (id) => {
		const response = await PostService.getById(id);
		setPost(response.data)
	})

	const [fetchCommets, isComLoading, comError] = useFetching(async (id) => {
		const response = await PostService.getCommetsByPosts(id)
		setPostComments(response.data)
	})


	useEffect(() => {
		fetchPostById(params.id)
		fetchCommets(params.id)
		// console.log('---', post);
	}, [])


	return (
		<div>
			<h1>Вы открыли страницу поста с iD = {params.id}</h1>
			{isLoading
				? <Loader/>
				:<b>{post.id}. {post.title}</b>
			}
			<h2>Комментарии</h2>
			{
				isComLoading
					? <Loader/>
					: <div style={{margin: 20}}>
						{postComments.map(el =>
							<div style={{marginTop: 15}}>
								<h3>{el.name}</h3>
								<h4>{el.email}</h4>
								<p>{el.body}</p>
								<br/>
							</div>
						)}
					</div>
			}


		</div>
	)
}
