import React from 'react';

const ComplaintWidget = ({widget}) => {
    return (
        <>
            <div
                id='chat'
                style={{
                    width: 350,
                    height: 280,
                    right: '2%',
                    marginTop: '50px',
                    backgroundColor: widget[0].headerColor,
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
                                marginBottom: 0,
                                fontSize: 22,
                                textAlign: 'left',
                                color: widget[0].headerTextColor
                            }}
                        >
                            {widget[0].header}&nbsp;
                        </h1>
                        <p
                            style={{
                                marginLeft: 40,
                                fontSize: 15,
                                textAlign: 'left',
                                color: widget[0].headerTextColor
                            }}
                        >
                            {widget[0].caption}&nbsp;
                        </p>
                        <p/>
                    </div>
                </div>
                <div
                    style={{
                        width: 350,
                        height: 150,
                        backgroundImage:
    'url("https://firebasestorage.googleapis.com/v0/b/squarespace-chat.appspot.com/o/images%2Fwhatsapp.png?alt=media&token=dca2a6ca-0759-47c1-b828-86424004a2e8")'
                    }}
                >
                    <div
                        style={{
                            width: 260,
                            height: 120,
                            marginLeft: 10,
                            marginTop: 20,
                            float: 'left',
                            borderRadius: 10,
                            backgroundColor: '#FFF'
                        }}
                    >
                        <div
                            style={{
                                fontSize: 15,
                                fontWeight: 600,
                                marginTop: 2,
                                marginLeft: 10,
                                marginRight: 1,
                                textAlign: 'left',
                                color: '#000'
                            }}
                        >
                            {widget[0].message}
                        </div>
                        <div
                            style={{
                                marginTop: 10,
                                borderRadius: 7,
                                height: 30,
                                width: 110,
                                marginLeft: 10,
                                marginRight: 10,
                                float: 'left',
                                backgroundColor: '#FCDDBC'
                            }}
                        >
                            <h4
                                style={{
                                    fontSize: 15,
                                    marginTop: 2,
                                    marginLeft: 5,
                                    marginRight: 5,
                                    textAlign: 'center',
                                    color: '#000'
                                }}
                            >
                                {widget[0].option1}
                            </h4>
                        </div>
                        <div
                            style={{
                                marginTop: 10,
                                borderRadius: 7,
                                height: 30,
                                width: 110,
                                marginLeft: 10,
                                marginRight: 10,
                                float: 'right',
                                backgroundColor: '#D9DBBC'
                            }}
                        >
                            <h4
                                style={{
                                    fontSize: 15,
                                    marginTop: 2,
                                    marginLeft: 5,
                                    marginRight: 5,
                                    textAlign: 'center',
                                    color: '#000'
                                }}
                            >
                                {widget[0].option2}
                            </h4>
                        </div>
                        <div
                            style={{
                                marginTop: 10,
                                borderRadius: 7,
                                height: 30,
                                width: 110,
                                marginLeft: 10,
                                marginRight: 10,
                                float: 'left',
                                backgroundColor: '#ffadad'
                            }}
                        >
                            <h4
                                style={{
                                    fontSize: 15,
                                    marginTop: 2,
                                    marginLeft: 5,
                                    marginRight: 5,
                                    textAlign: 'center',
                                    color: '#000'
                                }}
                            >
                                {widget[0].option3}
                            </h4>
                        </div>
                        <div
                            style={{
                                marginTop: 10,
                                borderRadius: 7,
                                height: 30,
                                width: 110,
                                marginLeft: 10,
                                marginRight: 10,
                                float: 'right',
                                backgroundColor: '#caf0f8'
                            }}
                        >
                            <h4
                                style={{
                                    fontSize: 15,
                                    marginTop: 2,
                                    marginLeft: 5,
                                    marginRight: 5,
                                    textAlign: 'center',
                                    color: '#000'
                                }}
                            >
                                {widget[0].option4}
                            </h4>
                        </div>
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
                    <a style={{textDecoration: 'none', width: '90%'}}>
                        <div
                            style={{
                                height: 50,
                                marginTop: 15,
                                paddingTop: 1,
                                borderRadius: 25,
                                backgroundColor: widget[0].buttonColor
                            }}
                        >
                            <h4
                                style={{
                                    fontSize: 20,
                                    marginTop: 8,
                                    marginLeft: 10,
                                    marginRight: 10,
                                    textAlign: 'center',
                                    color: widget[0].buttonTextColor
                                }}
                            >
                                Start Chat
                            </h4>
                        </div>
                    </a>
                </div>
            </div>
            <div
                id='action'
                style={{
                    width: 60,
                    height: 60,
                    marginTop: 105,
                    marginLeft: '90%',
                    backgroundColor: widget[0].floatingButtonColor,
                    borderRadius: 50,
                    textAlign: 'center',
                    zIndex: 100,
                    boxShadow: '2px 2px 3px #999'
                }}
            >
                <svg
                    style={{marginTop: 13}}
                    viewBox='0 0 90 90'
                    fill={widget[0].floatingButtonTextColor}
                    width={32}
                    height={32}
                >
                    <path d='M90,43.841c0,24.213-19.779,43.841-44.182,43.841c-7.747,0-15.025-1.98-21.357-5.455L0,90l7.975-23.522   c-4.023-6.606-6.34-14.354-6.34-22.637C1.635,19.628,21.416,0,45.818,0C70.223,0,90,19.628,90,43.841z M45.818,6.982   c-20.484,0-37.146,16.535-37.146,36.859c0,8.065,2.629,15.534,7.076,21.61L11.107,79.14l14.275-4.537   c5.865,3.851,12.891,6.097,20.437,6.097c20.481,0,37.146-16.533,37.146-36.857S66.301,6.982,45.818,6.982z M68.129,53.938   c-0.273-0.447-0.994-0.717-2.076-1.254c-1.084-0.537-6.41-3.138-7.4-3.495c-0.993-0.358-1.717-0.538-2.438,0.537   c-0.721,1.076-2.797,3.495-3.43,4.212c-0.632,0.719-1.263,0.809-2.347,0.271c-1.082-0.537-4.571-1.673-8.708-5.333   c-3.219-2.848-5.393-6.364-6.025-7.441c-0.631-1.075-0.066-1.656,0.475-2.191c0.488-0.482,1.084-1.255,1.625-1.882   c0.543-0.628,0.723-1.075,1.082-1.793c0.363-0.717,0.182-1.344-0.09-1.883c-0.27-0.537-2.438-5.825-3.34-7.977   c-0.902-2.15-1.803-1.792-2.436-1.792c-0.631,0-1.354-0.09-2.076-0.09c-0.722,0-1.896,0.269-2.889,1.344   c-0.992,1.076-3.789,3.676-3.789,8.963c0,5.288,3.879,10.397,4.422,11.113c0.541,0.716,7.49,11.92,18.5,16.223   C58.2,65.771,58.2,64.336,60.186,64.156c1.984-0.179,6.406-2.599,7.312-5.107C68.398,56.537,68.398,54.386,68.129,53.938z'/>
                </svg>
            </div>
        </>

    );
};

export default ComplaintWidget;