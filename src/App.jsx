import { useSelector, useDispatch } from 'react-redux';
import { addTodo, removeTodo, fetchTodos } from "./redux/slice/todoSlice"
import { useState, useEffect } from 'react';

function App() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.todos);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Todo List with Thunk</h1>
      
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={() => {
        if (text.trim()) {
          dispatch(addTodo(text));
          setText('');
        }
      }}>Add Task</button>

      {status === 'loading' && <p>Завантаження даних...</p>}
      {status === 'failed' && <p style={{ color: 'red' }}>Помилка: {error}</p>}
      
      {status === 'succeeded' && (
        <ul>
          {items.map(todo => (
            <li key={todo.id}>
              {todo.text}
              <button onClick={() => dispatch(removeTodo(todo.id))}>x</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;