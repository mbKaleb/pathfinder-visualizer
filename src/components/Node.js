import { useState, useEffect } from "react"

export default function Node({ x, y, isMouseDown, obstacleSelected, nodeMatrix }) {
  //Styles
  const defaultStyles = 'w-6 h-6 outline outline-1 bg-gray-100 m-0.5 rounded'
  const blockedStyles = 'w-6 h-6 outline outline-1 bg-gray-500 m-0.5'

  const selfItem = document.getElementById(`${x},${y}`)

  const clickHandler = () => {
    selfItem.className = blockedStyles
    nodeMatrix[y][x].isWall = true
    
  }

  const mouseOverHandler = (e) => {
    if ( isMouseDown && !obstacleSelected ) {
      selfItem.className = blockedStyles
      nodeMatrix[y][x].isWall = true
      nodeMatrix[y][x].distance = Infinity
    }
  }

  return (
    <div
      className={defaultStyles}
      id={[x,y]}
      onClick={clickHandler}
      onMouseEnter={mouseOverHandler}
    >
    </div>
  )
}