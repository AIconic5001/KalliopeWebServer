// import ReplyIcon from '@mui/icons-material/Reply';
// import { Button, Stack } from '@mui/material';
// import Grid from '@mui/material/Grid2';
// import { useCallback, useEffect, useRef, useState } from 'react';
// import { GridDataType, SummariesDataType } from '../../@types/SynopsisData/grid.type';
// import DataGrid from '../../components/DataGrid/DataGrid';
// import ButtonGrid from './ButtonGrid/ButtonGrid';
// import CardItem from './CardItemList/CardItemList';
// import { useGetSummaries } from './handleFilesApi';
// import './styles.scss';
// import { data, useNavigate, useParams } from 'react-router';
// import LoadingSuspense from '../../components/LoadingSuspense';
// // import { useWebSocket } from '../../utils/useWebSocket';
// import { io } from 'socket.io-client';

// // Rest of code.
// SynopsisPage.propTypes = {};

// const row: GridDataType = {
//   title: 'Demo Paper',
//   authors: ['Prf. A', 'Prf. B'],
//   publicationDate: new Date('08/09/1996'),
//   relatedtopics: ['CS', 'AI', 'SWE']
// };

// function SynopsisPage() {
//   const socketRef = useRef(null);
//   const files = {};

//   socketRef.current = io('http://localhost:8000', { autoConnect: false });

//   const connect = useCallback(() => {
//     socketRef.current.connect();
//     socketRef.current.on('connect', () => {
//       console.log('Connected to WebSocket server');
//     });
//     socketRef.current.on('file_status_update', (data: any) => {
//       console.log('Received file status update:', data);
//     });
//   }, [socketRef]);

//   const disconnect = useCallback(() => {
//     socketRef.current.on('disconnect', () => {
//       console.log('Socket Disconnected');
//     });
//     socketRef.current.disconnect();

//     // Handle file status updates
//   }, [socketRef]);

//   useEffect(() => {
//     connect();
//     socketRef.current.off('file_status_update');
//   }, [connect, disconnect]);

//   const [status, setStatus] = useState('loading');
//   const [data, setData] = useState<SummariesDataType>({
//     'Conclusion and Implications': '',
//     Methodology: '',
//     Results: '',
//     'Research Problem and Objectives': ''
//   });

//   const res = useGetSummaries();

//   useEffect(() => {
//     setData(res?.data);
//   }, [res]);

//   return (
//     <div className='synopsis-page-container'>
//       {data ? (
//         <Stack spacing={6} mt={8}>
//           <div className='title-container'></div>
//           <div className='dataGrid-container'>
//             <div className='back-button-container'>
//               <Grid container spacing={2}>
//                 <Grid>
//                   <a href='/'>
//                     <Button variant='outlined' startIcon={<ReplyIcon sx={{ color: 'var(--primary-dark' }} />}>
//                       Back
//                     </Button>
//                   </a>
//                 </Grid>
//               </Grid>
//             </div>
//             <DataGrid row={row} />
//             <div> </div>
//           </div>

//           <CardItem summariesData={data} />

//           {/* <PdfDisplay /> */}
//           <div className='dataGrid-container'>
//             <div></div>
//             <ButtonGrid />
//           </div>
//         </Stack>
//       ) : (
//         <LoadingSuspense />
//       )}
//     </div>
//   );
// }

// export default SynopsisPage;

import ReplyIcon from '@mui/icons-material/Reply';
import { Button, Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useCallback, useEffect, useRef, useState } from 'react';
import { GridDataType, SummariesDataType } from '../../@types/SynopsisData/grid.type';
import DataGrid from '../../components/DataGrid/DataGrid';
import ButtonGrid from './ButtonGrid/ButtonGrid';
import CardItem from './CardItemList/CardItemList';
import { useGetSummaries } from './handleFilesApi';
import './styles.scss';
import { useNavigate, useParams } from 'react-router';
import LoadingSuspense from '../../components/LoadingSuspense';
import { io, Socket } from 'socket.io-client';

