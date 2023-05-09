# Chat App AbInBev

## How to run
 docker compose up

###
Endpoints:
- User
 http://localhost:3001/users/

 - Auth Login
 http://localhost:3001/auth/login

 - Messages
 http://localhost:3000/messages

 - Web Socket Gateway
  http://localhost:3000/ws-gateway

- Web Sockets events  
  - newMessage,createMessage

## Token Based Auth With Cookies
  The Auth is a Jwt based athentication that saves logged in users
  token on the client cookie so users dont need to keep passing jwt token on the client header for subsequent requests.
  Authentication for  external system or services can be done by passing the token to an authentication header without any Bearer prefix.


 ## WebSocket Authentication
    Authentication is implemented on the websocket endpoint (ws-gateway). so to access it you need to pass just the 
    jwt token in Authorization header of the request.

## Sending Message with websocket gateway
   You can send message to createMessage event and it would get broadcasted to all clients .


## Improvements
  Due to time constraints currently the system does not persist messages send with web sockets. Though you can persist messages and broadcast the message using the `Messages` endpoint.
  - Broadcast send message to reciever instead of all connected clients. I could use redis to keep track of connect clients socket id and send the message directly if
  they are still connected.

## Resources
 -  Postman collection for Http resources  is available in the repo.
 - I couldn't export the websocket Postman collection because its in beta but i added a screenshot of how it looks like
 ![Screenshot](https://raw.githubusercontent.com/grincodes/ChatAppAbinBev/main/postman-websocket.png)  
  


