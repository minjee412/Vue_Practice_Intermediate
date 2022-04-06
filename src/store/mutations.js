const addOneItem = (state, todoItem) => {
  // 🟠 state는 mutations 메스드에 반드시 들어가야 한다.
  const obj = { completed: false, item: todoItem };

  // localstorage에 저장하는 로직
  localStorage.setItem(todoItem, JSON.stringify(obj));
  // console.log(JSON.stringify(obj) + "," + typeof(JSON.stringify(obj))); //{"completed":false,"item":"30"},string
  // localStorage.setItem(key, value);

  state.todoItems.push(obj);
};

const removeOneItem = (state, payload) => {
  localStorage.removeItem(payload.todoItem.item); // localStorage 상으로 삭제 시키는 기능
  state.todoItems.splice(payload.index, 1); // 화면단(Javascript)에서 localStorage에 삭제된 부분 반영 하는 기능
};

const toggleOneItem = (state, payload) => {
  // payload : 전송되는 데이터
  // 현재, payload 안에는 payload.todoItem , payload.index 가 있다.

  state.todoItems[payload.index].completed =
    !state.todoItems[payload.index].completed;
  // 로컬스토리지의 데이터를 갱신
  localStorage.removeItem(payload.todoItem.item);
  localStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem));
};

const clearAllItems = (state) => {
  localStorage.clear();
  state.todoItems = [];
};

export { addOneItem, removeOneItem, toggleOneItem, clearAllItems };
