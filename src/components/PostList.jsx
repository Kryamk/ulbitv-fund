import React from 'react'
import PostItem from './PostItem'

export default function PostList({ posts, title, remove }) {



	return (
		<div>
			<h1>{title}</h1>
			{posts.map((post, index) => (
				<PostItem num={index + 1} post={post} remove={remove} key={post.id} />
			))}
		</div>
	)
}
