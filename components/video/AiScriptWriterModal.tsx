import React from 'react'
import { PiMagicWand } from 'react-icons/pi'

const AiScriptWriterModal = () => {
    return (
        <button className="flex flex-row text-white bg-senary sm:px-6 px-4 py-2 rounded-sm text-sm text-nowrap gap-2 items-center cursor-pointer">
            <PiMagicWand size={16} />
            Write using AI
        </button>
    )
}

export default AiScriptWriterModal