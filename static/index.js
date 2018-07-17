document.addEventListener('DOMContentLoaded', function() {

        document.querySelector('#channelHeader').style.color = this.value;


        // Change the color of the Channels header
        document.querySelector('#channelHeader').style.color = dataset.color

        // By default, submit button is disabled
        document.querySelector('#submit').disabled = true;

        // Enable button only if there is text in the input field
        document.querySelector('#userform').onkeyup = () => {
            if (document.querySelector('#newusername').value.length > 0)
                document.querySelector('#submit').disabled = false;
            else
                document.querySelector('#submit').disabled = true;
        };

        document.querySelector('#userform').onsubmit = () => {

            // Create new username for local storage
            const username = document.createElement('username')
            username = document.querySelector('#newusername').value;

            // Set new item to local storage
            localStorage.setItem('username', username)

            // Hide Button and Header
            document.querySelector('#typeinusername').style.display = "none";
            document.querySelector('#userform').style.display = "none";
            // Stop form from submitting
            return false;
        };
    }
                // By default, submit button is disabled
                document.querySelector('#submit').disabled = true;

                // Enable button only if there is text in the input field
                document.querySelector('#task').onkeyup = () => {
                    if (document.querySelector('#task').value.length > 0)
                        document.querySelector('#submit').disabled = false;
                    else
                        document.querySelector('#submit').disabled = true;
                };

                document.querySelector('#new-task').onsubmit = () => {

                    // Create new item for list
                    const li = document.createElement('li');
                    li.innerHTML = document.querySelector('#task').value;

                    // Add new item to task list
                    document.querySelector('#tasks').append(li);

                    // Clear input field and disable button again
                    document.querySelector('#task').value = '';
                    document.querySelector('#submit').disabled = true;

                    // Stop form from submitting
                    return false;





















    });