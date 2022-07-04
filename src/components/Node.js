import { useState, useEffect } from "react"

export default function Node({ x, y, isMouseDown, obstacleSelected }) {
  //Styles
  const defaultStyles = 'w-6 h-6 outline outline-1 bg-gray-100 m-0.5 rounded '
  const selfItem = document.getElementById(`${x},${y}`)
  
  const clickHandler = () => {
    console.log('clicked', x, y)
  }
  
  const mouseOverHandler = (e) => {
    console.log(isMouseDown)
    console.log(x,y)
  }
  
  useEffect(() => {
    console.log(selfItem)
    
  }, [])
  
  
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