import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import {getHt, returnRegex} from '../../services';

let ht = getHt() - 50;

class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkoutForm: [
                {
                    key: 'name',
                    type: 'text',
                    valid: true,
                    value: '',
                    required: true,
                    errorMsg: 'Invalid text!'
                },
                {
                    key: 'email',
                    type: 'email',
                    valid: true,
                    value: '',
                    required: true,
                    errorMsg: 'Invalid email!'
                },
                {
                    key: 'phone',
                    type: 'text',
                    valid: true,
                    value: '',
                    required: true,
                    errorMsg: 'Invalid number!'
                },
                {
                    key: 'creeditcard',
                    type: 'text',
                    valid: true,
                    value: '',
                    required: true,
                    errorMsg: 'Invalid creeditcard!'
                }
            ],
            formSubmitted: false,
            formError: false,
            formValid: true,
            errMsg: ''
        }
    }

    changeInput(e, index) {
        let isValid = this.validate(e.target.value, index);
        let tempArr = this.state.checkoutForm.slice(0);
        tempArr[index].value = e.target.value;
        tempArr[index].valid = isValid;
        this.setState({checkoutForm: tempArr}); 
    }

    validateForm() {
        for(let i=0; this.state.checkoutForm[i]; i++) {
            if(!this.state.checkoutForm[i].valid) {
                return false;
            }
        }
        return true;
    }

    validate(value, index) {
        let {key, type, valid, required, regex} = this.state.checkoutForm[index];
        if(required) {
            if(! value.length > 0) {
                return false;
            }
        }
        switch(type) {
            case ('none'):
                if(regex){
                    return value.match(returnRegex(type))?true:false;
                }
                return true;
            default:
                return value.match(returnRegex(type))?true:false;
        }
    }

    submitForm(){
        let isFormValid = this.validateForm();
        if(isFormValid) {
            console.log(this.props.history);
        }
        else {
            console.log("Form not submitted");
            this.setState({formSubmitted: false, formValid: false});
        }  
    }

    render() {
        const {checkoutForm} = this.state;
        return(
            <div>
                <form onSubmit={()=>{this.submitForm()}}>
                    <Grid container style={{height: ht}} alignItems="center" justify="center" direction="column">
                        <Grid item>
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
                            </div>
                        </Grid>
                        <Grid item>
                            {!this.state.formValid && <div style={{color: 'red'}}>Form is invalid!!!</div>}
                            {this.state.formSubmitted && <div style={{color: 'green'}}>Congratulations!!! Form Submitted</div>}
                        </Grid>
                        <Grid item>
                            <Button type="submit" variant="contained" color="primary">BUY</Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        )
    }
}

export default CheckoutForm;