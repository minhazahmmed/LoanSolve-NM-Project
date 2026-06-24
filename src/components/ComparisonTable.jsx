import { FaTrophy, FaBolt, FaClock, FaTable, FaCheckCircle } from 'react-icons/fa'

function calculateEMI(r, P, n) {
  if (Math.abs(r) < 1e-12) return 0
  const x = Math.pow(1 + r, n)
  return (P * r * x) / (x - 1)
}

export default function ComparisonTable({ bisectionSteps, nrSteps, secantSteps, rfSteps, principal, duration, emi }) {

  const methods = [
    {
      name   : 'Bisection',
    
      steps  : bisectionSteps,
      rate   : bisectionSteps[bisectionSteps.length - 1].c,
      error  : bisectionSteps[bisectionSteps.length - 1].error,
    },
    {
      name   : 'Newton-Raphson',
   
      steps  : nrSteps,
      rate   : nrSteps[nrSteps.length - 1].r1,
      error  : nrSteps[nrSteps.length - 1].error,
    },
    {
      name   : 'Secant',
    
      steps  : secantSteps,
      rate   : secantSteps[secantSteps.length - 1].r2,
      error  : secantSteps[secantSteps.length - 1].error,
    },
    {
      name   : 'Regula Falsi',
    
      steps  : rfSteps,
      rate   : rfSteps[rfSteps.length - 1].c,
      error  : rfSteps[rfSteps.length - 1].error,
    },
  ]
  .map(m => ({
    ...m,
    emiCalculated    : calculateEMI(m.rate, principal, duration),
    verificationError: Math.abs(calculateEMI(m.rate, principal, duration) - emi),
  }))
  .sort((a, b) => a.verificationError - b.verificationError)

  const icons  = [
    <FaTrophy className="text-yellow-500" />,
    <FaBolt   className="text-blue-400"   />,
    <FaClock  className="text-orange-400" />,
    <FaClock  className="text-gray-400"   />,
  ]
  const labels = ['Best', '2nd', '3rd', 'Slowest']

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-5">

      <h2 className="text-sm font-bold text-blue-700 mb-1 flex items-center gap-2">
        <FaTable /> Method Comparison Table
      </h2>
      <p className="text-xs text-gray-400 mb-5">
        Ranked by Verification Error — lower error means more accurate result
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-3 py-3 text-left text-xs font-bold text-gray-400">Rank</th>
              <th className="px-3 py-3 text-left text-xs font-bold text-gray-400">Method</th>
        
              <th className="px-3 py-3 text-left text-xs font-bold text-gray-400">Iterations</th>
              <th className="px-3 py-3 text-left text-xs font-bold text-gray-400">Monthly Rate</th>
              <th className="px-3 py-3 text-left text-xs font-bold text-gray-400">Annual Rate</th>
              <th className="px-3 py-3 text-left text-xs font-bold text-gray-400">EMI Verified</th>
              <th className="px-3 py-3 text-left text-xs font-bold text-gray-400 flex items-center gap-1">
                <FaCheckCircle className="text-green-500" /> Verification Error
              </th>
            </tr>
          </thead>
          <tbody>
            {methods.map((m, i) => (
              <tr key={m.name} className={`border-b border-gray-100 ${i === 0 ? 'bg-green-50' : 'hover:bg-gray-50'}`}>

                <td className="px-3 py-3">
                  <div className="flex items-center gap-2">
                    {icons[i]}
                    <span className="text-xs font-bold text-gray-500">{labels[i]}</span>
                  </div>
                </td>

                <td className="px-3 py-3 font-bold text-sm text-blue-700">{m.name}</td>
           
                <td className="px-3 py-3 font-mono font-bold text-gray-700">{m.steps.length}</td>
                <td className="px-3 py-3 font-mono text-gray-700">{(m.rate * 100).toFixed(6)}%</td>
                <td className="px-3 py-3 font-mono text-gray-700">{(m.rate * 1200).toFixed(4)}%</td>

                <td className="px-3 py-3 font-mono text-gray-700">
                  ৳{m.emiCalculated.toFixed(4)}
                </td>

                <td className="px-3 py-3">
                  <span className={`font-mono text-xs px-2 py-1 rounded-full font-bold ${
                    i === 0
                      ? 'bg-green-100 text-green-700'
                      : i === 1
                      ? 'bg-blue-100 text-blue-700'
                      : i === 2
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    ৳{m.verificationError.toFixed(6)}
                  </span>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-100">
        <p className="text-sm text-blue-700 font-semibold mb-1">
          How Verification Works
        </p>
        <p className="text-sm text-blue-500 leading-relaxed">
          Since the true interest rate is unknown, we verify accuracy using back-substitution.
          Each method's computed rate is plugged back into the EMI formula to recalculate the EMI.
          The closer the recalculated EMI is to your actual EMI of ৳{emi.toLocaleString()},
          the more accurate that method's result is.
        </p>
      </div>

    </div>
  )
}