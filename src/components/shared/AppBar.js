import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';

import {connect} from 'react-redux';
import {logout, getAccount} from '../../redux/ducks/userReducer';
import { HashRouter, Link } from 'react-router-dom';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  loginButton: {
      textDecoration: 'none',
      color: 'white'
  }
};

class NewHeader extends React.Component {
  state = {
    accountMenu: null,
  };

  logoutUser = async () => {
    await this.props.logout();
    const {history} = this.props;
    history.push('/');
    window.location.reload(); //THIS WILL DESTROY USER SESSION, PUSH THEM TO HOME PAGE, AND FORCE REFRESH TO UPDATE HEADER
  };

  handleAccountMenu = (e) => {
    this.setState({ accountMenu: e.currentTarget });
  };

  handleClose = () => {
    this.setState({ accountMenu: null });
  };

  componentDidMount() {
      this.props.getAccount();
  }

  render() {
    const { classes } = this.props;
    const { accountMenu } = this.state;
    const open = Boolean(accountMenu);

    const loginButton = () => {
        if (!this.props.user.id) {
            return(
                <Link to="/login" className={classes.loginButton}><Button color="inherit">Login</Button></Link>
            )
        } else {
            return null
        };
    };

    return (
      <HashRouter>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            
            <Typography variant="h5" color="inherit" className={classes.grow}>
              <Link to="/" className={classes.loginButton}>AFI PAINT & SUPPLY</Link>
            </Typography>
            {loginButton()}
            {this.props.user.id && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleAccountMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={accountMenu}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={() => {this.handleClose(); this.logoutUser()}}>Logout</MenuItem>
                  <Link to="/account" className={classes.loginButton}><MenuItem onClick={this.handleClose}>My Account</MenuItem></Link>
                  <Link to="/store" className={classes.loginButton}><MenuItem onClick={this.handleClose}>Store</MenuItem></Link>
                  <Link to="/cart" className={classes.loginButton}><MenuItem onClick={this.handleClose}>Cart</MenuItem></Link>
                  {this.props.user.admin ? (<Link to="/admin/dashboard" className={classes.loginButton}><MenuItem onClick={this.handleClose}>Dashboard</MenuItem></Link>) : (<div></div>)}
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    </HashRouter>
    );
  }
}

function mapStateToProps(reduxState) {
    return {
        user: reduxState.user
    };
};

NewHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {logout, getAccount})(withStyles(styles)(NewHeader));