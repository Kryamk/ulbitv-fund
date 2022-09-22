import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader';
import { useFetching } from '../hooks/useFetching';

export default function PostIdPage() {
	const params = useParams();
	const [post, setPost] = useState({})
	const [fetchPostById, isLoading, error] = useFetching(async (id) => {
		const response = await PostService.getById(id);
		setPost(response.data)

	})
	useEffect(() => {
		fetchPostById(params.id)
		// console.log('---', post);
	}, [])

	return (
		<div>
			<h1>Вы открыли страницу поста с iD = {params.id}</h1>
			{isLoading
				? <Loader/>
				:<div>{post.id}. {post.title}</div>
			}
		</div>
	)
}
