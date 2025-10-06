import React, { useState, useEffect } from 'react';

const EventHub = () => {
  // Sample events data
  const eventsData = [
    {
      id: 1,
      title: "AI & Machine Learning Summit 2024",
      category: "tech",
      date: "2024-02-15",
      time: "9:00 AM - 6:00 PM",
      location: "San Francisco Convention Center",
      price: "Free",
      description: "Join industry leaders to explore the latest in AI and machine learning technologies.",
      attendees: 500,
      spots: 50
    },
    {
      id: 2,
      title: "Startup Pitch Competition",
      category: "business",
      date: "2024-02-20",
      time: "2:00 PM - 8:00 PM",
      location: "Innovation Hub Downtown",
      price: "$25",
      description: "Watch promising startups pitch their ideas to top investors and win funding.",
      attendees: 200,
      spots: 15
    },
    {
      id: 3,
      title: "Digital Art Workshop",
      category: "creative",
      date: "2024-02-18",
      time: "10:00 AM - 4:00 PM",
      location: "Creative Arts Center",
      price: "$75",
      description: "Learn digital art techniques from professional artists and create your own masterpiece.",
      attendees: 30,
      spots: 8
    },
    {
      id: 4,
      title: "Tech Professionals Networking Night",
      category: "networking",
      date: "2024-02-22",
      time: "6:00 PM - 10:00 PM",
      location: "Rooftop Lounge",
      price: "$35",
      description: "Connect with fellow tech professionals over drinks and appetizers.",
      attendees: 150,
      spots: 25
    },
    {
      id: 5,
      title: "Web Development Bootcamp",
      category: "tech",
      date: "2024-02-25",
      time: "9:00 AM - 5:00 PM",
      location: "Tech Campus",
      price: "$150",
      description: "Intensive full-day bootcamp covering modern web development frameworks and tools.",
      attendees: 80,
      spots: 12
    },
    {
      id: 6,
      title: "Creative Writing Masterclass",
      category: "creative",
      date: "2024-02-28",
      time: "1:00 PM - 5:00 PM",
      location: "Literary Center",
      price: "$60",
      description: "Enhance your creative writing skills with bestselling authors and published writers.",
      attendees: 40,
      spots: 6
    }
  ];

  // State variables
  const [filteredEvents, setFilteredEvents] = useState([...eventsData]);
  const [currentEventId, setCurrentEventId] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    interest: ''
  });

  // Initialize the page
  useEffect(() => {
    renderEvents(eventsData);
  }, []);

  // Render events
  const renderEvents = (events) => {
    setFilteredEvents(events);
  };

  // Filter events by category
  const filterEvents = (category) => {
    setActiveCategory(category);
    
    let filtered = [...eventsData];
    
    if (category !== 'all') {
      filtered = eventsData.filter(event => event.category === category);
    }
    
    // Apply existing date and search filters
    if (dateFilter !== 'all') {
      filtered = applyDateFilter(filtered, dateFilter);
    }
    
    if (searchQuery.trim()) {
      filtered = applySearchFilter(filtered, searchQuery);
    }
    
    renderEvents(filtered);
  };

  // Filter by date
  const filterByDate = (dateFilter) => {
    setDateFilter(dateFilter);
    
    let filtered = [...eventsData];
    
    // Apply existing category filter
    if (activeCategory !== 'all') {
      filtered = eventsData.filter(event => event.category === activeCategory);
    }
    
    // Apply date filter
    if (dateFilter !== 'all') {
      filtered = applyDateFilter(filtered, dateFilter);
    }
    
    // Apply existing search filter
    if (searchQuery.trim()) {
      filtered = applySearchFilter(filtered, searchQuery);
    }
    
    renderEvents(filtered);
  };

  // Apply date filter logic
  const applyDateFilter = (events, dateFilter) => {
    const today = new Date();
    
    return events.filter(event => {
      const eventDate = new Date(event.date);
      
      switch(dateFilter) {
        case 'today':
          return eventDate.toDateString() === today.toDateString();
        case 'week':
          const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
          return eventDate >= today && eventDate <= weekFromNow;
        case 'month':
          const monthFromNow = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
          return eventDate >= today && eventDate <= monthFromNow;
        default:
          return true;
      }
    });
  };

  // Search events
  const searchEvents = (query) => {
    setSearchQuery(query);
    
    let filtered = [...eventsData];
    
    // Apply existing category filter
    if (activeCategory !== 'all') {
      filtered = eventsData.filter(event => event.category === activeCategory);
    }
    
    // Apply existing date filter
    if (dateFilter !== 'all') {
      filtered = applyDateFilter(filtered, dateFilter);
    }
    
    // Apply search filter
    if (query.trim()) {
      filtered = applySearchFilter(filtered, query);
    }
    
    renderEvents(filtered);
  };

  // Apply search filter logic
  const applySearchFilter = (events, query) => {
    return events.filter(event => 
      event.title.toLowerCase().includes(query.toLowerCase()) ||
      event.description.toLowerCase().includes(query.toLowerCase()) ||
      event.location.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Open application modal
  const openApplicationModal = (eventId) => {
    setCurrentEventId(eventId);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      interest: ''
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit application
  const submitApplication = (e) => {
    e.preventDefault();
    
    // Simulate form submission
    setTimeout(() => {
      closeModal();
      setShowSuccess(true);
      
      // Update spots remaining (demo purposes)
      const eventIndex = eventsData.findIndex(e => e.id === currentEventId);
      if (eventIndex !== -1 && eventsData[eventIndex].spots > 0) {
        const updatedEvents = [...eventsData];
        updatedEvents[eventIndex].spots--;
        
        // Update filtered events as well
        const updatedFiltered = filteredEvents.map(event => 
          event.id === currentEventId ? { ...event, spots: event.spots - 1 } : event
        );
        
        setFilteredEvents(updatedFiltered);
      }
      
      // Hide success message after 4 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 4000);
    }, 500);
  };

  // Helper functions
  const getCategoryIcon = (category) => {
    const icons = {
      tech: '💻',
      business: '💼',
      creative: '🎨',
      networking: '🤝'
    };
    return icons[category] || '📅';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Get current event for modal
  const currentEvent = eventsData.find(e => e.id === currentEventId) || {};

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="gradient-bg text-white py-8">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-2">🎉 EventHub</h1>
          <p className="text-xl opacity-90">Discover amazing events and apply instantly</p>
        </div>
      </header>
      
      {/* Filters Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-wrap gap-4 items-center">
            <h3 className="text-lg font-semibold text-gray-800 mr-4">Filter Events:</h3>
            
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => filterEvents('all')} 
                className={`filter-btn px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === 'all' 
                    ? 'filter-active' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Events
              </button>
              <button 
                onClick={() => filterEvents('tech')} 
                className={`filter-btn px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === 'tech' 
                    ? 'filter-active' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                💻 Tech
              </button>
              <button 
                onClick={() => filterEvents('business')} 
                className={`filter-btn px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === 'business' 
                    ? 'filter-active' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                💼 Business
              </button>
              <button 
                onClick={() => filterEvents('creative')} 
                className={`filter-btn px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === 'creative' 
                    ? 'filter-active' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🎨 Creative
              </button>
              <button 
                onClick={() => filterEvents('networking')} 
                className={`filter-btn px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === 'networking' 
                    ? 'filter-active' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🤝 Networking
              </button>
            </div>
            
            {/* Date Filter */}
            <select 
              value={dateFilter}
              onChange={(e) => filterByDate(e.target.value)}
              className="ml-4 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
            
            {/* Search */}
            <input 
              type="text" 
              placeholder="Search events..." 
              value={searchQuery}
              onChange={(e) => searchEvents(e.target.value)}
              className="ml-4 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent w-64"
            />
          </div>
        </div>
      </div>
      
      {/* Events Grid */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <div 
                key={event.id} 
                className="bg-white rounded-2xl shadow-lg card-hover overflow-hidden" 
                data-category={event.category}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      {getCategoryIcon(event.category)} {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                    </span>
                    <span className="text-2xl font-bold text-green-600">{event.price}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{event.title}</h3>
                  
                  <div className="space-y-2 mb-4 text-gray-600">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">📅</span>
                      <span>{formatDate(event.date)} • {event.time}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg mr-2">📍</span>
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg mr-2">👥</span>
                      <span>{event.attendees} attendees • {event.spots} spots left</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 line-clamp-3">{event.description}</p>
                  
                  <button 
                    onClick={() => openApplicationModal(event.id)} 
                    className="w-full gradient-bg text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">No events found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Application Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 modal-backdrop z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Apply to Event</h2>
                <button 
                  onClick={closeModal} 
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  &times;
                </button>
              </div>
              
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">{currentEvent.title}</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>📅 {formatDate(currentEvent.date)} • {currentEvent.time}</div>
                  <div>📍 {currentEvent.location}</div>
                  <div>💰 {currentEvent.price}</div>
                </div>
              </div>
              
              <form onSubmit={submitApplication}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input 
                      type="text" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Why are you interested in this event?</label>
                    <textarea 
                      name="interest"
                      value={formData.interest}
                      onChange={handleInputChange}
                      rows="4" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" 
                      placeholder="Tell us about your interest and what you hope to gain..."
                    ></textarea>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-8">
                  <button 
                    type="button" 
                    onClick={closeModal} 
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 px-6 py-3 gradient-bg text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50">
          <div className="flex items-center">
            <span className="text-xl mr-2">✅</span>
            <span>Application submitted successfully!</span>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .gradient-bg { background: linear-gradient(135deg, #6366f1 0%, #3b82f6 100%); }
        .card-hover { transition: all 0.3s ease; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); }
        .filter-active { background: linear-gradient(135deg, #6366f1 0%, #3b82f6 100%); color: white; }
        .modal-backdrop { backdrop-filter: blur(8px); }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default EventHub;