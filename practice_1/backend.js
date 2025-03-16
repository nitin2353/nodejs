const exp = require('constants');
const express = require('express');
const fs = require('fs');
const path = require('path');
const Alldata = require('./userData.json');
const app = express();
const port = 3000;



app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname)));

app.get('/home', (req, res) => {
    const home = path.join(__dirname,'index.html')
    res.sendFile(home);
})

app.get('/your_data', (req, res) => {
    const about = path.join(__dirname, "pages", "yourdata.html");
    res.sendFile(about);
})

app.get('/data', (req, res) => {

    let newUser = {
        Name: req.query.Name,
        Age: req.query.Age
    };
    
    const path = "./userData.json";
    fs.readFile(path, "utf8", (err, data) => {
        let users = [];

        if (!err && data) {
            try {
                users = JSON.parse(data);
            } catch (error) {
                console.error("Error parsing JSON:", error);
                return res.status(500).json({ error: "Invalid JSON format in file" });
            }
        }
        users.push(newUser);

        fs.writeFile(path, JSON.stringify(users,null,2), (err) => {
            if (err) {
                return res.status(500).json({ error: "Error saving data" });
            }
            res.redirect('/your_data')
        });
    });
});

//Api
app.get('/alluser', (req, res) => {
    res.send(Alldata.map((data) => {
        return `Name : ${data.Name} Age: ${data.Age} `;
    }).join("<br>"));
})

app.listen(port, ()=>{
    console.log("Server is started");
})


