import { Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { Controls } from '../../../controls/controls'

const PackagePlan = ({ values, setValues }) => {
  const [packagePlanValue, setPackagePlanValue] = useState(values.packagePlan) //initalizing emptiy object for inital redering

  const addItem = () => {
    // push the object for defferent input field
    setPackagePlanValue([
      ...packagePlanValue,
      {
        day: '',
        activity: ''
      }]
    )
  }

  const handleChnage = (e, index) => {
    //set induvitual text field from there name and value. it will push the value to object.
    const { name, value } = e.target
    packagePlanValue[index][name] = value
    setValues({
      ...values,
      packagePlan: [...packagePlanValue]
    })
  }

  const handleDelete = (e, value) => {
    //parameter value is a object for filtering 
    setPackagePlanValue(packagePlanValue.filter((x) => value != x))
  }

  const finish = () => {
    console.log(packagePlanValue)
    // console.log(values)
  }

  const textArea = packagePlanValue.map((value, index) => {
    //render the text area when use click add more button
    return <div style={{ display: 'flex', paddingTop: '15px', paddingRight: '15px', paddingBottom: '15px' }} key={index} >

      <TextField
        label={`Day ${index + 1}`}
        variant="outlined"
        name='day'
        value={value.day}
        onChange={(e) => handleChnage(e, index)}
      />
      <TextField
        label={`Activity ${index + 1}`}
        variant="outlined"
        name='activity'
        value={values.activity}
        onChange={(e) => handleChnage(e, index)}
      />
      <Controls.ActionButton
        color='secondary'
        onClick={(e) => handleDelete(e, value)}
        style={{
          width: '40px',
          height: '24px',
          position: 'relative',
          top: '20px',
        }}

      >
        X
      </Controls.ActionButton>
    </div>
  })

  return (
    <div>
      {textArea}
        <Button
          color='primary'
          textArea='center'
          style={{ background: 'black' }}
          onClick={addItem}
        >
        Add More
        </Button>
      <Button onClick={finish}>ok</Button>
    </div>

  )
}


export default PackagePlan
