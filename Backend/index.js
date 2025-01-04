import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

// connect to mongoDB
mongoose.connect(URI)
    .then(() => console.log("Connected to mongoDB"))
    .catch((error) => console.log("Error: ", error));

// defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

// Serve static files from the React app
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendPath = path.join(__dirname, '../Frontend/dist');

app.use(express.static(frontendPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'), (err) => {
        if (err) {
            res.status(404).send('Frontend files not found');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});