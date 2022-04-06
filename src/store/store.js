import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

// App.vue에 있던, created 속성의 내용들을 storage로 그대로 가져왔다.
const storage = {
    // App.vue에 있던, created 속성의 내용들을 storage로 그대로 가져왔다.
    fetch(){
        const arr = [];
        if(localStorage.length > 0){
            for(var i = 0; i < localStorage.length; i++){
                /*  console.log(localStorage.key(i)); // 내가 입력한 값이 나옴
                    console.log(localStorage.getItem(localStorage.key(i)));     //{"completed":false,"item":"10"}
                    console.log(JSON.parse (localStorage.getItem(localStorage.key(i))));    //{completed: false, item: '10'}
                                                                                                completed: false
                                                                                                item: "10"
                                                                                                [[Prototype]]: Object  */
                
                /*  기존 : this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i)))); 었으나,  */
                arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
                /*  scope 이 달라졌기 때문에 그에 맞게 arr.push 로 변경 해준다.  */

                console.log(arr); /*    [{…}]
                                            0:
                                            completed: false
                                            item: "10"
                                            __ob__: Observer {value: {…}, dep: Dep, vmCount: 0}
                                            get completed: ƒ reactiveGetter()
                                            set completed: ƒ reactiveSetter(newVal)
                                            get item: ƒ reactiveGetter()
                                            set item: ƒ reactiveSetter(newVal)
                                            [[Prototype]]: Object

                                            1:
                                            completed: false
                                            item: "30"
                                            __ob__: Observer {value: {…}, dep: Dep, vmCount: 0}
                                            get completed: ƒ reactiveGetter()
                                            set completed: ƒ reactiveSetter(newVal)
                                            get item: ƒ reactiveGetter()
                                            set item: ƒ reactiveSetter(newVal)
                                            [[Prototype]]: Object 
                                    
                                    >> localStorage.length 만큼 돌아간다.    */
            }
        }
        return arr;
    },
}

export const store = new Vuex.Store({
    /* 🟠 mutations의 state를 선언
       🟠 선언된 mutation은 commit() 으로 동작 시킨다. */

    state : {
        todoItems: storage.fetch() 
        // 🔸 storage.fetch() : const arr에 담긴 객체 배열들을 반환 한다.
    },

    mutations:{
        addOneItem(state, todoItem ) {
        // 🟠 state는 mutations 메스드에 반드시 들어가야 한다.
            const obj = {completed : false, item: todoItem};

            // localstorage에 저장하는 로직
            localStorage.setItem(todoItem, JSON.stringify(obj)); 
            // console.log(JSON.stringify(obj) + "," + typeof(JSON.stringify(obj))); //{"completed":false,"item":"30"},string
            // localStorage.setItem(key, value);

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