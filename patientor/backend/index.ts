import express from 'express'
const app = express()
app.use(express.json())

import cors from 'cors'
app.use(cors())

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here')
  res.send('pong')
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})