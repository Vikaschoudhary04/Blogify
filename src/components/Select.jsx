import React, { useId } from 'react'

function Select({
    options,
    label,
    className,
    ...props
}, ref) {

    const id = useId()
  return (
    <div className='w-full'>
        {label&&<label htmlFor={id} className='text-white font-bold'>{label}</label>}
        <select 
        {...props}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none ${className}`}>
         {options?.map((option) => (
            <option key={option} value={option}>
                {option}

            </option>
         ))}
        </select>
      
    </div>
  )
}

export default React.forwardRef(Select)
