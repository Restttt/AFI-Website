import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux';

import {registerAddress} from '../../../redux/ducks/userReducer';

class AddressForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipCode: ''
    };
  };

  updateEvent = (e) => {
    const {name, value} = e.target;
    this.setState({ [name]: value });
  };

  componentWillUnmount() {
    const {address1, address2, city, state, zipCode} = this.state;
    let address = address1;
    if (address1 && address2) {
      address = address1 + " " + address2;
    };
    this.props.registerAddress({address, city, state, zipCode})
  };

  render() {
    return(
      <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Company Address
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12} md={6}>
          <TextField required name="address1" id="address1" label="Address 1" fullWidth onChange={this.updateEvent} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField name="address2" id="address2" label="Address 2" fullWidth onChange={this.updateEvent}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField name="city" required id="city" label="City" fullWidth onChange={this.updateEvent}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField name="state" required id="state" label="State" fullWidth onChange={this.updateEvent}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField name="zipCode" type="number" required id="zipCode" label="Zip Code" fullWidth onChange={this.updateEvent}/>
        </Grid>
        <Grid item xs={12}>
        </Grid>
      </Grid>
    </React.Fragment>
    )
  }
}

function mapStateToProps(reduxState) {
  return {
      user: reduxState.user
  };
};

export default connect(mapStateToProps, {registerAddress})(AddressForm);