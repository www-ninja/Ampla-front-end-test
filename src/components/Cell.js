import React, { useEffect, useState } from 'react';
import { StyledCell, StyledInput } from './styled';

const Cell = (props) => {    

    const [ selected, setSelected ] = useState(false);
    const [ editing, setEditing ] = useState(false);
    const [ value, setValue ] = useState(props.value);

    useEffect(() => {
        if(props.selected && props.selected.x === props.x && props.selected.y === props.y) {
            setSelected(true)
        } else {
            setSelected(false)
            setEditing(false)
        }
    }, [props.selected])// eslint-disable-line react-hooks/exhaustive-deps

    const onClicked = (e) => {
        if (props.x === 0 || props.y === 0) return;
        props.onSelected({x: props.x, y: props.y})
        setSelected(true)
    }

    const onDoubleClicked = (e) => {
        if (props.x === 0 || props.y === 0) return;
        setEditing(true);
    }

    const onKeyPressOnInput = (e) => {
        if (e.key === 'Enter') {
            setNewValue(e.target.value)
        }
    }

    const onBlur = (e) => {
        setNewValue(e.target.value);
    }

    const onChange = (e) => {
        setValue(e.target.value);
    }

    const setNewValue = (value) => {
        props.onChangedValue({
            x: props.x,
            y: props.y
        }, value)
        setEditing(false);
    }

    const getColumnName = (index) => {
        const letters = '0ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return letters[index];
    }

    const displayValue = (value) => {
        if (props.x === 0 && props.y === 0) return '';
        if(props.x === 0 || props.y === 0)
            return (props.x === 0 && props.y) || (props.y === 0 && getColumnName(props.x));
        else {
            if (value.slice(0, 1) === '=') {
                const pos = {
                    x: props.x,
                    y: props.y
                }
                const res = props.executeFormula(pos, value.slice(1))
                if (res.error !== null) {
                    return 'INVALID'
                }
                return res.result
            } else  return value
        }
    }

    if(editing) {
        return (
            <StyledInput 
                x={props.x}
                y={props.y}
                value={value}
                selected={selected}
                onBlur={onBlur}
                onChange={onChange}
                onKeyPress={onKeyPressOnInput}
            />
        )
    }

    return (
        <StyledCell 
            x={props.x}
            y={props.y}
            selected={selected}
            onClick={onClicked}
            onDoubleClick={onDoubleClicked}
        >
            {displayValue(props.value)}
        </StyledCell>
    )
}

export default Cell;