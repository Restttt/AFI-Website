import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import FormatPaint from '@material-ui/icons/FormatPaint';
import DirectionsCar from '@material-ui/icons/DirectionsCar';
import Face from '@material-ui/icons/Face';
import PanTool from '@material-ui/icons/PanTool';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';


import NewProducts from './Products/NewProducts';
import {connect} from 'react-redux';
import {logout, getAccount} from '../../redux/ducks/userReducer';
import {getAllProducts, getByCategory} from '../../redux/ducks/storeReducer';
import {Link} from 'react-router-dom';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
  loginButton: {
    textDecoration: 'none',
    color: 'white'
  }
});

class Store extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accountMenu: null,
      open: true,
      category: 'all'
    }
  }

  changeCategory = (e) => {
    const {value} = e.target;
    if (value !== this.state.category) {
        this.setState({ category: value });
        if (value === "All") {
            this.props.getAllProducts();
        } else {
            let category = value;
            category = category.toLowerCase();
            category = {
                category: category
            };
            this.props.getByCategory(category);
        };
    };
  };

  logoutUser = async () => {
    await this.props.logout();
    const {history} = this.props;
    history.push('/');
    window.location.reload(); //THIS WILL DESTROY USER SESSION, PUSH THEM TO HOME PAGE, AND FORCE REFRESH TO UPDATE HEADER
  };

  handleDrawer = () => {
    this.setState({ open: !this.state.open});
  };

  handleAccountMenu = (e) => {
    this.setState({ accountMenu: e.currentTarget });
  };

  handleClose = () => {
    this.setState({ accountMenu: null });
  };

  componentDidMount() {
    this.props.getAllProducts();
    this.props.getAccount();
  }

  render() {
    console.log(this.props.store);
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
      <div className={classes.root}>
        <CssBaseline />
        <AppBar 
        position="absolute"
        className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
          <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
          <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawer}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden,
              )}
            >
              <MenuIcon />
            </IconButton>
          <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              AFI PAINT & SUPPLY
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
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <div>
                <ListItem button onClick={() => this.props.getAllProducts()}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="All" />
                </ListItem>
            </div>
          <Divider />
          <List>
            <div>
                <ListSubheader inset>Shop By Category</ListSubheader>
                <ListItem button onClick={() => this.props.getByCategory('paint')}>
                <ListItemIcon>
                    <FormatPaint />
                </ListItemIcon>
                <ListItemText primary="Paint Products" />
                </ListItem>
                <ListItem button onClick={() => this.props.getByCategory('car care')}>
                <ListItemIcon>
                    <DirectionsCar />
                </ListItemIcon>
                <ListItemText primary="Car Products" />
                </ListItem>
                <ListItem button onClick={() => this.props.getByCategory('mask')}>
                <ListItemIcon>
                    <Face />
                </ListItemIcon>
                <ListItemText primary="Masks" />
                </ListItem>
                <ListItem button onClick={() => this.props.getByCategory('tools')}>
                <ListItemIcon>
                    <PanTool />
                </ListItemIcon>
                <ListItemText primary="Tools" />
                </ListItem>
            </div>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Typography variant="h4" gutterBottom component="h2">
            Products
          </Typography>
          <Typography component="div" className={classes.chartContainer}>
          <NewProducts products={this.props.store.products}/>
          </Typography>
        </main>
      </div>
    );
  }
}

function mapProductsToState(reduxState) {
  return {
      store: reduxState.store,
      user: reduxState.user
  };
};


Store.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapProductsToState, {logout, getAllProducts, getByCategory, getAccount})(withStyles(styles)(Store));