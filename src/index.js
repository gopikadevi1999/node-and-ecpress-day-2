//const express = require('express'); // this is commonjs type u can see packag.json
import express from 'express'; //this is module type u can see packag.json
import AppRoutes from "./routes/index.js"

import dotenv from 'dotenv'
dotenv.config()

const app = express();
const PORT = process.env.PORT

app.use(express.json())
app.use('/', AppRoutes )

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`))