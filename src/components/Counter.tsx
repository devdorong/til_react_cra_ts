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
      <h2>Counter : {count}</h2>
      <button onClick={handleAdd}>증가</button>
      <button onClick={handleMinus}>감소</button>
      <button onClick={handleReset}>초기화</button>
      <button onClick={handleMulti}>2배</button>
      <button onClick={handleSquare}>제곱</button>
    </div>
  );
};

export default Counter;
