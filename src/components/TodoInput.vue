<template>
  <div class="inputBox shadow">
      <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo"> 
      <!-- v-on:keyup.enter 는 enter를 눌렀을때 동작하는 메서드 설정 -->

      <!-- <button v-on:click="addTodo">add</button> -->
      <span class="addContainer"  v-on:click="addTodo">
          <i class="fa-solid fa-plus addBtn"></i>
      </span>

      <ModuleModal v-if="showModal" @close="showModal = false">
        <h3 slot="header">
            경고 
            <i class="closeModalBtn fa fa-times" 
            aria-hidden="true" 
            @click="showModal = false">
            </i>
        </h3>
        <p slot="body">아무것도 입력하지 않으셨습니다.</p>
        <p slot="footer">copy right</p>
      </ModuleModal>

  </div>
</template>

<script>
import ModuleModal from './common/ModuleModal.vue'

export default {
    data(){
        return{
            newTodoItem: "",
            showModal: false
        }
    },

    methods:{
        addTodo(){
            if(this.newTodoItem !== ''){
                // this.$emit('이벤트이름', 인자1, 인자2...);
                this.$emit('addTodoItem', this.newTodoItem);

                this.clearInput();
            } else {
                this.showModal = !this.showModal
            }
        },
        clearInput(){
            this.newTodoItem='';
        }
    },
    components:{
        ModuleModal
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