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
            transform: getTransform(),
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
        index: {
            type: Number,
            required: true,
            default: 0,
        },
        len: {
            type: Number,
            required: true,
            default: 0,
        }
    },
    methods: {
        getTransition() {
            return `left ${this.speed}ms linear, top ${this.speed}ms linear, transform 200ms linear`;
        },
        isHead() {
            return this.index === 0;
        },
        isLastBlock() {
            return this.index === this.len - 1;
        },
        isBeforeLastBlock() {
            return this.index === this.len - 2;
        },
        getTransform() {
            if (this.isHead()) {
                return 'scale(1)'; // зачем для головы умножать на 1 если ничего от этого не измениться?
            }

            if (this.isLastBlock()) {
                return 'scale(0.8)';
            }

            if (this.isBeforeLastBlock()) {
                return 'scale(0.85)';
            }

            return 'scale(0.9)';
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
