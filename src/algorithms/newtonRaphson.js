import { f, fPrime } from "../utils/loanFormula";

export function newtonRaphsonMethod(P, EMI, n, r0, tolerance) {
  const steps = [];
  let r = r0;

  for (let i = 1; i <= 100; i++) {
    const fr = f(r, P, EMI, n);
    const fpr = fPrime(r, P, n);

    const r1 = r - fr / fpr;
    const error = Math.abs(r1 - r);

    steps.push({
      step: i,
      r: r,
      fr: fr,
      r1: r1,
      error: error,
    });

    r = r1;

    if (error < tolerance) break;
  }

  return steps;
}


