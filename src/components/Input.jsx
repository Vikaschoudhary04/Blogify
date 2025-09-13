import React, { useId } from 'react'

function Input({
    label,
    className = "",
    type = "text",
    ...props
}, ref) {
  const id = useId()
  return (
    <div className='w-full'>
      {label && <label className='inline-block text-white mb-4' htmlFor={id}>{label}</label>}
      <input
        className={`w-full bg-white text-black px-2 py-2 rounded-lg focus:outline hover:cursor-pointer ${className}`}
        type={type}
        ref={ref}
        id={id}
        {...props}
      />
    </div>
  )
}

export default React.forwardRef(Input)
