import React, {useState, useEffect} from 'react';
import {Row, Col, Layout, Avatar, Card, Spin} from 'antd';
import styled from 'styled-components';
import {Link, useHistory} from 'react-router-dom';
import Dialog from 'react-modal';
import PlansModal from './PlansModal';
import PaymentModal from './PaymentModal';
import {
    createWidget,
    getWidget,
    getUser,
    getPlans
} from './../Api/Api';
import {
    CopyOutlined,
    PlayCircleOutlined
} from '@ant-design/icons';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Vimeo from '@u-wave/react-vimeo';

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
        height: '500px',
        width: '900px',
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

function Dashboard() {
    const history = useHistory();
    const [widget, setWidget] = useState([{
        profile_id: '',
        profile_pic: '',
        header: '',
        caption: '',
        message: ''
    }]);
    const [codeModal, codeModalVisible] = useState(false);
    const [widgetExists, setWidgetExists] = useState(false);
    const [plans, setPlans] = useState([]);
    const [plansModal, plansModalVisible] = useState(false);
    const [paymentModal, paymentModalVisible] = useState(false);
    const [liveButtonColor, setLiveButtonColor] = useState('#00b7c2');
    const [liveButtonText, setLiveButtonText] = useState('LIVE');
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [user, setUser] = useState({});
    const [billingDetails, setBillingDetails] = useState({
        name: '',
        address: {
            line1: '',
            city: '',
            country: 'US'
        }
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const config = async () => {
            let widgetData = {};
            try {
                widgetData = await getWidget();
                if (widgetData.data.widget.length > 0) {
                    setWidgetExists(true);
                    setWidget(widgetData.data.widget);
                }

                const plansData = await getPlans();
                setPlans(plansData.data.plans);

                const userData = await getUser();
                setUser(userData.data);
                if (userData.data.live === 0) {
                    setLiveButtonColor('#f36886');
                    setLiveButtonText('GO LIVE 🚀');
                }
            } catch (error) {
                logout();
            }
        };
        config();
    }, []);

    const logout = () => {
        localStorage.clear();
        history.push('/');
    };

    const account = () => {
        history.push('/account');
    };

    const plansModalAction = () => {
        if (user.live === 0) {
            plansModalVisible(true);
        }
    };

    const selectPlan = (plan) => {
        setSelectedPlan(plan);
        plansModalVisible(false);
        paymentModalVisible(true);
    };

    const createWidgetAction = async () => {
        await createWidget();
        const widgetData = await getWidget();
        if (widgetData.data.widget.length > 0) {
            setWidgetExists(true);
            setWidget(widgetData.data.widget);
        }
    };

    if (loading === false) {
        return (
            <div className='App'>
                <AddCodeModal
                    codeModal={codeModal}
                    codeModalVisible={codeModalVisible}
                />
                <PlansModal
                    plans={plans}
                    plansModal={plansModal}
                    plansModalVisible={plansModalVisible}
                    selectPlan={selectPlan}
                />
                <PaymentModal
                    paymentModal={paymentModal}
                    paymentModalVisible={paymentModalVisible}
                    selectedPlan={selectedPlan}
                    user={user}
                    billingDetails={billingDetails}
                    setBillingDetails={setBillingDetails}
                    setLiveButtonColor={setLiveButtonColor}
                    setLiveButtonText={setLiveButtonText}
                    setUser={setUser}
                    setLoading={setLoading}
                />
                <HeaderComponent
                    logout={logout}
                    account={account}
                    liveButtonColor={liveButtonColor}
                    liveButtonText={liveButtonText}
                    plansModalAction={plansModalAction}
                />
                <Row>
                    <Widget
                        widget={widget}
                        codeModalVisible={codeModalVisible}
                        widgetExists={widgetExists}
                        createWidgetAction={createWidgetAction}
                    />
                </Row>
            </div>
        );
    } else {
        return (
            <div className='App'>
                <HeaderComponent
                    logout={logout}
                    account={account}
                    liveButtonColor={liveButtonColor}
                    liveButtonText={liveButtonText}
                    plansModalAction={plansModalAction}
                />
                <Container>
                    <Spin size='large'/>
                </Container>
            </div>
        );
    }
}

