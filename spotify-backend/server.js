import express from 'express';
import cors from 'cors';
import 'dotenv/config'; // to get the env var
import songRouter from './src/routes/songRoute.js'; 
import connectDB from './src/config/mongodb.js';
import connectCloudinary from './src/config/cloudinary.js';
import albumRouter from './src/routes/albumRoute.js';

// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middleware
app.use(express.json());
app.use(cors()); // connect frontend and backend

// initializing routes
app.use('/api/song', songRouter); 
app.use('/api/album', albumRouter);

app.get('/', (req, res) => res.send('API working'));

// starting the server
app.listen(port, () => console.log(`Server running on port ${port}`));


// npm run server
