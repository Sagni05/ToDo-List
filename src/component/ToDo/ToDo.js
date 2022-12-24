import React, { useState } from "react";
import List from "./List";


const Todo = () => {
  const [cur, update] = useState("");
  const [cur1, update1] = useState([]);
  let setitem = (e) => {
    update(e.target.value);
  };

  let click = () => {
    update1((output) => {
      return [...output, cur];
    });

    update("");
  };

  let dele = (id) => {
    update1((output) => {
      return output.filter((index) => {
        return index !== id;
      });
    });
  };

  return (
    <>
      <div className="main">
        <h1>ToDo List </h1>

        <input
          type="text"
          placeholder="Add a Items"
          onChange={setitem}
          value={cur}
        />
        <button onClick={click}>+</button>

        <ol>
          {cur1.map((el, index) => {
            return <List key={index} id={index} text={el} onselect={dele} />;
          })}
        </ol>
      </div>
    </>
  );
};

export default Todo;
