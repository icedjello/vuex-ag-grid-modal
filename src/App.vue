<template>
  <div class="container">
    <ag-grid-vue
        style="width: 550px; height: 200px;"
        class="ag-theme-alpine"
        :columnDefs="columnDefs"
        :rowData="rowData"
        :gridOptions="gridOptions"
    >
    </ag-grid-vue>
    <comments-popup
        v-show="isModalVisible"
        @close="closeModal"
    ></comments-popup>
  </div>

</template>

<script>
import {AgGridVue} from "ag-grid-vue";
import CommentsButton from "./components/CommentsButton"

import CommentsPopup from "@/components/CommentsPopup";
import {store} from './Store';

export default {
  name: 'App',
  store,
  data() {
    return {
      columnDefs: null,
      rowData: null,
      gridOptions: null,
    }
  },
  computed: {
    isModalVisible() {
      return this.$store.state.showModal
    }
  },
  components: {
    CommentsPopup,
    AgGridVue,
    "commentsButton": CommentsButton
  },
  methods: {
    showModal() {
      this.$store.commit('changeShowModal', true);
    },
    closeModal() {
      this.$store.commit("changeShowModal", false);
      this.$store.commit('clearEditingId')
    },
  },
  beforeMount() {
    this.columnDefs = [
      {field: 'make'},
      {field: 'model'},
      {
        field: 'multi',
        cellRendererFramework: "commentsButton",
        headerTooltip: 'Click triangle to view/add/edit comment'
      }
    ];
    this.rowData = this.$store.state.rowData;
    this.gridOptions = {
      context: {
        componentParent: this
      }
    };
  }
}
</script>

<style lang="scss">
@import "../node_modules/ag-grid-community/dist/styles/ag-grid.css";
@import "../node_modules/ag-grid-community/dist/styles/ag-theme-alpine.css";
</style>
