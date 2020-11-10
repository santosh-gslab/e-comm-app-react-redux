import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import {getHt, returnRegex} from '../../services';

let ht = getHt() - 50;

class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchased: false
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({purchased: true});
        setTimeout(() => {
            this.props.history.push("/products");
          }, 1000);
    }

    render() {
        return(
            <div>
                { !this.state.purchased &&
                    <div>
                        <form onSubmit={(e)=>{this.handleSubmit(e)}}>
                            <div>
                                <div>
                                    <input type="text" placeholder="Name"></input>
                                    {/* {!input.valid && <div style={{color: 'red', padding:'5px'}}>{input.errorMsg}</div>} */}
                                </div>
                                <div>
                                    <input type="email" placeholder="abc@gmail.com"></input>
                                </div>
                                <div>
                                    <input type="text" placeholder="Phone Number"></input>
                                </div>
                                <div>
                                    <input type="text" placeholder="Credit/Debit Card Number"></input>
                                </div>
                                <div>
                                    <Button type="submit" variant="contained" color="primary">BUY</Button>
                                </div>
                            </div>                            
                        </form>
                    </div>
                }
                { this.state.purchased &&
                    <div>
                        <h2 style={{color: 'red'}}>Congratulations!!! Order Placed...</h2>
                    </div>
                }
            </div>
        )
    }
}

export default CheckoutForm;