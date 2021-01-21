import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex);
export const store = new Vuex.Store({
    state: {
        currentEditingId: null,
        showModal: false,
        rowData: [
            {make: 'Toyota', model: 'Celica', multi: {price: 35000, comment: 'Fair'}, id: 0},
            {make: 'Ford', model: 'Mondeo', multi: {price: 32000, comment: undefined}, id: 1},
            {make: 'Porsche', model: 'Boxter', multi: {price: 32000, comment: 'Too high'}, id: 2}
        ]
    },
    mutations: {
        setEditingId(state, id) {
            state.currentEditingId = id;
        },
        clearEditingId(state) {
            state.currentEditingId = null;
        },
        changeShowModal(state, value) {
            state.showModal = value;
        },
        changeComment(state, payload) {
            let rowData = state.rowData;
            rowData.map(it => {
                if (it.id === payload.id) {
                    it.multi.comment = payload.newComment
                }
            })
            state.rowData = rowData;
        }
    }
});
