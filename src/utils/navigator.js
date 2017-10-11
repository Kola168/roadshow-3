import { browserHistory } from 'dva/router';

function goTo (url) {
    if (!url) return
    browserHistory.push(url)
}

export default {
    goTo,
}