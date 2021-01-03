<template>
    <div
        class="app_container"
    >
        <div class="tool_panel">
            <div
                class="restart-button"
                @click="restart"
            >
                <span>Restart Game</span>
            </div>
        </div>
        <div class="app">
            <div class="app_scene">
                <EnvObj
                    v-for="envObj in envObjects"
                    :key="envObj"
                    :options="getBlockParams(envObj)"
                />
                <FoodObj
                    v-for="foodObj in foodObjects"
                    :key="foodObj"
                    :options="getBlockParams(foodObj)"
                />
                <SnakeBodyObj
                    v-for="(snakeObj, index) in snakeBlocks"
                    :key="snakeObj"
                    :options="getBlockParams(snakeObj)"
                    :speed="currentSpeed"
                    :is-head="(index === 0)"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import snakeApi from '../api/snakeApi';

import EnvObj from '../components/EnvObj';
import FoodObj from '../components/FoodObj.vue';
import SnakeBodyObj from '../components/SnakeBodyObj';

export default {
    name: 'GamePage',
    components: {
        EnvObj,
        FoodObj,
        SnakeBodyObj,
    },
    computed: {
        ...mapGetters([
            'allDirections',
            'baseZone',
            'blockSize',
            'currentDirection',
            'envObjects',
            'foodObjects',
            'currentSpeed',
            'defaultSpeed',
            'isSnakeMoving',
            'sceneGrid',
            'sceneParams',
            'snakeBlocks',
            'snakeHead',
            'snakeCurrentLength',
            'snakeDefaultLength',
            'snakeParams',
            'canMove',
        ]),
    },
    methods: {
        getBlockOffset(blockObj) {
            const { width, height } = this.sceneGrid;

            return {
                top: `calc(${(100 / height) * (blockObj.y - 1)}%)`,
                left: `calc(${(100 / width) * (blockObj.x - 1)}%)`,
            }
        },
        getBlockParams(blockObj) {
            const { width, height } = this.blockSize;
            const { top, left } = this.getBlockOffset(blockObj);

            return {
                width,
                height,
                top,
                left,
            };
        },
        checkIfCoordsExist(coords, repoToCheck) {
            return repoToCheck
                .some((coordsObj) => (coordsObj.x === coords.x && coordsObj.y === coords.y));
        },
        checkIfSnakeHeadExist() {
            return (this.snakeBlocks.length > 0);
        },
        createBlockCoords(options) {
            const self = this;

            const {
                isBaseZoneException,
                isSnakeException,
                isEnviromentException,
                isFoodException,
                repository,
            } = options;

            const { width, height } = this.sceneGrid;

            const randomCoords = snakeApi.getRandomDoubleCoord(1, width, 1, height);

            const disByBaseZone = isBaseZoneException
                && this.checkIfCoordsExist(randomCoords, self.baseZone);
            const disBySnake = isSnakeException
                && this.checkIfCoordsExist(randomCoords, self.snakeBlocks);
            const disByEnv = isEnviromentException
                && this.checkIfCoordsExist(randomCoords, self.envObjects);
            const disByFood = isFoodException
                && this.checkIfCoordsExist(randomCoords, self.foodObjects);

            const isValidRandomCoords = !disByBaseZone && !disBySnake && !disByEnv && !disByFood;

            if (isValidRandomCoords) {
                repository.push(randomCoords);

                return;
            }

            self.createBlockCoords(options);
        },
        fillBaseZone() {
            this.$store.dispatch('changeBaseZoneObjects', []);

            const self = this;
            const baseZone = [];

            for (let x = self.sceneParams.baseZoneLeftStart;
                x <= self.sceneParams.baseZoneLeftOffset;
                x++) {
                for (let y = self.sceneParams.baseZoneTopStart;
                    y <= self.sceneParams.baseZoneTopOffset;
                    y++) {
                    baseZone.push({ x, y });
                };
            };

            this.$store.dispatch('changeBaseZoneObjects', baseZone);
        },
        refreshEnviroment() {
            this.$store.dispatch('changeEnvObjects', []);

            const self = this;
            const { envObjectsQuantity } = this.sceneParams;
            const repository = [];

            const options = {
                isBaseZoneException: true,
                isSnakeException: false,
                isEnviromentException: true,
                isFoodException: false,
                repository,
            };

            for (let envObjCounter = 1; envObjCounter <= envObjectsQuantity; envObjCounter ++) {
                self.createBlockCoords(options);
            }

            this.$store.dispatch('changeEnvObjects', repository);
        },
        refreshFood() {
            const repository = [];

            const options = {
                isBaseZoneException: false,
                isSnakeException: true,
                isEnviromentException: true,
                isFoodException: false,
                repository,
            };

            this.createBlockCoords(options);

            setTimeout(() => {
                this.$store.dispatch('changeFoodObjects', repository);
            }, 0);
        },
        refreshSnake() {
            this.$store.dispatch('changeSnakeObjects', []);

            const self = this;
            const repository = [];

            const y = Math.floor(self.sceneParams.baseZoneTopStart + (self.sceneParams.baseZoneTopOffset / 2));
            const offsetX = self.sceneParams.baseZoneLeftStart;

            for (let x = (offsetX + self.snakeParams.defaultLength - 1); x >= offsetX; x--) {
                repository.push({ x, y });
            }

            this.$store.dispatch('changeSnakeObjects', repository);
        },
        clearGameParams() {
            this.$store.dispatch('changeSpeedToDefault');
        },
        isNextSnakeStep(snakeNextStepCoords) {
            const self = this;
            const { width, height } = this.sceneParams;

            const disBySelf = this.checkIfCoordsExist(snakeNextStepCoords, self.snakeBlocks);
            const disByEnv = this.checkIfCoordsExist(snakeNextStepCoords, self.envObjects);
            const disByScene = !(snakeNextStepCoords.x <= width
                && snakeNextStepCoords.x > 0
                && snakeNextStepCoords.y <= height
                && snakeNextStepCoords.y > 0);
            
            const isNextStepValid = (!disBySelf && !disByEnv && !disByScene);

            return isNextStepValid;
        },
        getHeadNextStepCoords(currentCoords, direction) {
            const newCoords = Object.assign({}, currentCoords)
            let { x, y } = newCoords;

            if (direction === 'up') {
                y -= 1;
            }

            if (direction === 'down') {
                y += 1;
            }

            if (direction === 'left') {
                x -= 1;
            }

            if (direction === 'right') {
                x += 1;
            }

            return ({ x, y });
        },
        changeDirection(direction) {
            const { currentDirection } = this;

            const disBySelf = direction === currentDirection;
            const disByLeft = direction === 'left' && currentDirection === 'right';
            const disByRight = direction === 'right' && currentDirection === 'left';
            const disByUp = direction === 'up' && currentDirection === 'down';
            const disByDown = direction === 'down' && currentDirection === 'up';

            if (!disBySelf && !disByLeft && !disByRight && !disByUp && !disByDown) {
                this.$store.dispatch('changeSnakeDirection', direction);
            };
        },
        getDirectionByButton(event) {
            const self = this;

            if (!self.canMove) {
                return;
            }

            const { keyCode } = event;
            const directionCodes = {
                '37': 'left',
                '38': 'up',
                '39': 'right',
                '40': 'down',
            };

            if (keyCode >= 37 && keyCode <= 40) {
                self.changeDirection(directionCodes[keyCode]);
            }

            if (!self.isSnakeMoving && self.canMove) {
                self.$store.dispatch('changeSnakeMovementStatus', true);
                self.drawSnakeNextStep();
            }
        },
        drawSnakeNextStep() {
            const self = this;

            if (!self.isSnakeMoving || !self.canMove || !self.checkIfSnakeHeadExist()) {
                return;
            }

            const [snakeHead] = this.snakeBlocks;
            const snakeNextStepCoords = this.getHeadNextStepCoords(snakeHead, self.currentDirection);

            if (!self.isNextSnakeStep(snakeNextStepCoords)) {
                self.$store.dispatch('changeSnakeMovementStatus', false);
                self.$store.dispatch('changeMovingAbility', false);

                return;
            }

            const isNextStepFood = this.checkIfCoordsExist(snakeNextStepCoords, self.foodObjects);
            const snakeBlocks = [...self.snakeBlocks];

            const nextStepBlocks = snakeBlocks.reduce((reducedBlocks, currentBlock, index) => {
                if (index === 0) {
                    reducedBlocks.push({
                        x: snakeNextStepCoords.x,
                        y: snakeNextStepCoords.y,
                    });
                }

                if (snakeBlocks[index - 1]) {
                    const prevBlock = snakeBlocks[index - 1];

                    reducedBlocks.push({
                        x: prevBlock.x,
                        y: prevBlock.y,
                    });
                }

                return reducedBlocks;
            }, []);

            const additionalBlock = isNextStepFood
                ? snakeBlocks[snakeBlocks.length - 1]
                : null;

            this.$store.dispatch('updateSnakeObjects', nextStepBlocks);

            if (additionalBlock) {
                this.$store.dispatch('addSnakeBlock', {
                    x: additionalBlock.x,
                    y: additionalBlock.y,
                });

                self.refreshFood();
            }

            setTimeout(() => {
                self.drawSnakeNextStep();
            }, self.currentSpeed);
        },
        drawGame() {
            this.fillBaseZone();
            this.refreshEnviroment();
            this.refreshSnake();
            this.refreshFood();
        },
        resetGame() {
            this.$store.dispatch('changeSnakeMovementStatus', false);
            this.$store.dispatch('changeMovingAbility', true);
            this.$store.dispatch('changeSpeedToDefault');
        },
        addControls() {
            document.addEventListener('keydown', this.getDirectionByButton);
        },
        restart() {
            this.resetGame();
            this.drawGame();
        },
    },
    mounted() {
       this.drawGame();
       this.addControls();
    }
}
</script> 

<style scoped>
    .app-container {
        width: calc(100%);
        height: calc(100%);
        display: flex;
        flex-direction: column;
        align-items: center;
        background-size: cover;
        background-position: center;
    }

    .tool_panel,
    .app {
        width: calc(100%);
    }

    .tool_panel {
        height: 10vh;
        background-color: rgba(0, 0, 255, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .restart-button {
        background: rgba(255, 255, 255, 0.8);
        color: rgba(0, 0, 0, 0.8);
        border-radius: 10px;
        padding: 5px 10px;
        cursor: pointer;
    }

    .restart-button span {
        pointer-events: none;
    }

    .app {
        height: calc(90vh);
        width: calc(100%);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .app_scene {
        position: relative;
        width: 90vh;
        height: 90vh;
        background-color: rgba(102, 205, 170, 0.5);
        overflow: hidden;
    }

    @media screen and (max-aspect-ratio: 1/1) {
        .tool_panel {
            height: 10vw;
        }
        .app_scene {
            width: 90vw;
            height: 90vw;
        }
    }
</style>