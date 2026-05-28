import { f } from '../utils/loanFormula'

export function regulaFalsiMethod(P, EMI, n, a, b, tolerance) {
  const steps = []
  let prevC   = null

  for (let i = 1; i <= 200; i++) {
    const fa    = f(a, P, EMI, n)
    const fb    = f(b, P, EMI, n)
    const c     = (a * fb - b * fa) / (fb - fa)
    const fc    = f(c, P, EMI, n)
    const error = prevC !== null ? Math.abs(c - prevC) : Math.abs(b - a)

    steps.push({ step: i, a, b, c, fc, error })

    if (Math.abs(fc) < tolerance || (prevC !== null && Math.abs(c - prevC) < tolerance)) break

    prevC = c

    if (fa * fc < 0) b = c
    else             a = c
  }

  return steps
}