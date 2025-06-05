import React, { useState } from 'react';
import './UploadFile.css';
import axios from 'axios';

function UploadFile() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [prediction, setPrediction] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("Log in handleFileChange...\n")
    if (file) {
      setSelectedFile(file);
      setUploadStatus('');
      setPrediction('');
    }
  };

  const handleUpload = async () => {
    console.log("Log in handleUpload...\n")
    if (!selectedFile) {
      setUploadStatus('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('video', selectedFile);
    console.log("Log after formdata...\n")

    try {
      setUploadStatus('Uploading...');
      console.log("Log before sending request..\n")
      const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      console.log("\nLog after sending rewuest...", response,"\nRes.data = ", response.data, "\n")
      setUploadStatus('File uploaded successfully!');
      setPrediction(`Prediction: ${response.data.prediction}`);
    } catch (error) {
      setUploadStatus('Error uploading file. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="upload-container">
      <h1 className="upload-title">Upload a Video File</h1>
      <div className="upload-input-container">
        <label htmlFor="file-upload" className="upload-label">
          Choose File
        </label>
        <input
          id="file-upload"
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="upload-input"
        />
      </div>
      {selectedFile && <p className="file-name">Selected File: {selectedFile.name}</p>}
      <button className="upload-button" onClick={handleUpload}>
        Upload and Predict
      </button>
      {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
      {prediction && <p className="prediction-result">{prediction}</p>}
    </div>
  );
}

export default UploadFile;


// import React, { useState } from 'react';
// import './UploadFile.css';
// import axios from 'axios';

// function UploadFile() {
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [uploadStatus, setUploadStatus] = useState('');
//     const [prediction, setPrediction] = useState('');

//     const handleFileChange = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             setSelectedFile(file);
//             setUploadStatus('');
//             setPrediction('');
//         }
//     };

//     const handleUpload = async () => {
//         if (!selectedFile) {
//             setUploadStatus('Please select a file to upload.');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('video', selectedFile);
//         formData.append('user_id', '64efbfc9d0e3fa001ff5e1b4'); // Replace with actual user_id
//         formData.append('camera_id', '64efbfc9d0e3fa001ff5e1c5'); // Replace with actual camera_id

//         try {
//             setUploadStatus('Uploading...');
//             const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/detectionData`, {
//                 formData,
//                 user_id: '64efbfc9d0e3fa001ff5e1b4',
//                 camera_id: '64efbfc9d0e3fa001ff5e1c5',
//             }, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });

//             setUploadStatus('File uploaded and data processed successfully!');
//             setPrediction(`Prediction: ${response.data.flaskData.prediction}`);
//             console.log('Extra Data:', response.data.extraData);
//         } catch (error) {
//             setUploadStatus('Error uploading file. Please try again.');
//             console.error('Error:', error.message);
//         }
//     };

//     return (
//         <div className="upload-container">
//             <h1 className="upload-title">Upload a Video File</h1>
//             <div className="upload-input-container">
//                 <label htmlFor="file-upload" className="upload-label">
//                     Choose File
//                 </label>
//                 <input
//                     id="file-upload"
//                     type="file"
//                     accept="video/*"
//                     onChange={handleFileChange}
//                     className="upload-input"
//                 />
//             </div>
//             {selectedFile && <p className="file-name">Selected File: {selectedFile.name}</p>}
//             <button className="upload-button" onClick={handleUpload}>
//                 Upload and Predict
//             </button>
//             {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
//             {prediction && <p className="prediction-result">{prediction}</p>}
//         </div>
//     );
// }

// export default UploadFile;
