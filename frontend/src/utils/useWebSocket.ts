import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

export default function useSocket(url) {
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
      newSocket.off('file_status_update', onFileStatusUpdate);
      newSocket.off('disconnect', onDisconnect);

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
