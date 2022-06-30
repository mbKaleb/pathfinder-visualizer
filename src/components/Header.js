import { useState } from "react"

export default function Header({ startAlgoHandler, setGridSize }) {

    const [selectedOptions, setSelectedOptions] = useState('Dijkstras Algorithom')

    const [inputStore, setInputStore] = useState({
        gridWidth:9,
        gridHeight:9
    })

    const optionHandler = (e) => console.log(e.target.value)
    const startAlgoButtonHandler = () => startAlgoHandler()


    const stopAlgoButtonHandler = () => {

    }

    const clearBoardHandler = () => {

    }

    const inputHandler = (e) => {
        const { name, value } = e.target;
        if (value < 4) {return}
        setInputStore(inputStore => ({...inputStore, [name]: value}))
    };
    const updateGrid = () => setGridSize({width:inputStore.gridWidth,height:inputStore.gridHeight})

  return (
    <div className="flex outline outline-1 h-fit">
        <div className="border m-1 bg-gray-200 m-2 p-2 rounded">
            <div className="border-b bg-white pl-3">Algorithom Controls</div>
            <select className="outline outline-1 rouned p-1 h-fit" onChange={optionHandler} >
                <option>Dijkstras Algorithom</option>
            </select>
            <button className="START BUTTON outline outline-1 rounded p-1 m-2 h-fit bg-white" onClick={startAlgoButtonHandler} >Begin Simulation</button>
            <button className="CLEAR BUTTON outline outline-1 rounded p-1 m-2 h-fit bg-white" onClick={clearBoardHandler} >Stop Simulation</button>
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
                        onChange={inputHandler}
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
                        onChange={inputHandler}
                        />
                </div>
                <button className="outline outline-1 rounded-sm bg-white m-1 px-2" onClick={updateGrid}>Apply</button>
            </div>
            <div className="bg-gray-100 border">
                <label className="bg-gray-100 ml-0.5">Min-Width is 4, Min-Height is 4</label>
            </div>
        </div>
    </div>
  )
}
