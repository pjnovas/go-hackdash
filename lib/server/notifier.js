
import socket from 'socket.io';

let io;

export const connect = server => {
  io = socket(server);

  io.of('/polls').on('connection', onChannelConn);

  io.on('connection', socket => {
    console.log('new socket connection %s', socket.id);
  });
};

const onChannelConn = socket => {
  socket.on('join', room => socket.join(room) );
  socket.on('leave', room => socket.leave(room) );
};

export const notify = (channel, room, event, data) => {
  if (io && io.of(channel)){
    io.of(channel).in(room).emit(event, data);
  }
};
