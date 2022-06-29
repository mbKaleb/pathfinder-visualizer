import './App.css'
import { useEffect } from 'react';
import Grid from './components/Grid';
import { useState } from 'react';

export default function App() {

  const [isAlgoRunning, setIsAlgoRunning] = useState(false)

  const toggleAlgo = (e) => {
    setIsAlgoRunning(!isAlgoRunning)
    console.log('toggled')
  }

  const STOP = (e) => {
    e.stopPropagation()
    setIsAlgoRunning(false)
    console.log('STOP')
    console.log(isAlgoRunning)
  }


  useEffect(() => {
  }, [])

  return (
    <div className="App outline bg-white">

      <Grid isAlgoRunning={isAlgoRunning}/>

      <button className='outline w-64 h-16' onClick={toggleAlgo} > Click to Start! </button>
      
      <button className='outline w-64 h-16' onClick={STOP} > Click to Stop! </button>
    </div>
  );
}