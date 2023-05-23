import "./styles.css";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1); // 需要提供一个新的值
  };

  return (
    <>
      <div>
        <p>Count: {count}</p>
        <button onClick={increment}>Increment</button>
      </div>
      <hr />
      <CounterImmer />
    </>
  );
}

// 虽然 useImmerReducer 的确好用
// 但是 useImmer 却比 useState 麻烦

import { useImmer } from "use-immer";

function CounterImmer() {
  const [person, updatePerson] = useImmer({ name: "John", age: 30 });
  function handleAge() {
    // 由于 useImmer() 是 useState() 的增强，因此以下写法依然有效
    updatePerson({ ...person, age: person.age + 0.1 });

    // 通常的用法是传递一个函数，这在处理嵌套对象的更新时非常方便
    updatePerson((draft) => {
      return { ...draft, age: draft.age + 1 };
    });
    updatePerson((person) => {
      person.age = person.age.toFixed(1) / 1; // 保留1位小数
    });
  }

  const [count, setCount] = useImmer(0);
  const increment = () => {
    // 类似于 useState()
    setCount(count + 1);
  };
  const decrement = () => {
    setCount((count) => {
      return (count = count - 1);
    });
    setCount((count) => (count = count - 1)); // ok
    setCount((count) => --count); // ok
    setCount((count) => count--); // not work
  };

  return (
    <>
      <div>
        <p>Count: {count}</p>
        <button onClick={increment}>Increment as useState()</button>{" "}
        <button onClick={decrement}>decrement</button>
        <p>
          {person.name} is {person.age} years old.
        </p>
        <button onClick={handleAge}>updatePerson</button>
      </div>
      <hr />
    </>
  );
}
