import React, { useContext } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { privateRoutes, publicRoutes } from '../router'
import { AuthContext } from '../context'
import Loader from './UI/Loader/Loader'

export default function AppRouter() {
	const { isAuth, isLoading } = useContext(AuthContext)
	if (isLoading) {
		return <Loader />
	}
	return (
		isAuth
			?
			<Switch>
				{privateRoutes.map(route =>
					<Route
						component={route.component}
						exact={route.exact}
						path={route.path}
						key={route.path} />
				)}
				<Redirect to="/posts" />
			</Switch>
			:
			<Switch>
				{publicRoutes.map(route =>
					<Route
						component={route.component}
						exact={route.exact}
						path={route.path}
						key={route.path} />
				)}
				<Redirect to="/login" />
			</Switch>
	)
}


/*
	<Route path="/about"> <About /> </Route>
	<Route exact path="/posts"> <Posts /> </Route>
	<Route exact path="/posts/:id"> <PostIdPage /> </Route>
	<Route> <Error /> </Route>
 */
