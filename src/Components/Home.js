import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {PageHeader, Col, Row, Layout} from 'antd';
import {Link} from 'react-router-dom';

const {Header} = Layout;

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled(FlexCol)`
  padding: 1rem;
  align-items: center;
  padding: 1rem;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 100px;
  height: 42px;
  background-color: #00b7c2;
  color: #FFFFFF;
  font-weight: 500;
  font-size: 14px;
  border-radius: 0.25rem;
  line-height: 1.5;
  border-color: #00b7c2;
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

const highlight = {
    background: '#b4f2e1',
    color: '#000000'
};

const heading = {
    fontSize: '20px',
    color: '#525f7f'
};

const price = {
    fontSize: '100px',
    color: '#525f7f'
};

function Home() {
    const crosslink = () => {
        window.open('https://salesjump.webflow.io/product/checked-shirt');
    };

    const [screenWidth, setScreenWidth] = useState('50%');

    useEffect(() => {
        if (window.innerWidth < 480) {
            setScreenWidth('100%');
        }
    }, []);

    const Banner = () => {
        if (window.innerWidth > 480) {
            return (
                <>
                    <h1 style={{fontSize: '5vw', textAlign: 'center'}}>
                        🍭 An eye candy on product page
                        <br/>to boost up your sales. 💰
                    </h1>
                    <h1 style={{fontSize: '2vw'}}>
                        A Webflow e-commerce plugin for Upsell and Cross-Sell
                    </h1>
                </>
            );
        } else {
            return (
                <>
                    <h1 style={{fontSize: '9vw', textAlign: 'center'}}>
                        🍭 An eye candy on product page
                        <br/>to boost up your sales. 💰
                    </h1>
                    <h1 style={{fontSize: '4vw'}}>
                        A Webflow e-commerce plugin for Upsell and Cross-Sell
                    </h1>
                </>
            );
        }
    };

    return (
        <div
            className='App'
            style={{backgroundColor: '#FFFFFF'}}
        >
            <Header style={{height: 10, background: '#00b7c2'}}/>
            <PageHeader
                style={{backgroundColor: '#f4f9f4'}}
                className='site-page-header'
                title={
                    <>
                        <div id='parent_div_1'>
                            <Icon/>
                        </div>
                        <div id='parent_div_2'>
                            SalesJump
                        </div>
                    </>
                }
                extra={[
                    <Link
                        key='2'
                        to={'/login'}
                    ><Button >Login</Button></Link>,
                    <Link
                        key='1'
                        to={'/register'}
                    ><Button>Join</Button></Link>,
                    <Button key='3'>
                        <a
                            style={{color: '#FFFFFF'}}
                            href='https://wa.me/9315368036'
                        >Support</a>
                    </Button>
                ]}
            />
            <Row style={{backgroundColor: '#f4f9f4'}}>
                <Col span={24}>
                    <Container>
                        <Banner/>
                    </Container>
                </Col>
            </Row>

            <div style={{width: '100%'}}>
                <Container>
                    <img
                        style={{
                            width: '90%',
                            borderImageWidth: '2px',
                            borderColor: '#00000',
                            paddingTop: '70px'
                        }}
                        src={'https://user-images.githubusercontent.com/3825401/91666011-42759a00-eb17-11ea-8a81-b35a33d2e09f.jpg'}
                    />
                </Container>
            </div>

            <Container style={{margin: '0 auto', width: screenWidth}}>
                <h1 style={{fontSize: '35px', textAlign: 'center'}}>
                    Add Custom Designed Cross Sell and Upsell Offers
                </h1>
                <p style={{fontSize: '25px'}}>
                    Give custom cross-sell offers <a style={highlight}><b>{'right on product page '}</b></a>. Select the choice of
                    upsells and cross-sells for each product right in your webflow CMS
                </p>
                <OutlineButton onClick={crosslink}>LIVE DEMO</OutlineButton>
            </Container>

            <Container style={{margin: '0 auto', width: screenWidth}}>
                <h1 style={{fontSize: '35px', textAlign: 'center'}}>
                    You don't make money 💸 by making user navigate your website
                </h1>
                <p style={{fontSize: '25px'}}>
                    Remove the unecessary steps of making them visit every single product page.
                    <a style={highlight}><b>{'Give them relatable suggestions based on their product selection '}</b></a>
                    and make them press the <OutlineButton>BUY</OutlineButton> button.
                </p>
            </Container>

            <Container style={{margin: '0 auto', width: screenWidth}}>
                <h1 style={{fontSize: '45px', textAlign: 'center'}}>
                    Why wait, boost your sales now 🚀
                </h1>
                <Link to={'/register'}><OutlineButton> JOIN</OutlineButton></Link>
            </Container>

            <div style={{textAlign: 'center', backgroundColor: '#f4f9f4', borderRadius: '30px', width: '90%', marginLeft: '5%'}}>
                <br/>
                <h1 style={heading}>{'Monthly Subscription'}</h1>
                <div style={{marginTop: '1%', marginBottom: '5%'}}>
                    <h1 style={price}>
                        $15
                    </h1>
                </div>
            </div>

            <Header style={{marginTop: 40, height: 10, background: '#00b7c2'}}/>
        </div>
    );
}

function Icon() {
    return (
        <div style={{width: '45px'}}>
            <svg viewBox='0 0 345.52 345.52'>
                <path d='M279.369 101.014l-99.265-98.22a10.972 10.972 0 00-14.629 0L66.21 100.492a12.017 12.017 0 00-2.612 12.539 12.54 12.54 0 009.927 7.837h47.02v120.686c-.008 5.482 4.43 9.933 9.913 9.94.179 0 .358-.004.536-.014h83.592c5.475.289 10.147-3.916 10.435-9.39.009-.179.014-.357.014-.536V120.867h47.02a12.54 12.54 0 009.927-7.837 11.497 11.497 0 00-2.613-12.016zm-64.784-1.045c-5.747 0-10.449 2.09-10.449 7.837v122.776h-62.694V107.806c0-5.747-4.702-7.837-10.449-7.837H99.124l73.665-72.098 73.665 72.098h-31.869zM214.585 261.929h-83.592c-5.771 0-10.449 4.678-10.449 10.449s4.678 10.449 10.449 10.449h83.592c5.771 0 10.449-4.678 10.449-10.449s-4.678-10.449-10.449-10.449zM214.585 293.275h-83.592c-5.771 0-10.449 4.678-10.449 10.449s4.678 10.449 10.449 10.449h83.592c5.771 0 10.449-4.678 10.449-10.449s-4.678-10.449-10.449-10.449zM214.585 324.622h-83.592c-5.771 0-10.449 4.678-10.449 10.449s4.678 10.449 10.449 10.449h83.592c5.771 0 10.449-4.678 10.449-10.449s-4.678-10.449-10.449-10.449z'/>
            </svg>
        </div>
    );
}

export default Home;