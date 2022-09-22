import React from 'react'
import { useHistory } from 'react-router-dom'
import MyButton from './UI/button/MyButton'

export default function PostItem({ post, num, remove }) {
	const router = useHistory();
	return (
		<div className="post">
			<div className="post-content">
				<span><strong>{num}.</strong> {post.title}</span>
				<p>{post.body}</p>
			</div>
			<MyButton onClick={() => router.push(`/posts/${post.id}`)}>Открыть</MyButton>
			<MyButton onClick={() => remove(post)}>Удалить</MyButton>
		</div>
	)
}
