import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Parser } from 'hot-formula-parser';
import { getDataFromLocalStorage, saveDataToLocalStorage } from '../utils'
import Row from './Row'

const TableSheet = (props) => {
    
    const [tableInfo, setTableInfo] = useState({});
    const [data, setData] = useState({});
    const [selected, setSelected] = useState(null);
    const { sheetId } = useParams();
    let navigate = useNavigate();
    
    useEffect(() => {
        const data = getDataFromLocalStorage('sheet-list');
        if (data) {
            const list = JSON.parse(data);
            let sheetInfo = list.find(el => el.id === sheetId);
            if(sheetInfo) {
                setTableInfo(sheetInfo);
                const tableData = getDataFromLocalStorage(sheetInfo.id)
                if (tableData) {
                    setData(JSON.parse(tableData))
                }
            }
            else navigate('/');
        }
    }, [sheetId]); // eslint-disable-line react-hooks/exhaustive-deps

    

    const onChangedValue = (pos, value) => {
        const updatedData = Object.assign({}, data);
        if (!updatedData[pos.y]) updatedData[pos.y] = {}
        updatedData[pos.y][pos.x] = value
        setData(updatedData)
        saveDataToLocalStorage(tableInfo.id, updatedData)
    }

    const executeFormula = (cell, value) => {
        const parser = new Parser();
        parser.on('callCellValue', (cellCoord, done) => {            
            const x = cellCoord.column.index + 1
            const y = cellCoord.row.index + 1

            // Check if I have that coordinates tuple in the table range
            if (x > props.x || y > props.y) {
                throw parser.Error(parser.ERROR_NOT_AVAILABLE)
            }
            
            // Check that the cell is not self referencing
            if (parser.cell.x === x && parser.cell.y === y) {
                throw parser.Error(parser.ERROR_REF)
            }

            if (!data[y] || !data[y][x]) {
                return done('')
            }
            // All fine
            return done(data[y][x])
        })

        parser.on('callRangeValue', (startCellCoord, endCellCoord, done) => {
            const sx = startCellCoord.column.index + 1
            const sy = startCellCoord.row.index + 1
            const ex = endCellCoord.column.index + 1
            const ey = endCellCoord.row.index + 1
            const fragment = []

            for (let y = sy; y <= ey; y += 1) {
                const row = data[y]
                if (!row) {
                    continue
                }

                const colFragment = []

                for (let x = sx; x <= ex; x += 1) {
                    let value = row[x]
                    if (!value) {
                        value = ''
                    }

                    if (value.slice(0, 1) === '=') {
                        const res = executeFormula({ x, y }, value.slice(1))
                        if (res.error) {
                            throw this.parser.Error(res.error)
                        }
                        value = res.result
                    }

                    colFragment.push(value)
                }
                fragment.push(colFragment)
            }

            if (fragment) {
                done(fragment)
            }
        })

        parser.cell = cell
        let res = parser.parse(value)
        if (res.error != null) {
            return res 
        }
        if (res.result.toString() === '') {
            return res
        }
        if (res.result.toString().slice(0, 1) === '=') {
            res = executeFormula(cell, res.result.slice(1))
        }

        return res
        
    }


    const rows = []
    for(let y = 0; y < props.y + 1; y+=1) {
        const rowData = data[y] || {}
        rows.push(
            <Row 
                key={y} 
                x={props.x + 1}
                y={y}
                rowData={rowData}
                onChangedValue={onChangedValue}
                selected={selected}
                onSelected={setSelected}
                executeFormula={executeFormula}
            />
        )
    }
    return (
        <div>
            {rows}
        </div>
    )
}

export default TableSheet;