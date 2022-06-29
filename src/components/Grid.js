import { useEffect, useState } from 'react'
import Node from './Node'


function Grid( { isAlgoRunning } ) {

    const STARTNODE = '2,8'
    const FINISHNODE = '26,8'

    const [isRunning, setIsRunning] = useState(false)

    const visitedStyles = 'w-6 h-6 outline outline-1 bg-blue-500 m-0.5'

    const [gridMatrix, setGridMatrix] = useState([])

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
            return 0;
        }))
    }

    const generateGrid = () => {
        const gridMatrix = []
        for (let ax = 0; ax < 15; ax++) {
          const gridArray = []
          for ( let ay = 0; ay < 40;ay++){
            gridArray.push(ay)
          }
          gridMatrix.push(gridArray)
        }
        setGridMatrix(gridMatrix)
      }


    const dijkstrasAlgorithom = (startingNode) => {
        console.log(isRunning)
        console.log('begin search')

        const startNode = {
            'x': startingNode.split(',')[0],
            'y': startingNode.split(',')[1]
        };

        async function nodeExecution(nodeObject, previousNode={x:2, y:8} ) {

            let cNode = { ...nodeObject, previousNode:{...previousNode}}
            
            let currentDomElement = document.getElementById(`${cNode.x},${cNode.y}`)
                let cElementType = document.getElementById(`${cNode.x},${cNode.y}`)?.getAttribute('type');
            let rightNode = {x: (parseInt(cNode.x) +1).toString(), y: cNode.y};
                let domRight = document.getElementById(`${rightNode.x},${rightNode.y}`)?.getAttribute('type');
            let leftNode = {x: (parseInt(cNode.x) -1).toString(), y: cNode.y};
                let domLeft = document.getElementById(`${leftNode.x},${leftNode.y}`)?.getAttribute('type');
            let topNode = {x: cNode.x, y: (parseInt(cNode.y) -1).toString()};
                let domTop = document.getElementById(`${topNode.x},${topNode.y}`)?.getAttribute('type');
            let bottomNode = {x: cNode.x, y: (parseInt(cNode.y) +1).toString()};
                let domBottom = document.getElementById(`${bottomNode.x},${bottomNode.y}`)?.getAttribute('type');
                setIsRunning(true)
                
            if ( (!!(cElementType === 'start') && (isRunning)) ) {
                 if (domRight === 'none') { setTimeout(() => {nodeExecution(rightNode, cNode)}, 1000) };
                if (domLeft === 'none') { setTimeout(() => {nodeExecution(leftNode, cNode)}, 1000) };
                if (domTop === 'none' ) { setTimeout(() => {nodeExecution(topNode, cNode)}, 1000) };
                if (domBottom === 'none') { setTimeout(() => {nodeExecution(bottomNode, cNode)}, 1000) };
                setIsRunning(false)
            } else if ( (!!(cElementType === 'none') && (isRunning)) ) {
                console.log((!!(cElementType === 'start') && (isRunning)))
                console.log((!!(cElementType === 'none') && (isRunning)))
                if (domRight === 'none') { setTimeout(() => {nodeExecution(rightNode, cNode)}, 1000) };
                if (domLeft === 'none') { setTimeout(() => {nodeExecution(leftNode, cNode)}, 1000) };
                if (domTop === 'none' ) { setTimeout(() => {nodeExecution(topNode, cNode)}, 1000) };
                if (domBottom === 'none') { setTimeout(() => {nodeExecution(bottomNode, cNode)}, 1000) };
                currentDomElement.className = visitedStyles;
                currentDomElement.setAttribute('type', 'visited')
            } else if (cElementType === 'finish') {
                setIsRunning(false)
                //first, stop iteration
                //then read all of the previous steps
            }
        }
        nodeExecution(startNode)
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


    useEffect(() => {
        if(!gridMatrix[0]){ generateGrid() }
       
        if (!distanceMap){ buildMap() }

        if (isAlgoRunning){ dijkstrasAlgorithom('2,8') }
        
    }, [gridMatrix, distanceMap, isAlgoRunning])

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
