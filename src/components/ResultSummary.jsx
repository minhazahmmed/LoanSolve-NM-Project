import { FaCheckCircle } from 'react-icons/fa'

export default function ResultSummary({ rate, principal, emi, duration }) {
  const totalPayment  = emi * duration
  const totalInterest = totalPayment - principal
  const annualRate    = rate * 12 * 100
  const monthlyRate   = rate * 100

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-5">

      <h2 className="text-sm font-bold text-blue-700 mb-4 flex items-center gap-2">
        <FaCheckCircle className="text-green-500" /> Final Answer
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Box label="Monthly Rate"   value={`${monthlyRate.toFixed(3)}%`}                     bg="bg-blue-50"   val="text-blue-700"   lbl="text-blue-400"   />
        <Box label="Annual Rate"    value={`${annualRate.toFixed(2)}%`}                      bg="bg-blue-50"   val="text-blue-700"   lbl="text-blue-400"   />
        <Box label="Total Payment"  value={`৳${totalPayment.toLocaleString()}`}              bg="bg-yellow-50" val="text-yellow-700" lbl="text-yellow-500" />
        <Box label="Total Interest" value={`৳${Math.round(totalInterest).toLocaleString()}`} bg="bg-yellow-50" val="text-yellow-700" lbl="text-yellow-500" />
      </div>

    </div>
  )
}

function Box({ label, value, bg, val, lbl }) {
  return (
    <div className={`${bg} rounded-xl p-4 text-center`}>
      <p className={`text-xs ${lbl} mb-1`}>{label}</p>
      <p className={`text-xl font-bold ${val}`}>{value}</p>
    </div>
  )
}