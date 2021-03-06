import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import * as socketIO from "socket.io";
import http from 'http';
import dotenv from "dotenv";
import path from 'path';

import {PlayerModel} from "./schemas/player.schema.js";
import {GameModel} from "./schemas/game.schema.js";


dotenv.config();

const __dirname = path.resolve();



dotenv.config();
const app = express();
const server = http.createServer(app);
const clientPath = path.join(__dirname, '/dist/client');
app.use(express.static(clientPath));

export const io = new socketIO.Server(server,  { cors: {
  origin: '*'
}});

const PORT = process.env.PORT || 3000;

mongoose
  .connect(`${process.env.MONGO_URI}`)
  .then(() => {
    console.log("Connected to DB Successfully");
  })
  .catch((err) => console.log("Failed to Connect to DB", err));

app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:4200', 'http://localhost:3501', 'http://localhost:8080']
}));
app.use(express.json());

app.get("/api/test", function (req, res) {
  res.json({message: "Hello World!"});
});
app.all("/api/*", function (req, res) {
  res.sendStatus(404);
});

let numClients = 0;
server.listen(PORT, function () {
  console.log(`starting at localhost http://localhost:${PORT}`);
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('join-room', room => {
    // if(numClients == 0 ) {
    //   numClients++
      socket.join(room);
    //   console.log('welcome to ', room)
    // } else if (numClients == 1){
    //   numClients++
    //   socket.join(room)
      console.log('welcome to ', room)
    // }
    //   else  {
    //   console.log(room, ' is full')
    // }
    // console.log(`there are ${numClients} players`)
  
    socket.on('message', (message: string) => {
      io.to(room).emit('message', message)
      console.log(`${room}: ${message}`)
    })
   
  })

  // socket.on('message', (message) => {
  //   io.emit('message', message);
  //   console.log(message);
  // })


});



app.all("*", function (req, res) {
  const filePath = path.join(__dirname, '/dist/client/index.html');

  res.sendFile(filePath);
});