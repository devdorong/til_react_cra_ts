import { TodoType } from '@/types/todoType';
import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';

// 전역 state 에서 관리할 데이터 모양
type TodoState = {
  todos: TodoType[];
};

// 1. 초기값
const initialState: TodoState = {
  todos: [],
};

// 2. Reducer 함수 : action 으로 state 를 관리하는 함수
// - 매개변수로 state 와 action 이 전달됨
// - action 의 모양 {type:string, payload: {id:0, title:"", complted:false}}
// - action 의 모양 {type:string, payload: TodoType} 위와같다.
// 위보단 아래가 낫다.
// type AddAction = {
//   type: 'ADD' | 'TOGGLE' | 'DELETE' | 'EDIT';
//   payload: TodoType | { id: number } | { id: number; title: string };
// };

type AddAction = { type: 'ADD'; payload: TodoType };
type ToggleAction = { type: 'TOGGLE'; payload: { id: number } };
type DeleteAction = { type: 'DELETE'; payload: { id: number } };
type EditAction = { type: 'EDIT'; payload: { id: number; title: string } };

type TodoAction = AddAction | ToggleAction | DeleteAction | EditAction;

function todosReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD': {
      // {type:"ADD", payload: {id:new Date(), title:"안녕", complted:false}}
      const todo: TodoType = action.payload;
      return { ...state, todos: [todo, ...state.todos] };
    }
    case 'TOGGLE': {
      // {id:number}
      // const id = action.payload.id;
      const { id } = action.payload;
      const arr: TodoType[] = state.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      );
      return { ...state, todos: arr };
    }
    case 'DELETE': {
      // {id:number}
      // const id = action.payload.id;
      const { id } = action.payload;
      const arr: TodoType[] = state.todos.filter(todo => todo.id !== id);
      return { ...state, todos: arr };
    }
    case 'EDIT': {
      // {id: number, title: string}
      const { id, title } = action.payload;
      const arr: TodoType[] = state.todos.map(todo => (todo.id === id ? { ...todo, title } : todo));
      return { ...state, todos: arr };
    }

    default:
      return state;
  }
}

// 3. Context 생성
// - Context 에서 관리할 Value 타입
type TodoContextValue = {
  todos: TodoType[];
  addTodo: (todos: TodoType) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, title: string) => void;
};
const TodoContext = createContext<TodoContextValue | null>(null);
// 4. Provide 생성
// export const TodoProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
export const TodoProvider = ({ children }: React.PropsWithChildren): JSX.Element => {
  // 5. useReduce 로 state 관리하기
  const [state, dispatch] = useReducer(todosReducer, initialState);
  // dispatch 전용 함수
  const addTodo = useCallback((todo: TodoType) => {
    dispatch({ type: 'ADD', payload: todo });
  }, []);
  // const addTodo = (todo: TodoType) => {
  //   dispatch({ type: 'ADD', payload: todo });
  // };
  const toggleTodo = useCallback((id: number) => {
    dispatch({ type: 'TOGGLE', payload: { id } });
  }, []);
  // const toggleTodo = (id: number) => {
  //   dispatch({ type: 'TOGGLE', payload: { id } });
  // };
  const deleteTodo = useCallback((id: number) => {
    dispatch({ type: 'DELETE', payload: { id } });
  }, []);
  // const deleteTodo = (id: number) => {
  //   dispatch({ type: 'DELETE', payload: { id } });
  // };
  const editTodo = useCallback((id: number, title: string) => {
    dispatch({ type: 'EDIT', payload: { id, title } });
  }, []);
  // const editTodo = (id: number, title: string) => {
  //   dispatch({ type: 'EDIT', payload: { id, title } });
  // };

  // Context 의 value 는 현재 {} 로 정의되어 있다.
  const value = useMemo(
    () => ({
      todos: state.todos,
      addTodo,
      toggleTodo,
      deleteTodo,
      editTodo,
    }),
    [state.todos, addTodo, toggleTodo, deleteTodo, editTodo],
  );
  // const value: TodoContextValue = {
  //   todos: state.todos,
  //   addTodo,
  //   toggleTodo,
  //   deleteTodo,
  //   editTodo,
  // };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

// 커스텀 훅
export function useTodos() {
  const ctx = useContext(TodoContext);
  if (!ctx) {
    throw new Error('ctx 가 없어요.');
  }
  return ctx;
}
