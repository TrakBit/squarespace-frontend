import React, {useState, useEffect} from 'react';
import {Row, Col, Input, Spin, Card, notification, Switch} from 'antd';
import styled from 'styled-components';
import config from '../Config';
import firebase from 'firebase/app';
import 'firebase/storage';
import {TwitterPicker} from 'react-color';
import {
    getWidget,
    upload,
    updateWidget
} from '../../Api/Api';
import {CloseCircleTwoTone} from '@ant-design/icons';
import ChatWidget from './ChatWidget';
import ComplaintWidget from './ComplaintWidget';
import Complains from './Complains';
import HeaderComponent from './HeaderComponent';

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled(FlexCol)`
  padding: 3rem;
  align-items: center;
  justify-content: space-between;
`;

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

function Widget({location}) {
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState('');
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [widget, setWidget] = useState([{
        profile_id: '',
        profile_pic: '',
        header: '',
        caption: '',
        message: '',
        contact: 0,
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        complains: false,
        headerColor: '#075E54',
        headerTextColor: '#FFFFFF',
        buttonColor: '#25D366',
        buttonTextColor: '#FFFFFF',
        floatingButtonColor: '#25D366',
        floatingButtonTextColor: '#FFFFFF'
    }]);

    useEffect(() => {
        const initConfig = async () => {
            const widgetData = await getWidget();
            if (widgetData.data.widget.length > 0) {
                setWidget(widgetData.data.widget);
            }
        };
        initConfig();
    }, []);

    const handChange = (e) => {
        setLoading(true);
        const file = e.target.files[0];
        if (file) {
            const fileType = file.type;
            const fileSize = (parseInt(file.size, 10) / 1024) / 1024;
            if (fileSize < 1) {
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
                                        ...widget[0],
                                        profile_pic: url
                                    }]);
                                });
                            setLoading(false);
                        }
                    );
                } else {
                    setLoading(false);
                    setError('Please select an image to upload');
                }
            } else {
                setLoading(false);
                failedNotification('  Image size should be less than 1 MB');
            }
        }
    };

    const setHeader = (e) => {
        setWidget([{...widget[0], header: e}]);
    };

    const setCaption = (e) => {
        setWidget([{...widget[0], caption: e}]);
    };

    const setMessage = (e) => {
        setWidget([{...widget[0], message: e}]);
    };

    const setContact = (e) => {
        setWidget([{...widget[0], contact: e}]);
    };

    const setOption1 = (e) => {
        setWidget([{...widget[0], option1: e}]);
    };

    const setOption2 = (e) => {
        setWidget([{...widget[0], option2: e}]);
    };

    const setOption3 = (e) => {
        setWidget([{...widget[0], option3: e}]);
    };

    const setOption4 = (e) => {
        setWidget([{...widget[0], option4: e}]);
    };

    const updateProfileAction = () => {
        updateWidget({...widget[0]});
    };

    const setHeaderColor = (e) => {
        setWidget([{...widget[0], headerColor: e}]);
    };

    const setHeaderTextColor = (e) => {
        setWidget([{...widget[0], headerTextColor: e}]);
    };

    const setButtonColor = (e) => {
        setWidget([{...widget[0], buttonColor: e}]);
    };

    const setButtonTextColor = (e) => {
        setWidget([{...widget[0], buttonTextColor: e}]);
    };

    const setFloatingButtonColor = (e) => {
        setWidget([{...widget[0], floatingButtonColor: e}]);
    };

    const setFloatingButtonTextColor = (e) => {
        setWidget([{...widget[0], floatingButtonTextColor: e}]);
    };

    const onChange = (checked) => {
        setWidget([{...widget[0], complains: checked}]);
    };

    const pallete = [
        '#FF6900',
        '#FCB900',
        '#7BDCB5',
        '#25D366',
        '#075E54',
        '#8ED1FC',
        '#0693E3',
        '#FFFFFF',
        '#EB144C',
        '#F78DA7'
    ];

    if (loading === false) {
        return (
            <div className='App'>
                <HeaderComponent/>
                <Row>
                    <Col span={8}>
                        <Container>
                            <h1 style={heading}>
                                Set Color
                            </h1>
                            <div
                                className='App-login'
                                style={{borderRadius: 0, marginTop: '50px'}}
                            >
                                <div style={{width: '90%', marginLeft: '5%'}}>

                                    <div style={{marginTop: '4%'}}>
                                        <Card style={{borderColor: '#e8e8e8'}}>
                                            <h1 style={head}>
                                                Header
                                            </h1>
                                            <TwitterPicker
                                                color={widget[0].headerColor}
                                                colors={pallete}
                                                onChangeComplete={(e) => setHeaderColor(e.hex)}
                                            />
                                            <div style={{marginTop: '4%'}}>
                                                <h1 style={head}>
                                                    Header Text
                                                </h1>
                                                <TwitterPicker
                                                    color={widget[0].headerTextColor}
                                                    colors={pallete}
                                                    onChangeComplete={(e) => setHeaderTextColor(e.hex)}
                                                />
                                            </div>
                                        </Card>
                                    </div>

                                    <div style={{marginTop: '4%'}}>
                                        <Card style={{borderColor: '#e8e8e8'}}>
                                            <h1 style={head}>
                                                Button
                                            </h1>
                                            <TwitterPicker
                                                color={widget[0].buttonColor}
                                                colors={pallete}
                                                onChangeComplete={(e) => setButtonColor(e.hex)}
                                            />
                                            <div style={{marginTop: '4%'}}>
                                                <h1 style={head}>
                                                    Button Text
                                                </h1>
                                                <TwitterPicker
                                                    color={widget[0].buttonTextColor}
                                                    colors={pallete}
                                                    onChangeComplete={(e) => setButtonTextColor(e.hex)}
                                                />
                                            </div>
                                        </Card>
                                    </div>

                                    <div style={{marginTop: '4%'}}>
                                        <Card style={{borderColor: '#e8e8e8'}}>
                                            <h1 style={head}>
                                                Floating Button
                                            </h1>
                                            <TwitterPicker
                                                color={widget[0].floatingButtonColor}
                                                colors={pallete}
                                                onChangeComplete={(e) => setFloatingButtonColor(e.hex)}
                                            />
                                            <div style={{marginTop: '4%'}}>
                                                <h1 style={head}>
                                                    Floating Button Icon
                                                </h1>
                                                <TwitterPicker
                                                    color={widget[0].floatingButtonTextColor}
                                                    colors={pallete}
                                                    onChangeComplete={(e) => setFloatingButtonTextColor(e.hex)}
                                                />
                                            </div>
                                        </Card>
                                    </div>

                                    <div style={{paddingTop: '5%', paddingBottom: '5%'}}>
                                        <OutlineButton
                                            style={{width: '100%'}}
                                            type='primary'
                                            onClick={() => updateProfileAction()}
                                        >
                                            SAVE
                                        </OutlineButton>
                                    </div>

                                </div>
                            </div>
                        </Container>
                    </Col>

                    <Col span={8}>
                        <Container>
                            <h1 style={heading}>
                                Set Profile
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
                                            maxLength={31}
                                        />
                                    </div>
                                    <div style={{paddingTop: '4%'}}>
                                        <Input
                                            type='number'
                                            addonBefore={'Contact'}
                                            value={widget[0].contact}
                                            onChange={(e) => setContact(e.target.value)}
                                            placeholder='Contact'
                                            maxLength={60}
                                        />
                                    </div>
                                    <div style={{paddingTop: '4%'}}>
                                        <Row>
                                            <Col span={16}>
                                                Complain Options:
                                            </Col>
                                            <Col span={8}>
                                                <Switch
                                                    onChange={onChange}
                                                    checked={widget[0].complains}
                                                />
                                            </Col>
                                        </Row>
                                    </div>

                                    <Complains
                                        setOption1={setOption1}
                                        setOption2={setOption2}
                                        setOption3={setOption3}
                                        setOption4={setOption4}
                                        widget={widget}
                                    />

                                    <div style={{paddingTop: '15%', paddingBottom: '5%'}}>
                                        <OutlineButton
                                            style={{width: '100%'}}
                                            type='primary'
                                            onClick={() => updateProfileAction()}
                                        >
                                            SAVE
                                        </OutlineButton>
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </Col>
                    <Col span={8}>
                        <Container>
                            <h1 style={heading}>
                                Preview
                            </h1>
                            <WidgetType widget={widget}/>
                        </Container>
                    </Col>
                </Row>
            </div>
        );
    } else {
        return (
            <div className='App'>
                <HeaderComponent/>
                <Container>
                    <Spin size='large'/>
                </Container>
            </div>
        );
    }
}

const WidgetType = ({widget}) => {
    if (widget[0].complains === false) {
        return (
            <ChatWidget widget={widget}/>
        );
    } else {
        return (
            <ComplaintWidget widget={widget}/>
        );
    }
};

export default Widget;