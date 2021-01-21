<template>
  <span>
    {{ price }}
    <button
        style="display: inline"
        v-on:click="onButtonClicked"
    >{{ getButtonType }}</button>
  </span>
</template>

<script>

import {store} from '@/Store';

export default {
  name: "CommentsButton",
  store,
  data() {
    return {
      price: null,
      comment: null,
      id: null
    }
  },
  mounted() {
    this.price = this.params.value.price
    this.id = this.params.data.id
  },
  computed: {
    currentRowData() {
      return this.$store.state.rowData[this.id];
    },
    currentComment() {
      return this.currentRowData?.multi?.comment;
    },
    getButtonType() {
      const currentComment = this.currentComment
      const hasComment = !(currentComment == '' || currentComment == undefined);
      return hasComment ? '▼' : '▽'
    }
  },
  methods: {
    onButtonClicked() {
      this.$store.commit('setEditingId', this.id);
      this.$store.commit('changeShowModal', true)
      console.log('from renderer button click, id:', this.$store.state.currentEditingId);

    }
  }
}
</script>

<style scoped>
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}

body {
  line-height: 1;
}
</style>
