import { useState } from 'react';

function Form({ onAdd }) {
  const [taskName, setTaskName] = useState('');

  const handleChange = e => {
    setTaskName(e.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAdd({text: taskName})
    setTaskName('')
  }

  return (
    <form className='todo-form' onSubmit={handleSubmit}>
      <button type='submit' className='todo-button'>+</button>
      <input
        type='text'
        placeholder='Adicione algo na lista' 
        value={taskName} 
        onChange={handleChange} 
      />
    </form>
  );
}

export default Form;