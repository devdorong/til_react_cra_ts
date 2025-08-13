import TodoList from './components/todos/TodoList';
import TodoWrite from './components/todos/TodoWirte';
import { TodoProvider } from './context/TodoContext';

function App(): JSX.Element {
  // tsx 자리
  return (
    <TodoProvider>
      <div>
        <h1>할일 앱서비스</h1>
        <div>
          <TodoWrite />
          <TodoList />
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
