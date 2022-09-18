import React from 'react'

export default function PostItem({ post, num, postRemove }) {
	return (
		<div className="post">
			<div className="post-content">
				<span><strong>{num}.</strong> {post.title}</span>
				<p>{post.body}</p>
			</div>
			<button onClick={() => postRemove(post.id)}>Удалить</button>
		</div>
	)
}
