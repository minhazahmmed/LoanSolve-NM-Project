import { FaChartLine } from 'react-icons/fa'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function ConvergenceChart({ bisectionSteps, nrSteps, secantSteps, rfSteps }) {
  const maxLen = Math.max(bisectionSteps.length, nrSteps.length, secantSteps.length, rfSteps.length)

  const data = Array.from({ length: maxLen }, (_, i) => ({
    step:          i + 1,
    Bisection:     bisectionSteps[i]?.error ?? null,
    NewtonRaphson: nrSteps[i]?.error        ?? null,
    Secant:        secantSteps[i]?.error    ?? null,
    RegulaFalsi:   rfSteps[i]?.error        ?? null,
  }))

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-5">

      <h2 className="text-sm font-bold text-blue-700 mb-1 flex items-center gap-2">
        <FaChartLine /> Convergence Graph
      </h2>
      <p className="text-xs text-gray-400 mb-5">Error vs Iterations </p>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis dataKey="step" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 10 }} />
          <Tooltip formatter={(v) => v !== null ? v.toExponential(4) : '—'} />
          <Legend verticalAlign="top" iconType="circle" wrapperStyle={{ fontSize: 12 }} />
          <Line type="monotone" dataKey="Bisection"     stroke="#3B82F6" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="NewtonRaphson" stroke="#8B5CF6" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="Secant"        stroke="#F59E0B" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="RegulaFalsi"   stroke="#10B981" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>

    </div>
  )
}