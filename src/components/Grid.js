import { useEffect, useState } from 'react'
import Node from './Node'


function Grid( { isAlgoRunning, toggleAlgoState, gridSize, startNode, endNode, boardReload } ) {

    const [gridMatrix, setGridMatrix] = useState([])
    const [nodeMatrix, setNodeMatrix] = useState([])

    const [widthArray, setWidthArray] = useState()
    const [heightArray, setHeightArray] = useState()

    const [typeOption, setTypeOption] = useState('wall')
    const [nodePath, setNodePath] = useState([])

    const [activeN1, setActiveN1] = useState(startNode)
    const [activeN2, setActiveN2] = useState(endNode)

    const [isMouseDown, setIsMouseDown] = useState(false)


    const grid = document.getElementById('grid')
    

    const startSyles =    'w-6 h-6 outline outline-1 bg-green-400 m-0.5 start'
    const finishStyles =  'w-6 h-6 outline outline-1 bg-red-500 m-0.5 finish'
    const visitedStyles = 'w-6 h-6 outline outline-1 bg-blue-500 m-0.5'
    const pathStyles = 'w-6 h-6 outline outline-1 bg-yellow-500 m-0.5'

    const blockedStyles = 'w-6 h-6 outline outline-1 bg-gray-100 m-0.5'
    const defaultStyles = 'w-6 h-6 outline outline-1 bg-gray-100 m-0.5 rounded'

    const generateGrid = () => {
        const gridMatrix = []
        const nodeMatrix = []
        for (let y = 0;y<gridSize.height; y++) {
          const gridArray = []
          const nodeArray = []
          for ( let x = 0;x<gridSize.width;x++){
            gridArray.push(x)
            nodeArray.push({
                x,y,
                distance: Infinity,
                isVisited: false,
                isStart: false,
                isFinish:false,
                isWall:false,
            })
          }
          gridMatrix.push(gridArray)
          nodeMatrix.push(nodeArray)
        }
        setGridMatrix(gridMatrix)
        setNodeMatrix(nodeMatrix)
    }

    const generateAxisMarkers = () => {
        const widthArray = []
        const heightArray = []
        for (let i=0;i < gridSize?.width; i++){widthArray.push(i)}
        for (let i=0;i < gridSize?.height; i++){heightArray.push(i)}
        console.log(widthArray, heightArray)
        setWidthArray(widthArray)
        setHeightArray(heightArray)
    }

    const dijkstrasAlgo = (startNode, endNode, nodeMatrix ) => {
        nodeMatrix[startNode.y][startNode.x] = startNode
        nodeMatrix[endNode.y][endNode.x] = endNode
        const unvisitedNodes = Object.values(nodeMatrix).flat() //here
        const visitedNodes = [];
        while (!!unvisitedNodes.length && isAlgoRunning){
            sortNodesByDistance(unvisitedNodes)
            const workingNode = unvisitedNodes.shift()
            if (workingNode.isWall) continue;
            if (workingNode.distance === Infinity) {console.log('error');return 0;}
            workingNode.isVisited = true
            visitedNodes.push(workingNode)
            if(workingNode.isFinish) {setNodePath(visitedNodes);generateGrid(); return visitedNodes}
            updateNeighbors(workingNode)
        }
    }

    const updateNeighbors = (node) => {
        const neighbors = getUnvisitedNeighbors(node)
        for (const neighbor of neighbors) {
            neighbor.distance = node.distance +1
            neighbor.previousNode = node;
        }
    }

    function sortNodesByDistance(unvisitedNodes) {
        unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
    }

    const getUnvisitedNeighbors = (node, grid=nodeMatrix) => {
        const neighbors = [];
        const { x, y } = node;
        if (nodeMatrix?.[y][x-1]) neighbors.push(nodeMatrix[y][x-1])  //West
        if (nodeMatrix?.[y+1]?.[x]) neighbors.push(nodeMatrix[y+1][x])  //South
        if (nodeMatrix?.[y-1]?.[x-1]) neighbors.push(nodeMatrix[y-1][x])  //North
        if (nodeMatrix?.[y]?.[x+1]) neighbors.push(nodeMatrix[y][x+1])  //East
        return neighbors.filter((node) => !node.isVisited)
    }

    const animateNodes = (arrayOfNodes) => {
        for (let i=0; i < arrayOfNodes.length; i++ ){
            setTimeout(() => {
                const node = arrayOfNodes[i]
                if (isAlgoRunning && !(node.isStart || node.isFinish)) {
                    const domNode = document.getElementById(`${node.x},${node.y}`);
                    domNode.className = visitedStyles
                }
            }, 10*i)
            if (i === arrayOfNodes.length-1) {animateShortestPath(arrayOfNodes[arrayOfNodes.length-1], arrayOfNodes.length )}
        }
        return arrayOfNodes[arrayOfNodes.length -1]
    }

    function animateShortestPath(finalNode, totalSteps ) {
        let shortestPath = getShortestNodePath(finalNode)
        for (const index in shortestPath){
            setTimeout(() => {
                let node = shortestPath[index]
                const domNode = document.getElementById(`${node.x},${node.y}`);
                domNode.className = pathStyles;
            }, (index * 25) + ((totalSteps*11) + 350))
        }
    }

    const getShortestNodePath = (node) => {
        const orderedNodes = []
        let currentNode = node
        while (currentNode.previousNode) {
            orderedNodes.unshift({'x':currentNode.x, 'y':currentNode.y })
            currentNode = currentNode.previousNode;
        }
        return orderedNodes
    }

    const updateNodeInterface = (activeNode, newNode, styles) => {
        const k1 = document.getElementById(`${activeNode.x},${activeNode.y}`)
        const k2 = document.getElementById(`${newNode.x},${newNode.y}`)
        if(k1) {k1.className = defaultStyles}
        if(k2) {k2.className = styles;}
        newNode.isStart ? setActiveN1(newNode) : setActiveN2(newNode);
    }

    const mouseDownHandler = () => setIsMouseDown(true)
    const mouseUpHandler = () => setIsMouseDown(false)

    const updateNode = (prevNode, newNode, type=typeOption) => {
        setNodeMatrix(nodeMatrix => {
        })
    }

    const clearBoard = (nodes) => {
        nodes.forEach(node => {
            document.getElementById(`${node.x},${node.y}`).className = (defaultStyles)
        });
        setNodePath([])
    }

    //On page load
    useEffect(() => {
        updateNodeInterface(activeN1, startNode, startSyles)
        updateNodeInterface(activeN2, endNode, finishStyles)
        generateAxisMarkers()
    }, [])

    useEffect(() => {
        generateGrid()
        generateAxisMarkers()
    }, [gridSize])

    useEffect(() => {
        if (isAlgoRunning){
            animateNodes(dijkstrasAlgo(activeN1, activeN2, nodeMatrix))
            updateNodeInterface(activeN1, startNode, startSyles)
            updateNodeInterface(activeN2, endNode, finishStyles)
            toggleAlgoState()
        }
    }, [isAlgoRunning]);

    useEffect(() => {
        updateNodeInterface(activeN1, startNode, startSyles)
        updateNodeInterface(activeN2, endNode, finishStyles)
    }, [startNode, endNode, nodePath ]);

    useEffect(() => {
        clearBoard(nodePath)
    }, [boardReload]);

    return (
        <div id='grid' className='flex w-screen ml-4' onMouseDown={mouseDownHandler} onMouseUp={mouseUpHandler} >
            <div> <div className='mt-8 pt-0.5 text-right mr-1'>{heightArray?.map((index)=> {return(<div className='h-7 '>{index}</div>)})}</div> </div>
            <div> <div className='flex ml-2 mt-2'>{widthArray?.map((index) => {return <div className='w-7'>{index}</div>})}</div>
            <div></div>{gridMatrix.map((row, y) => {
                return (
                    <div key={y} className='flex' id={y}> {(row.map((x)=> {
                    return (
                      <Node
                        key={[x, y]}
                        x={x}
                        y={y}

                        isMouseDown={isMouseDown}

                      />
                    )
                }))}
                </div>)
            })
        }</div>
    </div>
  )
}

export default Grid
