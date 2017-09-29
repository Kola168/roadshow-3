import refs from './refs';

export default {
    getContentById (id) {
        console.log('chapter id', id)
        return refs.chapters[`chapter${id}`]
    },

    getListByName (name) {
        return refs.lists[name]
    },

    getTableByName (name) {
        return refs.tables[name]
    }
}