import React, { useState, useEffect, useRef } from 'react';

const AlumniMessages = () => {
  // State management
  const [activeCategory, setActiveCategory] = useState('alumni');
  const [currentChat, setCurrentChat] = useState({
    category: 'alumni',
    name: 'Robert Wilson',
    initials: 'RW'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);
  
  // Unread messages state - tracks which chats have unread messages
  const [unreadMessages, setUnreadMessages] = useState({
    'alumni-Robert Wilson': true,
    'alumni-Lisa Chen': true,
    'alumni-Mark Thompson': true,
    'students-Emily Smith': true,
    'students-Alex Rodriguez': true,
    'mentors-Sarah Johnson': true,
    'mentors-Michael Chen': true,
    'mentees-John Davis': true
  });
  
  // Calculate notification counts based on unread messages
  const notificationCounts = {
    alumni: Object.keys(unreadMessages).filter(key => 
      key.startsWith('alumni-') && unreadMessages[key]
    ).length,
    students: Object.keys(unreadMessages).filter(key => 
      key.startsWith('students-') && unreadMessages[key]
    ).length,
    mentors: Object.keys(unreadMessages).filter(key => 
      key.startsWith('mentors-') && unreadMessages[key]
    ).length,
    mentees: Object.keys(unreadMessages).filter(key => 
      key.startsWith('mentees-') && unreadMessages[key]
    ).length
  };
  
  // Sample chat data
  const [chatData, setChatData] = useState({
    'alumni-Robert Wilson': [
      { id: 1, type: 'received', message: "Hey! How's the new job going? 🚀", time: '10:30 AM' },
      { id: 2, type: 'sent', message: "It's going great! Really enjoying the team and the projects. Thanks for asking! 😊", time: '10:32 AM' },
      { id: 3, type: 'received', message: "That's awesome! By the way, there's a networking event next week. Want me to send you the details? 📅", time: '10:35 AM' },
      { id: 4, type: 'sent', message: "Yes, please! That would be great. 🙌", time: '10:36 AM' },
      { id: 5, type: 'received', message: "Thanks for the networking event info! 🎉", time: 'Just now' }
    ],
    'alumni-Lisa Chen': [
      { id: 1, type: 'received', message: "How was your weekend? 🌟", time: '2:15 PM' },
      { id: 2, type: 'sent', message: "Great! Went hiking with some friends. How about you? 🥾", time: '2:18 PM' },
      { id: 3, type: 'received', message: "Let's catch up soon! ☕", time: '1h ago' }
    ],
    'alumni-Mark Thompson': [
      { id: 1, type: 'received', message: "Great presentation today! 👏", time: '3h ago' },
      { id: 2, type: 'sent', message: "Thanks! I was nervous but it went well. 😅", time: '3h ago' }
    ],
    'students-Emily Smith': [
      { id: 1, type: 'received', message: "Thank you for accepting my request! 🙏", time: '30m ago' },
      { id: 2, type: 'sent', message: "You're welcome! Happy to help with your career journey. 🚀", time: '25m ago' }
    ],
    'students-Alex Rodriguez': [
      { id: 1, type: 'received', message: "Can we schedule a call this week? 📞", time: '2h ago' },
      { id: 2, type: 'sent', message: "Sure! How about Thursday at 3 PM? 📅", time: '1h ago' }
    ],
    'mentors-Sarah Johnson': [
      { id: 1, type: 'received', message: "Here are the resources I mentioned in our last session: 📚", time: '1h ago' },
      { id: 2, type: 'received', message: "1. Product Management Guide\n2. Leadership Framework\n3. Career Development Plan 📋", time: '1h ago' },
      { id: 3, type: 'sent', message: "Thank you so much! These look really helpful! 🙌", time: '45m ago' }
    ],
    'mentors-Michael Chen': [
      { id: 1, type: 'received', message: "Looking forward to our next session 🚀", time: '4h ago' },
      { id: 2, type: 'sent', message: "Me too! I have some questions about portfolio diversification. 📈", time: '3h ago' }
    ],
    'mentees-John Davis': [
      { id: 1, type: 'received', message: "The interview went great, thanks! 🎉", time: '45m ago' },
      { id: 2, type: 'sent', message: "That's fantastic! Tell me all about it in our next session. 😊", time: '40m ago' }
    ]
  });
  
  // Avatar color schemes
  const avatarColors = {
    'Robert Wilson': 'from-blue-500 to-blue-600',
    'Lisa Chen': 'from-purple-500 to-pink-500',
    'Mark Thompson': 'from-green-500 to-teal-500',
    'Emily Smith': 'from-indigo-500 to-purple-500',
    'Alex Rodriguez': 'from-orange-500 to-red-500',
    'Sarah Johnson': 'from-blue-600 to-purple-600',
    'Michael Chen': 'from-green-600 to-teal-600',
    'John Davis': 'from-orange-600 to-red-600'
  };
  
  // Contact data
  const contacts = {
    alumni: [
      { name: 'Robert Wilson', initials: 'RW', lastMessage: 'Thanks for the networking event info! 🎉', time: '2m', online: true },
      { name: 'Lisa Chen', initials: 'LC', lastMessage: "Let's catch up soon! ☕", time: '1h', online: true },
      { name: 'Mark Thompson', initials: 'MT', lastMessage: 'Great presentation today! 👏', time: '3h', online: false }
    ],
    students: [
      { name: 'Emily Smith', initials: 'ES', lastMessage: 'Thank you for accepting my request! 🙏', time: '30m', online: true },
      { name: 'Alex Rodriguez', initials: 'AR', lastMessage: 'Can we schedule a call this week? 📞', time: '2h', online: true }
    ],
    mentors: [
      { name: 'Sarah Johnson', initials: 'SJ', lastMessage: 'Here are the resources I mentioned... 📚', time: '1h', online: true },
      { name: 'Michael Chen', initials: 'MC', lastMessage: 'Looking forward to our next session 🚀', time: '4h', online: false }
    ],
    mentees: [
      { name: 'John Davis', initials: 'JD', lastMessage: 'The interview went great, thanks! 🎉', time: '45m', online: true }
    ]
  };
  
  // Category labels mapping
  const categoryLabels = {
    alumni: 'Alumni',
    students: 'Students',
    mentors: 'Mentors',
    mentees: 'Mentees'
  };
  
  // Category colors mapping
  const categoryColors = {
    alumni: 'text-blue-600 bg-blue-100',
    students: 'text-green-600 bg-green-100',
    mentors: 'text-purple-600 bg-purple-100',
    mentees: 'text-orange-600 bg-orange-100'
  };
  
  // Ref for scrolling to bottom of messages
  const messagesEndRef = useRef(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [chatData, currentChat]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    // Load first contact in the category
    if (contacts[category].length > 0) {
      const firstContact = contacts[category][0];
      handleOpenChat(category, firstContact.name, firstContact.initials);
    }
  };
  
  // Handle opening a chat
  const handleOpenChat = (category, name, initials) => {
    setCurrentChat({ category, name, initials });
    
    // Mark as read if it was unread
    const chatKey = `${category}-${name}`;
    if (unreadMessages[chatKey]) {
      setUnreadMessages(prev => ({
        ...prev,
        [chatKey]: false
      }));
    }
  };
  
  // Handle sending a message
  const handleSendMessage = () => {
    if (messageInput.trim() === '') return;
    
    const chatKey = `${currentChat.category}-${currentChat.name}`;
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    // Add message to chat data
    const newMessage = {
      id: Date.now(),
      type: 'sent',
      message: messageInput,
      time: timeString
    };
    
    setChatData(prev => ({
      ...prev,
      [chatKey]: [...(prev[chatKey] || []), newMessage]
    }));
    
    // Clear input
    setMessageInput('');
    
    // Show typing indicator
    setShowTypingIndicator(true);
    
    // Simulate response after 2-3 seconds
    setTimeout(() => {
      setShowTypingIndicator(false);
      
      const responses = [
        "Thanks for the message! 😊",
        "That sounds great! 🎉",
        "I'll get back to you on that. 👍",
        "Absolutely, let's discuss this further. 💬",
        "Good point, I hadn't thought of that. 🤔",
        "Perfect! Looking forward to it. ✨",
        "Thanks for sharing that with me! 🙏"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const responseMessage = {
        id: Date.now() + 1,
        type: 'received',
        message: randomResponse,
        time: 'Just now'
      };
      
      setChatData(prev => ({
        ...prev,
        [chatKey]: [...(prev[chatKey] || []), responseMessage]
      }));
      
      // Mark the chat as unread if the user has navigated away from it
      // Since we're simulating a response to the current chat, we don't need to mark it as unread
      // The user is already viewing this chat, so they'll see the response immediately
    }, Math.random() * 1000 + 2000);
  };
  
  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };
  
  // Filter contacts based on search term
  const filteredContacts = contacts[activeCategory].filter(contact => 
    contact.name.toLowerCase().includes(searchTerm) || 
    contact.lastMessage.toLowerCase().includes(searchTerm)
  );
  
  // Get current chat messages
  const currentMessages = chatData[`${currentChat.category}-${currentChat.name}`] || [];
  
  // Get history count for current category
  const historyCount = contacts[activeCategory].length;
  
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            {/* Category Tabs */}
            <div className="flex space-x-1">
              <button 
                onClick={() => handleCategoryChange('alumni')}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-colors ${
                  activeCategory === 'alumni' 
                    ? 'bg-blue-600 text-white border-b-3 border-blue-800' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                👥 Alumni 
                {notificationCounts.alumni > 0 && (
                  <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {notificationCounts.alumni}
                  </span>
                )}
              </button>
              <button 
                onClick={() => handleCategoryChange('students')}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-colors ${
                  activeCategory === 'students' 
                    ? 'bg-blue-600 text-white border-b-3 border-blue-800' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                🎓 Students 
                {notificationCounts.students > 0 && (
                  <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {notificationCounts.students}
                  </span>
                )}
              </button>
              <button 
                onClick={() => handleCategoryChange('mentors')}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-colors ${
                  activeCategory === 'mentors' 
                    ? 'bg-blue-600 text-white border-b-3 border-blue-800' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                🧑‍🏫 Mentors 
                {notificationCounts.mentors > 0 && (
                  <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {notificationCounts.mentors}
                  </span>
                )}
              </button>
              <button 
                onClick={() => handleCategoryChange('mentees')}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-colors ${
                  activeCategory === 'mentees' 
                    ? 'bg-blue-600 text-white border-b-3 border-blue-800' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                👨‍🎓 Mentees 
                {notificationCounts.mentees > 0 && (
                  <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {notificationCounts.mentees}
                  </span>
                )}
              </button>
            </div>
            {/* Search Bar */}
            <div className="flex-1 max-w-md ml-6">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search conversations..." 
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-sm"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  🔍
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden p-4">
        <div className="bg-white rounded-lg shadow-xl h-full flex flex-col">
          <div className="flex h-full">
            {/* Left Section - Chat History */}
            <div className="w-2/5 border-r border-gray-300 flex flex-col bg-white">
              {/* Section Header */}
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-semibold text-gray-900 flex items-center">
                  📋 Chat History
                  <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                    {historyCount} conversations
                  </span>
                </h3>
              </div>
              
              {/* Contact Lists */}
              <div className="flex-1 overflow-y-auto">
                {filteredContacts.map((contact) => {
                  const chatKey = `${activeCategory}-${contact.name}`;
                  const isActive = currentChat.name === contact.name && currentChat.category === activeCategory;
                  const hasUnread = unreadMessages[chatKey];
                  
                  return (
                    <div 
                      key={contact.name}
                      onClick={() => handleOpenChat(activeCategory, contact.name, contact.initials)}
                      className={`p-3 border-b border-gray-100 cursor-pointer transition-all duration-200 ${
                        isActive 
                          ? 'bg-blue-50 border-l-4 border-l-blue-500' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="relative">
                          <div className={`w-12 h-12 bg-gradient-to-r ${avatarColors[contact.name]} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                            {contact.initials}
                          </div>
                          <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 border-2 border-white rounded-full ${
                            contact.online ? 'bg-green-400' : 'bg-yellow-400'
                          }`}></div>
                        </div>
                        <div className="ml-3 flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-gray-900 text-sm truncate">{contact.name}</h4>
                            <div className="flex items-center">
                              <span className={`text-xs font-medium ${
                                hasUnread ? 'text-blue-600' : 'text-gray-500'
                              }`}>
                                {contact.time}
                              </span>
                              {hasUnread && (
                                <div className="ml-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
                          <div className="flex items-center mt-1">
                            <span className={`text-xs px-2 py-1 rounded-full ${categoryColors[activeCategory]}`}>
                              {categoryLabels[activeCategory]}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Right Section - Real-time Chat */}
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-300 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="relative">
                      <div className={`w-10 h-10 bg-gradient-to-r ${avatarColors[currentChat.name]} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                        {currentChat.initials}
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full animate-pulse"></div>
                    </div>
                    <div className="ml-3">
                      <h4 className="font-semibold text-gray-900 text-sm">{currentChat.name}</h4>
                      <p className="text-xs text-green-600 font-medium">💬 Real-time Chat • online</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-600 hover:bg-gray-200 rounded-full transition-colors">
                      📞
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-200 rounded-full transition-colors">
                      📹
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-200 rounded-full transition-colors">
                      ⋮
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Messages Area */}
              <div className="flex-1 p-4 overflow-y-auto bg-[#efeae2]">
                <div className="space-y-2">
                  {currentMessages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}>
                      <div className="max-w-xs">
                        <div className={`${
                          msg.type === 'sent' 
                            ? 'bg-[#dcf8c6] rounded-lg rounded-tr-sm' 
                            : 'bg-white rounded-lg rounded-tl-sm'
                        } p-3 shadow-sm animate-slideIn`}>
                          <p className="text-sm text-gray-800">{msg.message}</p>
                        </div>
                        <span className={`text-xs text-gray-500 mt-1 block ${
                          msg.type === 'sent' ? 'text-right' : ''
                        }`}>
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              {/* Typing Indicator */}
              {showTypingIndicator && (
                <div className="px-4 pb-2">
                  <div className="flex items-center text-gray-500 text-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="ml-2">{currentChat.name} is typing...</span>
                  </div>
                </div>
              )}
              
              {/* Message Input */}
              <div className="p-4 border-t border-gray-300 bg-gray-50">
                <div className="flex items-center space-x-3">
                  <button className="p-2 text-gray-600 hover:bg-gray-200 rounded-full transition-colors">
                    😊
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-200 rounded-full transition-colors">
                    📎
                  </button>
                  <div className="flex-1 relative">
                    <input 
                      type="text" 
                      placeholder="Type a message" 
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                  </div>
                  <button 
                    onClick={handleSendMessage}
                    className="bg-[#25d366] hover:bg-[#22c55e] text-white p-2.5 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <style jsx>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AlumniMessages;