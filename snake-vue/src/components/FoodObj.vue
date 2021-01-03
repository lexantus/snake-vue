<template>
    <div
        class="food"
        :style="{
            width: options.width,
            height: options.height,
            top: options.top,
            left: options.left,
            transition: `left ${speed}ms linear, top ${speed} linear`,
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
    },
}
</script>

<style scoped>
    @keyframes food-animation {
        0% {
            transform: scale(0.9);
        }
        50% {
            transform: scale(1.2);
        }
        100% {
            transform: scale(0.9);
        }
    }

    .food {
        position: absolute;
        overflow: hidden;
        background: rgba(255, 0, 0, 0.5);
        border-radius: 30%;
        animation: food-animation 2s infinite;
    }
</style>