const fs = require('fs')
const path = require('path')
const paths = require('../config/paths')

const getPageFolders = (path) => {
  return fs
    .readdirSync(path, { withFileTypes: true })
    .filter((folder) => folder.isDirectory())
    .map((folder) => folder.name)
}

const writeJSON = (pages) => {
  return fs.writeFileSync(
    path.resolve(__dirname, '..', 'config', 'pages.json'),
    JSON.stringify({ pages })
  )
}

writeJSON(getPageFolders(paths.pages))
