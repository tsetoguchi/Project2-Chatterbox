document.addEventListener('DOMContentLoaded', () => {
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

            // When connected, configure username form
              socket.on('connect', () => {

                  // Submit button emitting an addChannel event
                  document.querySelector('#channelSubmit').onclick = () => {
                      const channelName = document.querySelector('#newChannel').value;
                      console.log('abvccccccc')
                      socket.emit('addChannel', {'channelName': channelName});
                  };
              });

            // DEBUG addChannel
            socket.on('channel_dict', data => {
                console.log('abvcasdasdasd')
                console.log(data.channel_dict)
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

        document.querySelector('#usernameHeader').innerHTML = 'Logged in as ' + username;


        // // Hide Button and Header
        // document.querySelector('#typeinUsername').style.display = "none";
        // document.querySelector('#usernameForm').style.display = "none";

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

        // Create new item for dropdown
        const a = document.createElement('a');
        a.setAttribute("class", "dropdown-item")
        a.setAttribute("href", "www.google.com")
        a.innerHTML = document.querySelector('#newChannel').value;

        // Add new item to channel list
        document.querySelector('#channelMenu').append(a);

        // Clear input field and disable button again
        document.querySelector('#newChannel').value = '';
        document.querySelector('#channelSubmit').disabled = true;

        // Stop form from submitting
        return false;
    };
});