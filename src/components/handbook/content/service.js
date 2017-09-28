import chapters from './chapters';

export default {
    getContentById (id) {
        console.log('chapter id', id)
        return chapters[`chapter${id}`]
    }
}