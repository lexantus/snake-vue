<template>
    <div
        :class="[
            'snake',
            {'head': isHead},
        ]"
        :style="{
            width: options.width,
            height: options.height,
            top: options.top,
            left: options.left,
            transition: getTransition(),
        }"
    ></div>
</template>

<script>
export default {
    props: {
        options: {
            type: Object,
            required: true,
            default: {},
        },
        speed: {
            type: Number,
            required: true,
        },
        isHead: {
            type: Boolean,
        },
    },
    methods: {
        getTransition() {
            return `left ${this.speed}ms linear, top ${this.speed}ms linear`;
        },
    },
}
</script>

<style scoped>
    .snake {
        position: absolute;
        overflow: hidden;
        background: rgba(173, 255, 47, 0.7);
        border-radius: 50%;
    }
</style>