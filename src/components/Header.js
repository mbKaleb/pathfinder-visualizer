import { useState } from "react"

export default function Header({ startAlgoHandler, setGridSize, gridSize, setN1, setN2, boardReloadHandler }) {

    const [selectedOptions, setSelectedOptions] = useState('Dijkstras Algorithom')

    const [inputStore, setInputStore] = useState({
        gridWidth:gridSize.width,
        gridHeight:gridSize.height
    })

    const [startNode, setStartNode] = useState({ x:3, y:8 })
    const [endNode, setEndNode] = useState({ x:12, y:8 })

    const optionHandler = (e) => console.log(e.target.value)
    const startAlgoButtonHandler = () => startAlgoHandler()

    const clearBoardHandler = () => {boardReloadHandler(); updateGrid()}

    const inputStoreHandler = (e) => {
        const { name, value } = e.target;
        if (value < 4 || value > 99) {return}
        setInputStore(inputStore => ({...inputStore, [name]: value}))
    };

    const startNodeHandler = (e) => {
        const { name, value } = e.target;
        if (value < 0) return
        setStartNode(inputStore => ({...inputStore, [name]: parseInt(value)}))
    };

    const endNodeHandler = (e) => {
        const { name, value } = e.target;
        if (value < 0) return
        setEndNode(inputStore => ({...inputStore, [name]: parseInt(value)}))
    };

    const updateGrid = () => setGridSize({width:inputStore.gridWidth,height:inputStore.gridHeight})

    const updateNodes = () => {
        setN1({...startNode, isStart:true, distance:0})
        setN2({...endNode, isFinish:true, distance:Infinity})
    }

  return (
    <div className="flex outline outline-1 h-fit ">
        <div className="border m-1 bg-gray-200 m-2 p-2 rounded">
            <div className="border-b bg-white pl-3">Algorithom Controls</div>
            <select className="outline outline-1 outline-gray-500 rouned p-1 h-fit w-full mt-2" onChange={optionHandler}>
                <option>Dijkstras Algorithom</option>
            </select>
            <button className="START BUTTON outline outline-1 outline-gray-500 rounded p-1 m-2 h-fit bg-white" onClick={startAlgoButtonHandler} >Start Simulation</button>
            <button className="CLEAR BUTTON outline outline-1 outline-gray-500 rounded p-1 m-2 h-fit bg-white" onClick={clearBoardHandler} >Clear</button>
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
            </div>
        </div>
        <div className="bg-gray-200 rounded m-2 p-2">
            <div className="border-b bg-white px-2">Obstacles</div>
                <div className="border bg-gray-200 rounded w-fit">
                    <select className="outline outline-1 outline-gray-500 rouned p-1 h-8 w-20 mt-2" onChange={optionHandler}>
                        <option>Wall</option>
                    </select>
                </div>
            <div className="bg-gray-100 border">
            </div>
        </div>
    </div>
  )
}
