import React, { useState } from 'react';
import Checkbox from './Icons/Checkbox';
import Edit from './Icons/Edit';
import Remove from './Icons/Remove';

function Task({ name, done, onToggle, onEdit, onRemove }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);

  const handleEdit = () => {
    if (!done) {
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    if (!done) {
      onEdit(editedName);
      setIsEditing(false);
    }
  };

  return (
    <div className={'task ' + (done ? 'done' : 'not-done')}>
      <Checkbox checked={done} onClick={() => onToggle(!done)} />
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="edit-input"
          />
          {done ? null : (
            <button
              className="edit-btn save-btn"
              onClick={handleSave}
            >
              Save
            </button>
          )}
        </>
      ) : (
        <>
          <span>{name}</span>
          <div className='option-buttons'>
            <Edit
              className={`edit-btn ${done ? 'disabled' : ''}`}
              onClick={handleEdit}
              disabled={done}
            />
            <Remove
              className={`remove-btn ${done ? 'disabled' : ''}`}
              onClick={() => onRemove()}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Task;
