// import React, { useState, useEffect, useRef } from 'react';
// import { io } from 'socket.io-client';

// const FileProcessor = () => {
//   const [file, setFile] = useState(null);
//   const [fileStatus, setFileStatus] = useState({
//     status: 'not_yet_start',
//     filename: '',
//     startTime: null,
//     lastUpdateTime: null,
//     errorMessage: null
//   });
//   const [isUploading, setIsUploading] = useState(false);
//   const [sessionId, setSessionId] = useState(null);

//   const socketRef = useRef(null);

//   // Socket connection and event listeners
//   useEffect(() => {
//     socketRef.current = io('http://localhost:5000');

//     socketRef.current.on('connect', () => {
//       console.log('Connected to WebSocket server');

//       // Re-register session if we have a previous session ID
//       if (sessionId) {
//         socketRef.current.emit('register_session', { session_id: sessionId });
//       }
//     });

//     // Listen for file status updates
//     socketRef.current.on('file_status_update', (data) => {
//       setFileStatus({
//         status: data.status,
//         filename: data.filename,
//         startTime: new Date(data.start_time),
//         lastUpdateTime: new Date(data.last_update_time),
//         errorMessage: data.error_message
//       });
//     });

//     return () => {
//       if (socketRef.current) {
//         socketRef.current.disconnect();
//       }
//     };
//   }, [sessionId]);

//   // File upload handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!file) {
//       alert('Please select a file first');
//       return;
//     }

//     setIsUploading(true);

//     try {
//       const formData = new FormData();
//       formData.append('file', file);

//       const response = await fetch('http://localhost:5000/upload', {
//         method: 'POST',
//         body: formData
//       });

//       const result = await response.json();

//       if (result.success) {
//         setSessionId(result.session_id);
//         socketRef.current.emit('register_session', { session_id: result.session_id });
//       } else {
//         alert(`Upload failed: ${result.error}`);
//       }
//     } catch (error) {
//       alert(`Upload error: ${error.message}`);
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   // Render status details
//   const renderStatusDetails = () => {
//     switch (fileStatus.status) {
//       case 'not_yet_start':
//         return <div className='status not-started'>Waiting to start processing</div>;
//       case 'processing':
//         return (
//           <div className='status processing'>
//             <p>Processing in progress...</p>
//             <p>Started at: {fileStatus.startTime?.toLocaleString()}</p>
//           </div>
//         );
//       case 'done':
//         return (
//           <div className='status completed'>
//             <p>Processing completed!</p>
//             <p>Finished at: {fileStatus.lastUpdateTime?.toLocaleString()}</p>
//           </div>
//         );
//       case 'error':
//         return (
//           <div className='status error'>
//             <p>Processing failed</p>
//             <p>Error: {fileStatus.errorMessage}</p>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className='file-processor'>
//       <h1>File Processor</h1>

//       <form onSubmit={handleSubmit}>
//         <input type='file' onChange={(e) => setFile(e.target.files[0])} disabled={isUploading} />
//         <button type='submit' disabled={!file || isUploading}>
//           {isUploading ? 'Uploading...' : 'Upload File'}
//         </button>
//       </form>

//       {fileStatus.filename && (
//         <div className='status-container'>
//           <h2>File: {fileStatus.filename}</h2>
//           {renderStatusDetails()}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileProcessor;
