export default {
    types: {
        isArray(arr) {
            return (Array.isArray(arr)
                || Object.prototype.isPrototypeOf.call(NodeList.prototype, arr));
        },
        isBoolean(bool) {
            return (bool === true || bool === false);
        },
        isElement(el) {
            return el instanceof Element;
        },
        isFunction(func) {
            return (typeof func === 'function');
        },
        isNumber(num) {
            return (typeof num === 'number');
        },
        isObject(obj) {
            return (typeof obj === 'object' && obj !== null);
        },
        isString(str) {
            return (typeof str === 'string');
        },
    },
    randomizer(from, to) {
        return from + Math.round(Math.random() * (to - from));
    },
    getRandomSingleCoord(offset, gridDimensionSize) {
        return this.randomizer(offset, gridDimensionSize);
    },
    getRandomDoubleCoord(xOffset, gridWidth, yOffset, gridHeight) {
        const api = this;

        return {
            x: api.getRandomSingleCoord(xOffset, gridWidth),
            y: api.getRandomSingleCoord(yOffset, gridHeight),
        };
    },
};
