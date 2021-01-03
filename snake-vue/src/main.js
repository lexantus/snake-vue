/* eslint-disable linebreak-style */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";
import Vue from 'vue';

import router from './router';
import Snake from './Snake.vue';
import store from './store/store';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    components: { Snake },
    el: '#snake',
    router,
    store,
    template: '<Snake />',
});
