// Файл должен запускать сервер на основе билда в /dist
const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, '..', "dist")))

const PORT = 3000

const start = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        })
    } catch (error) {
        console.log(error)
    }
}

start()