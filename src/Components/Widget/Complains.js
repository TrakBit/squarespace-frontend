import React from 'react';
import {Row, Col, Input} from 'antd';

const Complains = ({widget, setOption1, setOption2, setOption3, setOption4}) => {
    if (widget[0].complains === true) {
        return (
            <>
                <div style={{paddingTop: '4%'}}>
                    <Row>
                        <Col span={11}>
                            <Input
                                value={widget[0].option1}
                                onChange={(e) => setOption1(e.target.value)}
                                placeholder='Option 1'
                                maxLength={11}
                            />
                        </Col>
                      &emsp;
                        <Col span={11}>
                            <Input
                                value={widget[0].option2}
                                onChange={(e) => setOption2(e.target.value)}
                                placeholder='Option 2'
                                maxLength={11}
                            />
                        </Col>
                    </Row>
                </div>
                <div style={{paddingTop: '4%'}}>
                    <Row>
                        <Col span={11}>
                            <Input
                                value={widget[0].option3}
                                onChange={(e) => setOption3(e.target.value)}
                                placeholder='Option 3'
                                maxLength={11}
                            />
                        </Col>
                      &emsp;
                        <Col span={11}>
                            <Input
                                value={widget[0].option4}
                                onChange={(e) => setOption4(e.target.value)}
                                placeholder='Option 4'
                                maxLength={11}
                            />
                        </Col>
                    </Row>
                </div>
            </>
        );
    } else {
        return <div/>;
    }
};

export default Complains;