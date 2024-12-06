// import React, { useEffect, useState } from 'react';
// import AgoraRTC from 'agora-rtc-sdk-ng';
// import {
//   Box,
//   Button,
//   Flex,
//   useToast,
//   IconButton
// } from '@chakra-ui/react';
// import { PhoneIcon, SettingsIcon, ViewIcon } from '@chakra-ui/icons';

// const VideoConferencia = ({ consultaId, onClose }) => {
//   const [client, setClient] = useState(null);
//   const [localVideoTrack, setLocalVideoTrack] = useState(null);
//   const [remoteVideoTrack, setRemoteVideoTrack] = useState(null);
//   const toast = useToast();

//   useEffect(() => {
//     const initializeAgora = async () => {
//       const agoraClient = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
//       setClient(agoraClient);

//       try {
//         const response = await fetch('http://localhost:5000/videochamada/iniciar', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${localStorage.getItem('authToken')}`
//           },
//           body: JSON.stringify({ consultaId })
//         });

//         const data = await response.json();
        
//         if (data.success) {
//           await joinChannel(agoraClient, data.data);
//         } else {
//           throw new Error(data.message);
//         }
//       } catch (error) {
//         toast({
//           title: 'Erro ao iniciar videochamada',
//           description: error.message,
//           status: 'error',
//           duration: 5000,
//           isClosable: true,
//         });
//       }
//     };

//     initializeAgora();

//     return () => {
//       leaveChannel();
//     };
//   }, [consultaId]);

//   const joinChannel = async (agoraClient, channelData) => {
//     try {
//       await agoraClient.join(
//         channelData.appId,
//         channelData.channelName,
//         channelData.token,
//         null
//       );

//       const localTrack = await AgoraRTC.createCameraVideoTrack();
//       setLocalVideoTrack(localTrack);
//       await agoraClient.publish(localTrack);

//       agoraClient.on('user-published', async (user, mediaType) => {
//         await agoraClient.subscribe(user, mediaType);
//         if (mediaType === 'video') {
//           setRemoteVideoTrack(user.videoTrack);
//         }
//       });

//     } catch (error) {
//       console.error('Erro ao entrar no canal:', error);
//       toast({
//         title: 'Erro na videochamada',
//         description: 'Não foi possível estabelecer a conexão',
//         status: 'error',
//         duration: 5000,
//         isClosable: true,
//       });
//     }
//   };

//   const leaveChannel = async () => {
//     try {
//       if (localVideoTrack) {
//         localVideoTrack.close();
//       }
//       if (client) {
//         await client.leave();
//       }

//       await fetch('http://localhost:5000/videochamada/encerrar', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('authToken')}`
//         },
//         body: JSON.stringify({ consultaId })
//       });

//       onClose();
//     } catch (error) {
//       console.error('Erro ao sair do canal:', error);
//     }
//   };

//   return (
//     <Box p={4}>
//       <Flex direction="column" gap={4}>
//         <Flex justify="space-between">
//           <Box id="local-video" w="45%" h="400px" bg="gray.100" borderRadius="md">
//             {localVideoTrack && localVideoTrack.play('local-video')}
//           </Box>
//           <Box id="remote-video" w="45%" h="400px" bg="gray.100" borderRadius="md">
//             {remoteVideoTrack && remoteVideoTrack.play('remote-video')}
//           </Box>
//         </Flex>
//         <Flex justify="center" gap={4}>
//           <IconButton
//             icon={<ViewIcon />}
//             onClick={() => {/* Toggle câmera */}}
//             colorScheme="blue"
//           />
//           <IconButton
//             icon={<PhoneIcon />}
//             onClick={leaveChannel}
//             colorScheme="red"
//           />
//           <IconButton
//             icon={<SettingsIcon />}
//             onClick={() => {/* Abrir configurações */}}
//             colorScheme="gray"
//           />
//         </Flex>
//       </Flex>
//     </Box>
//   );
// };

// export default VideoConferencia; 