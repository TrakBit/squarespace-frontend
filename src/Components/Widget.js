import React, { useState, useEffect, Component } from 'react';
import { Row, Col, Layout, Avatar, Input, notification, Upload } from 'antd';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import Dialog from 'react-modal';
import config from './Config';
import firebase from 'firebase/app';
import 'firebase/storage';
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

const { Header } = Layout;
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
  fontSize: '20px',
  color: '#525f7f'
};

const firebaseApp = firebase.initializeApp(config)
const storage = firebase.storage();

function Widget({ location }) {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  const handChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (validImageTypes.includes(fileType)) {

        const uploadTask = storage.ref(`images/${location.state.profile_id}`).put(file);
        uploadTask.on(
          "state_changed",
          snapshot => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
          },
          error => {
            setError(error);
          },
          () => {
            storage
              .ref("images")
              .child(file.name)
              .getDownloadURL()
              .then(url => {
                setUrl(url);
                setProgress(0);
              });
          }
        );

      } else {
        setError("Please select an image to upload");
      }
    }
  };

  return (
    <div className='App'>
      <HeaderComponent />
      <Row>
        <Col span={8} />
        <Col span={8}>
          <Container>
            <div
              className='App-login'
              style={{ borderRadius: 0, marginTop: '50px' }}
            >
              <div style={{ width: '90%', marginLeft: '16px' }}>
                <div style={{ marginTop: '4%' }}>
                  <h1 style={heading}>{'Profile Picture'}</h1>
                </div>
                <div style={{ marginTop: '4%' }}>
                  <label class="custom-file-upload">
                    <Input type="file" onChange={handChange} />
                        UPLOAD
                      </label>
                </div>
              </div>
            </div>
          </Container>
        </Col>
        <Col span={8}>

          <Container>
          <div
            id="chat"
            style={{
              position: "fixed",
              width: 350,
              height: 280,
              right: "2%",
              backgroundColor: "#075e54",
              borderRadius: 10,
              textAlign: "center",
              zIndex: 100,
              boxShadow: "2px 2px 3px #999"
            }}
          >
            <div style={{ width: 350, height: 90, marginTop: 30 }}>
              <div
                style={{ display: "inline-block", width: "10%", verticalAlign: "-20px" }}
              >
                <img
                  src="https://user-images.githubusercontent.com/3825401/95160087-47380880-07bd-11eb-8605-795c0a41f851.png"
                  width="60px"
                  height="60px"
                  style={{ marginTop: -60, borderRadius: 30 }}
                />
              </div>
              <div
                style={{ display: "inline-block", width: "80%", verticalAlign: "-7px" }}
              >
                <h1
                  style={{
                    marginLeft: 40,
                    marginTop: 0,
                    marginBottom: 15,
                    fontSize: 22,
                    textAlign: "left",
                    color: "#FFF"
                  }}
                >
                  Harsh Vardhan
      </h1>
                <p
                  style={{
                    marginTop: "-10px",
                    marginLeft: 40,
                    fontSize: 15,
                    textAlign: "left",
                    color: "#FFF"
                  }}
                >
                  Support
      </p>
                <p></p>
              </div>
            </div>
            <div style={{ width: 350, height: 150, backgroundColor: "#ece5dd" }}>
              <div
                style={{
                  width: 150,
                  height: 100,
                  marginLeft: 10,
                  marginTop: 30,
                  float: "left",
                  borderRadius: 10,
                  backgroundColor: "#FFF"
                }}
              >
                <h4
                  style={{
                    fontSize: 15,
                    marginTop: 10,
                    marginLeft: 10,
                    marginRight: 10,
                    textAlign: "left",
                    color: "#000"
                  }}
                >
                  Hi there
        <br />
        How can I help you
      </h4>
              </div>
            </div>
            <div
              style={{
                width: 350,
                height: 90,
                backgroundColor: "#FFF",
                boxShadow: "2px 2px 3px #999",
                display: "flex",
                justifyContent: "center",
                borderRadius: "0px 0px 10px 10px"
              }}
            >
              <div
                style={{
                  width: "90%",
                  height: 50,
                  marginTop: 15,
                  borderRadius: 25,
                  backgroundColor: "#25d366"
                }}
              >
                <h4
                  style={{
                    fontSize: 20,
                    marginTop: 12,
                    marginLeft: 10,
                    marginRight: 10,
                    textAlign: "center",
                    color: "#FFF"
                  }}
                >
                  Start Chat
      </h4>
              </div>
            </div>
          </div>
          </Container>
        </Col>
      </Row>
    </div>
  );
}



const HeaderComponent = () => {
  return (
    <Header style={{ background: '#FFFFFF' }}>
      <Row>
        <Col span={1}>
          <Icon />
        </Col>
        <Col span={18}>
          <Link to={'/dashboard'}><h1 style={Titlehead}>SalesJump</h1></Link>
        </Col>
        <Col span={2} />
        <Col
          span={2}
          style={{ marginLeft: '10px' }}
        >
          <OutlineButton>LOGOUT</OutlineButton>
        </Col>
      </Row>
    </Header>
  );
};

function Icon() {
  return (
    <div style={{ width: '45px', marginTop: '10px' }}>
      <svg viewBox="0 0 345.52 345.52">
        <path d="M279.369 101.014l-99.265-98.22a10.972 10.972 0 00-14.629 0L66.21 100.492a12.017 12.017 0 00-2.612 12.539 12.54 12.54 0 009.927 7.837h47.02v120.686c-.008 5.482 4.43 9.933 9.913 9.94.179 0 .358-.004.536-.014h83.592c5.475.289 10.147-3.916 10.435-9.39.009-.179.014-.357.014-.536V120.867h47.02a12.54 12.54 0 009.927-7.837 11.497 11.497 0 00-2.613-12.016zm-64.784-1.045c-5.747 0-10.449 2.09-10.449 7.837v122.776h-62.694V107.806c0-5.747-4.702-7.837-10.449-7.837H99.124l73.665-72.098 73.665 72.098h-31.869zM214.585 261.929h-83.592c-5.771 0-10.449 4.678-10.449 10.449s4.678 10.449 10.449 10.449h83.592c5.771 0 10.449-4.678 10.449-10.449s-4.678-10.449-10.449-10.449zM214.585 293.275h-83.592c-5.771 0-10.449 4.678-10.449 10.449s4.678 10.449 10.449 10.449h83.592c5.771 0 10.449-4.678 10.449-10.449s-4.678-10.449-10.449-10.449zM214.585 324.622h-83.592c-5.771 0-10.449 4.678-10.449 10.449s4.678 10.449 10.449 10.449h83.592c5.771 0 10.449-4.678 10.449-10.449s-4.678-10.449-10.449-10.449z" />
      </svg>
    </div>
  );
}
export default Widget;