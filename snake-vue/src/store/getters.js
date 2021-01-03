const getters = {
    allDirections(state) {
        return state.snake.params.directions;
    },
    baseZone(state) {
        return state.snake.baseZone;
    },
    blockSize(state) {
        const { width, height } = state.scene.params;

        return {
            width: `calc(${100 / width}%)`,
            height: `calc(${100 / height}%)`,
        };
    },
    currentDirection(state) {
        return state.snake.params.currentDirection;
    },
    envObjects(state) {
        return state.scene.enviromentObjects;
    },
    foodObjects(state) {
        return state.scene.foodObjects;
    },
    currentSpeed(state) {
        return state.gameParams.currentSpeed;
    },
    defaultSpeed(state) {
        return state.gameParams.defaultSpeed;
    },
    sceneGrid(state) {
        const { width, height } = state.scene.params;

        return {
            width,
            height,
        };
    },
    sceneParams(state) {
        return state.scene.params;
    },
    snakeBlocks(state) {
        return state.snake.bodyCoords;
    },
    snakeHead(state) {
        return state.snake.headCoords;
    },
    snakeCurrentLength(state) {
        return state.snake.params.currentLength;
    },
    snakeDefaultLength(state) {
        return state.snake.params.defaultLength;
    },
    snakeParams(state) {
        return state.snake.params;
    },
    isSnakeMoving(state) {
        return state.snake.isMoving;
    },
    gameParams(state) {
        return state.gameParams;
    },
};

export default getters;
