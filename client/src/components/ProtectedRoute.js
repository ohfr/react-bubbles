import React from 'react';
import { Route, Redirect} from 'react-router-dom';
import { getToken } from '../utils/api';

const ProtectedRoute = (props) => {
    const {
        component: Component,
        ...rest
    } = props;
    return (
        <Route {...rest} render={(renderProps) => getToken() ? <Component {...renderProps} /> : <Redirect to="/" />} />
    )
};

export default ProtectedRoute;