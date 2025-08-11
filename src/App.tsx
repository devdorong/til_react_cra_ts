import { useState } from 'react';
import TodoList from './components/todos/TodoList';
import TodoWirte from './components/todos/TodoWirte';

// 공통으로 사용하는 type 정의 및 interface 는 별도의 폴더에 보관하자.
import { ITodoType, TodoType } from './types/todoType';

// 테스트를 위한 목업 데이터 (/src/api/dummy.ts 추천)
const initialTodos: TodoType[] = [
  { id: 0, title: '제목 1 입니다.', completed: false },
  { id: 1, title: '제목 2 입니다.', completed: true },
  { id: 2, title: '제목 3 입니다.', completed: false },
  { id: 3, title: '제목 4 입니다.', completed: true },
  { id: 4, title: '제목 5 입니다.', completed: false },
];

function App(): JSX.Element {
  // ts
  // {id: "", title: "", completed:false}
  const [todos, setTodos] = useState<(ITodoType | TodoType)[]>(initialTodos);
  // todos 를 업데이트 하는 함수
  const handleTodoUpdate = (): void => {
    // setTodos(???);
  };
  // todo 목록에서 실행할 함수들
  const onToggle = (id: number): void => {
    console.log('onToggle : ', id);
    // 전달 받은 ID 를 이용해서 map 으로 찾아서 id 가 같으면 completed 변경
    const arr: TodoType[] = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
    setTodos(arr);
  };
  // // todo 목록에서 실행할 함수들
  // const onToggle = (id: number): void => {
  //   console.log('onToggle :', id);
  //   // 전달 받은 ID 를 이용해서 찾아서 complete 변경
  //   const arr: TodoType[] = todos.map(item =>
  //     item.id === id ? {... item completed: !item.completed } : { item },
  //   );
  //   setTodos(arr);
  // };
  const onDelete = (id: number): void => {
    console.log('onDelete :', id);
    // 전달 받은 ID 를 제외한 나머지 즉, amp 으로 새 목록(배열)으로 변경
    const arr: TodoType[] = todos.filter(todo => todo.id !== id);
    setTodos(arr);
  };
  const onEdit = (): void => {
    console.log('onEdit');
  };
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
