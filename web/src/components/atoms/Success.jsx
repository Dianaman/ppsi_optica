import React from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { showSuccess } from '../../redux/ducks/common.duck';

export function Success() {
    const app = useSelector(state => state);
    const {success} = app.commonReducer;

    const dispatch = useDispatch();

    React.useEffect(() => {
        if (success) {
            setTimeout(() => {
                dispatch(showSuccess(null));
            }, 2000);
        }
    }, [success, dispatch]);

    return (
        <>
        {
            success ? 
            <div style={{
                'height': '100vh',
                'width': '100%',
                'margin': 'auto',
                'backgroundColor':'rgba(255,255,255,0.7)',
                'position':'fixed',
                'zIndex':'1060',
                'display': 'flex',
                'alignItems': 'center',
                
            }}>
                <div style={{
                    'backgroundColor': '#76b852',
                    'color': 'white',
                    'width': '500px',
                    'height': '100px',
                    'textAlign': 'center',
                    'lineHeight': '100px',
                    'borderRadius': '20px',
                    'margin': 'auto'
                }}>
                    {success}
                </div>
            </div>
                 : null
        }
        </>
    );
}