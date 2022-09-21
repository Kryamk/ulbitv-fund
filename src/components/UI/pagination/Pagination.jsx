import React from 'react'
import { getPageArray } from '../../../utils/pages'

export default function Pagination({totalPages,page,changePage}) {
	let pageArray = getPageArray(totalPages)
	return (
		<div className='page__wrapper ' style={{ marginTop: 30 }}>
			{pageArray.map(p => (
				<span className={page === p ? 'page page__current' : 'page'} onClick={() => changePage(p)} key={p}>{p}</span>
			))}
		</div>
	)
}
