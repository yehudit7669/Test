import { io, Socket } from 'socket.io-client';
import { getWSEnv } from './utils/envUtil'

export const socket: Socket = io(getWSEnv());