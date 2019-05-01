import React, {Component} from 'react';
import { HashRouter, Link } from 'react-router-dom';
import Alert from 'react-s-alert';

// Components and style
import NewHeader from '../shared/AppBar';
import Footer from '../shared/Footer/Footer';
import './Login.scss';

// Redux
import {loginUser} from '../../redux/ducks/userReducer';
import {connect} from 'react-redux';

// MATERIAL // 
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});



class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    updateEvent = (e) => {
        const {name, value} = e.target;
        this.setState({ [name]: value });
    }

    attemptLogin = async () => {
        const login = {
            email: this.state.email,
            password: this.state.password
        };
        await this.props.loginUser(login)
        if (this.props.user.email) {
            Alert.success(`Welcome ${this.props.user.name}`, {
                position: 'top-right',
                effect: 'genie',
                beep: false,
                timeout: 2000,
                offset: 100
            });
            const {history} = this.props
            history.push('/store');
        } 
    };

    componentDidMount() {
        if (this.props.user.email) {
            Alert.error('You are already logged in', {
                position: 'top-right',
                effect: 'genie',
                beep: false,
                timeout: 2000,
                offset: 100
            });
            this.props.history.push('/store');
        };
    }

    render() {
        const {classes} = this.props;
        return(
            <HashRouter>
            <NewHeader history={this.props.history}/>
            <div className="login-page-div">
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    LOGIN
                    </Typography>
                    <form className={classes.form}>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input id="email" name="email" autoComplete="email" autoFocus onChange={this.updateEvent}/>
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.updateEvent}/>
                    </FormControl>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => this.attemptLogin()}
                    >
                        LOG IN
                    </Button>
                    <Link className="link" to='/register'><Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        REGISTER
                    </Button></Link>
                    </form>
                </Paper>
            </main>
            </div>
            <Footer />
            </HashRouter>
        );
    };
};

function mapStateToProps(reduxState) {
    return {
        user: reduxState.user
    };
};

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {loginUser})(withStyles(styles)(Login));