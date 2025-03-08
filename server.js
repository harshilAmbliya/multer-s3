import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './db/db.js';
connectDB();
import routes from './routes/index.js';
import morgan from 'morgan';
import userSeeder from './seeders/user-seeder.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.get("/ping", (req, res) => {
    res.send("pong");
});

// seeders
userSeeder();
app.use("/api", routes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});