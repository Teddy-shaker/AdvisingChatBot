function toggleMenu() {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('hidden');
  menu.classList.toggle('opacity-0');
  menu.classList.toggle('translate-y-[-20px]');
}

const chatWindow = document.getElementById('chat-window');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

async function fetchBotResponse(userMessage) {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Bot response received:", data.reply);
    return data.reply;
  } catch (error) {
    console.error('Error fetching bot response:', error);
    return "Sorry, there was an error processing your request.";
  }
}

function createMessageBubble(message, isBot = false) {
  if (!message) {
    console.error("Error: Message is empty or undefined.");
    return;
  }

  const sanitizedMessage = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const messageBubble = document.createElement('div');

  // Add only valid class names
  messageBubble.classList.add('mb-4');
  if (!isBot) {
    messageBubble.classList.add('text-right');
  }

  // Choose valid classes for the bubble
  const bubbleClasses = isBot
    ? 'bg-blue-100 text-blue-900'
    : 'bg-green-100 text-green-900';

  // Ensure flex class is always valid
  const flexClasses = isBot ? 'flex' : 'flex justify-end';

  messageBubble.innerHTML = `
    <div class="${flexClasses}">
      <div class="${bubbleClasses} 
        p-3 rounded-lg max-w-[70%] lg:max-w-[60%] text-sm md:text-base shadow">
        ${sanitizedMessage}
      </div>
    </div>
  `;

  chatWindow.appendChild(messageBubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}


async function sendMessage() {
  const userMessage = chatInput.value.trim();
  if (!userMessage) {
    chatInput.classList.add('border-red-500');
    setTimeout(() => chatInput.classList.remove('border-red-500'), 1500);
    return;
  }

  createMessageBubble(userMessage);
  chatInput.value = '';
  chatInput.disabled = true;

  try {
    createMessageBubble("Typing...", true);
    const botMessage = await fetchBotResponse(userMessage);
    createMessageBubble(botMessage, true);
  } catch (error) {
    createMessageBubble("Sorry, there was an error processing your request.", true);
  } finally {
    chatInput.disabled = false;
    chatInput.focus();
  }
}

sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    sendMessage();
  }
});
