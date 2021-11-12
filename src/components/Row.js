import React from 'react'
import Cell from './Cell'

const Row = (props) => {
    const cells = []
    const y = props.y
    for (let x = 0; x < props.x; x += 1) {
        cells.push(
            <Cell 
                key={`${x}-${y}`}
                x={x} 
                y={y}  
                value={props.rowData[x] || ''}
                onChangedValue={props.onChangedValue}
                selected={props.selected}
                onSelected={props.onSelected}
                executeFormula={props.executeFormula}
            />
        )
    }
    return (
        <div>
            {cells}
        </div>
    )
}

export default Row
