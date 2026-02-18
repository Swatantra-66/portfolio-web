import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import logoImg from "../assets/chatbot-logo.png";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "I am **AR1SEE**, Swatantra's Portfolio Assistant. \n\nAsk me about his **Projects**, **Skills**, **Tools**, **Experience** or view his **Resume**.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    setMessages((prev) => [...prev, { role: "bot", text: "" }]);

    try {
      const response = await fetch("http://localhost:8080/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let botReply = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data:")) {
            const data = line.substring(5);

            if (data.trim() === "STREAM_END") break;

            botReply += data + "\n";

            setMessages((prev) => {
              const newMessages = [...prev];
              if (newMessages.length > 0) {
                newMessages[newMessages.length - 1] = {
                  role: "bot",
                  text: botReply,
                };
              }
              return newMessages;
            });
          }
        }
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "I'm having trouble connecting right now." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 p-1 rounded-full shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-all duration-300 hover:scale-110 z-50 group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full animate-spin-slow blur-md opacity-70 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-500 p-4 rounded-full border border-white/20 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 text-white"
            >
              <path
                fillRule="evenodd"
                d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813a3.75 3.75 0 002.576-2.576l.813-2.846A.75.75 0 019 4.5zM6 20.25a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813a3.75 3.75 0 002.576-2.576l.813-2.846A.75.75 0 016 20.25z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </button>
      )}

      {isOpen && (
        <div className="w-80 sm:w-96 h-[500px] bg-gray-900/90 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
          <div className="bg-gray-700 backdrop-blur-md p-4 border-b border-white/10 flex justify-between items-center sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 p-[2px]">
                  <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                    <img
                      src={logoImg}
                      alt="AR1SEE Logo"
                      className="w-full h-full object-cover scale-110"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 text-sm tracking-wide">
                  AR1SEE
                </span>
                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                  AI Assistant
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-all duration-200 hover:bg-white/10 p-2 rounded-full"
            >
              ✕
            </button>
          </div>
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-tr-none"
                      : "bg-gray-800 text-gray-100 border border-gray-700 rounded-tl-none"
                  }`}
                >
                  {index === 0 && msg.role === "bot" && (
                    <div className="mb-4 flex items-center gap-3">
                      <div className="relative flex items-center justify-center">
                        <div className="absolute inset-0 bg-blue-500 blur-[10px] opacity-40"></div>

                        <svg
                          className="w-7 h-7 relative z-10"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
                            fill="url(#gemini-gradient-bright)"
                          />
                          <defs>
                            <linearGradient
                              id="gemini-gradient-bright"
                              x1="2"
                              y1="2"
                              x2="22"
                              y2="22"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stopColor="#60A5FA" />
                              <stop offset="0.5" stopColor="#E879F9" />{" "}
                              <stop offset="1" stopColor="#F472B6" />{" "}
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>

                      <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 text-xs tracking-[0.2em] uppercase shadow-sm">
                        System Online
                      </span>
                    </div>
                  )}
                  <ReactMarkdown
                    components={{
                      strong: ({ node, ...props }) => (
                        <span className="font-bold text-blue-300" {...props} />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul
                          className="list-disc ml-4 space-y-1 mt-1"
                          {...props}
                        />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="marker:text-blue-500" {...props} />
                      ),
                      p: ({ node, ...props }) => (
                        <p className="mb-2 last:mb-0" {...props} />
                      ),
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 text-gray-400 p-3 rounded-2xl rounded-tl-none text-xs italic animate-pulse">
                  AR1SEE is thinking...
                </div>
              </div>
            )}
          </div>
          <div className="p-4 border-t border-gray-700 bg-gray-900/50">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 bg-gray-800 border border-gray-700 text-white text-sm rounded-lg p-2 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button
                onClick={handleSend}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-2.5 rounded-lg transition-all flex items-center justify-center shrink-0 shadow-md hover:shadow-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
