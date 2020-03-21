import express from 'express'
const app = express()

import calculateBmi from './modules/bmiCalc'

app.get('/bmi', (req, res) => {
  if (!req.query.height || !req.query.weight) {
    res.status(401).json({ error: 'missing parameters' })
    return
  }
  if (isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight))) {
    res.status(401).json({ error: 'malformatted parameters' })
    return
  }
  const bmi = calculateBmi(req.query.height, req.query.weight)
  res.json({
    height: req.query.height,
    weight: req.query.weight,
    bmi
  })
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})