import { useState } from 'react';
import { TodoType } from '../../types/todoType';

type TodoWirteProps = {
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  handleTodoUpdate: (newTodo: TodoType) => void;
};
const TodoWirte = ({ setTodos, handleTodoUpdate }: TodoWirteProps) => {
  // ts
  // 할일 제목 값 관리
  const [title, setTitle] = useState<string>('');

  // 새 할일 등록하기

  const handleAdd = () => {
    // 공백 입력 금지하기
    if (title.trim()) {
      // {id: , title: "", completed:false}
      const newTodo: TodoType = {
        id: Date.now(), // 글자로 설정시에는 뒤에 .toString(), 붙이기
        title: title,
        completed: false,
      };
      // console.log(newTodo);
      // 만약 setTodos 를 사용한다면?
      // 아래는 prev : 현재 최신 state 를 나타냄
      // 밑은 받은값을 제일 앞으로 처리
      // setTodos(prev => [newTodo, ...prev]);
      // 밑은 받은값을 제일 뒤로 처리
      // setTodos(prev => [...prev, newTodo]);

      // 함수의 매개변수로 전달한다면?
      handleTodoUpdate(newTodo);
      // 입력창에 글자 비워줌
      setTitle('');
    }
  };
  // title 변경시 onChange 이벤트 처리해보기
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // enter 키를 입력시 처리
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  // tsx
  return (
    <div>
      <input type="text" value={title} onChange={e => handleChange(e)} onKeyDown={handleKeyDown} />
      <button onClick={handleAdd}>등록</button>
    </div>
  );
};

export default TodoWirte;
