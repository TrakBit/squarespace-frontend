import React, {useState} from 'react';
import {Row, Col, Card, Button} from 'antd';
import styled from 'styled-components';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {verifySnippet} from '../../Api/Api'
import {
    CopyOutlined
} from '@ant-design/icons';
import Lottie from 'react-lottie';
import * as Tick from './tick.json';
import * as Cross from './cross.json';
import {
    InfoCircleTwoTone,
    PlayCircleOutlined
} from '@ant-design/icons';

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

const AddSnippet = ({location, addSnippetModalVisible}) => {

    const [snippet, setSnippet] = useState({
        upsell_div: -1,
        upsell_div_list: -1,
        upsell_div_input: -1,
        cross_sell_div: -1,
        cross_sell_div_list: -1,
        cross_sell_div_input: -1,
        script_tag: -1
    })
    const [tickMotionStopped, setTickMotion] = useState(true);

    const verifySnippetAction = async () => {
        const snippetData = await verifySnippet(location.state.site_id)
        setSnippet(snippetData.data)
        setTickMotion(false);
    }

    const inputCode = `
        <input 
            type='hidden'
            class='salesjump-list-item'
            value='{{wf {"path":"slug","type":"PlainText"} }}'
        />
    `;

    const embedCode = `
        <script id='salesjump-script'>
        document.querySelectorAll(".upsell .salesjump-list-item").forEach((e,l)=>document.querySelectorAll(".upsell .w-dyn-item")[l].style.display="none"),document.querySelectorAll(".cross-sell .salesjump-list-item").forEach((e,l)=>document.querySelectorAll(".cross-sell .w-dyn-item")[l].style.display="none");const pathname=window.location.pathname,product=pathname.replace("/product/","");$.post("https://salesjump.onrender.com/products/",{slug:product,site_id:"${location.state.site_id}"}).done(function(e){e.upsells.forEach(e=>document.querySelectorAll(".upsell .salesjump-list-item").forEach((l,s)=>{e.slug===document.querySelectorAll(".upsell .salesjump-list-item")[s].value&&(document.querySelectorAll(".upsell .w-dyn-item")[s].style.display="block")})),e.cross_sells.forEach(e=>document.querySelectorAll(".cross-sell .salesjump-list-item").forEach((l,s)=>{e.slug===document.querySelectorAll(".cross-sell .salesjump-list-item")[s].value&&(document.querySelectorAll(".cross-sell .w-dyn-item")[s].style.display="block")}))});
        </script>
    `;

    return (
    <>
        <Row style={{marginTop: '50px'}}>
            <Col span={2}/>
            <Col span={16}>
                <Card
                    style={{
                        borderRadius: '2px',
                        borderColor: '#ccc',
                    }}
                >
                    <Row>
                        <Col span={1}>
                            <InfoCircleTwoTone style={{fontSize: '30px', fontWeight: '500'}}/>
                        </Col>
                        <Col
                            span={23}
                            style={{fontSize: '20px', fontWeight: '500'}}
                        >
                            {'NOTE: You can apply steps only for upsell, cross-sell or both as per your requirement'}
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>

        <Row style={{marginTop: '50px'}}>
            <Col span={2}/>
            <Col span={16}>
                <h1 style={heading}>
                    Follow the steps below or watch clip
                </h1>
                <OutlineButton
                    type='primary'
                    onClick={() => addSnippetModalVisible(true)}
                >
                    <PlayCircleOutlined style={{fontSize: '18px'}}/>
                    {'  Add Snippet For Upsell'}
                </OutlineButton>
            </Col>
        </Row>

        <Row style={{marginTop: '50px'}}>
            <Col span={1}/>
            <Col span={1}>
                <h1 style={heading}>1.</h1>
            </Col>
            <Col span={16}>
                <h1 style={heading}>
                    Add Div Block Element to Ecommerce Pages ➡️ Products Template and name it 
                    <a style={{color: '#00b7c2'}}> upsell/cross-sell</a>
                </h1>
                <div style={{marginTop: '20px', marginBottom: '20px'}}>
                    <img
                        style={{
                            width: '90%',
                            borderImageWidth: '2px',
                            borderColor: '#00000'
                        }}
                        src={'https://user-images.githubusercontent.com/3825401/92151207-5d5d4c80-ee3e-11ea-810a-175725187dcd.png'}
                    />
                </div>
            </Col>
        </Row>


        <Row>
            <Col span={2}/>
            <Col span={16}>
                <Card
                    style={{
                        borderRadius: '2px',
                        borderColor: '#ccc',
                        backgroundColor: '#f7f7f7'
                    }}
                >
                    <Row>
                        <Col
                            span={23}
                            style={{fontSize: '20px', fontWeight: '500'}}
                        >
                            {'upsell'}
                        </Col>
                        <Col span={1}>
                            <CopyToClipboard text={'upsell'}>
                                <Button
                                    type='primary'
                                    icon={<CopyOutlined/>}
                                    size={'small'}
                                />
                            </CopyToClipboard>
                        </Col>
                    </Row>
                </Card>
            </Col>
            <Col span={2}>
                <ListCheckComponent
                    listCheck={snippet.upsell_div}
                    tickMotionStopped={tickMotionStopped}
                />
            </Col>
        </Row>
        <br/>
        <Row>
            <Col span={2}/>
            <Col span={16}>
                <Card
                    style={{
                        borderRadius: '2px',
                        borderColor: '#ccc',
                        backgroundColor: '#f7f7f7'
                    }}
                >
                    <Row>
                        <Col
                            span={23}
                            style={{fontSize: '20px', fontWeight: '500'}}
                        >
                            {'cross-sell'}
                        </Col>
                        <Col span={1}>

                            <CopyToClipboard text={'cross-sell'}>
                                <Button
                                    type='primary'
                                    icon={<CopyOutlined/>}
                                    size={'small'}
                                />
                            </CopyToClipboard>
                        </Col>
                    </Row>
                </Card>
            </Col>
            <Col span={2}>
                <ListCheckComponent
                    listCheck={snippet.cross_sell_div}
                    tickMotionStopped={tickMotionStopped}
                />
            </Col>
        </Row>

        <Row style={{marginTop: '50px'}}>
            <Col span={1}/>
            <Col span={1}>
                <h1 style={heading}>2.</h1>
            </Col>
            <Col span={16}>
                <h1 style={heading}>
                    Add Collection List element inside <a style={{color: '#00b7c2'}}>upsell</a> div you just created. 
                </h1>
                <div style={{marginTop: '20px', marginBottom: '20px'}}>
                    <img
                        style={{
                            width: '100%',
                            borderImageWidth: '2px',
                            borderColor: '#00000'
                        }}
                        src={'https://user-images.githubusercontent.com/3825401/92150812-a52fa400-ee3d-11ea-89cb-6561685fcd29.png'}
                    />
                </div>
            </Col>
            <Col span={2}>
                <ListCheckComponent
                    listCheck={snippet.upsell_div_list}
                    tickMotionStopped={tickMotionStopped}
                />
            </Col>
        </Row>

        <Row style={{marginTop: '50px'}}>
            <Col span={1}/>
            <Col span={1}>
                <h1 style={heading}>3.</h1>
            </Col>
            <Col span={16}>
                <h1 style={heading}>
                    Add Collection List element inside <a style={{color: '#00b7c2'}}>cross-sell</a> div you just created. 
                </h1>
                <div style={{marginTop: '20px', marginBottom: '20px'}}>
                    <img
                        style={{
                            width: '100%',
                            borderImageWidth: '2px',
                            borderColor: '#00000'
                        }}
                        src={'https://user-images.githubusercontent.com/3825401/92150812-a52fa400-ee3d-11ea-89cb-6561685fcd29.png'}
                    />
                </div>
            </Col>
            <Col span={2}>
                <ListCheckComponent
                    listCheck={snippet.cross_sell_div_list}
                    tickMotionStopped={tickMotionStopped}
                />
            </Col>
        </Row>

        <Row style={{marginTop: '50px'}}>
            <Col span={1}/>
            <Col span={1}>
                <h1 style={heading}>4.</h1>
            </Col>
            <Col span={16}>
                <h1 style={heading}>
                    Add Embed Element to Collection Item in Collection List in <a style={{color: '#00b7c2'}}>upsell/cross-sell</a>. 
                </h1>
                <div style={{marginTop: '20px', marginBottom: '20px'}}>
                    <img
                        style={{
                            width: '90%',
                            borderImageWidth: '2px',
                            borderColor: '#00000'
                        }}
                        src={'https://user-images.githubusercontent.com/3825401/92151091-25eea000-ee3e-11ea-8cfb-ce71a4065911.png'}
                    />
                </div>
            </Col>
        </Row>

        <Row style={{marginTop: '50px'}}>
            <Col span={1}/>
            <Col span={1}>
                <h1 style={heading}>5.</h1>
            </Col>
            <Col span={16}>
                <h1 style={heading}>
                    Paste the below code in embed in <a style={{color: '#00b7c2'}}>upsell</a> div. 
                </h1>

                <Card
                    style={{
                        borderRadius: '2px',
                        width: '100%',
                        marginTop: '4%',
                        borderColor: '#ccc',
                        backgroundColor: '#f7f7f7'
                    }}
                >
                    <Row>
                        <Col
                            span={23}
                            style={{fontSize: '20px', fontWeight: '500'}}
                        >
                            {inputCode}
                        </Col>
                        <Col span={1}>
                            <CopyToClipboard text={inputCode}>
                                <Button
                                    type='primary'
                                    icon={<CopyOutlined/>}
                                    size={'small'}
                                />
                            </CopyToClipboard>
                        </Col>
                    </Row>
                </Card>
            </Col>
            <Col span={2}>
                <ListCheckComponent
                    listCheck={snippet.upsell_div_input}
                    tickMotionStopped={tickMotionStopped}
                />
            </Col>
        </Row>

        <Row style={{marginTop: '50px'}}>
            <Col span={1}/>
            <Col span={1}>
                <h1 style={heading}>6.</h1>
            </Col>
            <Col span={16}>
                <h1 style={heading}>
                    Paste the below code in embed in <a style={{color: '#00b7c2'}}>cross-sell</a> div. 
                </h1>

                <Card
                    style={{
                        borderRadius: '2px',
                        width: '100%',
                        marginTop: '4%',
                        borderColor: '#ccc',
                        backgroundColor: '#f7f7f7'
                    }}
                >
                    <Row>
                        <Col
                            span={23}
                            style={{fontSize: '20px', fontWeight: '500'}}
                        >
                            {inputCode}
                        </Col>
                        <Col span={1}>

                            <CopyToClipboard text={inputCode}>
                                <Button
                                    type='primary'
                                    icon={<CopyOutlined/>}
                                    size={'small'}
                                />
                            </CopyToClipboard>
                        </Col>
                    </Row>
                </Card>
            </Col>
            <Col span={2}>
                <ListCheckComponent
                    listCheck={snippet.cross_sell_div_list}
                    tickMotionStopped={tickMotionStopped}
                />
            </Col>
        </Row>

        <Row style={{marginTop: '50px'}}>
            <Col span={1}/>
            <Col span={1}>
                <h1 style={heading}>7.</h1>
            </Col>
            <Col span={16}>
                <h1 style={heading}>
                    Add HTML Embed at the bottom of the <a style={{color: '#00b7c2'}}>Products Template</a> page. 
                </h1>

                <div style={{marginTop: '20px', marginBottom: '20px'}}>
                    <img
                        style={{
                            width: '30%',
                            borderImageWidth: '2px',
                            borderColor: '#00000'
                        }}
                        src={'https://user-images.githubusercontent.com/3825401/92151177-4f0f3080-ee3e-11ea-87f3-f1cb57845159.png'}
                    />
                </div>
            </Col>
            <Col span={2}>
                <ListCheckComponent
                    listCheck={snippet.script_tag}
                    tickMotionStopped={tickMotionStopped}
                />
            </Col>
        </Row>

        <Row>
            <Col span={2}/> 
            <Col span={16}>
                <h1 style={heading}>Paste the follwing code into the HTML embed.</h1>
                <Card
                    style={{
                        borderRadius: '2px',
                        width: '100%',
                        marginTop: '4%',
                        borderColor: '#ccc',
                        backgroundColor: '#f7f7f7'      
                    }}
                >
                    <Row>
                        <Col
                            span={23}
                            style={{fontSize: '12px', fontWeight: '500',wordWrap: 'break-word'}}
                        >
                            {embedCode}
                        </Col>
                        <Col span={1}>

                            <CopyToClipboard text={embedCode}>
                                <Button
                                    type='primary'
                                    icon={<CopyOutlined/>}
                                    size={'small'}
                                />
                            </CopyToClipboard>
                        </Col>
                    </Row>
                </Card>
            </Col>
            <Col span={2}>
                <ListCheckComponent
                    listCheck={snippet.script_tag}
                    tickMotionStopped={tickMotionStopped}
                />
            </Col>
        </Row>

        <br/>
        <Row>
                <Col span={2}/>
                <Col span={18}>
                    <h1 style={heading}>
                        Verify if all the steps have been correctly followed
                    </h1>
                    
                    <OutlineButton
                        type='primary'
                        onClick={() => verifySnippetAction()}
                    >
                        {'VERIFY'}
                    </OutlineButton>
                </Col>
                <Col span={2}>
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

export default AddSnippet;