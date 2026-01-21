import React from 'react'

const GooeyBalls = ({size=24, color="#ffffff"}: {size?: number, color?: string}) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
        >
            <style>{`
        .spinner_mHwL {
          animation: spinner_OeFQ 0.75s cubic-bezier(0.56, .52, .17, .98) infinite;
        }
        .spinner_ote2 {
          animation: spinner_ZEPt 0.75s cubic-bezier(0.56, .52, .17, .98) infinite;
        }
        @keyframes spinner_OeFQ {
          0%   { cx: 4px;  r: 3px; }
          50%  { cx: 9px;  r: 8px; }
          100% { cx: 4px;  r: 3px; }
        }
        @keyframes spinner_ZEPt {
          0%   { cx: 15px; r: 8px; }
          50%  { cx: 20px; r: 3px; }
          100% { cx: 15px; r: 8px; }
        }
      `}</style>
            <defs>
                <filter id="spinner-gF00">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="y" />
                    <feColorMatrix
                        in="y"
                        type="matrix"
                        values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7"
                        result="z"
                    />
                    <feBlend in="SourceGraphic" in2="z" />
                </filter>
            </defs>
            <g filter="url(#spinner-gF00)">
                <circle className="spinner_mHwL" cx="4" cy="12" r="3" fill={color} />
                <circle className="spinner_ote2" cx="15" cy="12" r="8" fill={color} />
            </g>
        </svg>
    )
}

export default GooeyBalls