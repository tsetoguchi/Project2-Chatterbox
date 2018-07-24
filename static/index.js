document.addEventListener('DOMContentLoaded', () => {



        window.onload = GetAllProperties;
        function GetAllProperties() {

        // var li = document.querySelectorAll('#messageLi');
        $('#messageLi').remove();

        // Initialize new request
        const request = new XMLHttpRequest();
        currentChannel = localStorage.getItem('currentChannel');
        request.open('POST', '/messagesChannel');

        // Callback function for when request completes, in this case nothing
        request.onload = () => {

        // Extract JSON data from request
        const data = JSON.parse(request.responseText);

        document.querySelectorAll('#messageLi').forEach(li => {
            li.remove();

        });

        // Iterate through the individual messages and add them to the list messageBox
        for(var i = 0, size = (data.messages).length; i < size ; i++)
        {
        var li = document.createElement('li');
        li.setAttribute("class", "list-group-item");
        li.setAttribute("id", "messageLi");
        li.innerHTML = `${data.messages[i]}`;
        document.querySelector('#messageBox').append(li);

        }
    };
        // Add data to send with request
        const data = new FormData();
        data.append('currentChannel', currentChannel);
        // Stop form from submitting and send request
        request.send(data);
        return false;
        }

    // Animations
    const usernameAll = document.querySelector('#usernameAll');
          usernameAll.style.animationPlayState  = 'paused';
    const jumbotron = document.querySelector('.jumbotron');
          jumbotron.style.animationPlayState  = 'paused';
    const channeldiv = document.querySelector('#channeldiv');
          channeldiv.style.animationPlayState  = 'paused';
    const messageDiv = document.querySelector('#messageDiv');
          messageDiv.style.animationPlayState  = 'paused';

    // Initialize message header to current channel
    currentChannel = localStorage.getItem('currentChannel');
    document.querySelector('#messageHeader').innerHTML = currentChannel;
    // Time function
    function displayTime() {
    var str = "";

    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();

    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    str += hours + ":" + minutes + ":" + seconds + " ";
    if(hours > 11){
        str += "PM";
    } else {
        str += "AM";
    }
    return str;
    }

    // Connect to websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    // Change the color of the Channels headers when the page loads
    document.querySelector('#channelHeader').style.color = "#000000";
    document.querySelector('#typeinUsername').style.color = "#000000";

    // Connect socket
      socket.on('connect', () => {

          // Submit button emitting an addChannel event
          document.querySelector('#channelSubmit').onclick = () => {
              const channelName = '# ' + document.querySelector('#newChannel').value;
              socket.emit('addChannel', {'channelName': channelName});
          };

                // If channel already exists
                socket.on('usedChannelname', data => {
                    alert('Channel already exists!');
                });

            // Add channel to select if it is a unique name
        socket.on('channel_Addtolist', data => {
            // // Create new item option for select
            var option = document.createElement('option');
            option.setAttribute("class", "form-control form-control-sm");
            option.innerHTML = `${data.channelName}`;

            // Add new item to channel select
            document.querySelector('#channelSelect').append(option);
        });

            // Message Sockets

        // Add message to current channel
        document.querySelector('#sendMessage').onclick = () => {
            var username = document.createElement('username');
            username = localStorage.getItem('username');
            const message = `${displayTime()} ~ ${username}: ${document.querySelector('#newMessage').value}`;
            var currentChannel = document.createElement('currentChannel');
            currentChannel = localStorage.getItem('currentChannel');
            socket.emit('addMessage', {'message': message, 'username': username, 'currentChannel': currentChannel});
        };


        socket.on('postMessage', data => {
            var li = document.createElement('li');
            li.setAttribute("class", "list-group-item");
            li.setAttribute("id", "messageLi");
            li.innerHTML = `${data.message}`;
            document.querySelector('#messageBox').append(li);
        });

    });

    document.querySelector('#userform').onsubmit = () => {


        // Create new username for local storage
        var username = document.createElement('username');
        username = document.querySelector('#newUsername').value;

        // Set username to local storage
        localStorage.setItem('username', username);

        // Initialize currentChannel local storage key
        localStorage.setItem('currentChannel', '# general');

        // If submit button is clicked, fade the post away and the rest of the page in
        usernameAll.style.animationPlayState  = 'running';
        jumbotron.style.animationPlayState  = 'running';
        channeldiv.style.animationPlayState  = 'running';
        messageDiv.style.animationPlayState  = 'running';

        // Logged in as username header
        document.querySelector('#usernameHeader').innerHTML = `Logged in as ${username}`;

        // Stop form from submitting
        return false;

    };


    // By default, submit button is disabled
    document.querySelector('#submit').disabled = true;

    // Enable button only if there is text in the input field
    document.querySelector('#userform').onkeyup = () => {
        if (document.querySelector('#newUsername').value.length > 0)
            document.querySelector('#submit').disabled = false;
        else
            document.querySelector('#submit').disabled = true;
    };

        // By default, submit button is disabled
        document.querySelector('#channelSubmit').disabled = true;

        // Enable button only if there is text in the input field
        document.querySelector('#newChannel').onkeyup = () => {
            if (document.querySelector('#newChannel').value.length > 0)
                document.querySelector('#channelSubmit').disabled = false;
            else
                document.querySelector('#channelSubmit').disabled = true;
        };

        document.querySelector('#channelAdd').onsubmit = () => {

        // Clear input field and disable button again
        document.querySelector('#newChannel').value = '';
        document.querySelector('#channelSubmit').disabled = true;

        // Stop form from submitting
        return false;
    };

        // Channel select function
    document.querySelector('#channelSelect').onchange = function() {

        var currentChannel = document.createElement('currentChannel');
        currentChannel = this.options[this.selectedIndex].innerHTML;
        localStorage.setItem('currentChannel', currentChannel);
        document.querySelector('#messageHeader').innerHTML = currentChannel;

        // Initialize new request
        const request = new XMLHttpRequest();
        currentChannel = localStorage.getItem('currentChannel');
        request.open('POST', '/messagesChannel');

        // Callback function for when request completes, in this case nothing
        request.onload = () => {

        // Extract JSON data from request
        const data = JSON.parse(request.responseText);

        document.querySelectorAll('#messageLi').forEach(li => {
            li.remove();
        });

        // Iterate through the individual messages and add them to the list messageBox
        for(var i = 0, size = (data.messages).length; i < size ; i++)
        {
        var li = document.createElement('li');
        li.setAttribute("class", "list-group-item");
        li.setAttribute("id", "messageLi");
        li.innerHTML = `${data.messages[i]}`;
        document.querySelector('#messageBox').append(li);

        }
    };
        // Add data to send with request
        const data = new FormData();
        data.append('currentChannel', currentChannel);
        // Stop form from submitting and send request
        request.send(data);
        return false;

    };
        // Reset the message form input and prevent it from submitting
        document.querySelector('#messageForm').onsubmit = () => {

            document.querySelector('#newMessage').value = '';

            return false;
        };

});