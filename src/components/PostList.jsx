import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import PostItem from './PostItem'

export default function PostList({ posts, title, remove}) {

	if (!posts.length) {
		return (
			<h1 style={{ textAlign: 'center' }}>Посты не найдены</h1>
		)
	}

	return (
		<div>
			<h1>{title}</h1>

			<TransitionGroup>
				{posts.map((post, index) => (
					<CSSTransition classNames="post" timeout={500} key={post.id}>
						<PostItem num={post.id} post={post} remove={remove}  />
					</CSSTransition>
				))}
			</TransitionGroup>

		</div>
	)
}
