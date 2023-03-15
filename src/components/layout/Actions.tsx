import React, { useState } from 'react'

const Actions = () => {
    const [showAction, setShowAction] = useState(false)
  return (
    <div className='relative right-10'>
        <button onClick={() => setShowAction(!showAction)} className='px-4 bottom-2 rounded-lg border-blue-500 font-bold border'>Actions</button>
        {showAction && <div className="fixed bg-white shadow-lg p-4">
            <div>Download Week</div>
            <div>Download Month</div>
        </div>}
    </div>
  )
}

export default Actions