import React, {useState} from 'react';
import {Row, Col} from 'antd';
import styled from 'styled-components';
import {
    verifyUpSell
} from '../../Api/Api';
import {
    PlayCircleOutlined
} from '@ant-design/icons';
import Lottie from 'react-lottie';
import * as Tick from './tick.json';
import * as Cross from './cross.json';

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const heading = {
    fontSize: '20px',
    color: '#525f7f',
    textAlign: 'left'
};

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

const tickOptions = {
    loop: false,
    autoplay: true,
    animationData: Tick.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const crossOptions = {
    loop: false,
    autoplay: true,
    animationData: Cross.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const CreateCrossSellField = ({location, crossSellFieldModalVisible}) => {

    const [itemCheck, setItemCheck] = useState(-1);
    const [tickMotionStopped, setTickMotion] = useState(true);

    const verifyCrossSellAction = async () => {
        const verifiedData = await verifyUpSell(location.state.site_id)
        setItemCheck(verifiedData.data.upsell)
        setTickMotion(false)
    }
    return (
        <>
            <h1 style={{fontSize: '90px'}}>🍔 + 🍟 + 🥤</h1>
            <Row style={{marginTop: '50px'}}>
                <Col span={1}/>
                <Col span={1}>
                    <h1 style={heading}>1.</h1>
                </Col>
                <Col span={16}>
                    <h1 style={heading}>
                        Add Custom field <a style={{color: '#00b7c2'}}>Cross-Sell</a> of type Multi-reference to Product. This allows to reference any product to any other product.
                    </h1>

                    <OutlineButton
                        type='primary'
                        onClick={() => crossSellFieldModalVisible(true)}
                    >
                        <PlayCircleOutlined style={{fontSize: '18px'}}/>
                        {'  Add Cross-Sell Field'}
                    </OutlineButton>
                    
                    <div style={{marginTop: '20px', marginBottom: '20px'}}>
                        <img
                            style={{
                                width: '90%',
                                borderImageWidth: '2px',
                                borderColor: '#00000'
                            }}
                            src={'https://user-images.githubusercontent.com/3825401/92150888-c55f6300-ee3d-11ea-8ecc-6a02836cc87c.png'}
                        />
                    </div>
                </Col>
                <Col span={2}>
                    <ListCheckComponent
                        listCheck={itemCheck}
                        tickMotionStopped={tickMotionStopped}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={2}/>
                <Col span={16}>
                    <h1 style={heading}>
                        Verify if cross-sell field is created
                    </h1>
                    
                    <OutlineButton
                        type='primary'
                        onClick={() => verifyCrossSellAction()}
                    >
                        {'VERIFY'}
                    </OutlineButton>
                </Col>
                <Col span={2}>
                    <ListCheckComponent
                        listCheck={itemCheck}
                        tickMotionStopped={tickMotionStopped}
                    />
                </Col>
            </Row>
            <br/>
        </>
    );
}

const ListCheckComponent = ({listCheck, tickMotionStopped}) => {
    if (listCheck === 1) {
        return (
            <Lottie
                options={tickOptions}
                isPaused={tickMotionStopped}
                height={60}
                width={60}
            />
        );
    } else if (listCheck === 0) {
        return (
            <Lottie
                options={crossOptions}
                isPaused={tickMotionStopped}
                height={60}
                width={60}
            />
        );
    } else {
        return <div/>;
    }
};

export default CreateCrossSellField;