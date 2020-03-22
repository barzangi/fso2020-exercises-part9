import express from 'express'
const app = express()

app.use(express.json())

import calculateBmi from './modules/bmiCalc'
import calculateExercises from './modules/exerciseCalc'

// bmi calculator
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

// exercise calculator
app.post('/exercises', (req, res) => {
  const { dailyExercises, target } = req.body
  if (!dailyExercises || !target) {
    res.status(401).json({ error: 'missing parameters' })
    return
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dailyExercisesNum = dailyExercises.map((i: any) => Number(i))
  if (dailyExercisesNum.some(isNaN)) {
    res.status(401).json({ error: 'malformatted parameters' })
    return
  }
  const exerciseResults = calculateExercises(dailyExercisesNum, target)
  res.json(exerciseResults)
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})