# useState

- 리액트용 변수이다. (수업편의)
- set으로 값을 변화시키면 리랜더링을 한다.

## 0. `@`으로 절대경로 설정하기

- tsconfig.json

```json
"baseUrl": "src", // 프로젝트의 기본 경로
"paths": {
  "@/*": ["*"], // @/ 로 src 폴더 전체를 참조
  "@types/*": ["types/*"] // @types 로 src/types 참조
},
```

## 1. 기본예제

- /src/components 폴더 생성
- Counter.tsx 파일 생성

```tsx
import { useState } from 'react';

// 2번 이상 반복되고, 가독성이 떨어집니다.
// 1. type 으로 정의해 보자.
type VoidFunction = () => void;
type JSXElement = () => JSX.Element;

// 2. interface 로 정의해 보자.
interface IVoidFunction {
  (): void;
}
interface IJSXElement {
  (): JSX.Element;
}

const Counter: IJSXElement | JSXElement = () => {
  // ts 자리
  const [count, setCount] = useState<number>(0);
  const handleAdd: IVoidFunction | VoidFunction = () => {
    setCount(count + 1);
  };
  const handleMinus: IVoidFunction | VoidFunction = () => {
    setCount(count - 1);
  };
  const handleReset: IVoidFunction | VoidFunction = () => {
    setCount(0);
  };
  const handleMulti: IVoidFunction | VoidFunction = () => {
    setCount(count * 2);
  };
  const handleSquare: IVoidFunction | VoidFunction = () => {
    setCount(count * count);
  };

  // tsx 자리
  return (
    <div>
      <h1>Counter : {count}</h1>
      <button onClick={handleAdd}>증가</button>
      <button onClick={handleMinus}>감소</button>
      <button onClick={handleReset}>초기화</button>
      <button onClick={handleMulti}>2배</button>
      <button onClick={handleSquare}>제곱</button>
    </div>
  );
};

export default Counter;
```

## 2. 실습 예제

### 2.1. 실습 예제 1

- /src/components/NameEditor.tsx

```tsx
import { ChangeEvent, MouseEvent, useState } from 'react';

// 1. 타입 정의
type JSXElement = () => JSX.Element;
type ChangeEventInput = (e: ChangeEvent<HTMLInputElement>) => void;
type ClickEventButton = (e: MouseEvent<HTMLButtonElement>) => void;
type NameType = string;

// 2. 인터페이스 정의
interface IJSXElement {
  (): JSX.Element;
}

interface IChangeEventInput {
  (e: ChangeEvent<HTMLInputElement>): void;
}
interface IClickEventButton {
  (e: MouseEvent<HTMLButtonElement>): void;
}
const NameEditor: JSXElement | IJSXElement = (): JSX.Element => {
  //ts
  const [name, setName] = useState<NameType>('');
  const handleName: ChangeEventInput | IChangeEventInput = (e): void => {
    setName(e.target.value);
  };
  const handleClick: ClickEventButton | IClickEventButton = (e): void => {
    console.log(name);
    setName('');
  };
  //tsx
  return (
    <div>
      <h2>NameEditor : {name}</h2>
      <div>
        <input
          type="text"
          value={name}
          onChange={e => handleName(e)}
          placeholder="변경될 이름을 입력해주세요"
        />
        <button onClick={e => handleClick(e)}>확인</button>
      </div>
    </div>
  );
};

export default NameEditor;
```

### 2.2. 실습 예제 2

- /src/components/ToggleSwitch.tsx

```tsx
import { useState } from 'react';
// 1. type
type JSXElement = () => JSX.Element;
type ClickType = () => void;
type ToggleType = boolean;

// 2. interface
interface IJSXElement {
  (): JSX.Element;
}
interface IClickType {
  (): void;
}

const ToggleSwitch: JSXElement | IJSXElement = () => {
  // ts
  const [isOn, setIsOn] = useState<ToggleType>(false);

  const handleClick: ClickType | IClickType = () => {
    setIsOn(!isOn);
  };

  // tsx
  return (
    <div>
      <h2>ToggleSwitch : {isOn ? '밝아요' : '어두워요'}</h2>
      <div>
        <button onClick={handleClick}>토글</button>
      </div>
    </div>
  );
};

export default ToggleSwitch;
```

### 2.3. 실습 예제 3

- /src/components/User.tsx

