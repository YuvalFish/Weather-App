import express from "express";
import axios from "axios";
import { fileURLToPath } from 'url';
import path from 'path';
import 'dotenv/config';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 3000;
const apiKey = process.env.API_KEY;

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render(__dirname + "/views/index.ejs");
})

app.post("/check", async (req,res) => {
    const userCity = req.body.city;
    console.log(apiKey);
    console.log(userCity);

    const response = await axios.get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${userCity}`);
    console.log(response.data);
    res.render(__dirname + "/views/index.ejs");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});