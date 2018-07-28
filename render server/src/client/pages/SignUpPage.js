import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Alert from '../components/Alert';
import { alert } from '../actions/alert';
import { signUp } from '../actions/user';

class Login extends React.Component {
    state = {
        email: '',
        password: '',
        confirmedPassword: '',
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
    handleSignUp = e => {
        e.preventDefault();

        if (!this.state.email || !this.state.password || !this.state.confirmedPassword) {
            this.props.alert({ message: 'Fill in all of the fields and try again', type: 'error' });
            return;
        }

        if (this.state.password !== this.state.confirmedPassword) {
            this.props.alert({ message: 'Confirm Password and Password do not match', type: 'error' });
            return;
        }

        this.props.signUp(this.state);
    };
    render() {
        return (
			<div className="form-parent">
				<div className="form-container">
					<h1 className="form-title">Create an account</h1>
					<form className="form" onSubmit={this.handleSignUp}>
						<input className="input" id="email" onChange={this.handleInputChange} placeholder="Email" value={this.state.email} />
						<input className="input" id="password" onChange={this.handleInputChange} placeholder="Password" type="password" value={this.state.password} />
						<input className="input" id="confirmedPassword" onChange={this.handleInputChange} placeholder="Confirm Password" type="password" value={this.state.confirmedPassword} />
						<button className="action-btn">Sign Up</button>
					</form>
					{this.props.alertData && <Alert message={this.props.alertData.message} type={this.props.alertData.type} />}
					{this.props.user && <Redirect to="/" />}
				</div>
			</div>
        );
    }
}

const mapStateToProps = ({ alertData, user }) => ({
    alertData,
    user
});

const mapDispatchToProps = dispatch => ({
    alert: data => dispatch(alert(data)),
    signUp: data => dispatch(signUp(data))
});

export default {
    component: connect(mapStateToProps, mapDispatchToProps)(Login)
};