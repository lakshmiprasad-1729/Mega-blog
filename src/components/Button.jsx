/* eslint-disable react/prop-types */

export default function Button({
    children,
    type='button',
    bgColor='bg-blue-600',
    // eslint-disable-next-line react/prop-types
    textColor='text-white',
    classname='',
    ...props
}) {
  return (
    <button type={type}
    className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${classname} `}{...props}
    >
    {children}
    </button>
  )
}
