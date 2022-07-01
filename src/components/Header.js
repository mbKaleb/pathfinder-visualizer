import { useState } from "react"

export default function Header({ startAlgoHandler, stopAlgoHandler, setGridSize, setN1, setN2 }) {

    const [selectedOptions, setSelectedOptions] = useState('Dijkstras Algorithom')

    const [inputStore, setInputStore] = useState({
        gridWidth:9,
        gridHeight:9
    })

    const [startNode, setStartNode] = useState({ x:2, y:4 })
    const [endNode, setEndNode] = useState({ x:8, y:4 })

    const optionHandler = (e) => console.log(e.target.value)
    const startAlgoButtonHandler = () => startAlgoHandler()


    const stopAlgoButtonHandler = () => stopAlgoHandler()

    const clearBoardHandler = () => { }

    const inputStoreHandler = (e) => {
        const { name, value } = e.target;
        if (value < 4 || value > 99) {return}
        setInputStore(inputStore => ({...inputStore, [name]: value}))
    };

    const startNodeHandler = (e) => {
        const { name, value } = e.target;
        if (value < 0) return;
        setStartNode(inputStore => ({...inputStore, [name]: parseInt(value)}))
    };

    const endNodeHandler = (e) => {
        const { name, value } = e.target;
        if (value < 0) return;
        setEndNode(inputStore => ({...inputStore, [name]: parseInt(value)}))
    };

    const updateGrid = () => setGridSize({width:inputStore.gridWidth,height:inputStore.gridHeight})

    const updateNodes = () => {
        setN1({...startNode, isStart:true, distance:0})
        setN2({...endNode, isFinish:true, distance:Infinity})
    }

  return (
    <div className="flex outline outline-1 h-fit w-screen">
        <div className="border m-1 bg-gray-200 m-2 p-2 rounded">
            <div className="border-b bg-white pl-3">Algorithom Controls</div>
            <select className="outline outline-1 rouned p-1 h-fit" onChange={optionHandler} >
                <option>Dijkstras Algorithom</option>
            </select>
            <button className="START BUTTON outline outline-1 rounded p-1 m-2 h-fit bg-white" onClick={startAlgoButtonHandler} >Begin Simulation</button>
            <button className="CLEAR BUTTON outline outline-1 rounded p-1 m-2 h-fit bg-white" onClick={stopAlgoButtonHandler} >Stop Simulation</button>
            <button className="CLEAR BUTTON outline outline-1 rounded p-1 m-2 h-fit bg-white" onClick={clearBoardHandler} >Clear Board</button>
        </div>
        <div className="bg-gray-200 rounded m-2 p-2">
            <div className="border-b bg-white px-2">Grid Controls</div>
            <div className="border bg-gray-200 rounded flex">
                <div className="bg-white border m-1 outline outline-1">
                    <label className="ml-2">Width:</label>
                    <input
                        className="w-12 pl-1"
                        type='number'
                        placeholder="Grid Width"
                        name='gridWidth'
                        value={inputStore.gridWidth}
                        onChange={inputStoreHandler}
                    />
                </div>
                <div className="bg-white border m-1 outline outline-1">
                    <label className="ml-2">Height:</label>
                    <input
                        className="w-12  pl-1"
                        type='number'
                        placeholder="Grid Height"
                        name='gridHeight'
                        value={inputStore.gridHeight}
                        onChange={inputStoreHandler}
                    />
                </div>
                <button className="outline outline-1 rounded-sm bg-white m-1 px-2" onClick={updateGrid}>Apply</button>
            </div>
            <div className="bg-gray-100 border">
                <label className="bg-gray-100 ml-0.5">Min-Value is 4, Max-Value is 99</label>
            </div>
        </div>
        <div className="bg-gray-200 rounded m-2 p-2">
            <div className="border-b bg-white px-2">Node Controls</div>
                <div className="border bg-gray-200 rounded w-fit">
                    <div className="bg-white border m-1 outline outline-2 outline-green-500 w-26">
                        <label className="ml-1 mr-2">Start: [x,y] </label>
                        <input
                            className="w-10 border text-right"
                            type='number'
                            placeholder="x"
                            name='x'
                            value={startNode.x}
                            onChange={startNodeHandler}
                        />
                        <input
                            className="w-10 border text-right"
                            type='number'
                            placeholder="y"
                            name='y'
                            value={startNode.y}
                            onChange={startNodeHandler}
                        />
                    </div>
                    <div className="bg-white border m-1 outline outline-2 outline-red-500">
                        <label className="ml-1 w-26">Finish: [x,y] </label>
                        <input
                            className="w-10 border text-right"
                            type='number'
                            placeholder="x"
                            name='x'
                            value={endNode.x}
                            onChange={endNodeHandler}
                        />
                        <input
                            className="w-10 border text-right"
                            type='number'
                            placeholder="y"
                            name='y'
                            value={endNode.y}
                            onChange={endNodeHandler}
                        />
                    </div>
                <button className="outline outline-1 rounded-sm bg-white m-1 px-2" onClick={updateNodes}>Apply</button>
            </div>
            
            <div className="bg-gray-100 border">
                {/* <label className="bg-gray-100 ml-0.5">Min-Width is 4, Min-Height is 4</label> */}
            </div>
        </div>
    </div>
  )
}
