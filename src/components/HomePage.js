import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v1 as uuidv1 } from 'uuid';
import { 
    saveDataToLocalStorage, 
    getDataFromLocalStorage
} from '../utils';

import { UL, LI } from './styled';

const HomePage = () => {
    let navigate = useNavigate();
    const [list, setList] = useState([]);
    const [tableName, setTableName] = useState();    

    const loadData = () => {
        const data = getDataFromLocalStorage('sheet-list');
        if (data) {
            setList(JSON.parse(data));
        }
    }

    const createNew = () => {
        const id = uuidv1();
        let tableInfo = {
            name: tableName || 'anonym table',
            id: id,
        };
        saveDataToLocalStorage('sheet-list', [...list, tableInfo]);
        navigate(`/${id}`);
    };

    const clearHistory = () => {
        saveDataToLocalStorage('sheet-list', []);
        loadData();
    }

    useEffect(() => {
        // get the list of saved sheets.
        loadData();
    }, []);

    return (
        <div style={{marginLeft: '50px'}}>
            <h1>Ampla Frontend Task Leo</h1>
            <input 
                placeholder="Please add table name" 
                value={tableName}
                onChange={e => setTableName(e.target.value)}
            />
            
            <button onClick={() => createNew()}>Create</button>
            <br />
            <h3>Exiting tables</h3>
            <UL>
                {list && list.map((el, index) =>
                    <LI><Link key={index} to={`/${el.id}`}>{el.name}</Link></LI>
                )}

                {list.length > 0 && <LI><button onClick={() => clearHistory()}>Clear</button></LI>}
            </UL>
        </div>
    )
}

export default HomePage;