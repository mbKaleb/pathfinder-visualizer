import { useState, useEffect } from "react"
import { defaultTheme } from "../settings/themes"

export default function Node({ node, isMouseDown, nodeMatrix, setItemClicked, itemClicked, obstacleSelected }) {
  
  const selfItem = document.getElementById(`${node.x},${node.y}`)

  const clickHandler = (e) => {
    e.preventDefault();
    (async () => {await itemClickHandler(node)})().then(mouseOverHandler(e));
    
  }

  const mouseUpHandler = (e) => {
    setItemClicked('empty')
  }

  const itemClickHandler = (node) => {
    if (node.isWall) {setItemClicked('wall')}
    else if (node.isStart) {setItemClicked('start')}
    else if (node.isFinish) {setItemClicked('finish')}
    else setItemClicked('empty')
  }

  const mouseOverHandler = (e) => {
    if ( isMouseDown && obstacleSelected === 'wall' && itemClicked === 'empty' ) {
      selfItem.className = defaultTheme.wall
      nodeMatrix[node.y][node.x].isWall = true
      nodeMatrix[node.y][node.x].distance = Infinity
    } else { console.log(isMouseDown) }
    console.log(itemClicked)
  }

  const mouseLeaveHandler = () => {
    
  }

  

  return (
    <div
      className={defaultTheme.empty + ' pointer-events-none'}
      id={[node.x,node.y]}
      onMouseDown={clickHandler}
      onMouseUp={mouseUpHandler}
      onMouseEnter={mouseOverHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <div className={'grow pb-[100%]'}></div> {/*The percent is the aspect ratio ex 100 = 1:1, 75 = 4:3 */}
    </div>
  )
}