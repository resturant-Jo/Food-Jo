'use strict'

const socket = io('ws://localhost:8080/food');

// const id = Math.floor(Math.random() * 2515412154202)
const card1=document.getElementById("card1");
const chat = document.querySelector(".chat-form");
const Input = document.querySelector(".chat-input");
const chatWindow = document.querySelector(".chat-window");

const card2=document.getElementById("card2");
const card3=document.getElementById("card3");
const card4=document.getElementById("card4");
card1.style.visibility='hidden';
card2.style.visibility='hidden';
card3.style.visibility='hidden';
card4.style.visibility='hidden';
///////////////////////////////////
// chat.addEventListener("submit", (event) => {
//     event.preventDefault();
//     socket.emit("chat", Input.value);
//     Input.value = "";
//     socket.on("chat", (mess) => {
//       console.log("From server: ", mess);
//     });
    // socket.on("videoChat", (vidMessage) => {
  //   //   console.log("From server: ", vidMessage);
  //   // });
  //   const chatWindow = document.querySelector(".chat-window");
  //   const renderMessage = (mess) => {
  //     const div = document.createElement("div");
  //     div.classList.add("render-message");
  //     div.innerText = mess;
  //     chatWindow.appendChild(div);
  //   };
  //   socket.on("chat", (mess) => {
  //     renderMessage(mess);
  //   });
 
  // });
//////////////////////////////////
socket.on('message', text => {
   let p=card1.childNodes[1].childNodes;
    console.log(p[5].innerHTML=` Meal Type: ${text.text  } <br> To: ${text.text1  }  <br> Location: ${text.text3  } <br>  Phone: ${text.text2  }  `);
    p[5].style.color="darkkhaki"
    console.log(text)
  
    card1.style.visibility="visible"
    
  

    setTimeout(() => {
        card2.style.visibility="visible"
        let p2=card2.childNodes[1].childNodes[3];
        console.log(p2.innerHTML="The Restaurant Preparing Your Order Now");
        p2.style.color="darkkhaki"
       
    },3000);
    


    socket.on('trinzet',payload=>{
        card3.style.visibility="visible"
        let p3=card3.childNodes[1].childNodes[3];
        console.log(p3.innerHTML="Your Order On The Way");
        p3.style.color="darkkhaki"
      
    })

    socket.on('deliveredV',delivered)
  function delivered(payload){
    card4.style.visibility="visible"
    let p4=card4.childNodes[1].childNodes[3];
    console.log(p4.innerHTML="Thank You For Ordering From FOOD JO");
    p4.style.color="darkkhaki"
   
      
  }

});

document.getElementById('but0').onclick = () => {

    const text  = document.getElementById('i').value;
    const text1 = document.getElementById('n').value;
    const text2 = document.getElementById('p').value;
    const text3 = document.getElementById('u').value;
    const text4 = document.getElementById('t').value;
   
const obj ={
    text:text,
    text1:text1,
    text2:text2,
    text3:text3,
    text4:text4,
   
}
    socket.emit('message', obj)
    alert('Your Order Have Been Reserved')
}
//////////////////////////////////////////////////
(function connect() {
  

  let username = document.querySelector('#username')
  let usernameBtn = document.querySelector('#usernameBtn')
  let curUsername = document.querySelector('.card-header')

  usernameBtn.addEventListener('click', e => {
      console.log(username.value)
      socket.emit('change_username', { username: username.value })
      curUsername.textContent = username.value
      username.value = ''
  })


  let message = document.querySelector('#message')
  let messageBtn = document.querySelector('#messageBtn')
  let messageList = document.querySelector('#message-list')

  messageBtn.addEventListener('click', e => {
      console.log(message.value)
      socket.emit('new_message', { message: message.value, type:"teacher" })
      message.value = '';
      
  });


  socket.on('receive_message', data => {
      
          console.log(data)
          let listItem = document.createElement('li')
          listItem.textContent =  data.username + ': ' + data.message
          listItem.classList.add('list-group-item')
          messageList.appendChild(listItem);
          
          
          socket.broadcast.to('ID').on( 'receive_message', {somedata : somedata_server} );

  })




  let info = document.querySelector('.info')

  message.addEventListener('keypress', e => {
      socket.emit('typing', { text: message.value })
  })

  socket.on('typing', data => {
      info.textContent = data.username + " : " + data.text
      
      setTimeout(() => { info.textContent = '' }, 5000)
  })



  socket.on('typing', data => {
      socket.broadcast.emit('typing', { username: socket.username })
  })

})()