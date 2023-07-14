import React from 'react'
import { useState,useCallback } from 'react'
import style from "./input.module.scss"

interface InputProps {
   onAdd: (title: string) => void
}

const Input: React.FC<InputProps> = ({onAdd}) => {

  const [value,setValue] = useState('')

  const addTask = useCallback (()=> {
      onAdd(value)
      setValue("")
  }, [value, onAdd])

  return (
    <div className={style.inputPLus}>
      <input
        type='text'
        className={style.inputClass}
        value={value}
        onChange={(evt) =>{
           setValue(evt.target.value)
        }}
        onKeyDown={(evt)=> {
            if(evt.key === "Enter"){
              addTask()
            }
        }}
        placeholder='Type here your task'
      />
      <button
        onClick={()=> {
          addTask()
        }}
        aria-label="Add"
        className={style.inputButton}
      />
    </div>
  )
}

export default Input
