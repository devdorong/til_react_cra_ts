import { useState } from 'react';
import TodoList from './components/todos/TodoList';
import TodoWirte from './components/todos/TodoWirte';
import { ITodoType, TodoType } from './types/todoType';

function App(): JSX.Element {
  // ts
  // {id: "", title: "", completed:false}
  const [todos, setTodos] = useState<(ITodoType | TodoType)[]>([]);
  // todos 를 업데이트 하는 함수
  const handleTodoUpdate = (): void => {
    // setTodos(???);
  };
  // todo 목록에서 실행할 함수들
  const onToggle = (): void => {};
  const onDelete = (): void => {};
  const onEdit = (): void => {};
  //tsx
  return (
    <div>
      <h1>할일 앱서비스</h1>
      <div>
        <TodoWirte setTodos={setTodos} handleTodoUpdate={handleTodoUpdate} />
        <TodoList todos={todos} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
      </div>
    </div>
  );
}

export default App;
