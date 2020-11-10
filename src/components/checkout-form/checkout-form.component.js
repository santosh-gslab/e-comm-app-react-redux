import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import { returnRegex } from '../../services';

class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchased: false,
            nameValid: true,
            phoneValid: true,
            emailValid: true,
            cardValid: true,
            formValid: true
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        let nameV = this.state.nameValid;
        let phoneV = this.state.phoneValid;
        let emailV = this.state.emailValid;;
        let cardV = this.state.cardValid;
        if( nameV && phoneV && emailV && cardV) {
            this.setState({purchased: true, formValid: true});
            setTimeout(() => {
                this.props.history.push("/products");
            }, 1000);
        }
        else {
            this.setState({formValid: false});
        }
    }

    checkInput(e){
        let type = e.target.name;
        let value = e.target.value;
        switch(type) {
            case 'name':
                this.setState({nameValid: returnRegex(e.target.name).test(value)});
                break;
            case 'email':
                this.setState({emailValid: returnRegex(e.target.name).test(value)});
                break;
            case 'phone':
                this.setState({phoneValid: returnRegex(e.target.name).test(value)});
                break;
            case 'cardnumber':
                this.setState({cardValid: returnRegex(e.target.name).test(value)});
                break;
        }
    }

    render() {
        const {nameValid, phoneValid, emailValid, cardValid} = this.state;
        return(
            <div>
                { !this.state.purchased &&
                    <div>
                        <form onSubmit={(e)=>{this.handleSubmit(e)}}>
                            <div >
                                <div>
                                    <input type="text" name="name" placeholder="Name" onChange={(e)=>this.checkInput(e)}></input>
                                    {!nameValid && <div style={{color: 'red', padding:'5px'}}>Name Invalid!</div>}
                                </div>
                                <div>
                                    <input type="email" name="email" placeholder="abc@gmail.com" onChange={(e)=>this.checkInput(e)}></input>
                                    {!emailValid && <div style={{color: 'red', padding:'5px'}}>Email Invalid!</div>}
                                </div>
                                <div>
                                    <input type="text" name="phone" placeholder="Enter 10 digit Phone Number" onChange={(e)=>this.checkInput(e)} maxLength="10"></input>
                                    {!phoneValid && <div style={{color: 'red', padding:'5px'}}>Phone Invalid!</div>}
                                </div>
                                <div>
                                    <input type="text" name="cardnumber" placeholder="Credit/Debit Card Number" onChange={(e)=>this.checkInput(e)} maxLength="16"></input>
                                    {!cardValid && <div style={{color: 'red', padding:'5px'}}>Card Invalid!</div>}
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
                        <h2 style={{color: 'green'}}>Congratulations!!! Order Placed...</h2>
                    </div>
                }
                { !this.state.formValid &&
                    <div>
                        <h2 style={{color: 'red'}}>Form Invalid!</h2>
                    </div>
                }
            </div>
        )
    }
}

export default CheckoutForm;