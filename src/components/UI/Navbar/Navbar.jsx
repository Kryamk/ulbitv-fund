import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
	return (
		<div className="navbar">
			<Link className='navbar__links' to="/about">О сайте</Link>
			<Link className='navbar__links' to="/posts">Посты</Link>
		</div>
	)
}
