import React, { Component } from 'react'

interface Props {
    colors: [];
}

const Colors:React.FC<Props> = ({ colors }) =>  {
    
        return (
            <div className="colors">
                {
                colors.map((color:number, index:number) =>(
                    <button style={{background: color}} key={index}></button>
                ))
                }
            </div>
        )
    
}

export default Colors