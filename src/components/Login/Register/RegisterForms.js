import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Alert from 'react-s-alert';
import {connect} from 'react-redux';

import CustomerForm from './CustomerForm';
import AddressForm from './AddressForm';
import {registerUser} from '../../../redux/ducks/userReducer';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
});

const steps = ['Company Information', 'Company Address' ];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <CustomerForm />;
    case 1:
      return <AddressForm />;
    default:
      throw new Error('Unknown step');
  }
}

class RegisterForms extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStep: 0,
    }
  }

  handleNext = async () => {
    if (this.state.activeStep === 1) {
      const {email, name, password, address, city, state, zipCode} = this.props.user;
      await this.props.registerUser({email, name, password, address, city, state, zipCode});
      if (this.props.user.id) {
        const {history} = this.props;
        history.push('/store');
        Alert.success(`Welcome ${this.props.user.name}`, {
          position: 'top-right',
          effect: 'genie',
          beep: false,
          timeout: 2000,
          offset: 100
        });
      };
    } else {
      this.setState(state => ({
        activeStep: state.activeStep + 1,
      }));
    }
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Register
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment> 
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={this.handleBack} className={classes.button}>
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Register' : 'Next'}
                    </Button>
                  </div>
                </React.Fragment>
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    );
  };
};

function mapStateToProps(reduxState) {
  return {
      user: reduxState.user
  };
};

RegisterForms.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {registerUser})(withStyles(styles)(RegisterForms));