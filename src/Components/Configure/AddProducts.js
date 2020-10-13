import React from 'react';
import {Row, Col} from 'antd';
import styled from 'styled-components';
import {
    PlayCircleOutlined
} from '@ant-design/icons';

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const heading = {
    fontSize: '20px',
    color: '#525f7f',
    textAlign: 'left'
};

const EmojiContainer = styled(FlexCol)`
  height: 100px;
  padding: 0 0 0 30%;
  align-self: center;
  justify-content: space-between;
`;

const OutlineButton = styled.button`
  height: 42px;
  width: 200px;
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

const AddProducts = ({upsellsModalVisible}) => {
    return (
        <>
            <Row style={{marginTop: '50px'}}>
                <Col span={1}/>
                <Col span={1}>
                    <h1 style={heading}>1.</h1>
                </Col>
                <Col span={16}>
                    <h1 style={heading}>
                        Add <a style={{color: '#00b7c2'}}>Upsells</a> to each of your products
                    </h1>

                    <EmojiContainer>
                        <div id='parent'>
                            <ul id='childWrapper'>
                                <li><h1 style={{fontSize: '30px', marginTop: '45%'}}>🍔</h1></li>
                                <li><h1 style={{fontSize: '90px'}}>{'<'}</h1></li>
                                <li><h1 style={{fontSize: '60px', marginTop: '25%'}}>🍔</h1></li>
                                <li><h1 style={{fontSize: '90px'}}>{'<'}</h1></li>
                                <li><h1 style={{fontSize: '90px'}}>🍔</h1></li>
                            </ul>
                        </div>
                    </EmojiContainer>

                    <br/>
                    <OutlineButton
                        type='primary'
                        onClick={() => upsellsModalVisible(true)}
                    >
                        <PlayCircleOutlined style={{fontSize: '18px'}}/>
                        {'  Add Upsells'}
                    </OutlineButton>

                    <div style={{marginTop: '20px', marginBottom: '20px'}}>
                        <img
                            style={{
                                width: '90%',
                                borderImageWidth: '2px',
                                borderColor: '#00000'
                            }}
                            src={'https://user-images.githubusercontent.com/3825401/92151314-8e3d8180-ee3e-11ea-9d21-e20eaa3bafda.png'}
                        />
                    </div>
                </Col>
            </Row>
            <Row style={{marginTop: '50px'}}>
                <Col span={1}/>
                <Col span={1}>
                    <h1 style={heading}>2.</h1>
                </Col>
                <Col span={16}>
                    <h1 style={heading}>
                        Add <a style={{color: '#00b7c2'}}>Cross-Sells</a> to each of your products
                    </h1>
                    <h1 style={{fontSize: '90px'}}>🍔 + 🍟 + 🥤</h1>
                    <div style={{marginTop: '20px', marginBottom: '20px'}}>
                        <img
                            style={{
                                width: '90%',
                                borderImageWidth: '2px',
                                borderColor: '#00000'
                            }}
                            src={'https://user-images.githubusercontent.com/3825401/92150669-5da91800-ee3d-11ea-8220-86dc33c76c1a.png'}
                        />
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default AddProducts;