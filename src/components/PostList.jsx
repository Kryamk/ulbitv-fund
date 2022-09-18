import React from 'react'
import PostItem from './PostItem'

export default function PostList({ posts, title, postRemove }) {



	return (
		<div>
			<h1>{title}</h1>
			{posts.map((post, index) => (
				<PostItem num={index + 1} post={post} postRemove={postRemove} key={post.id} />
			))}
		</div>
	)
}
