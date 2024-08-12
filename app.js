import express, { response } from "express";
import axios from "axios";
import { fileURLToPath } from 'url';
import path from 'path';
import 'dotenv/config';
import fs from 'fs';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 3000;
const apiKey = process.env.API_KEY;

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", async (req, res) => {
    
    /* Practice the API with JSON data instead of wasting the API key
    const data = JSON.parse(fs.readFileSync('./response.json',
        { encoding: 'utf8', flag: 'r' }));
        
    console.log(data);
    const city_name = data.location.name;
    const city_temp = data.current.temperature;
    const description = data.current.weather_descriptions[0];
    const feelsLike = data.current.feelslike;

    console.log(description);
    res.render(__dirname + "/views/index.ejs", { 
        cityName: city_name,
        temp: city_temp,
        emoji: getEmoji(description),
        feels: feelsLike
    }); */

    try {
        const response = await axios.get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=Tel Aviv`);
        // console.log(response.data);

        const city_name = response.data.location.name;
        const city_temp = response.data.current.temperature;
        const description = response.data.current.weather_descriptions[0];
        const feelsLike = response.data.current.feelslike;

        res.render(__dirname + "/views/index.ejs", { 
            cityName: city_name,
            temp: city_temp,
            emoji: getEmoji(description),
            feels: feelsLike
        });
        
    } catch (error) {
        console.log(error);
        res.render(__dirname + "/views/index.ejs");
    }

});

function getEmoji(weather) {
    switch (weather) {
        case "Sunny":
            return '🌤️';
            break;
        case "Overcast":
            return '☁️';
            break;
        default:
            break;
    }
}

app.post("/check", async (req,res) => {
    const userCity = req.body.city;
    try {
        const response = await axios.get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${userCity}`);
        // console.log(response.data);

        const city_name = response.data.location.name;
        const city_temp = response.data.current.temperature;
        const description = response.data.current.weather_descriptions[0];
        const feelsLike = response.data.current.feelslike;

        res.render(__dirname + "/views/index.ejs", { 
            cityName: city_name,
            temp: city_temp,
            emoji: getEmoji(description),
            feels: feelsLike
        });

    } catch (error) {
        console.log(error);
        res.render(__dirname + "/views/index.ejs");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});