import { useState } from "react"

// export const useNamedForm = (name) => {
//     const [ value, setValue ] = useState('')

//     const onChange = (e) => {
//         setValue(e.target.value)
//     }

//     const reset = () => setValue('')

//     const formObject = {
//         name,
//         value,
//         onChange,
//     }

//     Object.defineProperty(formObject, 'reset', {
//         value: reset,
//         enumerable: false,
//         writable: true,
//         configurable: true
//     })

//     return formObject
// }


export const useNamedForm = (name) => {
    const [ value, setValue ] = useState('')

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const reset = () => setValue('')

    return {
        props: {
            name,
            value,
            onChange
        },
        reset
    }
}