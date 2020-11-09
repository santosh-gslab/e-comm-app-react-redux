import React, {Component} from 'react';
import { Grid, Paper, Typography, ButtonBase, Button } from '@material-ui/core';
import {connect} from 'react-redux';
import {getHt, getWidth} from '../../services';
import CheckoutForm from '../checkout-form/checkout-form.component';

let docHt = getHt() - 100;
let docWidth = getWidth() - 300;

class CartPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clicked : false
        }
    }

    changeClickedState() {
        this.setState({clicked: true});
    }

    renderCart(cartDetails) {
        return (
        <div item style={{margin:'5px'}}>
                <Paper height={docHt} width={docWidth}>
                    <Grid container spacing={1}>
                        <Grid item>
                            <ButtonBase>
                                <img src={cartDetails.image} style={{height:'auto', width:'auto', maxHeight:'175px', maxWidth:'230px', display:'block'}}/>
                            </ButtonBase>
                        </Grid>
                        <Grid item sm container>
                            <Grid item xs container direction="row" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                        <b>{cartDetails.title}</b>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <b>Description:</b> {cartDetails.description}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1">Rs.{cartDetails.price}</Typography>
                                <Typography>
                                    Quantity: <input type="textbox" size="2" style={{textAlign:'center'}} value={cartDetails.quantity} readOnly="true"></input>
                                </Typography>
                                <Typography variant="subtitle1">Total: Rs.{cartDetails.price * cartDetails.quantity}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        )
    }

    render() {
        const {clicked} = this.state;
        return(
            <Grid container spacing={2} direction="column">
                <Grid item>
                    <Grid container>
                        <Grid item>
                            {
                                (this.props.cart && this.props.cart.length > 0) && 
                                this.props.cart.map((cartDetails) => {
                                    return(
                                        this.renderCart(cartDetails)
                                    )
                                })
                            }
                        </Grid>
                        <Grid item>
                            {
                                (!(this.props.cart && this.props.cart.length > 0) && ( JSON.parse( localStorage.getItem("cartItems")) && JSON.parse( localStorage.getItem("cartItems")).length > 0)) &&
                                JSON.parse( localStorage.getItem("cartItems")).map((cartDetails) => {
                                    return(
                                        this.renderCart(cartDetails)
                                    )
                                })
                            }
                        </Grid>
                    </Grid>
                </Grid>
                {
                    (!(this.props.cart && this.props.cart.length > 0) && !( JSON.parse( localStorage.getItem("cartItems")) && JSON.parse( localStorage.getItem("cartItems")).length > 0)) &&
                    <Grid item><h3 style={{color: 'red'}}>Cart is Empty!!!</h3></Grid>
                }
            
                <Grid item>
                    {!clicked && <Button type="submit" variant="contained" color="primary" onClick={()=>this.changeClickedState()}>CHECKOUT</Button>}
                    {clicked && <CheckoutForm></CheckoutForm>}
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    cart: state.cartItems.items,
});

export default connect(mapStateToProps)(CartPage);