const Widget = ({widget, widgetExists, codeModalVisible, createWidgetAction}) => {
    const snippet = `
        <script src="https://www.salesjump.xyz/salesjump.js" defer></script>
        <div id='${widget[0].profile_id}' class="salesjump"></div>
  `;

    if (widgetExists === true) {
        return (
            <>
                <Col span={2}/>
                <Col span={8}>
                    <Container>
                        <div
                            className='Sub-card'
                            style={{borderRadius: 0, marginTop: '50px'}}
                        >
                            <div style={{marginTop: '4%'}}>
                                <h4 style={head}>{'WhatsApp Profile'}</h4>
                            </div>
                            <div style={{marginTop: '4%'}}>
                                <Avatar
                                    src={widget[0].profile_pic}
                                    size={84}
                                />
                            </div>
                            <div style={{marginTop: '4%'}}>
                                <h4 style={head}>{widget[0].header}</h4>
                            </div>
                            <Link
                                to={{
                                    pathname: '/widget',
                                    state: {
                                        profile_id: widget[0].profile_id
                                    }
                                }}
                                style={{color: '#FFF'}}
                            >
                                <Button
                                    style={{width: '90%', marginBottom: '10px'}}
                                    type='primary'
                                >
                                    EDIT WIDGET
                                </Button>
                            </Link>
                        </div>
                    </Container>
                </Col>
                <Col span={4}/>
                <Col span={8}>
                    <Container>
                        <div
                            className='Sub-card'
                            style={{borderRadius: 0, marginTop: '50px'}}
                        >
                            <div style={{width: '90%', marginLeft: '16px'}}>
                                <div style={{marginTop: '4%'}}>
                                    <h1 style={heading}>{'Add WhatsApp Widget'}</h1>
                                </div>
                                <div style={{marginTop: '4%'}}>
                                    <CopyToClipboard text={snippet}>
                                        <OutlineButton
                                            style={{width: '100%'}}
                                            type='primary'
                                            icon={<CopyOutlined/>}
                                            size={'small'}
                                        >
                                            {'Copy'}
                                        </OutlineButton>
                                    </CopyToClipboard>
                                </div>
                                <Card
                                    style={{
                                        borderRadius: '2px',
                                        borderColor: '#ccc',
                                        marginTop: '4%'
                                    }}
                                >
                                    <h4 style={{color: '#525f7f'}}>
                                        <a
                                            style={{fontSize: '17px', color: '#525f7f'}}
                                        >
                                            Copy the Snippet and paste it in Settings ➡️ Advance ➡️ Code Injection ➡️ Header
                                        </a>
                                    </h4>
                                </Card>
                                <br/>
                                <OutlineButton
                                    type='primary'
                                    style={{width: '100%', marginBottom: '10px'}}
                                    onClick={() => codeModalVisible(true)}
                                >
                                    <PlayCircleOutlined style={{fontSize: '18px'}}/>
                                    {'  Add Widget to Squarespace'}
                                </OutlineButton>
                                <br/>
                            </div>
                        </div>
                    </Container>
                </Col>
            </>
        );
    } else {
        return (
            <>
                <Col span={8}/>
                <Col span={8}>
                    <Container>
                        <div
                            className='Sub-card'
                            style={{borderRadius: 0, marginTop: '50px'}}
                        >
                            <div style={{marginTop: '4%'}}>
                                <h4 style={head}>{'WhatsApp Chat Widget'}</h4>
                            </div>
                            <Button
                                style={{width: '90%', marginBottom: '10px'}}
                                type='primary'
                                onClick={() => createWidgetAction()}
                            >
                                CREATE WIDGET
                            </Button>
                        </div>
                    </Container>
                </Col>
                <Col span={8}/>
            </>
        );
    }
};

const HeaderComponent = ({logout, account, liveButtonColor, liveButtonText, plansModalAction}) => {
    return (
        <Header style={{background: '#FFFFFF'}}>
            <Row>
                <Col span={1}>
                    <Icon/>
                </Col>
                <Col span={14}>
                    <Link to={'/dashboard'}><h1 style={Titlehead}>SalesJump</h1></Link>
                </Col>
                <Col
                    span={9}
                >
                    <LiveTag
                        onClick={() => plansModalAction()}
                        style={{
                            borderColor: liveButtonColor,
                            backgroundColor: liveButtonColor
                        }}
                    >
                        {liveButtonText}
                    </LiveTag>
                    &ensp;
                    <OutlineButton onClick={() => account()}>ACCOUNT</OutlineButton>
                    &ensp;
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

const AddCodeModal = ({codeModal, codeModalVisible}) => {
    return (
        <Dialog
            ariaHideApp={false}
            isOpen={codeModal}
            style={customStyles}
            onRequestClose={() => codeModalVisible(false)}
        >
            <ModalContainer>
                <h4 style={head}>{'Add Code to Squarespace'}</h4>
                <Vimeo
                    video='468424688'
                    height='400px'
                    width='800px'
                />
            </ModalContainer>
        </Dialog>
    );
};

export default Dashboard;
