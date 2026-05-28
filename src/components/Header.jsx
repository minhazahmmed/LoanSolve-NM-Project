import { FaUniversity } from 'react-icons/fa'
import { HiUserGroup }  from 'react-icons/hi'

export default function Header() {
  return (
    <header className="bg-blue-600 text-white py-4 px-6 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <div className="flex items-center gap-3">
          <div className="bg-yellow-400 p-2.5 rounded-xl">
            <FaUniversity className="text-blue-700 text-xl" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">LoanSolve</h1>
            <p className="text-blue-200 text-xs">Numerical Methods — Solution of Non-linear Equations</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-yellow-400 text-blue-800 px-4 py-2 rounded-full font-bold text-sm">
          <HiUserGroup className="text-base" />
          Team NumeriX
        </div>

      </div>
    </header>
  )
}