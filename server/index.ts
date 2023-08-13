// src/server/index.ts
import dotenv from 'dotenv';
import express from 'express';
import mongoose, {ConnectOptions} from 'mongoose';


dotenv.config();

// Constants
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGODB_URI || ''

// Database Connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);

const db = mongoose.connection;
db.on('error', (e) => console.error(e, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


// Routes
app.get('/', (req, res) => {
  res.send("Hello, SOrry to disappoint but there's no fun here!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
