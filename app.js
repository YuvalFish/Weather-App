import express from "express";
import axios from "axios";
import { fileURLToPath } from 'url'
import path from 'path'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express();
const PORT = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render(__dirname + "/views/index.ejs");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});