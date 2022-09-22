import React from 'react'
import { Route, Switch } from 'react-router-dom'
import About from '../pages/About'
import Error from '../pages/Error'
import PostIdPage from '../pages/PostIdPage'
import Posts from '../pages/Posts'


export default function AppRouter() {
	return (
		<Switch>
			<Route path="/about"> <About /> </Route>
			<Route exact path="/posts"> <Posts /> </Route>
			<Route exact path="/posts/:id"> <PostIdPage /> </Route>
			<Route> <Error /> </Route>
			{/* <Redirect to="/posts" /> */}
		</Switch>
	)
}
