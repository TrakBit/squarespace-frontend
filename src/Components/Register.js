import React, {useState} from 'react';
import styled from 'styled-components';
import {Input, Layout, notification} from 'antd';
import {
    UserOutlined,
    KeyOutlined,
    MailOutlined,
    CloseCircleTwoTone
} from '@ant-design/icons';
import {Link, useHistory} from 'react-router-dom';
import {register} from '../Api/Api';

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

const errorMessage = (errorMsg) => {
    const error = `${' '}${errorMsg}`;
    notification.open({
        message:
    <div style={{fontSize: '30px'}}>
        <CloseCircleTwoTone twoToneColor='#eb4559'/>
        {error}
    </div>,
        description: '',
        onClick: () => {
            notification.close();
        }
    });
};

function Register() {
    const history = useHistory();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const validateEmail = (email) => {
        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regexp.test(email);
    };

    const validateUserName = (name) => {
        const regexp = /^[a-zA-Z0-9]+$/;
        return regexp.test(name);
    };

    const registerUser = async () => {
        if (validateUserName(name) === true) {
            if (password.length > 4) {
                if (validateEmail(email) === true) {
                    const regData = await register(name, email, password);
                    await localStorage.setItem('token', regData.data.token);
                    if (regData.data.registered === 1 && localStorage.getItem('token') !== null) {
                        await history.push('/dashboard');
                    } else {
                        errorMessage('Email Already Registered');
                    }
                } else {
                    errorMessage('Invalid Email');
                }
            } else {
                errorMessage('Atleast 5 character password');
            }
        } else {
            errorMessage('No Special characters in username');
        }
    };

    return (
        <div className='App'>
            <Header style={{background: '#FFFFFF'}}>
                <HeaderContainer>
                    <a href={'https://salesjump.xyz/'}><h1 style={Titlehead}>SalesJump</h1></a>
                </HeaderContainer>
            </Header>
            <Container>
                <div
                    className='App-login'
                    style={{borderRadius: 0}}
                >
                    <div style={{width: '90%', marginLeft: '16px'}}>
                        <div style={{marginTop: '4%'}}>
                            <h4 style={head}>SIGN UP</h4>
                        </div>
                        <div style={{paddingTop: '4%'}}>
                            <Input
                                addonBefore={<UserOutlined/>}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder='Name'
                            />
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
                                onClick={() => registerUser()}
                                type='primary'
                            >
                                SIGN UP
                            </Button>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Register;