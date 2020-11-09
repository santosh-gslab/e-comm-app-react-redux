import React, {Component} from 'react';
import {callAPI} from '../../services';
import { Grid, Paper, Typography, ButtonBase } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import {addToCart} from '../../actions/cart-actions';
import {getHt, getWidth} from '../../services';

let docHt = getHt() - 100;
let docWidth = getWidth() - 300;

class ProductDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productDetails: {},
            quantity: 1
        }
    }

    incrementordecrementQuantity(e) {
        let value = this.state.quantity;
        if(e.target.value === "add") {
            value = value + 1;
        }
        else if( e.target.value === "subtract") {
            value = value - 1;
            if(value <= 1) {
                value = 1;   
            }
        }
        this.setState({quantity: value});
    }

    addProductToCart() {
        let product = this.state.productDetails;
        this.props.addToCart(this.props.cart, { ...product, "quantity": this.state.quantity})
    }

    componentDidMount() {
        callAPI(
            'products',
            'get',
            (response)=>{
                this.setState({productDetails: response.data});
            },
            (error)=>{
                console.log(error);
            },
            this.props.match.params.id
        );
    }

    render() {
        const {productDetails, quantity} = this.state;
        return (
            <div style={{margin:'5px'}}>
                <Paper height={docHt} width={docWidth}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <ButtonBase>
                                <img src={productDetails.image} style={{height:'auto', width:'auto', maxHeight:'175px', maxWidth:'230px', display:'block'}}/>
                            </ButtonBase>
                        </Grid>
                        <Grid item sm container>
                            <Grid item xs container direction="row" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                        <b>{productDetails.title}</b>
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <b>Description:</b> {productDetails.description}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1">Rs.{productDetails.price}</Typography>
                                <Typography>
                                    <button value="subtract" onClick={(e)=>this.incrementordecrementQuantity(e)}>-</button>
                                    <input type="textbox" size="2" style={{textAlign:'center'}} value={quantity}></input>
                                    <button value="add" onClick={(e)=>this.incrementordecrementQuantity(e)}>+</button>
                                </Typography>
                                <Typography>
                                    <Button type="submit" variant="contained" color="primary" onClick={()=>this.addProductToCart()}>ADD TO CART</Button>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    cart: state.cartItems.items,
});

export default connect(mapStateToProps, {addToCart})(ProductDetails);