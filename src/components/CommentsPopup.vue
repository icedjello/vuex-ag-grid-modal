<template>
  <div class="modal-backdrop">
    <div class="modal">
      <section class="modal-body">
        <form @submit.prevent="onSubmit">
          <h2 class="label-wrapper">
            <label for="new-comment">
              Comment
            </label>
          </h2>
          <input
              type="text"
              id="new-comment"
              name="new-comment"
              autocomplete="off"
              v-model="currentComment"
          />
          <button type="submit">
            Edit
          </button>
        </form>
      </section>
      <footer class="modal-footer">
        <slot name="footer">
          <button
              type="button"
              class="btn-green"
              @click="close"
          >
            Close me!
          </button>
        </slot>
      </footer>
    </div>
  </div>
</template>

<script>
import {store} from "@/Store";

export default {
  name: "CommentsPopup",
  store,
  data() {
    return {
      newComment: '',
    }
  },
  computed: {
    currentEditingRowId() {
      return this.$store.state.currentEditingId;
    },
    currentRowData() {
      return this.$store.state.rowData[this.currentEditingRowId];
    },
    currentComment: {
      get: function () {
        return this.currentRowData?.multi?.comment;
      },
      set: function (newValue) {
        this.newComment = newValue
      }
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },

    onSubmit() {
      // this.$emit('edit-comment', this.currentEditingRowId, this.newComment);
      console.log('from edit, id:', this.currentEditingRowId)
      const payload = {id: this.currentEditingRowId, newComment: this.newComment};
      console.log(payload)
      this.$store.commit('changeComment', payload);
      console.log('from editor button click, id:', this.$store.state.currentEditingId);
      this.newComment = '';
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #FFFFFF;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  border-bottom: 1px solid #eeeeee;
  color: #4AAE9B;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  border: none;
  font-size: 20px;
  padding: 20px;
  cursor: pointer;
  font-weight: bold;
  color: #4AAE9B;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4AAE9B;
  border: 1px solid #4AAE9B;
  border-radius: 2px;
}
</style>
