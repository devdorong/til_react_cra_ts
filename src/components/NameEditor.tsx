import { ChangeEvent, useState } from 'react';

// 1. 타입 정의
type JSXElement = () => JSX.Element;
type ChangeEventInput = (e: ChangeEvent<HTMLInputElement>) => void;
type ClickEventButton = () => void;
type NameType = string;

// 2. 인터페이스 정의
interface IJSXElement {
  (): JSX.Element;
}

interface IChangeEventInput {
  (e: ChangeEvent<HTMLInputElement>): void;
}
interface IClickEventButton {
  (): void;
}
const NameEditor: JSXElement | IJSXElement = (): JSX.Element => {
  //ts
  const [name, setName] = useState<NameType>('');
  const handleName: ChangeEventInput | IChangeEventInput = (e): void => {
    setName(e.target.value);
  };
  const handleClick: ClickEventButton | IClickEventButton = (): void => {
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
        <button onClick={handleClick}>확인</button>
      </div>
    </div>
  );
};

export default NameEditor;
