<template>
  <div>
      <transition-group name='list' tag = 'ul'>

        <!-- 기존: <li v-for="(todoItem, index) in propsdata" class="shadow" v-bind:key="todoItem.item"> -->
        <!-- propsdata로 내려받던 todoItems가 store.js로 옮겨 갔기 때문에, scope에 맞춰서 this.$store.state.todoItems로 변경 -->
            <li v-for="(todoItem, index) in this.$store.state.todoItems" v-bind:key="todoItem.item" class="shadow">
                <!-- 🔹 v-for=("작명 in 몇번:key="작명") 으로 사용한다. -->
                <!-- 🔹 작명:(value,key,index) 순이고 순서가 중요하고 이름은 중요하지 않다 ,몇번: data로도 사용 가능 하다. -->
                <i class="fa-solid fa-check checkBtn" v-bind:class="{checkBtnCompleted: todoItem.completed}" 
                    v-on:click="toggleComplete(todoItem, index)"></i>
                
                <span v-bind:class="{textCompleted: todoItem.completed}">
                    {{todoItem.item}}
                </span>
                
                <span class="removeBtn" v-on:click="removeTodo(todoItem, index)">
                    <i class="fa-solid fa-trash-can"></i>
                </span>

            </li>

      </transition-group>
  </div>
</template>

<script>
export default {

    methods:{
        removeTodo(todoItem, index){
            // this.$emit('removeItem', todoItem, index); 
            console.log(todoItem,index);    // 🍥 {__ob__: Observer} 0
                                            // completed: false
                                            // item: "30" >> 🍖 todoItem.item을 찍으면, 해당 값인 30이 나온다. 🍖
                                            // __ob__: Observer {value: {…}, dep: Dep, vmCount: 0}
                                            // get completed: ƒ reactiveGetter()
                                            // set completed: ƒ reactiveSetter(newVal)
                                            // get item: ƒ reactiveGetter()
                                            // set item: ƒ reactiveSetter(newVal)
                                            // 🍥 [[Prototype]]: Object 
        
        // 🍖 인자 2개를 한꺼번에 날릴때는, 그 2개를 객체로 만들어서 넘긴다. 🍖
            this.$store.commit('removeOneItem', {todoItem, index})
         // this.$store.commit('mutaion메세드이름', 넘겨줄인자)
        },

        toggleComplete(todoItem, index){
            this.$store.commit('toggleOneItem', {todoItem, index})
        }
    }
}
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

    .list-enter-active, .list-leave-active {
        transition: all 1s
    }

    .list-enter, .list-leave-to {
        opacity: 0;
        transform: translateY(38px);
    }
</style>
