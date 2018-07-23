document.addEventListener('DOMContentLoaded', () => {

    // // Selectable
    //     $( function() {
    //     $( "#selectable" ).selectable();
    //   } );

    // Connect to websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    // Change the color of the Channels headers when the page loads
    document.querySelector('#channelHeader').style.color = "#000000";
    document.querySelector('#typeinUsername').style.color = "#000000";

    // Animations
    const usernameAll = document.querySelector('#usernameAll');
          usernameAll.style.animationPlayState  = 'paused';

    const jumbotron = document.querySelector('.jumbotron');
          jumbotron.style.animationPlayState  = 'paused';

    const channeldiv = document.querySelector('#channeldiv');
          channeldiv.style.animationPlayState  = 'paused';

    const messageDiv = document.querySelector('#messageDiv');
          messageDiv.style.animationPlayState  = 'paused';


            // Connect socket
              socket.on('connect', () => {

                  // Submit button emitting an addChannel event
                  document.querySelector('#channelSubmit').onclick = () => {
                      const channelName = '# ' + document.querySelector('#newChannel').value;
                      socket.emit('addChannel', {'channelName': channelName});
                  };


              document.querySelector('#sendMessage').onclick = () => {
                  var username = document.createElement(username)
                  username = localStorage.getItem('username');
                  const message = document.querySelector('#newMessage').value;
                  console.log('adding a message********************')
                  socket.emit('addMessage', {'message': message, 'username': username});
              };

            // If channel already exists
                socket.on('usedChannelname', data => {
                    console.log('Used Channel NAME')
                    alert('Channel already exists!');
                });

            // Add channel to list if it is a unique name
            socket.on('channel_Addtolist', data => {
                console.log('channel_Addtolist')
                // // Create new item li for list
                const li = document.createElement('li');
                li.setAttribute("class", "list-group-item");
                li.innerHTML = document.querySelector('#newChannel').value;

                // Add new item to channel list
                document.querySelector('#channelList').append(li);
            });

    // By default, submit button is disabled
    document.querySelector('#submit').disabled = true;

    // Enable button only if there is text in the input field
    document.querySelector('#userform').onkeyup = () => {
        if (document.querySelector('#newUsername').value.length > 0)
            document.querySelector('#submit').disabled = false;
        else
            document.querySelector('#submit').disabled = true;
    };

    document.querySelector('#userform').onsubmit = () => {

        // Create new username for local storage
        var username = document.createElement('username')
        username = document.querySelector('#newUsername').value;

        // Set new item to local storage
        localStorage.setItem('username', username)

        // If submit button is clicked, fade the post away and the rest of the page in
        usernameAll.style.animationPlayState  = 'running';
        jumbotron.style.animationPlayState  = 'running';
        channeldiv.style.animationPlayState  = 'running';
        messageDiv.style.animationPlayState  = 'running';

        // Logged in as username header
        document.querySelector('#usernameHeader').innerHTML = 'Logged in as ' + username;

        // Stop form from submitting
        return false;
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

        document.querySelector('#messageForm').onsubmit = () => {

        // Clear input field and disable button again
        document.querySelector('#newMessage').value = '';

        // Stop form from submitting
        return false;
        };
    });
});