/* eslint-disable linebreak-style */
import Vue from 'vue';
import Router from 'vue-router';
import GamePage from '../pages/GamePage.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'GamePage',
            component: GamePage,
        },
    ],
});
