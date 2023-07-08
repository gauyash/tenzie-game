import React from 'react'

export const Die = ({value, isHeld,holdDice, id}) => {
  return (
    <div 
    onClick={()=>holdDice(id)}
    style={{
      background:isHeld? "#59E391" : "#fff"
    }}

    className='rounded dices d-flex align-items-center justify-content-center'>{value}</div>
  )
}
