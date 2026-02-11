function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
    console.log(count);
    setCount(prev => prev + 1);
    console.log(count);
    setCount(count + 1);
    console.log(count);
  };

  return <button onClick={increment}>{count}</button>;
}