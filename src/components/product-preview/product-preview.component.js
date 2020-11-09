import React, {Component} from 'react';

class ProductPreview extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let {title, product_image} = this.props;
        return(
            <div>
                <div style={{textAlign:'center'}}>
                    <img style={{height:'auto', width:'auto', maxHeight:'175px', maxWidth:'230px', display:'block'}}
                        src={product_image}>
                    </img>
                </div>
                <div>
                    <h5>{title}</h5>
                </div>
            </div>    
        )
    }
}

export default ProductPreview;