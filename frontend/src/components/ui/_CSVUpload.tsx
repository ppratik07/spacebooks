import React, { useState } from 'react';
import axios from 'axios';

const CSVUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [eventId, setEventId] = useState<number | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleEventIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = parseInt(e.target.value, 10);
    if (!isNaN(id)) {
      setEventId(id);
    } else {
      setEventId(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !eventId) {
      alert('Please select a file and enter a valid event ID.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('eventId', eventId.toString());

    try {
      const response = await axios.post('http://localhost:5000/upload-csv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('File uploaded and processed successfully');
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file');
    }
  };

  return (
    <div>
      <h2>Upload Floor Plan CSV</h2>
      <input
        type="number"
        placeholder="Event ID"
        onChange={handleEventIdChange}
        value={eventId ?? ''}
      />
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default CSVUpload;
