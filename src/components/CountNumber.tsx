import { useEffect, useState } from 'react'
import { Button } from './ui/button';

const CountNumber = () => {
    const [count, setCount] = useState(0);
    const [name, setName] = useState("Guest");
    let [message, setMessage] = useState("Hello, Guest you can count now");

    useEffect(() => {
        setMessage("You count " + count);
        if(count >= 5) setName("I change your name!");
    }, [count]);

    function handleIncrease() {
        setCount(count + 1);
    }

    function handleDecrease() {
        if(count <= 0) return;
        setCount(count - 1);
    }

  return (
    <div>
        <Button onClick={handleDecrease}>-</Button>
        <span className='mx-3 text-3xl font-semibold text-green-400'>{count}</span>
        <Button onClick={handleIncrease}>+</Button>
        <p className='text-rose-400'>{name}</p>
        <p className='text-blue-300 font-bold'>{message}</p>
    </div>
  )
}

export default CountNumber