import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import mixins from './mixins/mixins';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        scene: {
            params: {
                width: 20,
                height: 20,
                envObjectsQuantity: 13,
                baseZoneLeftStart: 1,
                baseZoneTopStart: 1,
                baseZoneLeftOffset: 10,
                baseZoneTopOffset: 5,
            },
            enviromentObjects: [],
            foodObjects: [],
        },
        snake: {
            params: {
                currentDirection: 'null',
                currentLength: 5,
                defaultLength: 5,
                directions: mixins.directions,
            },
            isMoving: false,
            canMove: true,
            baseZone: [],
            bodyCoords: [],
            headCoords: {},
        },
        gameParams: {
            currentSpeed: 200,
            defaultSpeed: 200,
        },
        client: {
            isIe: mixins.isIe,
            isMobile: mixins.isMobile,
        },
    },
    actions,
    getters,
    mutations,
});
