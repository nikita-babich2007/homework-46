import { useSelector, useDispatch } from 'react-redux';
import { addTodo, removeTodo } from "./redux/slice/todoSlice"
import { useState } from 'react';

function App() {
  const [text, setText] = useState('');
  const todos = useSelector((state) => state.todos.items);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>My Redux Todos</h1>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={() => {
        dispatch(addTodo(text));
        setText('');
      }}>Add</button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text} 
            <button onClick={() => dispatch(removeTodo(todo.id))}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;