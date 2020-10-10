import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Input, Layout, notification} from 'antd';
import {
    MailOutlined,
    KeyOutlined,
    CloseCircleTwoTone
} from '@ant-design/icons';
import {Link, useHistory} from 'react-router-dom';
import {login, forgotPassword} from '../Api/Api';

const {Header} = Layout;
const HeaderContainer = styled.section`
  align-items: left;
  flex-direction: column;
`;

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`;
const Container = styled(FlexCol)`
  padding: 10rem;
  align-items: center;
  justify-content: space-between;
`;

const Button = styled.button`
  height: 42px;
  background-color: #00b7c2;
  color: #FFFFFF;
  font-weight: 500;
  font-size: 14px;
  border-radius: 0.25rem;
  border-color: #00b7c2;
  line-height: 1.5;
`;

const head = {
    fontWeight: '500',
    fontSize: '20px',
    color: '#32325D'
};

const Titlehead = {
    fontWeight: '800',
    fontSize: '20px',
    color: '#32325D'
};

const failedNotification = (notificationMsg) => {
    notification.open({
        message:
    <div style={{fontSize: '30px'}}>
        <CloseCircleTwoTone twoToneColor='#eb4559'/>
        {notificationMsg}
    </div>,
        description: '',
        onClick: () => {
            notification.close();
        }
    });
};

function Login() {
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        localStorage.clear();
    }, []);

    const validateEmail = () => {
        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regexp.test(email);
    };

    const loginHandle = async () => {
        if (validateEmail(email) === true) {
            const regData = await login(email, password);
            await localStorage.setItem('token', regData.data.token);
            if (regData.data.loggedin === 1) {
                await history.push('/dashboard');
            } else {
                await failedNotification('  Wrong Credentials');
            }
        } else {
            await failedNotification('  Invalid Email');
        }
    };

    const forgotPasswordAction = () => {
        if (validateEmail(email) === true) {
            forgotPassword(email);
            failedNotification(' Check mail for new Password');
        } else {
            failedNotification(' Enter valid email');
        }
    };

    return (
        <div className='App'>
            <Header style={{background: '#FFFFFF'}}>
                <HeaderContainer>
                    <Link to={'/'}><h1 style={Titlehead}>SalesJump</h1></Link>
                </HeaderContainer>
            </Header>
            <Container>
                <div
                    className='App-login'
                    style={{borderRadius: 0}}
                >
                    <div style={{width: '90%', marginLeft: '16px'}}>
                        <div style={{marginTop: '4%'}}>
                            <h4 style={head}>Log In</h4>
                        </div>
                        <div style={{paddingTop: '4%'}}>
                            <Input
                                addonBefore={<MailOutlined/>}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Email'
                            />
                        </div>
                        <div style={{paddingTop: '4%'}}>
                            <Input
                                addonBefore={<KeyOutlined/>}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Password'
                                type={'password'}
                            />
                        </div>
                        <div style={{paddingTop: '15%', paddingBottom: '5%'}}>
                            <Button
                                style={{width: '100%'}}
                                onClick={() => loginHandle()}
                                type='primary'
                            >
                                LOGIN
                            </Button>
                        </div>
                        <h6
                            style={head}
                            onClick={forgotPasswordAction}
                        >
                            <a>Forgot Password ?</a>
                        </h6>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Login;