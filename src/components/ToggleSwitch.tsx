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
