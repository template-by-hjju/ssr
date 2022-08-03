import React, { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  const increaseClick = () => setCount(count => count + 1);
  const decreaseClick = () => setCount(count => count - 1);

  return (
    <>
      <div>Count : {count}</div>

      <div>
        <button onClick={increaseClick}>Increase</button>
        <button onClick={decreaseClick}>Decrease</button>
      </div>
    </>
  );
}

export default App;
