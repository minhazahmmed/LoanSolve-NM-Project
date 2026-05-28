import { FaCalculator } from "react-icons/fa";

export default function InputPanel({ inputs, onChange, onCalculate }) {
  const inputCls =
    "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400 bg-white";
  const labelCls = "block text-xs font-semibold text-gray-500 mb-1";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-5">
      <h2 className="text-sm font-bold text-blue-700 mb-4 flex items-center gap-2">
        <FaCalculator /> Loan Details
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div>
          <label className={labelCls}>Principal (৳)</label>
          <input
            type="number"
            value={inputs.principal}
            onChange={(e) => onChange("principal", +e.target.value)}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Monthly EMI (৳)</label>
          <input
            type="number"
            value={inputs.emi}
            onChange={(e) => onChange("emi", +e.target.value)}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Duration (months)</label>
          <input
            type="number"
            value={inputs.duration}
            onChange={(e) => onChange("duration", +e.target.value)}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Tolerance</label>
          <input
            type="number"
            value={inputs.tolerance}
            step="0.00001"
            onChange={(e) => onChange("tolerance", +e.target.value)}
            className={inputCls}
          />
        </div>
      </div>

      <div className="border-t border-gray-100 my-4" />
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">
        Initial Values
      </p>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-5">
        <div>
          <label className={labelCls}>Bisection & RF — a</label>
          <input
            type="number"
            value={inputs.bisectA}
            step="0.001"
            onChange={(e) => onChange("bisectA", +e.target.value)}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Bisection & RF — b</label>
          <input
            type="number"
            value={inputs.bisectB}
            step="0.001"
            onChange={(e) => onChange("bisectB", +e.target.value)}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Newton-Raphson r₀</label>
          <input
            type="number"
            value={inputs.nrGuess}
            step="0.001"
            onChange={(e) => onChange("nrGuess", +e.target.value)}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Secant r₀</label>
          <input
            type="number"
            value={inputs.secantR0}
            step="0.001"
            onChange={(e) => onChange("secantR0", +e.target.value)}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Secant r₁</label>
          <input
            type="number"
            value={inputs.secantR1}
            step="0.001"
            onChange={(e) => onChange("secantR1", +e.target.value)}
            className={inputCls}
          />
        </div>
      </div>

      <button
        onClick={onCalculate}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
      >
        <FaCalculator /> Calculate Interest Rate
      </button>
    </div>
  );
}
