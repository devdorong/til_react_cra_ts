import { TodoType } from '../../types/todoType';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: TodoType[];
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

const TodoList = ({ todos, onToggle, onDelete, onEdit }: TodoListProps): JSX.Element => {
  //ts

  //tsx
  return (
    <div>
      <h2>할일 목록</h2>
      <TodoItem onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
    </div>
  );
};

export default TodoList;
