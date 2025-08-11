import { TodoType } from '@/types/todoType';

type TodoItemProps = {
  todo: TodoType;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: () => void;
};
const TodoItem = ({ todo, onToggle, onDelete, onEdit }: TodoItemProps) => {
  //ts
  // 수정은 별도의 입력창 구성으로 수정 후 값 만 업데이트
  const handleEdit = () => {
    console.log('여기에서 내용을 수정하는 기능 작성후 완료된 데이터 전송');
    onEdit();
  };

  // CSS 객체 만들기 (React.CSSProperties 타입을 명시하면 코드힌트시 스타일 체크 편하다)
  const liStyle: React.CSSProperties = {
    display: 'flex',
    gap: '10',
    alignItems: 'center',
    justifyContent: 'flex-start',
    color: todo.completed ? 'gray' : 'red',
    textDecoration: todo.completed ? 'line-through' : 'none',
  };

  //tsx
  return (
    <li style={liStyle}>
      <input type="checkbox" onChange={() => onToggle(todo.id)} checked={todo.completed} />
      <span>{todo.title}</span>
      <button onClick={handleEdit}>수정</button>
      <button onClick={() => onDelete(todo.id)}>삭제</button>
    </li>
  );
};

export default TodoItem;
