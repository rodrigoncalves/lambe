const functions = require('firebase-functions')
const cors = require('cors')({origin: true})
const fs = require('fs')
const uuid = require('uuid-v4')
const {Storage} = require('@google-cloud/storage')
const storage = new Storage({
  projectId: 'lambe-b6c2d',
  keyFilename: 'lambe-key.json',
})

exports.uploadImage = functions.https.onRequest((request, response) => {
  cors(request, response, () => {})
})
