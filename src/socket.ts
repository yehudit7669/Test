import { io, Socket } from 'socket.io-client'
import { getWSEnv } from './utils/envUtil'

let socket: Socket

export const connect = (): void => {
  socket = io(getWSEnv())
}

export const getSocket = (): Socket => {
  return socket
}
