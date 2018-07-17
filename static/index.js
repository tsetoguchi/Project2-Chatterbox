document.addEventListener('DOMContentLoaded', () => {

        // Change the color of the Channels header when dropdown changes
        document.querySelectorAll('#channelHeader, #typeinUsername').style.color = "#c6c6c6";

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
            const username = document.createElement('username')
            username = document.querySelector('#newUsername').value;

            // Set new item to local storage
            localStorage.setItem('username', username)

            // Hide Button and Header
            document.querySelector('#typeinUsername').style.display = "none";
            document.querySelector('#userform').style.display = "none";
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

                    // Create new item for list
                    const li = document.createElement('li');
                    li.innerHTML = document.querySelector('#newChannel').value;

                    // Add new item to task list
                    document.querySelector('#channelList').append(li);

                    // Clear input field and disable button again
                    document.querySelector('#newChannel').value = '';
                    document.querySelector('#channelSubmit').disabled = true;

                    // Stop form from submitting
                    return false;
                };
});