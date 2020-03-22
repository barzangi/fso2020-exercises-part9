interface Results {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (exerciseHours: Array<number>, target: number): Results => {
  const periodLength = exerciseHours.length
  const trainingDays = exerciseHours.filter(h => h !== 0).length
  const average = exerciseHours.reduce((p, c) => p + c) / exerciseHours.length
  const success = average < target ? false : true
  let rating, ratingDescription
  if (average < target / 2) {
    rating = 1
    ratingDescription = 'needs more effort'
  } else if (average > target / 2 && average < target) {
    rating = 2
    ratingDescription = 'good effort but could do better'
  } else if (average >= target && average < target * 1.25) {
    rating = 3
    ratingDescription = 'very good! target met and exceeded'
  } else {
    rating = 4
    ratingDescription = 'excellent! exceeded your target by a good margin'
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

export default calculateExercises