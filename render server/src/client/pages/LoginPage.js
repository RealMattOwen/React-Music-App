import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Alert from '../components/Alert';
import { alert } from '../actions/alert';
import { login } from '../actions/user';

class Login extends React.Component {
    state = {
        email: '',
        password: ''
    };
    componentWillUnmount() {
        this.props.alert();
    };
    handleInputChange = e => {
        const target = e.target;
        const name = target.id;
        const value = target.value;

        this.setState({
            [name]: value
        });
    };
    handleLogin = e => {
        e.preventDefault();

        if (!this.state.email || !this.state.password) {
            this.props.alert({ message: 'Enter your login details and try again', type: 'error' });
            return;
        }

        this.props.login({ email: this.state.email.toLowerCase(), password: this.state.password });
    };
    render() {
        return (
        	<div className="form-parent">
				<div className="form-container">
					<h1 className="form-title">Login or Sign Up</h1>
					<form className="form" onSubmit={this.handleLogin}>
						<input className="input" id="email" onChange={this.handleInputChange} placeholder="Email" value={this.state.email} />
						<input className="input" id="password" onChange={this.handleInputChange} placeholder="Password" type="password" value={this.state.password} />
						<button className="action-btn">Login</button>
					</form>
					or
					<Link className="signup-btn" to="/signup">Sign Up</Link>
					{this.props.alertData && <Alert message={this.props.alertData.message} type={this.props.alertData.type} />}
					{this.props.user && <Redirect to="/" />}
				</div>
			</div>
        );
    };
}

const mapStateToProps = ({ alertData, user }) => ({
    alertData,
    user
});

const mapDispatchToProps = dispatch => ({
    alert: data => dispatch(alert(data)),
    login: data => dispatch(login(data))
});

export default {
    component: connect(mapStateToProps, mapDispatchToProps)(Login)
};