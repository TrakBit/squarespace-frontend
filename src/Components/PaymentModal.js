import React from 'react';
import Dialog from 'react-modal';
import styled from 'styled-components';
import {loadStripe} from '@stripe/stripe-js';
import {
    CardElement,
    Elements,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import {Input, Select} from 'antd';
import countries from './country';
import {createSubscription, getUser} from './../Api/Api';

const {Option} = Select;

const Button = styled.button`
  height: 42px;
  width: 120px;
  background-color: #00b7c2;
  border-color: #00b7c2
  color: #FFFFFF;
  font-weight: 500;
  font-size: 14px;
  border-radius: 0.25rem;
  line-height: 1.5;
`;

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const ModalContainer = styled(FlexCol)`
  padding: 0rem;
  align-items: center;
  justify-content: space-between;
`;

const customStyles = {
    content: {
        height: '550px',
        width: '400px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '0.25rem',
        boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)'
    }
};

const head = {
    fontWeight: '500',
    fontSize: '28px',
    color: '#32325D'
};

const stripePromise = loadStripe('pk_live_4BVjS3zxUpAnzX2LbapAZ1dE00czGfDM8Q');

const PaymentModal = ({
    paymentModal,
    paymentModalVisible,
    user,
    selectedPlan,
    billingDetails,
    setBillingDetails,
    invoiceModalVisible,
    setLiveButtonColor,
    setLiveButtonText,
    setUser,
    setLoading
}) => {
    return (
        <Dialog
            ariaHideApp={false}
            isOpen={paymentModal}
            style={customStyles}
            onRequestClose={() => paymentModalVisible(false)}
        >
            <ModalContainer>
                <h4 style={head}>{'Payment'}</h4>
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        selectedPlan={selectedPlan}
                        user={user}
                        billingDetails={billingDetails}
                        setBillingDetails={setBillingDetails}
                        paymentModalVisible={paymentModalVisible}
                        invoiceModalVisible={invoiceModalVisible}
                        setLiveButtonColor={setLiveButtonColor}
                        setLiveButtonText={setLiveButtonText}
                        setUser={setUser}
                        setLoading={setLoading}
                    />
                </Elements>
            </ModalContainer>
        </Dialog>
    );
};

const CheckoutForm = ({
    user,
    selectedPlan,
    billingDetails,
    setBillingDetails,
    paymentModalVisible,
    setLiveButtonColor,
    setLiveButtonText,
    setUser,
    setLoading
}) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {

        event.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
            billing_details: billingDetails
        });

        const fetchSubscription = async () => {
            await setLoading(true);
            await createSubscription(
                paymentMethod.id,
                user.customer_id,
                selectedPlan);
            await paymentModalVisible(false);
            const userData = await getUser();
            setUser(userData.data);
            if (userData.data.live === 0) {
                setLiveButtonColor('#f36886');
                setLiveButtonText('GO LIVE 🚀');
            } else {
                setLiveButtonColor('#00b7c2');
                setLiveButtonText('LIVE');
            }
            await setLoading(false);
        };

        if (error) {
            console.log('[error]', error);
        } else {
            fetchSubscription();
        }
    };

    return (
        <form
            style={{width: '300px', marginTop: '30px'}}
            onSubmit={handleSubmit}
        >
            <Field
                label='Name'
                required={true}
                value={billingDetails.name}
                onChange={(e) => {
                    setBillingDetails({...billingDetails, name: e.target.value});
                }}
            />
            <br/>
            <Field
                label='Street'
                value={billingDetails.address.line1}
                onChange={(e) => {
                    setBillingDetails({
                        ...billingDetails,
                        address: {...billingDetails.address, line1: e.target.value}});
                }}
            />
            <br/>
            <Field
                label='City'
                value={billingDetails.address.city}
                onChange={(e) => {
                    setBillingDetails({
                        ...billingDetails,
                        address: {...billingDetails.address, city: e.target.value}});
                }}
            />
            <br/>
            <Select
                defaultValue={'US'}
                style={{width: '100%'}}
                value={billingDetails.address.country}
                onChange={(e) => {
                    setBillingDetails({
                        ...billingDetails,
                        address: {...billingDetails.address, country: e}});
                }}
            >
                {
                    countries.map((value, i) => {
                        return (
                            <Option
                                key={i}
                                value={value.code}
                            >
                                {value.name}
                            </Option>
                        );
                    })
                }
            </Select>
            <div style={{marginTop: '20px'}}>
                <CardElement/>
            </div>
            <Button
                type='submit'
                disabled={!stripe}
                style={{marginTop: '70px', marginLeft: '30%'}}
            >
                Pay
            </Button>
        </form>
    );
};

const Field = ({
    label,
    required,
    value,
    onChange
}) => (
    <div className='FormRow'>
        <label>
            {label}
        </label>
        <Input
            required={required}
            value={value}
            onChange={onChange}
        />
    </div>
);

export default PaymentModal;