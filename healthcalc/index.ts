import express from 'express'
const app = express()

import calculateBmi from './modules/bmiCalc'

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query
  if (!height || !weight) {
    res.status(401).json({ error: 'missing parameters' })
    return
  }
  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    res.status(401).json({ error: 'malformatted parameters' })
    return
  }
  const bmi = calculateBmi(height, weight)
  res.json({
    height,
    weight,
    bmi
  })
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})