```tsx
import { ChangeEvent, useState } from 'react';
// 1. type 정의
type UserType = { age: number; name: string };
type AddType = () => void;
type MinusType = () => void;
type EditType = (e: ChangeEvent<HTMLInputElement>) => void;
type ClickType = () => void;

// 2. interface 정의
interface IUserType {
  age: number;
  name: string;
}
interface IAddType {
  (): void;
}
interface IMinusType {
  (): void;
}
interface IEditType {
  (e: ChangeEvent<HTMLInputElement>): void;
}
interface IClickType {
  (): void;
}

const User = () => {
  //ts
  const [user, setUser] = useState<UserType | IUserType>({ name: '아이유', age: 20 });
  const handleAdd: AddType | IAddType = () => {
    setUser({ ...user, age: user.age + 1 });
  };
  const handleMinus: MinusType | IMinusType = () => {
    setUser({ ...user, age: user.age - 1 });
  };
  const handleEdit: EditType | IEditType = e => {
    setUser({ ...user, name: e.target.value });
  };
  const handleClick: ClickType | IClickType = () => {
    console.log(user.name);
  };
  //tsx
  return (
    <div>
      <h2>
        User : {user.name}님 나이는 {user.age} 입니다.{' '}
      </h2>
      <div>
        <button onClick={handleAdd}>나이 증가</button>
        <button onClick={handleMinus}>나이 감소</button>
      </div>
      <div>
        <input type="text" placeholder="변경할 이름" onChange={e => handleEdit(e)} />
        <button onClick={handleClick}>수정</button>
      </div>
    </div>
  );
};

export default User;
```

## 2.4. 실습 예제 4. (useState 버전 Todo)

- 타입 정의를 위한 폴더 : /src/types 폴더 생성
  - todoType.ts 파일 생성

- 글쓰기 : /src/todos/TodoWirte.tsx
  - 입력창, 등록버튼

- 글목록 : /src/todos/TodoList.tsx

- 글한개의 아이템 : /src/todos/TodoItem.tsx
  - 아이디, 제목, 완료여부, 수정버튼, 삭제버튼
  - 상태 2가지 : 목록상태, 편집상태

- /src/App.tsx

```tsx
import { useState } from 'react';
import TodoList from './components/todos/TodoList';
import TodoWirte from './components/todos/TodoWirte';

// 공통으로 사용하는 type 정의 및 interface 는 별도의 폴더에 보관하자.
import { ITodoType, TodoType } from './types/todoType';

// 테스트를 위한 목업 데이터 (/src/api/dummy.ts 추천)
const initialTodos: TodoType[] = [];

function App(): JSX.Element {
  // ts
  // {id: "", title: "", completed:false}
  const [todos, setTodos] = useState<(ITodoType | TodoType)[]>(initialTodos);
  // todos 를 업데이트 하는 함수
  const handleTodoUpdate = (newTodo: TodoType): void => {
    // setTodos(prev => [newTodo, ...prev]);
    const arr: TodoType[] = [newTodo, ...todos];
    setTodos(arr);
  };
  // // todo 목록에서 실행할 함수들
  // const onToggle = (id: number): void => {
  //   console.log('onToggle : ', id);
  //   // 전달 받은 ID 를 이용해서 map 으로 찾아서 id 가 같으면 completed 변경
  //   const arr: TodoType[] = todos.map(todo =>
  //     todo.id === id ? { ...todo, completed: !todo.completed } : todo,
  //   );
  //   setTodos(arr);
  // };
  // todo 목록에서 실행할 함수들
  const onToggle = (id: number): void => {
    // console.log('onToggle :', id);
    // 전달 받은 ID 를 이용해서 찾아서 complete 변경
    const arr: TodoType[] = todos.map(item => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      } else {
        return item;
      }
    });
    //   item.id === id ? { ...item, completed: !item.completed } : item,
    // );
    setTodos(arr);
  };
  const onDelete = (id: number): void => {
    // console.log('onDelete :', id);
    // 전달 받은 ID 를 제외한 나머지 즉, amp 으로 새 목록(배열)으로 변경
    const arr: TodoType[] = todos.filter(todo => todo.id !== id);
    setTodos(arr);
  };
  const onEdit = (id: number, newTitle: string): void => {
    // console.log('onEdit id', id);
    // console.log('onEdit newTitle', newTitle);
    // 아이디와 새로운 타이틀을 알 수 있다.
    // 아이디를 이용해서 해당 타이틀을 ㅅ정하고, 업데이트 해보자.
    const arr: TodoType[] = todos.map(item => {
      if (item.id === id) {
        return { ...item, title: newTitle };
      } else {
        return item;
      }
    });
    setTodos(arr);
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
```

- /src/components/todos/TodoItem.tsx

```tsx
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
```

- /src/components/todos/TodoList.tsx

```tsx
import { TodoType } from '../../types/todoType';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: TodoType[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newTitle: string) => void;
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
```

- /src/components/todos/TodoWrite.tsx

```tsx
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
```

- /src/types/todoType.ts

```ts
// 1. type
export type TodoType = {
  id: number;
  title: string;
  completed: boolean;
};
// 2. interface
export interface ITodoType {
  id: number;
  title: string;
  completed: boolean;
}
```
