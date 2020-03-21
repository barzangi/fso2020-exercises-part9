const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2)
  if (bmi < 18.5) {
    return 'Underweight (unhealthy weight)'
  } else if (bmi >= 18.5 && bmi <= 25) {
    return 'Normal (healthy weight)'
  } else if (bmi >= 25 && bmi <= 30) {
    return 'Overweight (unhealthy weight)'
  } else {
    return 'Obese (unhealthy weight)'
  }
}

export default calculateBmi