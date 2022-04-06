<template>
  <div>
    <transition-group name="list" tag="ul">
        <!-- 기존: <li v-for="(todoItem, index) in propsdata" class="shadow" v-bind:key="todoItem.item"> -->
        <!-- propsdata로 내려받던 todoItems가 store.js로 옮겨 갔기 때문에, scope에 맞춰서 this.$store.state.todoItems로 변경 -->
        <!-- 🍱<li v-for="(todoItem, index) in this.$store.state.todoItems" v-bind:key="todoItem.item" class="shadow">🍱 -->
        <!-- 🔹 v-for=("작명 in 몇번:key="작명") 으로 사용한다. -->
        <!-- 🔹 작명:(value,key,index) 순이고 순서가 중요하고 이름은 중요하지 않다 ,몇번: data로도 사용 가능 하다. -->
                                              <!-- ⏬ -->
        <!-- 🍱<li v-for="(todoItem, index) in this.$store.getters.storedTodoItems" v-bind:key="todoItem.item" class="shadow">🍱 -->
        <!-- 🍥 store.js에 helper함수인 getters를 선언함에 따라 받아오는 데이터값의 경로(?)를 수정 🍥 -->
                                              <!-- ⏬ -->
      <li
        v-for="(todoItem, index) in this.storedTodoItems"
        v-bind:key="todoItem.item"
        class="shadow"
      >
        <!-- computed와 mapGetters를 이용해서 this.$store.getters.storedTodoItems를 간단하게 표현  -->

        <i
          class="fa-solid fa-check checkBtn"
          v-bind:class="{ checkBtnCompleted: todoItem.completed }"
          v-on:click="toggleComplete({ todoItem, index })"
        ></i>

        <span v-bind:class="{ textCompleted: todoItem.completed }">
          {{ todoItem.item }}
        </span>

        <span class="removeBtn" v-on:click="removeTodo({ todoItem, index })">
          <i class="fa-solid fa-trash-can"></i>
        </span>
      </li>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  methods: {
    // (Vuex 적용 후 기존코드)
    // removeTodo(todoItem, index){

    // ------------------------- (Vuex 적용 전 기존코드) -------------------------
    // this.$emit('removeItem', todoItem, index);
    // console.log(todoItem,index);    // 🍥 {__ob__: Observer} 0
    // completed: false
    // item: "30" >> 🍖 todoItem.item을 찍으면, 해당 값인 30이 나온다. 🍖
    // __ob__: Observer {value: {…}, dep: Dep, vmCount: 0}
    // get completed: ƒ reactiveGetter()
    // set completed: ƒ reactiveSetter(newVal)
    // get item: ƒ reactiveGetter()
    // set item: ƒ reactiveSetter(newVal)
    // 🍥 [[Prototype]]: Object
    // ---------------------------------------------------------------------------

    // 🍖 인자 2개를 한꺼번에 날릴때는, 그 2개를 객체로 만들어서 넘긴다. 🍖
    // this.$store.commit('removeOneItem', {todoItem, index})
    // 🍥 this.$store.commit('mutaion메세드이름', 넘겨줄인자) 🍥

    // toggleComplete(todoItem, index){
    //     this.$store.commit('toggleOneItem', {todoItem, index})
    // }
    // ⏬
    // (helper함수 적용)
    ...mapMutations({
      removeTodo: "removeOneItem",
      // --------------------------------- 의문사항 ! ------------------------------------
      // v-on:click="removeTodo(todoItem, index) 에서
      // todoItem, index 2개 인자를 넘겼는데 왜 mapMutations에서는 아무것도 넘기는게 없나 ?
      // map이 들어가는 helper 함수들은 인자를 선언하지 않아도, 호출하는단에서 인자가 있으면
      // 암묵적으로 인자가 있으면 그걸 그대로 들고와서 넘기고 있다.
      // 단, 기존에는 인자가 {todoItem, index} 객체 형식으로 1개로만 이루어져 있는데,
      // 호출단에서는 removeTodo(todoItem, index) 2개로 되어있다.
      // 이럴때는 ( )안에 인자를 동일하게 { }로 묶어 하나로 만들어 준다.
      // removeTodo({todoItem, index})
      // --------------------------------------------------------------------------------
      toggleComplete: "toggleOneItem",
    }),
  },
  computed: {
    // todoItems(){
    //     return this.$store.getters.storedTodoItems
    // }
    ...mapGetters(["storedTodoItems"]), // ()안에 배열식으로 들어감
    // 🍖...mapGetters({''}) 처럼 객체로 들어가는 경우🍖
    // store.js 안에 getters의 이름과 해당 파일의 mapGetters 이름이 다를때 사용 한다.
    // 예시) ...mapGetters({
    //          todoItems: 'storedTodoItems'
    //     사용하려는이름 : 'store.js의 getters 메서드이름'
    //      })
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}

li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background-color: white;
  border-radius: 5px;
}

.removeBtn {
  margin-left: auto;
  color: #de4343;
  cursor: pointer;
}

.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}

.checkBtnCompleted {
  color: #b3adad;
}

.textCompleted {
  text-decoration: line-through;
  color: #b3adad;
}

/* 리스트 아이템 트랜지션 효과 */
.list-item {
  display: inline-block;
  margin-right: 10px;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(38px);
}
</style>
