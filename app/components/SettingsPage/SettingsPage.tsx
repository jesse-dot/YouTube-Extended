import React, { useState } from 'react';

const SettingsPage = () => {
  const [serverUrl, setServerUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [message, setMessage] = useState('');

  const handleSave = () => {
    try {
      localStorage.setItem('serverUrl', serverUrl);
      localStorage.setItem('apiKey', apiKey);
      setMessage('Settings saved successfully!');
    } catch (error) {
      setMessage('Failed to save settings.');
    }
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <div className="form-group">
        <label htmlFor="serverUrl">Server URL:</label>
        <input
          type="text"
          id="serverUrl"
          value={serverUrl}
          onChange={(e) => setServerUrl(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="apiKey">API Key:</label>
        <input
          type="text"
          id="apiKey"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
      </div>
      <button onClick={handleSave}>Save</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SettingsPage;
