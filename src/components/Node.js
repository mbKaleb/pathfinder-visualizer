import { useState, useEffect } from "react"

export default function Node({ x, y }) {
  //Styles
  const defaultStyles = 'w-6 h-6 outline outline-1 bg-gray-100 m-0.5 rounded'

  const clickHandler = () => {
    console.log('clicked', x, y)
  }

  return (
    <div
      className={defaultStyles}
      id={[x,y]}
      onClick={clickHandler}
    >
    </div>
  )
}