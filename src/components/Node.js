import { defaultTheme } from '../settings/themes';

export default function Node({
    node,
    isMouseDown,
    nodeMatrix,
    setItemClicked,
    itemClicked,
}) {
    const selfItem = document.getElementById(`${node.x},${node.y}`);

    const clickHandler = (e) => {
        e.preventDefault();
        switch (lastItemClicked(node)) {
            case 'wall':
                changeThisNodeTo('empty');
                break;
            case 'start':
                console.log('seccond');
                break;
            case 'finish':
                console.log('third');
                break;
            case 'empty':
                changeThisNodeTo('wall');
                break;
            default:
                console.log('error/default');
                break;
        }
    };

    const isNodeEmpty = (node = { node }) => {
        if (node.isWall || node.isStart || node.isVisited || node.isFinish) {
            return false;
        } else {
            return true;
        }
    };

    const lastItemClicked = (node) => {
        if (node.isWall) {
            setItemClicked('wall');
            return 'wall';
        } else if (node.isStart) {
            setItemClicked('start');
            return 'start';
        } else if (node.isFinish) {
            setItemClicked('finish');
            return 'finish';
        } else setItemClicked('empty');
        return 'empty';
    };

    const changeThisNodeTo = (type) => {
        switch (type) {
            case 'wall': {
                selfItem.className = defaultTheme.wall;
                nodeMatrix[node.y][node.x].isWall = true;
                nodeMatrix[node.y][node.x].distance = Infinity;
                break;
            }
            case 'empty': {
                selfItem.className = defaultTheme.empty;
                nodeMatrix[node.y][node.x].isWall = false;
                nodeMatrix[node.y][node.x].distance = Infinity;
                break;
            }
            case 'start': {
                break;
            }
            case 'finish': {
                break;
            }
            default:
                return;
        }
    };

    const mouseOverHandler = () => {
        switch (itemClicked) {
            case 'empty': {
                if (isMouseDown && isNodeEmpty(node)) {
                    changeThisNodeTo('wall');
                }
                break;
            }
            case 'wall': {
                if (isMouseDown && node.isWall) {
                    changeThisNodeTo('empty');
                }
                break;
            }
            default:
                return;
        }
    };

    return (
        <div
            className={defaultTheme.empty}
            id={[node.x, node.y]}
            onMouseDown={clickHandler}
            // onMouseUp={mouseUpHandler}
            onMouseEnter={mouseOverHandler}
        >
            <div className={'grow pb-[100%]'}></div>{' '}
            {/*The percent is the aspect ratio ex 100 = 1:1, 75 = 4:3 */}
        </div>
    );
}
