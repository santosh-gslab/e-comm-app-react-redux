import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux';
import Styles from './header.style';
import {NavLink} from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        console.log(this.props.cart.length);
        return (
            <Grid container direction="row" justify="space-between" style={Styles.headerContainer}>
                <Grid item xs={8}>
                    <Grid container direction="row" justify="flex-start">
                        <Grid item xs={2} style={Styles.menuItem}>
                            <NavLink exact to="/products" activeClassName="activeLink" style={{ textDecoration: 'none' }}>Products</NavLink>
                        </Grid>
                    </Grid>
                </Grid>  
                <Grid item xs={4} style={Styles.menuItem}>
                    <NavLink to="/cart" activeClassName="activeLink" style={{ textDecoration: 'none' }}>Cart({this.props.cart.length})</NavLink>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    cart: state.cartItems.items,
});

export default connect(mapStateToProps)(Header);