// Custom hook for socket.io management
function useSocket(url) {
  const [isConnected, setIsConnected] = useState(false);
  const [files, setFiles] = useState({});
  const [status, setStatus] = useState('processing');
  const socketRef = useRef(null);

  useEffect(() => {
    // Create a new socket instance
    const newSocket = io(url, {
      transports: ['websocket'],
      upgrade: false,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000
    });

    // Store the socket instance
    socketRef.current = newSocket;

    // Connection event handlers
    const onConnect = () => {
      console.log('Socket connected');
      setIsConnected(true);
    };

    const onDisconnect = () => {
      console.log('Socket disconnected');
      setIsConnected(false);
    };

    const onFileStatusUpdate = (data) => {
      console.log('Received file status update:', data);

      setFiles((prevFiles) => ({
        ...prevFiles,
        [data.session_id]: {
          filename: data.filename,
          status: data.status,
          progress: data.progress,
          timestamp: data.timestamp,
          error_message: data.error_message
        }
      }));

      setStatus(data.status);
    };

    // Add event listeners
    newSocket.on('connect', onConnect);
    newSocket.on('disconnect', onDisconnect);
    newSocket.on('file_status_update', onFileStatusUpdate);

    // Connect to the server
    newSocket.connect();

    // Cleanup function
    return () => {
      // Remove event listeners
      newSocket.off('connect', onConnect);
      newSocket.off('disconnect', onDisconnect);
      newSocket.off('file_status_update', onFileStatusUpdate);

      // Disconnect socket
      newSocket.disconnect();
    };
  }, [url]); // Only re-run if url changes

  // Return the socket instance and state
  return {
    socket: socketRef.current,
    isConnected,
    files,
    status
  };
}

// Main component
function SynopsisPage() {
  // const [status, setStatus] = useState('loading');
  const [data, setData] = useState<SummariesDataType>({
    'Conclusion and Implications': '',
    Methodology: '',
    Results: '',
    'Research Problem and Objectives': ''
  });

  // Use the custom hook
  const { socket, isConnected, files, status } = useSocket('http://localhost:8000');

  // Get summaries data
  const res = useGetSummaries();

  // Update data when API response changes
  useEffect(() => {
    if (res?.data) {
      setData(res.data);
    }
  }, [res]);

  const row: GridDataType = {
    title: 'Demo Paper',
    authors: ['Prf. A', 'Prf. B'],
    publicationDate: new Date('08/09/1996'),
    relatedtopics: ['CS', 'AI', 'SWE']
  };

  return (
    <div className='synopsis-page-container'>
      {data && status === 'done' ? (
        <Stack spacing={6} mt={8}>
          <div className='title-container'></div>

          <div className='dataGrid-container'>
            <div className='back-button-container'>
              <Grid container spacing={2}>
                <Grid>
                  <a href='/'>
                    <Button variant='outlined' startIcon={<ReplyIcon sx={{ color: 'var(--primary-dark' }} />}>
                      Back
                    </Button>
                  </a>
                </Grid>
              </Grid>
            </div>
            <DataGrid row={row} />
          </div>

          <CardItem summariesData={data} />

          {/* Display file statuses */}
          <div className='file-status-container'>
            <h3>File Status Updates</h3>
            {Object.keys(files).length > 0 ? (
              Object.entries(files).map(([sessionId, fileData]: [string, any]) => (
                <div
                  key={sessionId}
                  className='file-status-item'
                  style={{
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '10px',
                    margin: '5px 0'
                  }}
                >
                  <p>
                    <strong>File:</strong> {fileData.filename}
                  </p>
                  <p>
                    <strong>Status:</strong> {fileData.status}
                  </p>
                  <p>
                    <strong>Progress:</strong> {fileData.progress}%
                  </p>
                  {fileData.error_message && (
                    <p style={{ color: 'red' }}>
                      <strong>Error:</strong> {fileData.error_message}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p>No file status updates received yet.</p>
            )}
          </div>

          <div className='dataGrid-container'>
            <ButtonGrid />
          </div>
        </Stack>
      ) : (
        <LoadingSuspense />
      )}
    </div>
  );
}

export default SynopsisPage;
