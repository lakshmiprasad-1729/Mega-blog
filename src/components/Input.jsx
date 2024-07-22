/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useId } from 'react'

const Input =React.forwardRef(function Input({
    label,
    type = "text",
    classname='',
    ...props
},ref){
    const id = useId();
      return (
        <div className='w-full'>
            {label && <label 
            className=''
            htmlFor={id}>
                {label}
                </label>}
            <input type={type}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full  ${classname}`}{...props} ref={ref} id={id} />
        </div>
      )
})

export default Input;