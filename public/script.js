// Backend URL - Replace this with your Render backend URL
const BACKEND_URL = "https://your-backend-url.onrender.com/api/chat";

// Get references to DOM elements
const chatBox = document.getElementById('chat-box');
const sendButton = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');

// Function to send a message
async function sendMessage() {
    const message = userInput.value.trim();

    // Do nothing if the input is empty
    if (!message) return;

    // Display user's message in the chatbox
    appendMessage('You', message);

    // Clear the input field
    userInput.value = '';

    try {
        // Send the message to the backend and get the response
        const response = await axios.post(BACKEND_URL, { message });

        // Append ODIN's reply to the chatbox
        appendMessage('ODIN', response.data.reply);
    } catch (error) {
        console.error('Error contacting the backend:', error);
        appendMessage('ODIN', 'An error occurred. Please try again later.');
    }
}

// Function to append a message to the chatbox
function appendMessage(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message');
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(messageDiv);

    // Auto-scroll to the bottom of the chatbox
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Event listeners for user actions
sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});
