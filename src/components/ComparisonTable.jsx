import { FaTrophy, FaBolt, FaClock, FaTable } from "react-icons/fa";

export default function ComparisonTable({
  bisectionSteps,
  nrSteps,
  secantSteps,
  rfSteps,
}) {
  const methods = [
    {
      name: "Bisection",
    
      color: "text-blue-600",
      bg: "bg-blue-50",
      steps: bisectionSteps,
      rate: bisectionSteps[bisectionSteps.length - 1].c,
      error: bisectionSteps[bisectionSteps.length - 1].error,
    },
    {
      name: "Newton-Raphson",
     
      color: "text-violet-600",
      bg: "bg-violet-50",
      steps: nrSteps,
      rate: nrSteps[nrSteps.length - 1].r1,
      error: nrSteps[nrSteps.length - 1].error,
    },
    {
      name: "Secant",
     
      color: "text-amber-600",
      bg: "bg-amber-50",
      steps: secantSteps,
      rate: secantSteps[secantSteps.length - 1].r2,
      error: secantSteps[secantSteps.length - 1].error,
    },
    {
      name: "Regula Falsi",
   
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      steps: rfSteps,
      rate: rfSteps[rfSteps.length - 1].c,
      error: rfSteps[rfSteps.length - 1].error,
    },
  ].sort((a, b) => a.steps.length - b.steps.length);

  const icons = [
    <FaTrophy className="text-yellow-500" />,
    <FaBolt className="text-blue-400" />,
    <FaClock className="text-orange-400" />,
    <FaClock className="text-gray-400" />,
  ];
  const labels = ["Best", "2nd", "3rd", "Slowest"];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-5">
      <h2 className="text-sm font-bold text-blue-700 mb-4 flex items-center gap-2">
        <FaTable /> Method Comparison Table
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-400">
                Rank
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-400">
                Method
              </th>
         
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-400">
                Iterations
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-400">
                Monthly Rate
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-400">
                Annual Rate
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-400">
                Final Error
              </th>
            </tr>
          </thead>
          <tbody>
            {methods.map((m, i) => (
              <tr key={m.name} className={`${m.bg} border-b border-gray-100`}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {icons[i]}
                    <span className="text-xs font-bold text-gray-500">
                      {labels[i]}
                    </span>
                  </div>
                </td>
                <td className={`px-4 py-3 font-bold text-sm ${m.color}`}>
                  {m.name}
                </td>
            
                <td className="px-4 py-3 font-mono font-bold text-gray-700">
                  {m.steps.length}
                </td>
                <td className="px-4 py-3 font-mono text-gray-700">
                  {(m.rate * 100).toFixed(4)}%
                </td>
                <td className="px-4 py-3 font-mono text-gray-700">
                  {(m.rate * 1200).toFixed(2)}%
                </td>
                <td className="px-4 py-3 font-mono text-xs text-gray-500">
                  {m.error.toExponential(3)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
