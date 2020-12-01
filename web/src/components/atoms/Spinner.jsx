import React from 'react';
import ScaleLoader from "react-spinners/ScaleLoader";
import { useSelector } from 'react-redux'; 

export function Spinner() {
    const app = useSelector(state => state);
    const {showLoading} = app.commonReducer;

    const override = `
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: auto;
    height: 100%;
  `;

    return (
        <>
        {
            showLoading ? 
            <div style={{
                'height': '100vh',
                'width': '100%',
                'margin': 'auto',
                'backgroundColor':'rgba(255,255,255,0.7)',
                'position':'fixed',
                'zIndex':'1060'
            }}>
                <ScaleLoader
                width={'10px'}
                height={'300px'}
                color={"#36D7B7"}
                margin={'10px'}
                css={override}
                loading={showLoading}
                />
            </div>
                 : null
        }
        </>
    );
}