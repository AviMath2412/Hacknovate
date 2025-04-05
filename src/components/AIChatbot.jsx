import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Send, X, MessageSquare } from 'lucide-react';

const AIChatbot = ({ darkMode, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
    };
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage = { text: inputText, isUser: true, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchGeminiResponse(inputText);
      setMessages(prev => [...prev, { text: response, isUser: false, timestamp: new Date() }]);
    } catch (error) {
      setError("Sorry, I encountered an error. Please try again.");
      setMessages(prev => [...prev, { 
        text: "Sorry, I encountered an error. Please try again.", 
        isUser: false, 
        timestamp: new Date() 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGeminiResponse = async (input) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const lower = input.toLowerCase();

      if (lower.includes("license")) return "You can renew your license online or schedule an appointment.";
      if (lower.includes("tax")) return "Property and utility taxes can be paid via our CivicConnect portal.";
      if (lower.includes("permit")) return "Permits depend on your need: event, business, or building?";
      if (lower.includes("support")) return "Contact support at help@civicconnect.gov or 1-800-CIVIC-HELP.";

      return "I'm CivicConnect, your assistant for all public services! How can I help today?";
    } catch (error) {
      console.error('Error in fetchGeminiResponse:', error);
      throw error;
    }
  };

  const toggleVoiceRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      setError('Voice recognition is not supported in your browser. Please use Chrome or Edge.');
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
      setIsListening(false);
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInputText(transcript);
      inputRef.current?.focus();
    };
    recognition.onerror = (e) => {
      setError('Voice recognition error. Please try again.');
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognition.start();
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Open chat"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      )}

      {isOpen && (
        <div 
          className={`fixed bottom-6 right-6 w-96 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'} z-50`}
          role="dialog"
          aria-label="Chat window"
        >
          <div className={`p-4 ${darkMode ? 'bg-gray-700' : 'bg-blue-600'} rounded-t-lg flex justify-between items-center`}>
            <h3 className="font-semibold text-white">CivicConnect AI Assistant</h3>
            <div className="flex space-x-2">
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-1 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Close chat"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {error && (
              <div className="text-red-500 text-sm mb-2">{error}</div>
            )}

            {messages.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p className="mb-2">👋 Welcome to CivicConnect!</p>
                <p>How can I assist you today?</p>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.isUser ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${m.isUser ? 'bg-blue-600 text-white' : darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-900'}`}
                  role={m.isUser ? "user message" : "assistant message"}
                >
                  <p>{m.text}</p>
                  <p className="text-xs mt-1 text-right">{m.timestamp.toLocaleTimeString()}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1 animate-pulse">
                    <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                    <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                    <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Type your message"
              />
              <button 
                onClick={toggleVoiceRecognition} 
                className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label={isListening ? "Stop listening" : "Start voice input"}
              >
                {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </button>
              <button
                onClick={handleSend}
                disabled={!inputText.trim() || isLoading}
                className="p-2 rounded-lg bg-blue-600 text-white disabled:bg-blue-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Send message"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot; 