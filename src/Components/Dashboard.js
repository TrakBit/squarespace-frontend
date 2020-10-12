import React, {useState, useEffect} from 'react';
import {Row, Col, Layout, Avatar, Input, notification} from 'antd';
import styled from 'styled-components';
import {Link, useHistory} from 'react-router-dom';
import Dialog from 'react-modal';
import {
    createWidget,
    getWidget
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

function Dashboard() {
    const history = useHistory();
    const [widget, setWidget] = useState([])

    useEffect(() => {
        const config = async() => {
            const widgetData = await getWidget()
            if (widgetData.data.widget.length > 0) {
                setWidget(widgetData.data.widget)
            }
        }
        config()
    }, [])

    const logout = () => {
        localStorage.clear();
        history.push('/');
    };

    return (
        <div className='App'>
            <HeaderComponent logout={logout}/>
            <Row>
                <Col span={8}/>
                <Col span={8}>
                    <Container>
                        <div
                            className='Sub-card'
                            style={{borderRadius: 0, marginTop: '50px'}}
                        >
                            <Widget widget={widget}/>
                        </div>
                    </Container>
                </Col>
                <Col span={8}/>
            </Row>
        </div>
    );
}

const Widget = ({widget}) => {
    if (widget.length > 0) {
        return (
            <>
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
            </>
        )
    } else {
        return (
            <>
                <div style={{marginTop: '4%'}}>
                    <h4 style={head}>{'WhatsApp Chat Widget'}</h4>
                </div>
                <Button
                    style={{width: '90%', marginBottom: '10px'}}
                    type='primary'
                    onClick={() => createWidget()}
                >
                    CREATE WIDGET
                </Button>
            </>
        )
    }
}


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
            <svg viewBox="0 0 345.52 345.52">
            <path d="M279.369 101.014l-99.265-98.22a10.972 10.972 0 00-14.629 0L66.21 100.492a12.017 12.017 0 00-2.612 12.539 12.54 12.54 0 009.927 7.837h47.02v120.686c-.008 5.482 4.43 9.933 9.913 9.94.179 0 .358-.004.536-.014h83.592c5.475.289 10.147-3.916 10.435-9.39.009-.179.014-.357.014-.536V120.867h47.02a12.54 12.54 0 009.927-7.837 11.497 11.497 0 00-2.613-12.016zm-64.784-1.045c-5.747 0-10.449 2.09-10.449 7.837v122.776h-62.694V107.806c0-5.747-4.702-7.837-10.449-7.837H99.124l73.665-72.098 73.665 72.098h-31.869zM214.585 261.929h-83.592c-5.771 0-10.449 4.678-10.449 10.449s4.678 10.449 10.449 10.449h83.592c5.771 0 10.449-4.678 10.449-10.449s-4.678-10.449-10.449-10.449zM214.585 293.275h-83.592c-5.771 0-10.449 4.678-10.449 10.449s4.678 10.449 10.449 10.449h83.592c5.771 0 10.449-4.678 10.449-10.449s-4.678-10.449-10.449-10.449zM214.585 324.622h-83.592c-5.771 0-10.449 4.678-10.449 10.449s4.678 10.449 10.449 10.449h83.592c5.771 0 10.449-4.678 10.449-10.449s-4.678-10.449-10.449-10.449z" />
            </svg>
        </div>
    );
}
export default Dashboard;
