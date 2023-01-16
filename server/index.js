// Файл должен запускать сервер на основе билда в /dist
const express = require('express')
const getNextPort = require('./getNextPort')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, '..', "dist")))


const start = () => {
    try {
        getNextPort(3000).then(port => {
            const server = app.listen(port, () => {
                console.log(`Server listening on http://localhost:${server.address().port}`);
            })
        });
    } catch (error) {
        console.log(error)
    }
}

start()