import React from 'react';

function Settings({ unit, setUnit, isDarkMode, setIsDarkMode }) {
  return (
    <div className="settings">
      <h2>Settings</h2>
      <div className='form-group'>
        <label>Unit:</label>
        <select value={unit} onChange={(e) => setUnit(e.target.value)}>
          <option value="metric">Celsius</option>
          <option value="imperial">Fahrenheit</option>
        </select>
      </div>
      <div className='form-group'>
        <label>Dark Mode:</label>
        <input type="checkbox" className='checkbox' checked={isDarkMode} onChange={() => setIsDarkMode(!isDarkMode)} />
      </div>
    </div>
  );
}

export default Settings;
