import ListContent from '../../../consts/list.json';

export default {
    getListHeader() {
        return ListContent.Header;
    },

    getListData() {
        return ListContent.Row;
    }
}