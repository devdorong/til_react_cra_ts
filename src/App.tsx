type DemeProps = {
  name: string;
  age: string;
};
const Demo = ({ name, age }: DemeProps): JSX.Element => {
  return (
    <div>
      {name}이구요, {age}살 입니다.
    </div>
  );
};

type SampleProps = {
  children?: React.ReactNode;
  title: string;
};

const Sample = ({ children, title }: SampleProps): JSX.Element => {
  return (
    <div>
      <h2>Sample</h2>
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
};

const App = (): JSX.Element => {
  return (
    <div>
      <h1>App</h1>
      <Sample title="Props 전달된 title 입니다.">
        <p>Children 입니다.</p>
      </Sample>
      <Demo name="도롱" age="30" />
    </div>
  );
};

export default App;
