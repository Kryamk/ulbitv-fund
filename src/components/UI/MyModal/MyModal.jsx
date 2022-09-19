import React from 'react'
import cl from './MyModal.module.css'

export default function MyModal({children, visible, setVisible}) {
	let rootClasses = [ cl.myModal ];
	// console.log('---',visible);
	// console.log('---',rootClasses); // всегда без active ???
	if (visible) {
		rootClasses.push(cl.active)
	}
	// else {
	// 	rootClasses = rootClasses.filter(item=> item !== cl.active)
	// }

  return (
	<div className={rootClasses.join(' ')} onClick={()=>setVisible(false)}>
		<div className={cl.myModalContent} onClick={(e)=>e.stopPropagation()}>
			{children}
		</div>
	</div>
  )
}
