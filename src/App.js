import './App.css'
import Grid from './components/Grid';
import { useState } from 'react';
import Header from './components/Header';

export default function App() {

  const [isAlgoRunning, setIsAlgoRunning] = useState(false)
  const [gridSize, setGridSize] = useState({
    width:9,
    height:9
  })

  const startAlgoHandler = (e) => {
    setIsAlgoRunning(true)
  }

  const stopAlgoHandler = (e) => {
    setIsAlgoRunning(false)
  }


  return (
    <div className="App outline bg-white">
      <Header startAlgoHandler={startAlgoHandler} stopAlgoHandler={stopAlgoHandler} setGridSize={setGridSize}/>

      <Grid isAlgoRunning={isAlgoRunning} gridSize={gridSize}/>
    </div>
  );
}