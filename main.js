// import * as Redux from 'redux';
import { createStore } from 'redux';
// nodes
let input = document.getElementById('input');
let lista = document.getElementById('lista');
let todos = {
  0:{
    text: 'Ir al cine',
    done: false
  },
  1:{
    text: 'Cenar',
    done: true
  },
  2:{
    text: 'Grabar',
    done: false
  }
};

// functions
function drawTodos(){
  lista.innerHTML = '';
  // Actualizar los todos antes de dibujar
  todos = store.getState();
  for (let key in todos) {
    let li = document.createElement('li');
    let classDone = todos[key].done ? 'done' : "";
    li.innerHTML = `
      <span id="${key}" class="${classDone}">${todos[key].text} </span>
      <span data-id="${key}" data-action="delete">X</span>
    `;
    setListeners(li);
    lista.appendChild(li);
  }
}

function setListeners(li){
  li.addEventListener('click', (e) => {
    if (e.target.getAttribute('data-action') === 'delete') {
      let key = e.target.getAttribute('data-id');
      store.dispatch({
        type: 'DELETE_TODO',
        id: key
      })
      // drawTodos();
      return;
    }
    let key = e.target.id;
    todos[key].done = !todos[key].done;
    store.dispatch({
      type: 'UPDATE_TODO',
      todo: todos[key]
    })
    // todos[key].done = !todos[key].done;
    // drawTodos();
  });
}

// listeners
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    let text = e.target.value;
    let todo = { text: text, done: false };
    store.dispatch({
      type: "ADD_TODO",
      todo: todo
    })
    // let id = Object.keys(todos).length;
    // todos[id] = {text: text, done:false};
    // drawTodos();
  }
})

// Redux

// reducer
function todosReducer(state = {}, action){
  switch (action.type) {
    case 'ADD_TODO':
      action.todo['id'] = Object.keys(state).length;
      return { ...state, [Object.keys(state).length]: action.todo };
    case 'UPDATE_TODO':
      return { ...state, [action.todo.id]: action.todo };
    case 'DELETE_TODO':
      delete state[action.id];
      return { ...state };
    default:
      return state;
  }
}

// store
let store = createStore(todosReducer, {
  0:{
    text: "Crear Store",
    done: true,
    id: 0
  }
});

// sustituir los todos
// todos = store.getState();

// que hacer cuando hay cambios?
store.subscribe(drawTodos);

// init
drawTodos();
