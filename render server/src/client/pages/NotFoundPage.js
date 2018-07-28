import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = ({ staticContext = {} }) => {
    staticContext.notFound = true;
    return (
        <div className="not-found-container">
            <h1>Page Not Found</h1>
            <Link className="not-found-link" to="/">Click here to return to main page</Link>
        </div>
    );
};

export default {
    component: NotFoundPage
};