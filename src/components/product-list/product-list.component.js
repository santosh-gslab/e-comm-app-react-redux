import React, {Component} from 'react';
import { Grid } from '@material-ui/core';
import {fetchProducts} from '../../actions/product-actions';
import ProductPreview from '../product-preview/product-preview.component';
import {connect} from 'react-redux';
import {getHt} from '../../services';

let docHt = getHt() - 100;

class ProductList extends Component{

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchProducts();
    }

    changeRoute(product) {
        this.props.history.push(`/products/${product.id}`);
    }

    render() {
        let {products} = this.props;
        return(
            <div>
                <div>
                    <h3>Product Details</h3>
                    <hr/>
                </div>
                <div>
                    <Grid container direction="row" style={{height: docHt}}>
                        <Grid item xs={2} style={{borderRight:'1px solid #ccc', marginTop:'50px'}}>
                        </Grid>
                        <Grid item xs={10}>
                            <Grid container spacing={1}>
                                {
                                    products.map((product) => {
                                        return(
                                            <Grid item xs={4}>
                                                <div key={`product-${product.id}`} data-div_id={product.id} style={{height:'100%'}} onClick={()=>this.changeRoute(product)}>
                                                    <ProductPreview title={product.title} product_image={product.image}></ProductPreview>
                                                </div>
                                            </Grid>
                                        )
                                    })
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    products: state.productList.products
});

export default connect(mapStateToProps, { fetchProducts })(ProductList);