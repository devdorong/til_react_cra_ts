# useState

- 리액트용 변수이다. (수업편의)
- set으로 값을 변화시키면 리랜더링을 한다.

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
