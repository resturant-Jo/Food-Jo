(function connect() {


const socket = io();

// const {io:socket} = require('../../src/server')

// pulling msgs 
socket.emit('get_all');

socket.on('order', payload=> {

  document.querySelector('button').onclick = () => {


    let dev=document.querySelector('.card__container')
    dev.innerHTML='';
  
    

    setTimeout(() => {
      dev.innerHTML+=`
      
      <div class="card">
       <div class="card__content">
        
        <h3 class="card__header">Got The Order</h3>
    <p class="card__info">
    New Order Has Been Received :${payload.payload.text}</br>
    for : ${payload.payload.text1}
    </p>
                                             
          </div>
   </div>` 
    },5000);
    
   
  
        socket.emit('received', payload)
   
    
  
    setTimeout(() => {
    //   console.log("Driver: picked up ");
    
    dev.innerHTML+=`   
    <div class="card">
       <div class="card__content">
       
        <h3 class="card__header">Order On The Way</h3>
    <p class="card__info">
      Im Delivering The Order To ${payload.payload.text3}
    </p>
                                             
          </div>
   </div>
    `
      socket.emit("in-transit", payload);
      

    }, 8000);


    setTimeout(() => {
    //   console.log("Driver: delivered", payload);
    dev.innerHTML+=`
    <div class="card">
       <div class="card__content">
       
        <h3 class="card__header">The Order Was Delivered</h3>
    <p class="card__info">
      Order Has Been Delivered Successfully :${payload.payload.text}
    </p>
                                             
          </div>
   </div>
    `
      socket.emit("delivered", payload);
    }, 12000);
  
  }
  })
  //////////////////////////
  
  //   let socket = io.connect()

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
        socket.emit('new_message', { message: message.value,username:username.value, type: 'student' })
        // let listItem = document.createElement('li')
        //     listItem.textContent = username.value + ': ' +  message.value
        //     listItem.classList.add('list-group-item')
        //     messageList.appendChild(listItem)
        message.value = ''
    })

    socket.on('receive_message', data => {
        // if (data.type == 'teacher') {
            console.log(data)
            let listItem = document.createElement('li')
            listItem.textContent = data.username + ': ' + data.message
            listItem.classList.add('list-group-item')
            messageList.appendChild(listItem)
        // }

    })




    let info = document.querySelector('.info')

    message.addEventListener('keypress', e => {
        socket.emit('typing', { text: message.value })
    })

    // socket.on('typing', data => {
        
    //     info.textContent = data.username + " : "+ data.text
    //     setTimeout(() => { info.textContent = '' }, 5000)
    // })



    // socket.on('typing', data => {
    //     socket.broadcast.emit('typing', { username: socket.username })
    // })

})()