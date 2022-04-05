import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const storage = {
    // fetch: function (){}
    fetch(){
        const arr = [];
        if(localStorage.length > 0){
            for(var i = 0; i < localStorage.length; i++){
                // console.log(JSON.parse (localStorage.getItem(localStorage.key(i))));
                arr.push(JSON.parse (localStorage.getItem(localStorage.key(i))));
                // this.todoItems.push(localStorage.key(i));
            }
        }
        return arr;
    },
}

export const store = new Vuex.Store({
    state : {
        todoItems: storage.fetch()
    },
    mutations:{
        addOneItem(state, todoItem ) {
            const obj = {completed : false, item: todoItem};
            // localstorage에 저장하는 로직
            localStorage.setItem(todoItem, JSON.stringify(obj)); 
            //localStorage.setItem(key, value);
            state.todoItems.push(obj);
        },
        removeOneItem(state, payload){
            localStorage.removeItem(payload.todoItem.item); // localStorage 상으로 삭제 시키는 기능
            state.todoItems.splice(payload.index, 1); // 화면단(Javascript)에서 localStorage에 삭제된 부분 반영 하는 기능
        },
        toggleOneItem(state, payload){
            // payload : 전송되는 데이터
            // 현재, payload 안에는 payload.todoItem , payload.index 가 있다.

            state.todoItems[payload.index].completed = !state.todoItems[payload.index].completed
            // 로컬스토리지의 데이터를 갱신
            localStorage.removeItem(payload.todoItem.item);
            localStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem))
        },
        clearAllItems(state){
            localStorage.clear();
            state.todoItems = [];
        }
    }
})