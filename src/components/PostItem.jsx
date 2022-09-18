import React from 'react'
import MyButton from './UI/button/MyButton'

export default function PostItem({ post, num, remove }) {
	return (
		<div className="post">
			<div className="post-content">
				<span><strong>{num}.</strong> {post.title}</span>
				<p>{post.body}</p>
			</div>
			<MyButton onClick={() => remove(post)}>Удалить</MyButton>
		</div>
	)
}
