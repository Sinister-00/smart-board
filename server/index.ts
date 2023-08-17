import dotenv from 'dotenv';
import express from 'express';
import Cors from 'cors'
import mongoose, {ConnectOptions} from 'mongoose';
import boardRouter from './routers/board';
import gameRouter from './routers/game';

dotenv.config();

// Constants
const app = express();
const PORT = process.env.PORT || 1414;
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

// Middlewares
app.use(Cors());
app.use(express.json())


app.use('/api/board', boardRouter);
app.use('/api/game', gameRouter);


// Routes
app.get('/', (req, res) => {
  res.send("Hello, SOrry to disappoint but there's no fun here!");
});

app.get('/ping', (req, res) => {
  res.send("Teri ma chodi mai..?");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
