import { useState } from 'react';

function cleanupMessage(message) {
  return message.replace(/\s?【.*】/g, '');
}

function ChatBox() {
  const [message, setMessage] = useState('Enter a question, for example "How to apply for Solar Panel support in Munich?"');
  const [thread, setThread] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const BACKEND = 'https://ambitious-ocean-e8e0b0585be64bcdab041e2217d025b5.azurewebsites.net';

  const sendMessage = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(BACKEND + '/api/v1/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
        credentials: 'include',
      });
      const data = await response.json();
      setThread(data.data.reverse());
      setMessage('Enter your next message here');
    } catch (error) {
      console.error('Error sending message:', error);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex justify-center border border-[color:var(--border-colors-foundations-border-inset,#D8DEE4)] shadow-sm bg-white flex flex-col p-3 rounded-lg border-solid items-end"
    >
      <div
        className="self-stretch text-gray-500 text-sm font-bold leading-5 max-md:max-w-full"
      >
        AI Assistant
      </div>
      <div className="chat-area flex flex-col w-full">
        {thread.map((msg) => (
          <div>
            <b>{msg.role === 'user' ? 'User' : 'Assistant'}</b><br />
            {cleanupMessage(msg.content[0].text.value)}
          </div>
        ))}

        <input
          className="flex grow p-2 focus:outline-none border rounded-lg text-gray-500"
          type="text"
          value={message}
          onClick={() => setMessage('')}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          disabled={isLoading}
        />
      </div>
      <button onClick={sendMessage} disabled={isLoading} className="text-neutral-900 text-sm font-bold whitespace-nowrap justify-center items-stretch border border-[color:var(--border-colors-foundations-border-inset,#D8DEE4)] shadow-sm aspect-[1.8888888888888888] mt-4 px-4 rounded-lg border-solid"
      >{!isLoading ? "Send" : "Loading..."}</button>
    </div>
  );
}

export default ChatBox;
