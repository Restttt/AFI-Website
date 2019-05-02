import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import {Link} from 'react-router-dom';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
});

class Products extends Component {
  constructor(props) {
      super(props);

      this.state = {
          category: 'All'
      } 
  }

  render() {
    const { classes } = this.props;
    const products = this.props.products.map((product, index) => {
      return(
          <Grid item key={index} sm={7} md={5} lg={4}>
                <Card className={classes.card}>
                <Link to={`/products/${product.productid}`}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={product.p_image} // eslint-disable-line max-len
                    title="Product"
                  />
                  </Link>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      ${product.price}
                    </Typography>
                    <Typography>
                      {product.p_name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
      )
  })
    return(
      <React.Fragment>
      <CssBaseline />
      <main>
        <div className={classNames(classes.layout, classes.cardGrid)}>
          {/* End hero unit */}
          <Grid container spacing={40}>
            {products}
          </Grid>
        </div>
      </main>
    </React.Fragment>
    )
  }
}

Products.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Products);