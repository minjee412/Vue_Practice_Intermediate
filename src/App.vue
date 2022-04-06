<template>
  <div id="app">
    <TodoHeader></TodoHeader>

    <!-- <TodoInput v-on:하위컴포넌트에서 발생시킨 이벤트이름="현재컴포넌트의메서드명"></TodoInput> -->
    <TodoInput></TodoInput>

    <!-- <TodoList v-bind:내려보낼프롭스속성이름="현재위치의컴포넌트data속성"></TodoList> -->
    <TodoList></TodoList>

    <TodoFooter></TodoFooter>
  </div>
</template>

<script>
import TodoHeader from "./components/TodoHeader.vue";
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";
import TodoFooter from "./components/TodoFooter.vue";

export default {
  methods: {
    //mutations
  },

  components: {
    // 컴포넌트태그명 : 컴포넌트내용
    TodoHeader,
    TodoInput,
    TodoList,
    TodoFooter,
  },
};
</script>

<style>
body {
  text-align: center;
  background-color: #f6f6f6;
}

input {
  border-style: groove;
  width: 200px;
}

button {
  border-style: groove;
}

.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>
