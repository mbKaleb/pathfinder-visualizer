import { useEffect, useState } from 'react'
import Node from './Node'


function Grid( { isAlgoRunning } ) {

    const STARTNODE = '1,4'
    const FINISHNODE = '8,4'

    const [isRunning, setIsRunning] = useState(false)

    const [gridMatrix, setGridMatrix] = useState([])
    const [nodeMatrix, setNodeMatrix] = useState([])

    const visitedStyles = 'w-6 h-6 outline outline-1 bg-blue-500 m-0.5'

    const nodeGrid = null;


    const distanceMap = {}
    const buildMap = () => {
        gridMatrix.map((row, y) => row.map((x) => {
            let workingNode = `${x},${y}`;
            let workingKey = distanceMap[calculateDistance(STARTNODE, workingNode)]
            let distance = calculateDistance(STARTNODE, workingNode)
            if (!workingKey) {
                Object.assign(distanceMap, { [distance]: [workingNode]});
            } else if (workingKey) {
                Object.assign(distanceMap, { [distance]: [...workingKey, workingNode]})
            }
        }))
    }
    

    const generateGrid = () => {
        const gridMatrix = []
        const nodeMatrix = []
        for (let x = 0; x < 9; x++) {
          const gridArray = []
          const nodeArray = []
          for ( let y = 0; y < 9;y++){
            gridArray.push(y)
            nodeArray.push({
                x,
                y,
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


    const dijkstrasAlgo = (grid = gridMatrix, startNode={x:1,y:4, previousNode:{}, isVisited:true, distance:0 }, endNode={x:8,y:4}) => {

        const unvisitedNodes = Object.values(distanceMap).flat()
        const visitedNodes = [];
        
        startNode.distance = 0;
        startNode.isStart = true;

        while (!!unvisitedNodes.length){
            const workingNode = {}
            let a = unvisitedNodes.shift()
            workingNode.x = a.split(',')[0]
            workingNode.y = a.split(',')[1]

            if( updateNeighbors(workingNode) )

            updateNeighbors(workingNode, gridMatrix)
            // workingNode.isVisited = true
        }
    }

    const updateNeighbors = (node) => {
        getUnvisitedNeighbors(node)

        // (x,y) ? console.log('valid') : console.log('errpr');
        (x,y) ? console.log(`${x},${y} `, nodeMatrix?.[x-1]?.[y]) : console.log('first');

    }

    const getUnvisitedNeighbors = (node, grid=nodeMatrix) => {
        const neighbors = [];
        const { x, y } = node;


    }


    const getClosestUnvisited = () => {

    }

    const calculateDistance = (node1, node2) => {

        let ax = node1.split(',')[0]
        let ay = node1.split(',')[1]

        let bx = node2.split(',')[0]
        let by = node2.split(',')[1]

        let c1 = (bx - ax) ** 2
        let c2 = (by - ay) ** 2

        let final = Math.sqrt(c1 + c2)

        return final
    }

    //On page load
    useEffect(() => {
        generateGrid()
    }, [])

    useEffect(() => {
        buildMap()
    }, [gridMatrix])

    useEffect(() => {
      dijkstrasAlgo()
    }, [distanceMap])
    useEffect(() => {
        getUnvisitedNeighbors({x:1,y:4, previousNode:{}})
    }, [dijkstrasAlgo])
    

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
    </div>
  )
}

export default Grid
