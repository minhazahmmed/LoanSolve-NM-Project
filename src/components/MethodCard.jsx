export default function MethodCard({
  title,
  headers,
  rows,
  stepCount,
  rate,
  rankLabel,
  colors,
}) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border-2 ${colors.border} overflow-hidden`}
    >
      <div
        className={`${colors.header} px-4 py-3 flex items-center justify-between`}
      >
        <div>
          <p className={`font-bold text-sm ${colors.title}`}>{title}</p>
        </div>
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-full ${colors.badge} ${colors.badgeText}`}
        >
          {rankLabel}
        </span>
      </div>

      <div className="overflow-auto max-h-56">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 sticky top-0">
              {headers.map((h, i) => (
                <th
                  key={i}
                  className="px-2.5 py-2 text-left font-semibold text-gray-400 whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className={
                  i === rows.length - 1
                    ? "bg-green-50"
                    : "border-b border-gray-50 hover:bg-gray-50"
                }
              >
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className="px-2.5 py-1.5 font-mono text-gray-600 whitespace-nowrap"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-50 px-4 py-2 flex justify-between border-t border-gray-100">
        <span className="text-xs text-gray-400">
          Steps: <strong className="text-gray-600">{stepCount}</strong>
        </span>
        <span className="text-xs text-gray-400">
          Rate:{" "}
          <strong className="text-blue-600">{(rate * 100).toFixed(4)}%</strong>
        </span>
      </div>
    </div>
  );
}
