import React, { useEffect, useRef } from 'react'
import style from "./inputtask.module.scss"
import {useState} from "react"

interface InputTaskProps {
  id: string,
  title: string,
  onDone: (id: string) => void;
  onChange: (id: string, title: string) => void;
  onRemove: (id: string) => void;

}
const InputTask: React.FC<InputTaskProps> = ({
  id,title,onDone,onChange,onRemove}) => {

  const [check, setCheck] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  //место которое будет редактировать task
  const [value, setValue] = useState(title)
  const editTitleInput = useRef<HTMLInputElement>(null)

  useEffect(()=> {
      if(isEdit) {
        editTitleInput?.current?.focus()
      }
  },[isEdit])

  return (
    <div className={style.InputTask}>
      <label className={style.inputTaskLabel}>
         <input
          type="checkbox"
          disabled={isEdit} //место которое запрещает кликать на чек кнопку
          checked={check}
          className={style.inputTaskCheck}
          onChange={(evt) => {
              setCheck(evt.target.checked)
              if(evt.target.checked){
                setTimeout(() => {
                 onDone(id)
                }, 3000);
              }
          }}
         />
         { isEdit ? (
            <input
              value={value}
              ref={editTitleInput}
              onChange={(evt)=> {
                setValue(evt.target.value)
              }}
              onKeyDown={(evt)=> {
                if(evt.key === "Enter") {
                  onChange(id,value)
                  setIsEdit(false)
                }
              }}
              className={style.inputTaskEditTitle}
            />
          ) : (
           <h3 className={style.inputTaskTitle}>{title}</h3>
          )}
      </label>
    <div className={style.inputTaskTwoBrn}>

      { isEdit ? (<button
        aria-label="Save"
        className={style.inputTaskSave}
        onClick={()=> {
           onChange(id,value)
           setIsEdit(false)
        }}
      />) :
      (<button
        aria-label="edit"
        className={style.inputTaskEdit}
        onClick={()=> {
           setIsEdit(true)
        }}
      />)}
       <button
        aria-label="remove"
        className={style.inputTaskRemove}
        onClick={()=> {
          if(confirm("ARE YOU SURE?")) {
            onRemove(id)
          }
        }}
      />
    </div>
    </div>
  )
}

export default InputTask
