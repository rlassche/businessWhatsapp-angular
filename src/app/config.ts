export const CHAT_URL = 'ws://echo.websocket.org/';
//export const CHAT_URL = 'wss://hp-probook:9443/echo/';
//export const CHAT_URL = 'ws://hp-probook:9090/echo/';
export interface UserMessage {
    author: string,
    message: string
  }