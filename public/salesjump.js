const icon = document.getElementsByClassName('salesjump');
const id = icon[0].id;

const host = 'https://squarespace.onrender.com';
const initialRequest = new XMLHttpRequest();
initialRequest.open('POST', host + 'setup/', true);
initialRequest.setRequestHeader(
    'Content-type',
    'application/json; charset=utf-8'
);
initialRequest.send(JSON.stringify({id}));
initialRequest.onload = () => {
    const response = JSON.parse(initialRequest.response);
    icon[0].innerHTML = `
    <div id="chat" style="position:fixed;
        opacity: 0;
        transition: opacity 0.5s linear;
        width:350px;
        height:280px;
        right:2%;
        bottom: 200px;
        background-color:${response.headerColor};
        border-radius:10px;
        text-align:center;
        z-index: 100;
        box-shadow: 2px 2px 3px #999;">
        <div style="
          width:350px;
          height:90px;
          margin-top: 30px;">
          <div style="margin-left: 25px; float:left;width: 10%; vertical-align: 3px;">
              <img src=${response.profile_pic} 
                width="60px" height="60px" style="margin-top: 1px; border-radius: 30px;">
              </img>
          </div>
          <div style="float:right;width:80%; vertical-align: -7px;">
              <h1 style=" 
                margin-left: 40px;
                margin-top: 0px;
                margin-bottom: 15px;
                font-size : 22px;
                text-align:left;
                color: ${response.headerTextColor}">
                ${response.header}
              </h1>
              <p style="
                margin-top: -10px;
                margin-left: 40px;
                font-size : 15px;
                text-align:left;
                color: ${response.headerTextColor}">
                ${response.caption}
              <p />
          </div>
        </div>
        <div style="
          width:350px;
          height: 150px;
          background-image: url('https://firebasestorage.googleapis.com/v0/b/squarespace-chat.appspot.com/o/images%2Fwhatsapp.png?alt=media&token=dca2a6ca-0759-47c1-b828-86424004a2e8')">
          <div style="
              width:150px;
              height:100px;
              margin-left: 10px;
              margin-top: 30px;
              float:left;
              border-radius: 10px;
              background-color: #FFF">
              <h4 style="
                font-size : 15px;
                margin-top: 10px;
                margin-left: 10px;
                margin-right: 10px;
                text-align:left;
                color: #000">
                ${response.message}
              </h4>
          </div>
        </div>
        <div style="
          width:350px;
          height: 90px;
          background-color: #FFF;
          box-shadow: 2px 2px 3px #999;
          display: flex;
          justify-content: center;
          border-radius: 0px 0px 10px 10px;">
          <a style="text-decoration: none; width: 90%">
              <div
                id="start-chat" 
                style="
                height: 50px;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 15px;
                padding-top: 1px;
                border-radius: 25px;
                background-color: ${response.buttonColor};">
                <h4 style="
                    font-size : 20px;
                    color: ${response.buttonTextColor}">
                    Start Chat
                </h4>
              </div>
          </a>
        </div>
    </div>
    <div id="action" style="position:fixed;
        width:60px;
        height:60px;
        bottom:40px;
        right:2%;
        background-color:${response.floatingButtonColor};
        border-radius:50px;
        text-align:center;
        z-index: 100;
        box-shadow: 2px 2px 3px #999;">
        <svg style="margin-top:13px" viewBox="0 0 90 90" fill="${
    response.floatingButtonTextColor
}" width="32" height="32">
          <path d="M90,43.841c0,24.213-19.779,43.841-44.182,43.841c-7.747,0-15.025-1.98-21.357-5.455L0,90l7.975-23.522   c-4.023-6.606-6.34-14.354-6.34-22.637C1.635,19.628,21.416,0,45.818,0C70.223,0,90,19.628,90,43.841z M45.818,6.982   c-20.484,0-37.146,16.535-37.146,36.859c0,8.065,2.629,15.534,7.076,21.61L11.107,79.14l14.275-4.537   c5.865,3.851,12.891,6.097,20.437,6.097c20.481,0,37.146-16.533,37.146-36.857S66.301,6.982,45.818,6.982z M68.129,53.938   c-0.273-0.447-0.994-0.717-2.076-1.254c-1.084-0.537-6.41-3.138-7.4-3.495c-0.993-0.358-1.717-0.538-2.438,0.537   c-0.721,1.076-2.797,3.495-3.43,4.212c-0.632,0.719-1.263,0.809-2.347,0.271c-1.082-0.537-4.571-1.673-8.708-5.333   c-3.219-2.848-5.393-6.364-6.025-7.441c-0.631-1.075-0.066-1.656,0.475-2.191c0.488-0.482,1.084-1.255,1.625-1.882   c0.543-0.628,0.723-1.075,1.082-1.793c0.363-0.717,0.182-1.344-0.09-1.883c-0.27-0.537-2.438-5.825-3.34-7.977   c-0.902-2.15-1.803-1.792-2.436-1.792c-0.631,0-1.354-0.09-2.076-0.09c-0.722,0-1.896,0.269-2.889,1.344   c-0.992,1.076-3.789,3.676-3.789,8.963c0,5.288,3.879,10.397,4.422,11.113c0.541,0.716,7.49,11.92,18.5,16.223   C58.2,65.771,58.2,64.336,60.186,64.156c1.984-0.179,6.406-2.599,7.312-5.107C68.398,56.537,68.398,54.386,68.129,53.938z">
          </path>
        </svg>
    </div>
    `;
    document.getElementById('action').addEventListener('click', () => {
        const chat = document.getElementById('chat');
        if (parseFloat(chat.style.opacity) === 0) {
            chat.style.opacity = 1;
        } else {
            chat.style.opacity = 0;
        }
    });
    document.getElementById('start-chat').addEventListener('click', () => {
        window.open(`https://wa.me/${response.contact}`);
    });
};
