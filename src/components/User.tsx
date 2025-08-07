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
