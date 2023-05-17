import { StyledRow } from '@/styles/StyledComponents'
import React from 'react'

type Props={
    width?: string,
    vrAlign?: string,
    hrAlign?: string,
    className?: string,
    children: any,
}

export default function FlexRow({width , vrAlign, hrAlign, className, children} :Props) {
  return (
    <div style={
      {display: 'flex',
      alignItems: vrAlign ? vrAlign : 'center',
      justifyContent: hrAlign ? hrAlign : 'center',
      flexDirection: 'row',
      textAlign: 'left', 
      width: width ? width : 'fit-content'}}
      >
      {children}
    </div>
  )
}
