import { TodoType } from '../../types/todoType';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: TodoType[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: () => void;
}

const TodoList = ({ todos, onToggle, onDelete, onEdit }: TodoListProps): JSX.Element => {
  //ts

  //tsx
  return (
    <div>
      <h2>할일 목록</h2>
      {/* 할일 즉 todos 는 여러개의 item 으로 구성된 배열이다. map 으로 출력 */}
      {todos.length === 0 ? (
        <p>목록이 없습니다.</p>
      ) : (
        <ul>
          {todos.map(item => (
            <TodoItem
              key={item.id}
              todo={item}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </ul>
      )}

      {/* <TodoItem onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} /> */}
    </div>
  );
};

export default TodoList;
