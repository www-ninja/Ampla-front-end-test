import styled from 'styled-components';

export const StyledCell = styled.span`
    width: ${props => (props.x === 0 ? '50px' : '80px')};
    padding: 4px;
    margin: 0px;
    height: 25px;
    box-sizing: border-box;
    position: relative;
    display: inline-block;
    color: black;
    border: 1px solid rgb(202, 202, 202);
    outline-color: ${props => props.selected ? 'lightblue' : 'none'};
    outline-style: ${props => props.selected ? 'solid' : 'none'};
    text-align: ${props => (props.x === 0 || props.y === 0 ? 'center' : 'left')};
    background: ${props => (props.x === 0 || props.y === 0 ? '#f0f0f0' : '#fff')};
    cursor: ${props => (props.x === 0 || props.y === 0) && 'pointer'};
    z-index: ${props => props.selected ? '1' : '0'};
    vertical-align: top;
    font-size: 14px;
    font-weight: ${props => (props.x === 0 || props.y === 0 ? 'bold' : 'normal')};
    line-height: 15px;
    overflow: hidden;
    font-family: Calibri, "Segoe UI", Thonburi, Arial, Verdana, sans-serif;
`;

export const StyledInput = styled.input`
    width: 80px;
    padding: 4px;
    margin: 0px;
    height: 25px;
    box-sizing: border-box;
    position: relative;
    display: inline-block;
    color: black;
    border: 1px solid rgb(202, 202, 202);
    outline-color: ${props => props.selected ? 'lightgreen' : 'none'};
    outline-style: ${props => props.selected ? 'solid' : 'none'};
    text-align: ${props => (props.x === 0 || props.y === 0 ? 'center' : 'left')};
    background: ${props => (props.x === 0 || props.y === 0 ? '#f0f0f0' : '#fff')};
    z-index: ${props => props.selected ? '1' : '0'};
    vertical-align: top;
    font-size: 14px;
    font-weight: ${props => (props.x === 0 || props.y === 0 ? 'bold' : 'normal')};
    line-height: 15px;
    overflow: hidden;
    font-family: Calibri, "Segoe UI", Thonburi, Arial, Verdana, sans-serif;
`;

export const UL = styled.ul`
    list-style: none;
    padding: 0;
`;

export const LI = styled.li`
    & a, & a:visited, & a:hover, & a:active {
        text-decoration: none;
        color: blue;
        text-transform: capitalize;
    }

    & button {
        margin-top: 50px;
        border: none;
        background: lightgray;
        padding: 5px 30px;
        border-radius: 5px;
        cursor: pointer;
    }

`;