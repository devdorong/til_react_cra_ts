import { TodoType } from '@/types/todoType';
import { useState } from 'react';

type TodoItemProps = {
  todo: TodoType;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newTitle: string) => void;
};
const TodoItem = ({ todo, onToggle, onDelete, onEdit }: TodoItemProps) => {
  // ts

  // 현재 Edit 상태인지 아닌지 파악
  const [isEdit, setIsEdit] = useState<boolean>(false);
  // Edit 상태라면 입력중인 title 내용 관리
  const [editTitle, setEditTitle] = useState<string>(todo.title);

  // 수정은 별도의 입력창 구성으로 수정 후 값 만 업데이트
  const handleEdit = () => {
    console.log('여기에서 내용을 수정하는 기능 작성후 완료된 데이터 전송');
    // isEdit 을 true 로 변경
    setIsEdit(true);
  };
  // 수정 후 저장 기능
  const handleEditSave = () => {
    console.log('수정완료진행');
    // 업데이트 해줌.(진행예정)
    if (editTitle.trim()) {
      // 변경되어야 할 id, 새로운 타이틀 전달
      onEdit(todo.id, editTitle);
      // 상태는 isEdit 을 false로 변경
      setIsEdit(false);
    }
  };
  // 수정중인 내용 취소 기능
  const handleEditCancel = () => {
    // 1. editTitle 을 원래대로 돌리고
    // 상태 false 로 변경
    setIsEdit(false);
  };

  // CSS 객체 만들기 (React.CSSProperties 타입을 명시하면 코드힌트시 스타일 체크 편하다)
  const liStyle: React.CSSProperties = {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    justifyContent: 'center',
    color: todo.completed ? 'gray' : 'red',
    textDecoration: todo.completed ? 'line-through' : 'none',
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // console.log(e.key) : 입력중인 키 알아내기
    if (e.key === 'Enter') {
      handleEditSave();
    }
    if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  // tsx
  return (
    <li style={liStyle}>
      {isEdit ? (
        <>
          <input
            type="text"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleEditSave}>저장</button>
          <button onClick={handleEditCancel}>취소</button>
        </>
      ) : (
        <>
          <input type="checkbox" onChange={() => onToggle(todo.id)} checked={todo.completed} />
          <span>{todo.title}</span>
          <button onClick={handleEdit}>수정</button>
          <button onClick={() => onDelete(todo.id)}>삭제</button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
