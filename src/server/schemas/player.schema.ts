import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const playerSchema = new Schema<any>({
   socketId: String,
   playerName: {type: String, default: 'player'},
});

export const PlayerModel = model('Player', playerSchema);