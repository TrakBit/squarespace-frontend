import React, {useState} from 'react';
import {Row, Col, Layout, Tabs} from 'antd';
import styled from 'styled-components';
import {Link, useHistory} from 'react-router-dom';
import Dialog from 'react-modal';
import Vimeo from '@u-wave/react-vimeo';
import CreateUpSellField from './CreateUpSellField'
import CreateCrossSellField from './CreateCrossSellField';
import AddProducts from './AddProducts';
import AddSnippet from './AddSnippet';

const { TabPane } = Tabs;

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

const HeaderButton = styled.button`
  height: 42px;
  width: 120px;
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

const head = {
    fontWeight: '500',
    fontSize: '28px',
    color: '#32325D'
};

const Titlehead = {
    fontWeight: '800',
    fontSize: '20px',
    color: '#32325D'
};

function Configure({location}) {
    const history = useHistory();


    const [upsellFieldModal, upsellFieldModalVisible] = useState(false)
    const [upsellsModal, upsellsModalVisible] = useState(false)
    const [crossSellFieldModal, crossSellFieldModalVisible] = useState(false)
    const [addSnippetModal, addSnippetModalVisible] = useState(false)
    const [interfaceModal, interfaceModalVisible] = useState(false)

    const logout = () => {
        localStorage.clear();
        history.push('/');
    };

    return (
        <div className='App'>
            <UpsellsModal
                upsellsModal={upsellsModal}
                upsellsModalVisible={upsellsModalVisible}
            />
            <UpsellFieldModal
                upsellFieldModal={upsellFieldModal}
                upsellFieldModalVisible={upsellFieldModalVisible}
            />
            <CrossSellFieldModal
                crossSellFieldModal={crossSellFieldModal}
                crossSellFieldModalVisible={crossSellFieldModalVisible}
            />
            <AddSnippetModal
                addSnippetModal={addSnippetModal}
                addSnippetModalVisible={addSnippetModalVisible}
            />
            <InterfaceModal
                interfaceModal={interfaceModal}
                interfaceModalVisible={interfaceModalVisible}
            />
            <HeaderComponent logout={logout}/>
            <Container>
                <div
                    style={{width: '100%', marginTop: '35px'}}
                    className='App-card'
                >
                    <Tabs defaultActiveKey="1" centered>
                        <TabPane tab="1. Create Upsell Field" key="1">
                            <CreateUpSellField 
                                upsellFieldModalVisible={upsellFieldModalVisible}
                                location={location}
                            />
                        </TabPane>

                        <TabPane tab="2. Create Cross-Sell Field" key="2">
                            <CreateCrossSellField 
                                location={location}
                                crossSellFieldModalVisible={crossSellFieldModalVisible}
                            />
                        </TabPane>

                        <TabPane tab="3. Add Upsells/Cross-Sells" key="3">
                            <AddProducts upsellsModalVisible={upsellsModalVisible}/>
                        </TabPane>

                        <TabPane tab="4. Add Snippet For Upsell/Cross-sell" key="4">
                            <AddSnippet 
                                location={location}
                                addSnippetModalVisible={addSnippetModalVisible}
                            />
                        </TabPane>
                    </Tabs>


                </div>
            </Container>
        </div>
    );
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
                    <HeaderButton onClick={() => logout()}>LOGOUT</HeaderButton>
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

const InterfaceModal = ({interfaceModal, interfaceModalVisible}) => {
    return (
        <Dialog
            ariaHideApp={false}
            isOpen={interfaceModal}
            style={customStyles}
            onRequestClose={() => interfaceModalVisible(false)}
        >
            <ModalContainer>
                <h4 style={head}>{' Add Interface Code in HTML Embed'}</h4>
                <Vimeo
                    video='451553713'
                    height='400px'
                    width='800px'
                />
            </ModalContainer>
        </Dialog>
    );
};

const UpsellsModal = ({upsellsModal, upsellsModalVisible}) => {
    return (
        <Dialog
            ariaHideApp={false}
            isOpen={upsellsModal}
            style={customStyles}
            onRequestClose={() => upsellsModalVisible(false)}
        >
            <ModalContainer>
                <h4 style={head}>{' Add Upsells'}</h4>
                <Vimeo
                    video='451493473'
                    height='400px'
                    width='800px'
                />
            </ModalContainer>
        </Dialog>
    );
};

const UpsellFieldModal = ({upsellFieldModal, upsellFieldModalVisible}) => {
    return (
        <Dialog
            ariaHideApp={false}
            isOpen={upsellFieldModal}
            style={customStyles}
            onRequestClose={() => upsellFieldModalVisible(false)}
        >
            <ModalContainer>
                <h4 style={head}>{' Create Upsell Field'}</h4>
                <Vimeo
                    video='451470449'
                    height='400px'
                    width='800px'
                />
            </ModalContainer>
        </Dialog>
    );
};

const CrossSellFieldModal = ({crossSellFieldModal, crossSellFieldModalVisible}) => {
    return (
        <Dialog
            ariaHideApp={false}
            isOpen={crossSellFieldModal}
            style={customStyles}
            onRequestClose={() => crossSellFieldModalVisible(false)}
        >
            <ModalContainer>
                <h4 style={head}>{' Create Cross-Sell Field'}</h4>
                <Vimeo
                    video='455024047'
                    height='400px'
                    width='800px'
                />
            </ModalContainer>
        </Dialog>
    );
};

const AddSnippetModal = ({addSnippetModal, addSnippetModalVisible}) => {
    return (
        <Dialog
            ariaHideApp={false}
            isOpen={addSnippetModal}
            style={customStyles}
            onRequestClose={() => addSnippetModalVisible(false)}
        >
            <ModalContainer>
                <h4 style={head}>{' Add Snippet for Upsell'}</h4>
                <Vimeo
                    video='455141663'
                    height='400px'
                    width='800px'
                />
            </ModalContainer>
        </Dialog>
    );
};

export default Configure;