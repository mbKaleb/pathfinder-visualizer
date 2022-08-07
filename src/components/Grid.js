/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Node from './Node';
import { defaultTheme } from '../settings/themes';

export default function Grid({
    isAlgoRunning,
    toggleAlgoState,
    gridSize,
    startNode,
    endNode,
    boardReload,
    obstacleReload,
}) {
    const [nodeGrid, setNodeGrid] = useState([]);

    const [activeN1, setActiveN1] = useState(startNode);
    const [activeN2, setActiveN2] = useState(endNode);

    const [isMouseDown, setIsMouseDown] = useState(false);
    const [itemClicked, setItemClicked] = useState('empty');

    const [obstacleSelected, setObstacleSelected] = useState('wall');

    const mouseDownHandler = () => setIsMouseDown(true);
    const mouseUpHandler = () => setIsMouseDown(false);

    const defaultNode = {
        x: null,
        y: null,
        distance: Infinity,
        isVisited: false,
        isStart: false,
        isFinish: false,
        isWall: false,
    };

    const generateEmptyNodeMap = () => {
        const nodeGrix = [];
        for (let y = 0; y < gridSize.height; y++) {
            const nodeArray = [];
            for (let x = 0; x < gridSize.width; x++) {
                nodeArray.push({
                    x,
                    y,
                    distance: Infinity,
                    isVisited: false,
                    isStart: false,
                    isFinish: false,
                    isWall: false,
                });
            }
            nodeGrix.push(nodeArray);
        }
        setNodeGrid(nodeGrix);
    };

    const dijkstrasAlgo = (startNode, endNode, nodeMatrix) => {
        nodeMatrix[startNode.y][startNode.x] = startNode;
        nodeMatrix[endNode.y][endNode.x] = endNode;
        const unvisitedNodes = Object.values(nodeMatrix).flat();
        const visitedNodes = [];
        while (!!unvisitedNodes.length && isAlgoRunning) {
            sortNodesByDistance(unvisitedNodes);
            const workingNode = unvisitedNodes.shift();
            if (workingNode.isWall) continue;
            if (workingNode.distance === Infinity) {
                console.log('error');
                return visitedNodes;
            }
            workingNode.isVisited = true;
            visitedNodes.push(workingNode);
            if (workingNode.isFinish && isAlgoRunning) {
                return visitedNodes;
            }
            if (isAlgoRunning) updateNeighbors(workingNode);
        }
    };

    const updateNeighbors = (node) => {
        const neighbors = getUnvisitedNeighbors(node);
        for (const neighbor of neighbors) {
            neighbor.distance = node.distance + 1;
            neighbor.previousNode = node;
        }
    };

    function sortNodesByDistance(unvisitedNodes) {
        unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
    }

    const getUnvisitedNeighbors = (node, grid = nodeGrid) => {
        const neighbors = [];
        const { x, y } = node;
        if (nodeGrid?.[y][x - 1]) neighbors.push(nodeGrid[y][x - 1]); //West
        if (nodeGrid?.[y + 1]?.[x]) neighbors.push(nodeGrid[y + 1][x]); //South
        if (nodeGrid?.[y - 1]?.[x - 1]) neighbors.push(nodeGrid[y - 1][x]); //North
        if (nodeGrid?.[y]?.[x + 1]) neighbors.push(nodeGrid[y][x + 1]); //East
        return neighbors.filter((workingNode) => !workingNode.isVisited);
    };

    const animateNodes = (arrayOfNodes) => {
        for (let i = 0; i < arrayOfNodes.length; i++) {
            if (isAlgoRunning) {
                setTimeout(() => {
                    const node = arrayOfNodes[i];
                    if (isAlgoRunning && !(node.isStart || node.isFinish)) {
                        const domNode = document.getElementById(
                            `${node.x},${node.y}`
                        );
                        domNode.className = defaultTheme.visited;
                    }
                }, 10 * i);
                if (i === arrayOfNodes.length - 1) {
                    animateShortestPath(
                        arrayOfNodes[arrayOfNodes.length - 1],
                        arrayOfNodes.length
                    );
                }
            }
        }
        return arrayOfNodes[arrayOfNodes.length - 1];
    };

    function animateShortestPath(finalNode, totalSteps) {
        if (isAlgoRunning && finalNode.isFinish) {
            let shortestPath = getShortestNodePath(finalNode);
            for (const index in shortestPath) {
                setTimeout(() => {
                    let node = shortestPath[index];
                    if (!node.isFinish) {
                        const domNode = document.getElementById(
                            `${node.x},${node.y}`
                        );
                        domNode.className = defaultTheme.path;
                    }
                }, index * 25 + (totalSteps * 11 + 350));
            }
        }
    }

    const getShortestNodePath = (node) => {
        const orderedNodes = [];
        let currentNode = { ...node };
        while (currentNode.previousNode) {
            orderedNodes.unshift(currentNode);
            currentNode = currentNode.previousNode;
        }
        return orderedNodes;
    };

    const updateNodeInterface = (prevNode, nextNode, newStyle) => {
        const oldNodeElement = document.getElementById(
            `${prevNode.x},${prevNode.y}`
        );
        const newNodeElement = document.getElementById(
            `${nextNode.x},${nextNode.y}`
        );

        if (nodeGrid?.[prevNode.y]?.[prevNode.x])
            nodeGrid[prevNode.y][prevNode.x] = {
                ...defaultNode,
                y: prevNode.y,
                x: prevNode.x,
            };

        if (oldNodeElement) {
            oldNodeElement.className = defaultTheme.empty;
        }
        if (newNodeElement) {
            newNodeElement.className = newStyle;
        }

        nextNode.isStart ? setActiveN1(nextNode) : setActiveN2(nextNode);
    };

    const unvisitAllNodes = () => {
        nodeGrid.map((row) => {
            row.map((node) => {
                node.previousNode = {};
                node.isVisited = false;
                node.distance = Infinity;
                //Alter styles for Visited nodes which are not walls
                if (!(node.isFinish || node.isStart || node.isWall)) {
                    let nodeElement = document.getElementById(
                        `${node.x},${node.y}`
                    );
                    nodeElement.className = defaultTheme.empty;
                }
                if (node.isStart) node.distance = 0;
                if (node.isWall) node.isWall = true;
            });
        });
        updateNodeInterface(activeN1, startNode, defaultTheme.start);
        updateNodeInterface(activeN2, endNode, defaultTheme.finish);
    };

    const removeAllObstacles = () => {
        nodeGrid.map((row) => {
            row.map((node) => {
                if (node.isWall) {
                    let nodeElement = document.getElementById(
                        `${node.x},${node.y}`
                    );
                    nodeElement.className = defaultTheme.empty;
                    node.isWall = false;
                }
            });
        });
    };

    const clearNodeMap = () => {
        generateEmptyNodeMap();
        nodeGrid.map((row) => {
            row.map((node) => {
                const nodeElement = document?.getElementById(
                    `${node.x},${node.y}`
                );
                nodeElement.className = defaultTheme.empty;
            });
        });
        updateNodeInterface(activeN1, startNode, defaultTheme.start);
        updateNodeInterface(activeN2, endNode, defaultTheme.finish);
    };

    //On page load
    useEffect(() => {
        generateEmptyNodeMap();
    }, []);

    //When we change the grid size, update the display and default values
    useEffect(() => {
        generateEmptyNodeMap();
        clearNodeMap();
    }, [gridSize]);

    useEffect(() => {
        if (isAlgoRunning) {
            unvisitAllNodes();
            animateNodes(dijkstrasAlgo(activeN1, activeN2, nodeGrid));
            toggleAlgoState();
        }
    }, [isAlgoRunning]);

    useEffect(() => {
        updateNodeInterface(activeN1, startNode, defaultTheme.start);
        updateNodeInterface(activeN2, endNode, defaultTheme.finish);
        clearNodeMap();
    }, [startNode, endNode, gridSize]);

    useEffect(() => {
        unvisitAllNodes();
    }, [boardReload]);

    useEffect(() => {
        removeAllObstacles();
    }, [obstacleReload]);

    // {return <div className='w-2 grow text-center text-[.7vw]'>{index}</div>}

    return (
        <div
            id="grid"
            className="flex w-full "
            onMouseDown={mouseDownHandler}
            onMouseUp={mouseUpHandler}
        >
            <div className="grow ">
                {' '}
                <div className="flex grow mt-2 mr-2">
                    <div className="w-[1vw] mx-[1vw]"></div>
                    {[...Array(gridSize.width)].map((_, index) => {
                        return (
                            <div
                                key={'width-array' + index}
                                className="w-2 grow text-center text-[.7vw]"
                            >
                                {index}
                            </div>
                        );
                    })}
                </div>
                <div></div>
                {nodeGrid.map((row, y) => {
                    return (
                        <div
                            key={'node-row:' + y}
                            className="flex grow mr-2"
                            id={y}
                        >
                            {' '}
                            <div className="w-[1vw] align-baseline text-center text-[.7vw] ml-[2vw] ">
                                {' '}
                                {y}{' '}
                            </div>{' '}
                            {row.map((node) => {
                                return (
                                    <Node
                                        key={[node.x, y]}
                                        node={node}
                                        isMouseDown={isMouseDown}
                                        nodeMatrix={nodeGrid}
                                        setItemClicked={setItemClicked}
                                        itemClicked={itemClicked}
                                        obstacleSelected={obstacleSelected}
                                    />
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
