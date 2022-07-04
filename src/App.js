import './App.css'
import Grid from './components/Grid';
import { useState } from 'react';
import Header from './components/Header';

export default function App() {

  const [isAlgoRunning, setIsAlgoRunning] = useState(false)
  const [boardReload, setBoardReload] = useState(true)

  const [gridSize, setGridSize] = useState({ width:32, height:16 })
  const [N1, setN1] = useState({ x:3, y:8, isStart:true, distance:0 })
  const [N2, setN2] = useState({ x:12, y:8, isFinish:true, distance:Infinity })

  const startAlgoHandler = () => setIsAlgoRunning(true)
  const toggleAlgoState = () => setIsAlgoRunning(!isAlgoRunning)
  const boardReloadHandler = () => setBoardReload(!boardReload)

  return (
    <div className="App bg-white">
      <Header startAlgoHandler={startAlgoHandler} setGridSize={setGridSize} gridSize={gridSize} setN1={setN1} setN2={setN2} boardReloadHandler={boardReloadHandler}/>
      <Grid isAlgoRunning={isAlgoRunning} toggleAlgoState={toggleAlgoState} gridSize={gridSize} startNode={N1} endNode={N2} boardReload={boardReload}/>
    </div>
  );
}