const mutations = {
    setBaseZoneObjects(state, baseZoneObjects) {
        state.snake.baseZone = baseZoneObjects;
    },
    setEnvObjects(state, envObjects) {
        state.scene.enviromentObjects = envObjects;
    },
    setFoodObjects(state, foodObjects) {
        state.scene.foodObjects = foodObjects;
    },
    setSnakeObjects(state, snakeObjects) {
        state.snake.bodyCoords = snakeObjects;
    },
    updateSnakeObjects(state, newSnakeObjects) {
        state.snake.bodyCoords.forEach((coord, index) => {
            coord.x = newSnakeObjects[index].x;
            coord.y = newSnakeObjects[index].y;
        });
    },
    setDefaultSpeed(state) {
        state.gameParams.currentSpeed = state.gameParams.defaultSpeed;
    },
    setSnakeMoving(state, status) {
        state.snake.isMoving = status;
    },
    addSnakeBlock(state, block) {
        const snakeBlocks = state.snake.bodyCoords;
        snakeBlocks.push(block);

        state.snake.bodyCoords = snakeBlocks;
    },
    setSnakeDirection(state, direction) {
        state.snake.params.currentDirection = direction;
    },
};

export default mutations;
