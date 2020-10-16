import React, {useState, useEffect} from 'react';
import {Row, Col, Layout, Avatar, Input, notification} from 'antd';
import styled from 'styled-components';
import {Link, useHistory} from 'react-router-dom';
import Dialog from 'react-modal';
import {
    getUser,
    resetPassword,
    getSubscription,
    cancelSubscription,
    getInvoices
} from './../Api/Api';
import {
    UserOutlined,
    InfoCircleTwoTone
} from '@ant-design/icons';

const {Header} = Layout;
const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled(FlexCol)`
  padding: 3rem;
  align-items: center;
  justify-content: space-between;
`;

const ModalContainer = styled(FlexCol)`
  padding: 0rem;
  align-items: center;
  justify-content: space-between;
`;

const customStyles = {
    content: {
        height: '200px',
        width: '50%',
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

const OutlineButton = styled.button`
  height: 42px;
  width: 100px;
  background-color: #FFFFFF;
  color: #00b7c2;
  border-color: #00b7c2;
  border-width: 4px;
  font-weight: 600;
  font-size: 14px;
  border-radius: 0.25rem;
  line-height: 1.5;
  -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
`;

const Button = styled.button`
  height: 42px;
  background-color: #00b7c2;
  color: #FFFFFF;
  font-weight: 600;
  font-size: 14px;
  border-radius: 0.25rem;
  line-height: 1.5;
`;

const LiveTag = styled.button`
    height: 42px;
    width: 120px;
    color: #FFFFFF;
    font-weight: 600;
    font-size: 14px;
    border-radius: 0.25rem;
    line-height: 1.5;
`;

const Titlehead = {
    fontWeight: '800',
    fontSize: '20px',
    color: '#32325D'
};

const head = {
    fontWeight: '500',
    fontSize: '20px',
    color: '#32325D'
};

const heading = {
    fontSize: '20px',
    color: '#525f7f'
};

function Home() {
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [subscription, setSubscription] = useState({
        current_period_end: '',
        nickname: '',
        subscription_id: ''
    });
    const [invoices, setInvoices] = useState([]);
    const [cancelPlanModal, cancelPlanModalVisible] = useState(false);

    useEffect(() => {
        async function setData() {
            const emailData = await getUser();
            setEmail(emailData.data.email);
            setName(emailData.data.name);
            const subscriptionsData = await getSubscription();
            setSubscription(subscriptionsData.data);
            const invoiceData = await getInvoices();
            setInvoices(invoiceData.data.invoices);
        }
        setData();
    }, []);

    const logout = () => {
        localStorage.clear();
        history.push('/');
    };

    const reset = async () => {
        const resetData = await resetPassword(
            currentPassword,
            newPassword,
            confirmPassword,
            localStorage.getItem('token')
        );
        errorMessage(resetData.data.message);
    };

    const errorMessage = (errorMsg) => {
        notification.open({
            message:
    <div style={{fontSize: '30px'}}>
        <Row>
            <Col span={3}>
                <InfoCircleTwoTone/>
            </Col>
            <Col span={15}>
                {errorMsg}
            </Col>
        </Row>
    </div>,
            description: '',
            onClick: () => {
                notification.close();
            }
        });
    };

    const cancelPlan = async () => {
        await cancelSubscription();
        const subscriptionsData = await getSubscription();
        setSubscription(subscriptionsData.data);
        cancelPlanModalVisible(false);
    };

    return (
        <div className='App'>
            <HeaderComponent logout={logout}/>
            <CancelPlanModal
                cancelPlanModal={cancelPlanModal}
                cancelPlanModalVisible={cancelPlanModalVisible}
                cancelPlan={cancelPlan}
            />
            <Row>
                <Col span={8}>
                    <Container>
                        <h1 style={heading}>
                            Account
                        </h1>
                        <div
                            className='App-login'
                            style={{borderRadius: 0, marginTop: '50px'}}
                        >
                            <div style={{width: '90%', marginLeft: '16px'}}>
                                <div style={{marginTop: '4%'}}>
                                    <h1 style={heading}>{'ACCOUNT DETAILS'}</h1>
                                </div>
                                <div style={{marginTop: '4%'}}>
                                    <Avatar
                                        size='large'
                                        style={{backgroundColor: '#00b7c2'}}
                                        icon={<UserOutlined/>}
                                    />
                                </div>
                                <div style={{paddingTop: '4%'}}>
                                    <h1 style={heading}>{name}</h1>
                                </div>
                                <div style={{paddingTop: '4%'}}>
                                    <h1 style={heading}>{email}</h1>
                                </div>
                            </div>
                        </div>

                    </Container>
                </Col>

                <Col span={8}>
                    <Container>
                        <h1 style={heading}>
                            Subscription
                        </h1>
                        <div
                            className='Sub-card'
                            style={{borderRadius: 0, marginTop: '50px'}}
                        >
                            <div style={{marginTop: '4%'}}>
                                <h4 style={head}>{subscription.nickname}</h4>
                            </div>
                            <div style={{marginTop: '4%'}}>
                                <h4 style={head}>{subscription.current_period_end}</h4>
                            </div>
                            <Button
                                style={{width: '90%', marginBottom: '10px'}}
                                type='primary'
                                onClick={() => cancelPlanModalVisible(true)}
                            >
                                CANCEL PLAN
                            </Button>
                        </div>
                    </Container>
                    <Container>
                        <h1 style={heading}>
                            Invoices
                        </h1>
                        {
                            invoices.map((invoice, i) => {
                                return (
                                    <div
                                        className='Sub-card'
                                        key={i}
                                        style={{borderRadius: 0, marginBottom: '10px'}}
                                    >
                                        <div style={{marginTop: '4%'}}>
                                            <h4 style={head}>{invoice.invoice_date}</h4>
                                        </div>
                                        <Button
                                            style={{width: '90%', marginBottom: '4%'}}
                                            type='primary'
                                            onClick={() => window.open(invoice.invoice_url)}
                                        >
                                            OPEN INVOICE
                                        </Button>
                                    </div>
                                );
                            })
                        }
                    </Container>
                </Col>

                <Col span={8}>
                    <Container>
                        <h1 style={heading}>
                            Reset Password
                        </h1>
                        <div
                            className='App-login'
                            style={{borderRadius: 0, marginTop: '50px'}}
                        >
                            <div style={{width: '90%', marginLeft: '16px'}}>
                                <div style={{marginTop: '4%'}}>
                                    <h4 style={head}>RESET</h4>
                                </div>
                                <div style={{paddingTop: '4%'}}>
                                    <Input
                                        addonBefore={'Current Password'}
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        placeholder='Password'
                                        type={'password'}
                                    />
                                </div>
                                <div style={{paddingTop: '4%'}}>
                                    <Input
                                        addonBefore={'New Password'}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder='Password'
                                        type={'password'}
                                    />
                                </div>
                                <div style={{paddingTop: '4%'}}>
                                    <Input
                                        addonBefore={'Confirm Password'}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder='Password'
                                        type={'password'}
                                    />
                                </div>
                                <div style={{paddingTop: '15%', paddingBottom: '5%'}}>
                                    <Button
                                        style={{width: '100%'}}
                                        onClick={reset}
                                        type='primary'
                                    >
                                        RESET
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Container>
                </Col>
            </Row>
        </div>
    );
}

const CancelPlanModal = ({cancelPlanModal, cancelPlanModalVisible, cancelPlan}) => {
    return (
        <Dialog
            ariaHideApp={false}
            isOpen={cancelPlanModal}
            style={customStyles}
            onRequestClose={() => cancelPlanModalVisible(false)}
        >
            <ModalContainer>
                <h4 style={head}>{'Are you sure you want to cancel your plan ?'}</h4>
                <Row>
                    <Col span={10}>
                        <LiveTag
                            onClick={() => cancelPlan()}
                            style={{
                                borderColor: '#f36886',
                                backgroundColor: '#f36886',
                                width: '150px'
                            }}
                        >
                            {'YES'}
                        </LiveTag>
                    </Col>
                    <Col span={4}/>
                    <Col span={10}>
                        <Button
                            onClick={() => cancelPlanModalVisible()}
                            style={{
                                width: '150px'
                            }}
                        >
                            NO
                        </Button>
                    </Col>
                </Row>
            </ModalContainer>
        </Dialog>
    );
};

const HeaderComponent = ({logout}) => {
    return (
        <Header style={{background: '#FFFFFF'}}>
            <Row>
                <Col span={1}>
                    <Icon/>
                </Col>
                <Col span={18}>
                    <Link to={'/dashboard'}><h1 style={Titlehead}>SalesJump</h1></Link>
                </Col>
                <Col span={2}/>
                <Col
                    span={2}
                    style={{marginLeft: '10px'}}
                >
                    <OutlineButton onClick={() => logout()}>LOGOUT</OutlineButton>
                </Col>
            </Row>
        </Header>
    );
};

function Icon() {
    return (
        <div style={{width: '45px', marginTop: '10px'}}>
            <svg viewBox='0 0 345.52 345.52'>
                <path d='M279.369 101.014l-99.265-98.22a10.972 10.972 0 00-14.629 0L66.21 100.492a12.017 12.017 0 00-2.612 12.539 12.54 12.54 0 009.927 7.837h47.02v120.686c-.008 5.482 4.43 9.933 9.913 9.94.179 0 .358-.004.536-.014h83.592c5.475.289 10.147-3.916 10.435-9.39.009-.179.014-.357.014-.536V120.867h47.02a12.54 12.54 0 009.927-7.837 11.497 11.497 0 00-2.613-12.016zm-64.784-1.045c-5.747 0-10.449 2.09-10.449 7.837v122.776h-62.694V107.806c0-5.747-4.702-7.837-10.449-7.837H99.124l73.665-72.098 73.665 72.098h-31.869zM214.585 261.929h-83.592c-5.771 0-10.449 4.678-10.449 10.449s4.678 10.449 10.449 10.449h83.592c5.771 0 10.449-4.678 10.449-10.449s-4.678-10.449-10.449-10.449zM214.585 293.275h-83.592c-5.771 0-10.449 4.678-10.449 10.449s4.678 10.449 10.449 10.449h83.592c5.771 0 10.449-4.678 10.449-10.449s-4.678-10.449-10.449-10.449zM214.585 324.622h-83.592c-5.771 0-10.449 4.678-10.449 10.449s4.678 10.449 10.449 10.449h83.592c5.771 0 10.449-4.678 10.449-10.449s-4.678-10.449-10.449-10.449z'/>
            </svg>
        </div>
    );
}
export default Home;