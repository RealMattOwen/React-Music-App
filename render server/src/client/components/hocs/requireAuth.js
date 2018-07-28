import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default ChildComponent => {
    class RequireAuth extends Component {
        render() {
            switch (this.props.user) {
                case false:
                    return <Redirect to="/login" />;
                case null:
                    return <div>Loading...</div>;
                default:
                    return <ChildComponent {...this.props} />
            }
        }
    }

    const mapStateToProps = ({ user }) => ({
        user
    });

    return connect(mapStateToProps)(RequireAuth);
};