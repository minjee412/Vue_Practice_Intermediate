<template>
  <div class="clearAllContainer">
    <span class="clearAllBtn" v-on:click="clearTodo"> Clear All </span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  methods: {
    // clearTodo(){
    //   this.$store.commit('clearAllItems')
    // }
    ...mapGetters({
      clearTodo: "removeOneItem",
    }),
  },
};
</script>

<style scoped>
.clearAllContainer {
  width: 8.5rem;
  height: 50px;
  line-height: 50px;
  background-color: white;
  border-radius: 5px;
  margin: 0 auto;
  cursor: pointer;
}

.clearAllBtn {
  color: #e20303;
  display: block;
}
</style>
