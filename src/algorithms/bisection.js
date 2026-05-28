import { f } from '../utils/loanFormula'

export function bisectionMethod(P, EMI, n, a, b, tolerance) {

  const steps = [] 

  for (let i = 1; i <= 200; i++) {

    const c     = (a + b) / 2
    const fc    = f(c, P, EMI, n)
    const error = Math.abs(b - a) / 2   

    steps.push({
      step  : i,
      a     : a,
      b     : b,
      c     : c,      
      fc    : fc,   
      error : error,
    })

    if (error < tolerance || Math.abs(fc) < tolerance) break

    if (f(a, P, EMI, n) * fc < 0) {
      b = c   
    } else {
      a = c   
    }
  }

  return steps   
}