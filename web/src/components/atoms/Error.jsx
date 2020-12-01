import React from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { showError } from '../../redux/ducks/common.duck';

export function Error() {
    const app = useSelector(state => state);
    const {error} = app.commonReducer;

    const dispatch = useDispatch();

    React.useEffect(() => {
        if (error) {
            setTimeout(() => {
                dispatch(showError(null));
            }, 2000);
        }
    }, error);

    return (
        <>
        {
            error ? 
            <div style={{
                'height': '100vh',
                'width': '100%',
                'margin': 'auto',
                'backgroundColor':'rgba(0,0,0,0.7)',
                'position':'fixed',
                'zIndex':'1060',
                'display': 'flex',
                'alignItems': 'center',
                
            }}>
                <div style={{
                    'backgroundColor': '#dc3545',
                    'color': 'white',
                    'width': '500px',
                    'height': '100px',
                    'textAlign': 'center',
                    'lineHeight': '100px',
                    'borderRadius': '20px',
                    'margin': 'auto'
                }}>
                    {error}
                </div>
            </div>
                 : null
        }
        </>
    );
}