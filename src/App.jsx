import { useState } from "react";

import Header from "./components/Header";
import InputPanel from "./components/InputPanel";
import MethodCard from "./components/MethodCard";
import ConvergenceChart from "./components/ConvergenceChart";
import ResultSummary from "./components/ResultSummary";
import ComparisonTable from "./components/ComparisonTable";

import { bisectionMethod } from "./algorithms/bisection";
import { newtonRaphsonMethod } from "./algorithms/newtonRaphson";
import { secantMethod } from "./algorithms/secant";
import { regulaFalsiMethod } from "./algorithms/regulaFalsi";

const COLORS = {
  bisection: {
    border: "border-blue-200",
    header: "bg-blue-50",
    title: "text-blue-700",
    sub: "text-blue-400",
    badge: "bg-blue-100",
    badgeText: "text-blue-700",
  },
  newton: {
    border: "border-violet-200",
    header: "bg-violet-50",
    title: "text-violet-700",
    sub: "text-violet-400",
    badge: "bg-violet-100",
    badgeText: "text-violet-700",
  },
  secant: {
    border: "border-amber-200",
    header: "bg-amber-50",
    title: "text-amber-700",
    sub: "text-amber-400",
    badge: "bg-amber-100",
    badgeText: "text-amber-700",
  },
  rf: {
    border: "border-emerald-200",
    header: "bg-emerald-50",
    title: "text-emerald-700",
    sub: "text-emerald-400",
    badge: "bg-emerald-100",
    badgeText: "text-emerald-700",
  },
};

function getRankLabel(stepCount, allCounts) {
  const sorted = [...allCounts].sort((a, b) => a - b);
  const pos = sorted.indexOf(stepCount);
  return ["🏆 Best", "⚡ 2nd", "🕐 3rd", "🐢 Slowest"][pos] ?? "🐢 Slowest";
}

export default function App() {
  const [inputs, setInputs] = useState({
    principal: 120000,
    emi: 11000,
    duration: 12,
    tolerance: 0.00001,
    bisectA: 0.001,
    bisectB: 0.05,
    nrGuess: 0.01,
    secantR0: 0.005,
    secantR1: 0.02,
  });

  const [results, setResults] = useState(null);

  const handleChange = (key, val) =>
    setInputs((prev) => ({ ...prev, [key]: val }));

  const handleCalculate = () => {
    const {
      principal: P,
      emi: EMI,
      duration: n,
      tolerance: tol,
      bisectA: a,
      bisectB: b,
      nrGuess: r0,
      secantR0: s0,
      secantR1: s1,
    } = inputs;

    setResults({
      bisectionSteps: bisectionMethod(P, EMI, n, a, b, tol),
      nrSteps: newtonRaphsonMethod(P, EMI, n, r0, tol),
      secantSteps: secantMethod(P, EMI, n, s0, s1, tol),
      rfSteps: regulaFalsiMethod(P, EMI, n, a, b, tol),
    });
  };

  const f6 = (v) => v.toFixed(6);
  const f8 = (v) => v.toFixed(8);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <InputPanel
          inputs={inputs}
          onChange={handleChange}
          onCalculate={handleCalculate}
        />

        {results &&
          (() => {
            const {
              bisectionSteps: bs,
              nrSteps: nr,
              secantSteps: sc,
              rfSteps: rf,
            } = results;

            const bRate = bs[bs.length - 1].c;
            const nRate = nr[nr.length - 1].r1;
            const sRate = sc[sc.length - 1].r2;
            const rfRate = rf[rf.length - 1].c;

            const allCounts = [bs.length, nr.length, sc.length, rf.length];

            const bRows = bs.map((s) => [
              s.step,
              f6(s.a),
              f6(s.b),
              f6(s.c),
              f6(s.fc),
              f8(s.error),
            ]);
            const nRows = nr.map((s) => [
              s.step,
              f6(s.r),
              f6(s.fr),
              f6(s.r1),
              f8(s.error),
            ]);
            const sRows = sc.map((s) => [
              s.step,
              f6(s.r0),
              f6(s.r1),
              f6(s.r2),
              f8(s.error),
            ]);
            const rfRows = rf.map((s) => [
              s.step,
              f6(s.a),
              f6(s.b),
              f6(s.c),
              f6(s.fc),
              f8(s.error),
            ]);

            return (
              <>
                <ResultSummary
                  rate={nRate}
                  principal={inputs.principal}
                  emi={inputs.emi}
                  duration={inputs.duration}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
                  <MethodCard
                    title="Bisection Method"
                    member="Member 1"
                    headers={["#", "a", "b", "c", "f(c)", "Error"]}
                    rows={bRows}
                    stepCount={bs.length}
                    rate={bRate}
                    rankLabel={getRankLabel(bs.length, allCounts)}
                    colors={COLORS.bisection}
                  />
                  <MethodCard
                    title="Newton-Raphson"
                    member="Member 2"
                    headers={["#", "r_n", "f(r_n)", "r_(n+1)", "Error"]}
                    rows={nRows}
                    stepCount={nr.length}
                    rate={nRate}
                    rankLabel={getRankLabel(nr.length, allCounts)}
                    colors={COLORS.newton}
                  />
                  <MethodCard
                    title="Secant Method"
                    member="Member 3"
                    headers={["#", "r₀", "r₁", "r₂", "Error"]}
                    rows={sRows}
                    stepCount={sc.length}
                    rate={sRate}
                    rankLabel={getRankLabel(sc.length, allCounts)}
                    colors={COLORS.secant}
                  />
                  <MethodCard
                    title="Regula Falsi"
                    member="Member 4"
                    headers={["#", "a", "b", "c", "f(c)", "Error"]}
                    rows={rfRows}
                    stepCount={rf.length}
                    rate={rfRate}
                    rankLabel={getRankLabel(rf.length, allCounts)}
                    colors={COLORS.rf}
                  />
                </div>

                <ConvergenceChart
                  bisectionSteps={bs}
                  nrSteps={nr}
                  secantSteps={sc}
                  rfSteps={rf}
                />
                <ComparisonTable
                   bisectionSteps={bs}
  nrSteps={nr}
  secantSteps={sc}
  rfSteps={rf}
  principal={inputs.principal}
  duration={inputs.duration}
  emi={inputs.emi}
                />
              </>
            );
          })()}
      </main>
    </div>
  );
}
