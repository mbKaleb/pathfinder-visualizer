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

  const [N1, setN1] = useState({ 
    x:2, y:4,
    isStart:true,
    distance:0
  })

  const [N2, setN2] = useState({
    x:8, y:4,
    isFinish:true,
    distance:Infinity
  })

  const startAlgoHandler = (e) => {
    setIsAlgoRunning(true);
  }

  const stopAlgoHandler = (e) => {
    setIsAlgoRunning(false);
  }


  return (
    <div className="App outline bg-white">
      <Header startAlgoHandler={startAlgoHandler} stopAlgoHandler={stopAlgoHandler} setGridSize={setGridSize} setN1={setN1} setN2={setN2} />

      <Grid isAlgoRunning={isAlgoRunning} gridSize={gridSize} startNode={N1} endNode={N2}/>
    </div>
  );
}