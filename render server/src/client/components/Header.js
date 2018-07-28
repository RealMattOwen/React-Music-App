import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/user';

class Header extends React.Component {
    state = {
        logoutPopup: false,
        menu: 'menu'
    };
    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.setState({ menu: 'menu' });
        }
    };
    toggleMenu = () => {
        this.setState(prevState => ({ menu: prevState.menu === 'menu' ? 'menu open' : 'menu' }));
    };
    render() {
        return (
            <div>
                <header className="header">
					<Link to="/"><h1 className="app-name">Music App</h1></Link>
                    <button className="menu-btn" onClick={this.toggleMenu}>Menu</button>
                </header>
                <ul className={this.state.menu === 'menu' ? 'menu' : this.state.menu.concat(this.state.logoutPopup ? ' logout' : '')}>
                    <li className="menu-item"><Link to="/">All Songs</Link></li>
                    <li className="menu-item"><Link to="/playlists">My Playlists</Link></li>
                    <li className="menu-item">
                        {this.props.user ? (
                            <button className="logout-btn" onClick={() => this.setState({ logoutPopup: true })}>Logout</button>
                        ) : (
                            <Link to="/login">Login or Sign Up</Link>
                        )}
                    </li>
                </ul>
                {this.state.logoutPopup && (
                    <div className="background">
                        <div className="confirm-logout">
                            <p>Are you sure you want to logout?</p>
                            <div className="button-container">
                                <button className="action-btn" onClick={() => this.setState({ logoutPopup: false })}>Stay
                                    logged in
                                </button>
                                <button className="action-btn" onClick={() => {
                                    this.setState({ logoutPopup: false });
                                    this.props.logout();
                                }}>Logout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };
}

const mapStateToProps = ({ user }) => ({
    user
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);