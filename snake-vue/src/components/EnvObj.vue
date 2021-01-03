<template>
    <div
        class="env-obj"
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
    .env-obj {
        position: absolute;
        overflow: hidden;
        background: rgba(255, 215, 0, 0.7);
        border-radius: 30%;
    }
</style>