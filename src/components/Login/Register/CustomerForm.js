import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import {connect} from 'react-redux';
import {registerCompany} from '../../../redux/ducks/userReducer';

class CustomerForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      password1: '',
      email: ''
    };
  };

  updateEvent = (e) => {
    const {name, value} = e.target;
    this.setState({ [name]: value });
  }

  componentWillUnmount() {
    const {name, password1, email} = this.state;
    this.props.registerCompany({name, password1, email});
  }

  render() {
    return(
      <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Company Information
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="name"
            name="name"
            label="Name"
            fullWidth
            autoComplete="fname"
            onChange={this.updateEvent}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            type="password"
            id="password1"
            name="password1"
            label="Password"
            fullWidth
            onChange={this.updateEvent}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            onChange={this.updateEvent}
          />
        </Grid>
      </Grid>
    </React.Fragment>
    );
  };
};

function mapStateToProps(reduxState) {
  return {
      user: reduxState.user
  };
};


export default connect(mapStateToProps, {registerCompany})(CustomerForm);