import React from 'react'

function SectionHeader({icon, title, color}) {
    const colors = {
        indigo: "from-indigo-100 to-indigo-50 text-indigo-700",
        purple: "from-purple-100 to-purple-50 text-purple-700",
        blue: "from-blue-100 to-blue-50 text-blue-700",
        green: "from-green-100 to-green-50 text-green-700",
        rose: "from-rose-100 to-rose-50 text-rose-700",
        cyan: "from-cyan-100 to-cyan-50 text-cyan-700",
    }

  return (
    <div className={`mb-4 px-4 py-2 rounded-lg bg-gradient-to-r ${colors[color]} font-semibold flex items-center gap-2`}>
      <span>{icon}</span>
      <span>{title}</span>
    </div>
  )
}

export default SectionHeader
