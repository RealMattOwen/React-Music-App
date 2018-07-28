import React from 'react';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import Header from './components/Header';
import { fetchCurrentUser } from './actions/user';

const App = props => (
    <div>
        <Header location={props.location} />
        {renderRoutes(props.route.routes)}
    </div>
);

const mapStateToProps = ({ user }) => ({
    user
});

export default {
    component: connect(mapStateToProps)(App),
    loadData: ({ dispatch }) => dispatch(fetchCurrentUser())
};