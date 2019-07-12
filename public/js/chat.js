var socket=io();

function scrollToBottom (){
    //Selecting any element
    var messages=jQuery('#messages');
    var newMessage=messages.children('li:last-child')
    //Heights
    var clientHeight=messages.prop('clientHeight');
    var scrollHeight=messages.prop('scrollHeight');
    var scrollTop=messages.prop('scrollTop');
    var newMessageHeight=newMessage.innerHeight();
    var lastMessageHeight=newMessage.prev().innerHeight();

    if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight>=scrollHeight){
        messages.scrollTop(scrollHeight)
    }
    
}

socket.on('updateUsersList',function(users){
    var ol=jQuery('<ol></ol>');
    users.forEach(function(user){
        ol.append(jQuery('<li></li>').text(user));
    });
    jQuery('#users').html(ol)
})

socket.on('connect',function(){
    console.log('Connected to server')
    
    var params=jQuery.deparam(window.location.search)

    socket.emit('join',params,function(err){
        if(err){
            alert(err);
            window.location.href='/';
        }
        else{
            console.log('no error')
        }
    })
    
})
socket.on('disconnect',function(){
    console.log('Disconnected from server')
})

socket.on('newMessage',function(message){
    var formattedTime=moment(message.createdAt).format('h:mm a')
    var template=jQuery('#message-template').html();
    var html=Mustache.render(template,{
        from:message.from,
        text:message.text,
        createdAt:formattedTime
    })
    jQuery('#messages').append(html);
    scrollToBottom();
    // var formattedTime=moment(message.createdAt).format('h:mm a')
    // var li=jQuery('<li></li>');
    // li.text(`${message.from} ${formattedTime}:${message.text}`)
    // jQuery('#messages').append(li)
})

socket.on('newLocation',function(message){
    var formattedTime=moment(message.createdAt).format('h:mm a')
    var template=jQuery('#location-template').html();
    var html=Mustache.render(template,{
        from:message.from,
        url:message.url,
        createdAt:formattedTime
    })
    jQuery('#messages').append(html);
    scrollToBottom()
    // var li=jQuery('<li></li>');
    // var a=jQuery('<a target="_blank">My current location</a>');
    // li.text(`${message.from}: ${formattedTime} `);
    // a.attr('href',message.url);
    // li.append(a);
    // jQuery('#messages').append(li);
})

jQuery('#message-form').on('submit',function(event){
    event.preventDefault();
    socket.emit('createMessage',{
        text:jQuery('[name=message]').val()
    },function(){
        jQuery('[name=message]').val('')
    })
})

var locationButton=jQuery('#locationButton');

locationButton.on('click',function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supperted by your browser');
    }
    locationButton.attr('disabled','disabled').text('Sending Location...');
    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('SEND LOCATION');
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        })
    },function(err){
        locationButton.removeAttr('disabled').text('SEND LOCATION');
        alert('Cannot get geolocation',err)
    })
})