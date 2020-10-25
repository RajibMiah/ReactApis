import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core";

export const useForm = (initialFValues, validateOnChange = false, validate) => {

    const [values, setValues] = useState(initialFValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
        if (validateOnChange)
            validate({ [name]: value })
    }

    const resetForm = () => {
        setValues(initialFValues);
        setErrors({})
    }


    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm

    }
}

//functional Form component for reuseavality  
const useStyle = makeStyles(theme =>({
  root:{
    '& .MuiTextField-root':{
      margin:theme.spacing(1),
      width:'80%'
    }
  }
}))

export const From =(props)=>{
  const classes = useStyle()
   return (
     
     <form className = {classes.root} autoComplete ='off'>
       {props.children}
     </form>
     
   )
}
