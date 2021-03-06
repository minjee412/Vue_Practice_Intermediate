const addOneItem = (state, todoItem) => {
  // ๐  state๋ mutations ๋ฉ์ค๋์ ๋ฐ๋์ ๋ค์ด๊ฐ์ผ ํ๋ค.
  const obj = { completed: false, item: todoItem };

  // localstorage์ ์ ์ฅํ๋ ๋ก์ง
  localStorage.setItem(todoItem, JSON.stringify(obj));
  // console.log(JSON.stringify(obj) + "," + typeof(JSON.stringify(obj))); //{"completed":false,"item":"30"},string
  // localStorage.setItem(key, value);

  state.todoItems.push(obj);
};

const removeOneItem = (state, payload) => {
  localStorage.removeItem(payload.todoItem.item); // localStorage ์์ผ๋ก ์ญ์  ์ํค๋ ๊ธฐ๋ฅ
  state.todoItems.splice(payload.index, 1); // ํ๋ฉด๋จ(Javascript)์์ localStorage์ ์ญ์ ๋ ๋ถ๋ถ ๋ฐ์ ํ๋ ๊ธฐ๋ฅ
};

const toggleOneItem = (state, payload) => {
  // payload : ์ ์ก๋๋ ๋ฐ์ดํฐ
  // ํ์ฌ, payload ์์๋ payload.todoItem , payload.index ๊ฐ ์๋ค.

  state.todoItems[payload.index].completed =
    !state.todoItems[payload.index].completed;
  // ๋ก์ปฌ์คํ ๋ฆฌ์ง์ ๋ฐ์ดํฐ๋ฅผ ๊ฐฑ์ 
  localStorage.removeItem(payload.todoItem.item);
  localStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem));
};

const clearAllItems = (state) => {
  localStorage.clear();
  state.todoItems = [];
};

export { addOneItem, removeOneItem, toggleOneItem, clearAllItems };
