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
        <p>Count by useState: {count}</p>
        <button onClick={increment}>Increment</button>
      </div>
      <hr />
      <CounterImmer />
    </>
  );
}

// 使用 useImmer 替代 useState

import { useImmer } from "use-immer";

function CounterImmer() {
  const [person, updatePerson] = useImmer({ name: "John", age: 30 });
  function handleAge() {
    // 由于 useImmer() 是 useState() 的增强，因此以下写法依然有效
    updatePerson({ ...person, age: person.age + 0.1 });

    // 通常的用法是传递一个函数，这在处理嵌套对象的更新时非常方便
    // 详见 https://react.dev/learn/updating-objects-in-state#updating-a-nested-object
    updatePerson((draft) => {
      return { ...draft, age: draft.age + 1 }; // 这也是类似于 useState 的写法，更烦冗，还不如上面的简洁
    });
    updatePerson((draft) => {
      // 这才是 useImmer 的推荐写法
      draft.age = draft.age.toFixed(1) / 1; // 保留1位小数
    });
  }

  const [count, setCount] = useImmer(0);
  const increment = () => {
    // 类似于 useState()
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count - 1); // 依然有效
    // setCount(--count); // error
    setCount((c) => (c = c - 1)); // ok
    setCount((c) => {
      return (c = c - 1); // wordy
    });
    setCount((c) => c--); // not work
    setCount((c) => --c); // ok
  };

  return (
    <>
      <div>
        <p>Count by useImmer: {count}</p>
        <button onClick={increment}>Increment as useState()</button>{" "}
        <button onClick={decrement}>decrement 2</button>
        <p>
          {person.name} is {person.age} years old.
        </p>
        <button onClick={handleAge}>updatePerson</button>
      </div>
      <hr />
    </>
  );
}
