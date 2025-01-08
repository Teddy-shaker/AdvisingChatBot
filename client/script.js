function toggleMenu() {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('hidden');
  menu.classList.toggle('opacity-0'); // Adds a fade effect
  menu.classList.toggle('translate-y-[-20px]'); // Slide-down effect
}

const chatWindow = document.getElementById('chat-window');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

// Function to create message bubble
function createMessageBubble(message, isBot = false) {
  const messageBubble = document.createElement('div');
  messageBubble.classList.add('mb-4', isBot ? '' : 'text-right');
  messageBubble.innerHTML = `
    <div class="flex ${isBot ? '' : 'justify-end'}">
      <div class="${isBot ? 'bg-blue-100 text-blue-900' : 'bg-green-100 text-green-900'} 
        p-3 rounded-lg max-w-[70%] lg:max-w-[60%] text-sm md:text-base shadow">
        ${message}
      </div>
    </div>
  `;
  chatWindow.appendChild(messageBubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Function to handle message sending
function sendMessage() {
  const userMessage = chatInput.value.trim();
  if (userMessage) {
    createMessageBubble(userMessage);
    chatInput.value = '';
    chatInput.disabled = true; // Prevent additional input until bot responds

    // Simulate bot response
    setTimeout(() => {
      createMessageBubble("Thanks for your message! How else can I help?", true);
      chatInput.disabled = false;
      chatInput.focus();
    }, 1000);
  }
}

// Send message on button click or pressing Enter key
sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    sendMessage();
  }
});
