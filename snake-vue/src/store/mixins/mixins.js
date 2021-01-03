function isIE() {
    const ua = window.navigator.userAgent;

    return (ua.indexOf('MSIE ') !== -1
        || ua.indexOf('Trident/') !== -1);
}

function isMobile() {
    return /Android|webOS|iPad|iPhone|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i
        .test(navigator.userAgent);
}

export default {
    directions: ['right', 'down', 'left', 'up'],
    isIe: isIE(),
    isMobile: isMobile(),
};
