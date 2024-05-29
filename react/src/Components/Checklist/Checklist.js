import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './Checklist.css';

const Checklist = ({ initialItems }) => {
  // Load checklist items from local storage, if available
  const savedItems = JSON.parse(localStorage.getItem('checklistItems')) || [];
  const [items, setItems] = useState(
    initialItems.map((item) => ({
      ...item,
      checked: savedItems.some((savedItem) => savedItem.id === item.id && savedItem.checked),
    }))
  );

  // Function to handle checkbox toggling
  const toggleCheckbox = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // Save checklist items to local storage whenever items change
  useEffect(() => {
    localStorage.setItem('checklistItems', JSON.stringify(items));
  }, [items]);

  return (
    <div>
      <ul className="checklist">
        {items.map((item) => (
          <li key={item.id}>
            <label>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleCheckbox(item.id)}
              />
              <span className={item.checked ? 'checked' : ''}>{item.text}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

Checklist.propTypes = {
  initialItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Checklist;
