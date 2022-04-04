<template>
  <div id="app">
   <TodoHeader></TodoHeader>

   <!-- <TodoInput v-on:하위컴포넌트에서 발생시킨 이벤트이름="현재컴포넌트의메서드명"></TodoInput> -->
   <TodoInput v-on:addTodoItem="addOneItem"></TodoInput>

   <!-- <TodoList v-bind:내려보낼프롭스속성이름="현재위치의컴포넌트data속성"></TodoList> -->
   <TodoList v-bind:propsdata="todoItems" 
    v-on:removeItem="removeOneItem" 
    v-on:toggleItem="toggleOneItem"></TodoList>

   <TodoFooter></TodoFooter>
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'

export default {
  data: function(){
    return{
      todoItems:[]
    }
  },
  
  methods: {
    addOneItem: function(todoItem){
      var obj = {completed : false, item: todoItem};
                
      // localstorage에 저장하는 로직
      localStorage.setItem(todoItem, JSON.stringify(obj)); 
      //localStorage.setItem(key, value);

      this.todoItems.push(obj);
    },
    removeOneItem: function(todoItem, index){
      localStorage.removeItem(todoItem.item); // localStorage 상으로 삭제 시키는 기능
      this.todoItems.splice(index, 1); // 화면단(Javascript)에서 localStorage에 삭제된 부분 반영 하는 기능
    },
    toggleOneItem: function(todoItem, index){
      // todoItem.completed = !todoItem.completed;
      this.todoItems[index].completed = !this.todoItems[index].completed

      // 로컬스토리지의 데이터를 갱신
      localStorage.removeItem(todoItem.item);
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem))
    }
  },

  // created : vue lifecycle 중 하나로, 인스턴스가 생성되면 바로 호출됨
  created: function(){
    if(localStorage.length > 0){
      for(var i = 0; i < localStorage.length; i++){
          // console.log(JSON.parse (localStorage.getItem(localStorage.key(i))));
          this.todoItems.push(JSON.parse (localStorage.getItem(localStorage.key(i))));
          // this.todoItems.push(localStorage.key(i));
      }
    }
  },

components:{
    // 컴포넌트태그명 : 컴포넌트내용
    'TodoHeader' : TodoHeader,
    'TodoInput' : TodoInput,
    'TodoList' : TodoList,
    'TodoFooter' : TodoFooter    
  }
}
</script>

<style>
body {
  text-align: center;
  background-color: #F6F6F6;
}

input {
  border-style: groove;
  width: 200px;
}

button {
  border-style: groove;
}

.shadow{
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>
