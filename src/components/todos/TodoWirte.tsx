import { TodoType } from '../../types/todoType';

type TodoWirteProps = {
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  handleTodoUpdate: () => void;
};
const TodoWirte = ({ setTodos, handleTodoUpdate }: TodoWirteProps) => {
  //ts

  //tsx
  return <div>TodoWirte</div>;
};

export default TodoWirte;
