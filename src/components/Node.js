import { useState, useEffect } from "react"

export default function Node({ x, y }) {

  const [isStart, setIsStart] = useState(false)
  const [isFinish, setIsFinish] = useState(false)

  const [isVisited, setIsVisited] = useState(false)
  const [isBlocked, setIsBlocked] = useState(false)

  //Styles
  const startSyles =    'w-6 h-6 outline outline-1 bg-green-400 m-0.5 start'
  const finishStyles =  'w-6 h-6 outline outline-1 bg-red-500 m-0.5 finish'
  const visitedStyles = 'w-6 h-6 outline outline-1 bg-blue-300 m-0.5'
  const blockedStyles = 'w-6 h-6 outline outline-1 bg-gray-100 m-0.5'
  const defaultStyles = 'w-6 h-6 outline outline-1 bg-gray-100 m-0.5 rounded'

  const clickHandler = () => {
    // setIsStart(true)
    console.log('clicked', x, y)
  }

  useEffect(() => {
    if((x === 1) && (y === 4) ){
      setIsStart(true)
    }
    if((x === 8) && (y === 4) ){
      setIsFinish(true)
    }
  }, [])

  return (
    <div 
      className={ isStart ? startSyles : isFinish ? finishStyles : isVisited ? visitedStyles : isBlocked ? blockedStyles : defaultStyles } 
      id={[x,y]}    
      onClick={clickHandler}
      type={ isStart ? 'start' : isFinish ? 'finish' : isVisited ? 'visited' : isBlocked ? 'wall' : 'none' }
    >
    </div>
  )
}