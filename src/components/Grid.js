import { useEffect, useState } from 'react'
import Node from './Node'


function Grid( { isAlgoRunning, gridSize, startNode, endNode } ) {

    const [gridMatrix, setGridMatrix] = useState([])
    const [nodeMatrix, setNodeMatrix] = useState([])

    const [activeN1, setActiveN1] = useState(startNode)

    const [activeN2, setActiveN2] = useState(endNode)

    const startSyles =    'w-6 h-6 outline outline-1 bg-green-400 m-0.5 start'
    const finishStyles =  'w-6 h-6 outline outline-1 bg-red-500 m-0.5 finish'
    const visitedStyles = 'w-6 h-6 outline outline-1 bg-blue-500 m-0.5'

    const blockedStyles = 'w-6 h-6 outline outline-1 bg-gray-100 m-0.5'
    const defaultStyles = 'w-6 h-6 outline outline-1 bg-gray-100 m-0.5 rounded'


    const generateGrid = () => {
        const gridMatrix = []
        const nodeMatrix = []
        for (let x = 0;x<gridSize.height; x++) {
          const gridArray = []
          const nodeArray = []
          for ( let y = 0;y<gridSize.width;y++){
            gridArray.push(y)
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

    const dijkstrasAlgo = (startNode, endNode, nodeMatrix ) => {
        nodeMatrix[startNode.x][startNode.y] = startNode
        nodeMatrix[endNode.x][endNode.y] = endNode
        const unvisitedNodes = Object.values(nodeMatrix).flat()
        const visitedNodes = [];
        while (!!unvisitedNodes.length && isAlgoRunning){
            sortNodesByDistance(unvisitedNodes)
            const workingNode = unvisitedNodes.shift()

            if (workingNode.isWall) continue;
            if (workingNode.distance === Infinity) {console.log('error');return 0;}
            
            workingNode.isVisited = true
            visitedNodes.push(workingNode)
            if(workingNode.isFinish) {console.log(visitedNodes); return visitedNodes}
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
        if (nodeMatrix?.[x-1]?.[y]) neighbors.push(nodeMatrix[x-1][y])  //West
        if (nodeMatrix?.[x]?.[y+1]) neighbors.push(nodeMatrix[x][y+1])  //South
        if (nodeMatrix?.[x]?.[y-1]) neighbors.push(nodeMatrix[x][y-1])  //North
        if (nodeMatrix?.[x+1]?.[y]) neighbors.push(nodeMatrix[x+1][y])  //East
        return neighbors.filter((node) => !node.isVisited)
    }

    const animateNodes = (arrayOfNodes) => {
        for (let i=0; i < arrayOfNodes.length; i++ ){
            setTimeout(() => {
                const node = arrayOfNodes[i]
                const domNode = document.getElementById(`${node.x},${node.y}`);
                domNode.className = visitedStyles
            }, 25*i)
        }
    }

    const updateNode = (activeNode, node, styles) => {
        const k1 = document.getElementById(`${activeNode.x},${activeNode.y}`)
        const k2 = document.getElementById(`${node.x},${node.y}`)
        if(k1) {k1.className = defaultStyles}
        if(k2) {k2.className = styles;}
        node.isStart ? setActiveN1(node) : setActiveN2(node);
    }

    const deleteMatrix = () => {
        setGridMatrix({})
    }

    const buttonHandler = () => {

        console.log(gridMatrix)
        generateGrid()
        console.log(gridMatrix)
        console.log(nodeMatrix)
    }


    //On page load
    
    useEffect(() => {
        generateGrid()
    }, [gridSize])


    useEffect(() => {
        if (isAlgoRunning) animateNodes(dijkstrasAlgo(startNode, endNode, nodeMatrix))
    }, [isAlgoRunning])

    useEffect(() => {
        updateNode(activeN1, startNode, startSyles)
    }, [startNode])

    useEffect(() => {
        updateNode(activeN2, endNode, finishStyles)
    }, [endNode])


    return (
        <div>
            {
            gridMatrix.map((row, index) => { 
                return (
                <div key={index} className='flex' id={index}> {(row.map((item)=> {
                    return (
                      <Node
                        key={[item, index]}
                        x={item}
                        y={index}

                      />
                    )
                    }))}
                </div>)
            })
            }
            <button className='outline' onClick={buttonHandler}>Clear</button>
    </div>
  )
}

export default Grid
