<template>
  <div class="inputBox shadow">
      <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo"> 
      <!-- v-on:keyup.enter 는 enter를 눌렀을때 동작하는 메서드 설정 -->

      <!-- <button v-on:click="addTodo">add</button> -->
      <span class="addContainer"  v-on:click="addTodo">
          <i class="fa-solid fa-plus addBtn"></i>
      </span>
  </div>
</template>

<script>
export default {
    data:function(){
        return{
            newTodoItem: ""
        }
    },

    methods:{
        addTodo: function(){
            if(this.newTodoItem !== ''){
                // this.$emit('이벤트이름', 인자1, 인자2...);
                this.$emit('addTodoItem', this.newTodoItem);

                this.clearInput();
            }
        },
        clearInput: function(){
            this.newTodoItem='';
        }
    }
}
</script>

// style의 scoped : 해당 컴포넌트 안에서만 적용 되도록 설정하는 것
<style scoped>

input:focus {
    outline: none;
}

.inputBox {
    background-color: white;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
}

.inputBox input {
    border-style: none;
    font-size: 0.9rem;
}

.addContainer {
    float: right;
    background: linear-gradient(to right, #6478FB, #8763FB);
    display: block;
    width: 3rem;
    border-radius: 0 5px 5px 0;
}

.addBtn {
    color: white;
    vertical-align: middle;
}

</style>