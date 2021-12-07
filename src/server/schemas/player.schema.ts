import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const playerSchema = new Schema<any>({
   socketId: String,
   playerName: String,
});

export const PlayerModel = model('Player', playerSchema);