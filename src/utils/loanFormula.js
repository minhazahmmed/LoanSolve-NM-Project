export function f(r, P, EMI, n) {

  if (Math.abs(r) < 1e-12) return -EMI

  const top    = P * r * Math.pow(1 + r, n)  
  const bottom = Math.pow(1 + r, n) - 1      

  return (top / bottom) - EMI
}


export function fPrime(r, P, n) {

  const x         = Math.pow(1 + r, n)
  const numerator = P * (x * (1 + r * n) - x)
  const denominator = Math.pow(x - 1, 2)

  return numerator / denominator
}