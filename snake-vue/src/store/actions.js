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
    changeCurrentSpeed({ commit }, newSpeed) {
        commit('setCurrentSpeed', newSpeed);
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
    changeMovingAbility({ commit }, status) {
        commit('setMovingAbility', status);
    },
    changeDirectionSwitchAbility({ commit }, status) {
        commit('setDirectionSwitchAbility', status);
    },
};

export default actions;
