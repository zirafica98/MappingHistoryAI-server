require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

const bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));

app.use(cors());
app.use(express.json());

const openAiRoutes = require('./src/routes/OpenAi')
app.use("/openAi",openAiRoutes);

app.listen(5001,()=>console.log('Server is running on port 5001'));