import React from 'react';
import Dialog from 'react-modal';
import styled from 'styled-components';
import {Row, Col} from 'antd';

const head = {
    fontWeight: '500',
    fontSize: '20px',
    color: '#32325D'
};

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const FilterName = {
    fontWeight: '500',
    fontSize: '20px',
    color: '#32325D'
};

const price = {
    fontSize: '100px',
    color: '#525f7f'
};

const ModalContainer = styled(FlexCol)`
  padding: 0rem;
  align-items: center;
  align-text: center;
  justify-content: space-between;
`;

const Button = styled.button`
  height: 42px;
  width: 120px;
  background-color: #00b7c2;
  color: #FFFFFF;
  font-weight: 500;
  font-size: 14px;
  border-radius: 0.25rem;
  border-color: #00b7c2;
  line-height: 1.5;
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

const PlansModal = ({selectPlan, plans, plansModal, plansModalVisible}) => {
    return (
        <Dialog
            ariaHideApp={false}
            isOpen={plansModal}
            style={customStyles}
            onRequestClose={() => plansModalVisible(false)}
        >
            <ModalContainer>
                <h4 style={head}>{' Plans'}</h4>
                <Row>
                    {plans.map((value, i) => {
                        return (
                            <Col
                                span={24}
                                key={i}
                            >
                                <ModalContainer
                                    style={{
                                        borderWidth: '5px',
                                        borderColor: '#00b7c2',
                                        borderStyle: 'solid',
                                        borderRadius: '5px'
                                    }}
                                >
                                    <ModalContainer style={{padding: '1rem'}}>
                                        <h5 style={FilterName}>
                                            {value.nickname}
                                        </h5>
                                        <h1 style={price}>
                                            {'$'}{value.amount / 100}
                                        </h1>
                                        <Button onClick={() => selectPlan(value.id)}> SELECT </Button>
                                    </ModalContainer>
                                </ModalContainer>
                            </Col>
                        );
                    })}
                </Row>
                <br/>
            </ModalContainer>
        </Dialog>
    );
};

export default PlansModal;