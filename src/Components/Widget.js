import React, {useState, useEffect} from 'react';
import {Row, Col, Layout, Input} from 'antd';
import styled from 'styled-components';
import {Link, useHistory} from 'react-router-dom';
import config from './Config';
import firebase from 'firebase/app';
import 'firebase/storage';
import {
    getWidget,
    upload,
    updateProfile
} from './../Api/Api';

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

const Button = styled.input`
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
    fontSize: '25px',
    color: '#525f7f'
};

firebase.initializeApp(config);
const storage = firebase.storage();

function Widget({location}) {
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState('');
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState('');
    const [widget, setWidget] = useState([{
        profile_id: '',
        profile_pic: '',
        header: '',
        caption: '',
        message: ''
    }]);

    useEffect(() => {
        const config = async () => {
            const widgetData = await getWidget();
            if (widgetData.data.widget.length > 0) {
                setWidget(widgetData.data.widget);
            }
        };
        config();
    }, []);

    const handChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileType = file.type;
            const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
            if (validImageTypes.includes(fileType)) {
                const uploadTask = storage.ref(`images/${location.state.profile_id}`).put(file);
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        const progress = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                        setProgress(progress);
                    },
                    (error) => {
                        setError(error);
                    },
                    () => {
                        storage.
                            ref('images').
                            child(location.state.profile_id).
                            getDownloadURL().
                            then((url) => {
                                setUrl(url);
                                upload(url);
                                setProgress(0);
                                setWidget([{
                                    profile_id: widget[0].profile_id,
                                    profile_pic: url,
                                    header: widget[0].header,
                                    caption: widget[0].caption,
                                    message: widget[0].message
                                }]);
                            });
                    }
                );
            } else {
                setError('Please select an image to upload');
            }
        }
    };

    const setHeader = (e) => {
        setWidget([{
            profile_id: widget[0].profile_id,
            profile_pic: widget[0].profile_pic,
            header: e,
            caption: widget[0].caption,
            message: widget[0].message
        }]);
    };

    const setCaption = (e) => {
        setWidget([{
            profile_id: widget[0].profile_id,
            profile_pic: widget[0].profile_pic,
            header: widget[0].header,
            caption: e,
            message: widget[0].message
        }]);
    };

    const setMessage = (e) => {
        setWidget([{
            profile_id: widget[0].profile_id,
            profile_pic: widget[0].profile_pic,
            header: widget[0].header,
            caption: widget[0].caption,
            message: e
        }]);
    };

    const updateProfileAction = () => {
        updateProfile(
            widget[0].header,
            widget[0].caption,
            widget[0].message);
    };

    return (
        <div className='App'>
            <HeaderComponent/>
            <Row>
                <Col span={8}/>
                <Col span={8}>
                    <Container>
                        <h1 style={heading}>
                            Profile
                        </h1>
                        <div
                            className='App-login'
                            style={{borderRadius: 0, marginTop: '50px'}}
                        >
                            <div style={{width: '90%', marginLeft: '16px'}}>
                                <div style={{marginTop: '4%'}}>
                                    <label className='custom-file-upload'>
                                        <Input
                                            type='file'
                                            onChange={handChange}
                                        />
                                        PROFILE PICTURE
                                    </label>
                                </div>

                                <div style={{paddingTop: '4%'}}>
                                    <Input
                                        addonBefore={'Header'}
                                        value={widget[0].header}
                                        onChange={(e) => setHeader(e.target.value)}
                                        placeholder='Header'
                                        maxLength={20}
                                    />
                                </div>
                                <div style={{paddingTop: '4%'}}>
                                    <Input
                                        addonBefore={'Caption'}
                                        value={widget[0].caption}
                                        onChange={(e) => setCaption(e.target.value)}
                                        placeholder='Caption'
                                        maxLength={30}
                                    />
                                </div>
                                <div style={{paddingTop: '4%'}}>
                                    <Input
                                        addonBefore={'Message'}
                                        value={widget[0].message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder='Message'
                                        maxLength={60}
                                    />
                                </div>
                                <div style={{paddingTop: '15%', paddingBottom: '5%'}}>
                                    <OutlineButton
                                        style={{width: '100%'}}
                                        type='primary'
                                        onClick={() => updateProfileAction()}
                                    >
                                        UPDATE PROFILE
                                    </OutlineButton>
                                </div>

                            </div>
                        </div>
                    </Container>
                </Col>
                <Col span={8}>
                    <Container>
                        <h1 style={heading}>
                            Widget Preview
                        </h1>
                        <div
                            id='chat'
                            style={{
                                position: 'fixed',
                                width: 350,
                                height: 280,
                                right: '2%',
                                backgroundColor: '#075e54',
                                bottom: 200,
                                borderRadius: 10,
                                textAlign: 'center',
                                zIndex: 100,
                                boxShadow: '2px 2px 3px #999'
                            }}
                        >
                            <div style={{width: 350, height: 90, marginTop: 30}}>
                                <div
                                    style={{display: 'inline-block', width: '10%', verticalAlign: '-20px'}}
                                >
                                    <img
                                        src={widget[0].profile_pic}
                                        width='60px'
                                        height='60px'
                                        style={{marginTop: -60, borderRadius: 30}}
                                    />
                                </div>
                                <div
                                    style={{display: 'inline-block', width: '80%', verticalAlign: '-7px'}}
                                >
                                    <h1
                                        style={{
                                            marginLeft: 40,
                                            marginTop: 0,
                                            marginBottom: 15,
                                            fontSize: 22,
                                            textAlign: 'left',
                                            color: '#FFF'
                                        }}
                                    >
                                        {widget[0].header}&nbsp;
                                    </h1>
                                    <p
                                        style={{
                                            marginTop: '-10px',
                                            marginLeft: 40,
                                            fontSize: 15,
                                            textAlign: 'left',
                                            color: '#FFF'
                                        }}
                                    >
                                        {widget[0].caption}&nbsp;
                                    </p>
                                    <p/>
                                </div>
                            </div>
                            <div style={{width: 350, height: 150, backgroundColor: '#ece5dd'}}>
                                <div
                                    style={{
                                        width: 150,
                                        height: 100,
                                        marginLeft: 10,
                                        marginTop: 30,
                                        float: 'left',
                                        borderRadius: 10,
                                        backgroundColor: '#FFF',
                                        wordWrap: 'break-word'
                                    }}
                                >
                                    <h4
                                        style={{
                                            fontSize: 15,
                                            marginTop: 10,
                                            marginLeft: 10,
                                            marginRight: 10,
                                            textAlign: 'left',
                                            color: '#000'
                                        }}
                                    >
                                        {widget[0].message}
                                    </h4>
                                </div>
                            </div>
                            <div
                                style={{
                                    width: 350,
                                    height: 90,
                                    backgroundColor: '#FFF',
                                    boxShadow: '2px 2px 3px #999',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    borderRadius: '0px 0px 10px 10px'
                                }}
                            >
                                <div
                                    style={{
                                        width: '90%',
                                        height: 50,
                                        marginTop: 15,
                                        borderRadius: 25,
                                        backgroundColor: '#25d366'
                                    }}
                                >
                                    <h4
                                        style={{
                                            fontSize: 20,
                                            marginTop: 12,
                                            marginLeft: 10,
                                            marginRight: 10,
                                            textAlign: 'center',
                                            color: '#FFF'
                                        }}
                                    >
                                        Start Chat
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                position: 'fixed',
                                width: 60,
                                height: 60,
                                bottom: 45,
                                right: '2%',
                                backgroundColor: '#FFF',
                                borderRadius: 50,
                                textAlign: 'center',
                                zIndex: 100,
                                boxShadow: '2px 2px 3px #999'
                            }}
                            onClick='showChat()'
                        >
                            <svg
                                style={{marginTop: 13}}
                                viewBox='0 0 90 90'
                                fill='rgb(79, 206, 93)'
                                width={32}
                                height={32}
                            >
                                <path d='M90,43.841c0,24.213-19.779,43.841-44.182,43.841c-7.747,0-15.025-1.98-21.357-5.455L0,90l7.975-23.522   c-4.023-6.606-6.34-14.354-6.34-22.637C1.635,19.628,21.416,0,45.818,0C70.223,0,90,19.628,90,43.841z M45.818,6.982   c-20.484,0-37.146,16.535-37.146,36.859c0,8.065,2.629,15.534,7.076,21.61L11.107,79.14l14.275-4.537   c5.865,3.851,12.891,6.097,20.437,6.097c20.481,0,37.146-16.533,37.146-36.857S66.301,6.982,45.818,6.982z M68.129,53.938   c-0.273-0.447-0.994-0.717-2.076-1.254c-1.084-0.537-6.41-3.138-7.4-3.495c-0.993-0.358-1.717-0.538-2.438,0.537   c-0.721,1.076-2.797,3.495-3.43,4.212c-0.632,0.719-1.263,0.809-2.347,0.271c-1.082-0.537-4.571-1.673-8.708-5.333   c-3.219-2.848-5.393-6.364-6.025-7.441c-0.631-1.075-0.066-1.656,0.475-2.191c0.488-0.482,1.084-1.255,1.625-1.882   c0.543-0.628,0.723-1.075,1.082-1.793c0.363-0.717,0.182-1.344-0.09-1.883c-0.27-0.537-2.438-5.825-3.34-7.977   c-0.902-2.15-1.803-1.792-2.436-1.792c-0.631,0-1.354-0.09-2.076-0.09c-0.722,0-1.896,0.269-2.889,1.344   c-0.992,1.076-3.789,3.676-3.789,8.963c0,5.288,3.879,10.397,4.422,11.113c0.541,0.716,7.49,11.92,18.5,16.223   C58.2,65.771,58.2,64.336,60.186,64.156c1.984-0.179,6.406-2.599,7.312-5.107C68.398,56.537,68.398,54.386,68.129,53.938z'/>
                            </svg>
                        </div>
                    </Container>
                </Col>
            </Row>
        </div>
    );
}

const HeaderComponent = () => {
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
                    <OutlineButton>LOGOUT</OutlineButton>
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
export default Widget;