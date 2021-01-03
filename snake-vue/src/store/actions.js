const actions = {
    changeBaseZoneObjects({ commit }, baseZoneObjects) {
        commit('setBaseZoneObjects', baseZoneObjects);
    },
    changeEnvObjects({ commit }, envObjects) {
        commit('setEnvObjects', envObjects);
    },
    changeFoodObjects({ commit }, foodObjects) {
        commit('setFoodObjects', foodObjects);
    },
    changeSnakeObjects({ commit }, snakeObjects) {
        commit('setSnakeObjects', snakeObjects);
    },
    updateSnakeObjects({ commit }, newSnakeObjects) {
        commit('updateSnakeObjects', newSnakeObjects);
    },
    changeSpeedToDefault({ commit }) {
        commit('setDefaultSpeed');
    },
    changeSnakeMovementStatus({ commit }, newStatus) {
        commit('setSnakeMoving', newStatus);
    },
    addSnakeBlock({ commit }, block) {
        commit('addSnakeBlock', block);
    },
    changeSnakeDirection({ commit }, direction) {
        commit('setSnakeDirection', direction);
    },
};

export default actions;
