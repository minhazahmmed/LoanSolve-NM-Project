import { f } from '../utils/loanFormula'

export function secantMethod(P, EMI, n, r0, r1, tolerance) {
  const steps = []

  for (let i = 1; i <= 100; i++) {
    const f0    = f(r0, P, EMI, n)
    const f1    = f(r1, P, EMI, n)

    if (Math.abs(f1 - f0) < 1e-14) break

    const r2    = r1 - f1 * (r1 - r0) / (f1 - f0)
    const error = Math.abs(r2 - r1)

    steps.push({ step: i, r0, r1, r2, error })

    r0 = r1
    r1 = r2

    if (error < tolerance) break
  }

  return steps
}