import React from 'react';

export default ({ message, type }) => (
    <div className={type === 'success' ? 'alert success-alert' : 'alert error-alert'}>
        {message}
    </div>
);