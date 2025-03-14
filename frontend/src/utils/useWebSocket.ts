// import { useCallback, useEffect, useRef, useState } from 'react';
// import { io } from 'socket.io-client';

// export const useWebSocket = (url: string) => {
//   const socketRef = useRef(null);
//   const files = {};

//   socketRef.current = io(url);

//   const connect = useCallback(
//     (socketRef) => {
//       socketRef.current.on('connect', () => {
//         console.log('Connected to WebSocket server');
//       });
//     },
//     [url]
//   );

//   const disconnect = useCallback(
//     (socketRef) => {
//       socketRef.current.disconnect();
//       console.log('Disconnected');
//     },
//     [socketRef]
//   );

//   useEffect(() => {
//     connect(socketRef);
//     return () => {
//       // clear up all sockets
//       disconnect(socketRef);
//     };
//   }, [connect, disconnect]);
//   return { connect, disconnect, socketRef };
// };
