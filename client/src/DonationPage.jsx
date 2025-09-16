import { useState, useEffect } from 'react';

const DonationPage = () => {
  const [currentTab, setCurrentTab] = useState('campaigns');
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [notification, setNotification] = useState(null);
  
  // Form state
  const [donationCategory, setDonationCategory] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorMessage, setDonorMessage] = useState('');

  const showTab = (tab) => {
    setCurrentTab(tab);
  };

  const openDonateModal = (category = '') => {
    if (category) {
      setDonationCategory(category);
    }
    setDonateModalOpen(true);
  };

  const closeDonateModal = () => {
    setDonateModalOpen(false);
    setSelectedAmount(null);
    setSelectedPaymentMethod(null);
    setCustomAmount('');
    setDonationCategory('');
    setDonorName('');
    setDonorEmail('');
    setDonorPhone('');
    setDonorMessage('');
  };

  const selectAmount = (amount) => {
    setSelectedAmount(amount);
    if (amount === 'custom') {
      setCustomAmount('');
    }
  };

  const selectPaymentMethod = (method) => {
    setSelectedPaymentMethod(method);
  };

  const processDonation = (e) => {
    e.preventDefault();
    
    const amount = selectedAmount === 'custom' ? customAmount : selectedAmount;
    
    // Simulate payment processing
    showSuccessMessage('Processing your donation...');
    
    setTimeout(() => {
      // Add to transaction history (simulated)
      addToHistory(donationCategory, amount, selectedPaymentMethod, donorName);
      
      // Show success message
      showSuccessMessage(`Thank you! Your donation of ₹${amount} has been processed successfully! 🎉`);
      
      // Close modal
      closeDonateModal();
      
      // Update campaign progress (simulated)
      updateCampaignProgress(donationCategory, parseInt(amount));
      
    }, 2000);
  };

  const addToHistory = (category, amount, paymentMethod, name) => {
    console.log('Added to history:', { category, amount, paymentMethod, name });
  };

  const updateCampaignProgress = (category, amount) => {
    console.log('Updated campaign progress:', { category, amount });
  };

  const downloadHistory = () => {
    showSuccessMessage('Downloading your donation history... 📥');
    
    setTimeout(() => {
      showSuccessMessage('Download complete! Check your downloads folder. 📄');
    }, 1500);
  };

  const showSuccessMessage = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeDonateModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex space-x-2">
              <button 
                onClick={() => showTab('campaigns')} 
                className={`tab px-6 py-3 rounded-xl font-medium flex items-center transition-all duration-200 ${
                  currentTab === 'campaigns' 
                    ? 'tab-active' 
                    : 'text-gray-600'
                }`}
              >
                Campaigns
                <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">12</span>
              </button>
              <button 
                onClick={() => showTab('categories')} 
                className={`tab px-6 py-3 rounded-xl font-medium flex items-center transition-all duration-200 ${
                  currentTab === 'categories' 
                    ? 'tab-active' 
                    : 'text-gray-600'
                }`}
              >
                Categories
              </button>
              <button 
                onClick={() => showTab('history')} 
                className={`tab px-6 py-3 rounded-xl font-medium flex items-center transition-all duration-200 ${
                  currentTab === 'history' 
                    ? 'tab-active' 
                    : 'text-gray-600'
                }`}
              >
                My Impact
                <span className="ml-2 bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">7</span>
              </button>
            </div>
            <button 
            onClick={() => openDonateModal()} 
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
            Donate Now
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Active Campaigns Section */}
        {currentTab === 'campaigns' && (
          <div id="campaigns-section" className="content-section">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Active Campaigns</h2>
              <p className="text-gray-600">Choose a cause that matters to you and make a difference today</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="campaigns-container">
              {/* Emergency Fund Campaign */}
              <div className="campaign-card bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold">
                      🚨 Emergency Fund
                    </div>
                    <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-medium">Urgent</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Student Emergency Relief</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Support students facing financial hardships due to unexpected circumstances. Help cover basic needs and emergency situations.
                  </p>
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-3">
                      <span className="text-gray-600 font-medium">₹85,000 raised</span>
                      <span className="font-bold text-gray-900">₹1,50,000 goal</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div className="progress-bar h-4 rounded-full bg-gradient-to-r from-red-500 to-red-600" style={{ width: '56.7%' }}></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>56.7% funded</span>
                      <span>⏰ 18 days left</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">127 donors</span> • Last donation 1h ago
                    </div>
                    <button 
                      onClick={() => openDonateModal('emergency')} 
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Donate Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Scholarship Campaign */}
              <div className="campaign-card bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                      🎓 Scholarship
                    </div>
                    <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-medium">Active</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Merit Scholarship Program</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Fund scholarships for academically excellent students from economically disadvantaged backgrounds. Transform lives through education.
                  </p>
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-3">
                      <span className="text-gray-600 font-medium">₹3,25,000 raised</span>
                      <span className="font-bold text-gray-900">₹5,00,000 goal</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div className="progress-bar h-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600" style={{ width: '65%' }}></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>65% funded</span>
                      <span>⏰ 42 days left</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">89 donors</span> • 8 scholarships funded
                    </div>
                    <button 
                      onClick={() => openDonateModal('scholarship')} 
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
                    >
                      Donate Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Infrastructure Campaign */}
              <div className="campaign-card bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                      🏗️ Infrastructure
                    </div>
                    <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-medium">Active</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Modern Computer Lab</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Build a state-of-the-art computer lab with latest hardware and software to enhance practical learning for students.
                  </p>
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-3">
                      <span className="text-gray-600 font-medium">₹7,20,000 raised</span>
                      <span className="font-bold text-gray-900">₹10,00,000 goal</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div className="progress-bar h-4 rounded-full bg-gradient-to-r from-green-500 to-green-600" style={{ width: '72%' }}></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>72% funded</span>
                      <span>⏰ 35 days left</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">156 donors</span> • 60 computers funded
                    </div>
                    <button 
                      onClick={() => openDonateModal('infrastructure')} 
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Donate Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Sports Equipment Campaign */}
              <div className="campaign-card bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold">
                      🏃‍♂️ Sports & Wellness
                    </div>
                    <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-medium">Active</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Sports Complex Upgrade</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Upgrade sports facilities with new equipment for cricket, football, basketball, and indoor games to promote student wellness.
                  </p>
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-3">
                      <span className="text-gray-600 font-medium">₹1,85,000 raised</span>
                      <span className="font-bold text-gray-900">₹3,50,000 goal</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div className="progress-bar h-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600" style={{ width: '52.9%' }}></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>52.9% funded</span>
                      <span>⏰ 28 days left</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">73 donors</span> • 5 sports covered
                    </div>
                    <button 
                      onClick={() => openDonateModal('sports')} 
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Donate Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Donation Categories Section */}
        {currentTab === 'categories' && (
          <div id="categories-section" className="content-section">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Donation Categories</h2>
              <p className="text-gray-600">Choose from our focused areas of impact</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Scholarship Card */}
              <div className="donation-card bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎓</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Scholarships</h3>
                  <p className="text-gray-600 text-sm mb-4">Support deserving students with educational scholarships and financial aid programs.</p>
                  <button 
                    onClick={() => openDonateModal('scholarship')} 
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition-colors"
                  >
                    Donate for Scholarships
                  </button>
                </div>
              </div>

              {/* Emergency Fund Card */}
              <div className="donation-card bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🚨</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Emergency Fund</h3>
                  <p className="text-gray-600 text-sm mb-4">Help students in crisis situations with immediate financial assistance and support.</p>
                  <button 
                    onClick={() => openDonateModal('emergency')} 
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition-colors"
                  >
                    Emergency Donation
                  </button>
                </div>
              </div>

              {/* Infrastructure Card */}
              <div className="donation-card bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🏗️</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Infrastructure</h3>
                  <p className="text-gray-600 text-sm mb-4">Contribute to building and upgrading campus facilities, labs, and learning spaces.</p>
                  <button 
                    onClick={() => openDonateModal('infrastructure')} 
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium transition-colors"
                  >
                    Support Infrastructure
                  </button>
                </div>
              </div>

              {/* Library Card */}
              <div className="donation-card bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📚</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Library & Resources</h3>
                  <p className="text-gray-600 text-sm mb-4">Enhance learning resources with books, digital content, and research materials.</p>
                  <button 
                    onClick={() => openDonateModal('library')} 
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg font-medium transition-colors"
                  >
                    Support Library
                  </button>
                </div>
              </div>

              {/* Sports Card */}
              <div className="donation-card bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🏃‍♂️</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Sports & Recreation</h3>
                  <p className="text-gray-600 text-sm mb-4">Fund sports equipment, facilities, and recreational activities for student wellness.</p>
                  <button 
                    onClick={() => openDonateModal('sports')} 
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium transition-colors"
                  >
                    Support Sports
                  </button>
                </div>
              </div>

              {/* Events Card */}
              <div className="donation-card bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <div className="text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎉</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Events & Programs</h3>
                  <p className="text-gray-600 text-sm mb-4">Support alumni meets, cultural events, and special programs for community building.</p>
                  <button 
                    onClick={() => openDonateModal('events')} 
                    className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg font-medium transition-colors"
                  >
                    Support Events
                  </button>
                </div>
              </div>

              {/* Research Card */}
              <div className="donation-card bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <div className="text-center">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔬</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Research & Innovation</h3>
                  <p className="text-gray-600 text-sm mb-4">Fund research projects, innovation labs, and scientific equipment for breakthrough discoveries.</p>
                  <button 
                    onClick={() => openDonateModal('research')} 
                    className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg font-medium transition-colors"
                  >
                    Support Research
                  </button>
                </div>
              </div>

              {/* Environment Card */}
              <div className="donation-card bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🌱</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Environmental Initiatives</h3>
                  <p className="text-gray-600 text-sm mb-4">Support green campus initiatives, sustainability projects, and environmental conservation.</p>
                  <button 
                    onClick={() => openDonateModal('environment')} 
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium transition-colors"
                  >
                    Go Green
                  </button>
                </div>
              </div>

              {/* General Fund Card */}
              <div className="donation-card bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl"></span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">General Fund</h3>
                  <p className="text-gray-600 text-sm mb-4">Contribute to the general development fund for overall institutional growth and improvement.</p>
                  <button 
                    onClick={() => openDonateModal('general')} 
                    className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg font-medium transition-colors"
                  >
                    General Donation
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Transaction History Section */}
        {currentTab === 'history' && (
          <div id="history-section" className="content-section">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">My Donation History</h3>
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-600">
                      Total Donated: <span className="font-bold text-green-600">₹25,500</span>
                    </div>
                    <button 
                      onClick={downloadHistory} 
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      📥 Download Report
                    </button>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign/Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Mar 15, 2024</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Student Emergency Relief Fund</div>
                        <div className="text-sm text-gray-500">Emergency Fund</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">₹5,000</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">UPI</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Completed
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                        📄 Download
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Mar 10, 2024</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Merit Scholarship Program 2024</div>
                        <div className="text-sm text-gray-500">Scholarship</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">₹10,000</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Credit Card</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Completed
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                        📄 Download
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Feb 28, 2024</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">New Computer Lab Setup</div>
                        <div className="text-sm text-gray-500">Infrastructure</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">₹3,000</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">PayPal</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Completed
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                        📄 Download
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Feb 20, 2024</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Sports Equipment Upgrade</div>
                        <div className="text-sm text-gray-500">Sports</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">₹2,500</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">UPI</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Completed
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                        📄 Download
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Feb 15, 2024</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Digital Library Expansion</div>
                        <div className="text-sm text-gray-500">Library</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">₹1,500</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Razorpay</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Completed
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                        📄 Download
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Jan 30, 2024</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Annual Alumni Meet 2024</div>
                        <div className="text-sm text-gray-500">Events</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">₹2,000</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Credit Card</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Completed
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                        📄 Download
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Jan 15, 2024</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">General Fund</div>
                        <div className="text-sm text-gray-500">General</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">₹1,000</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">UPI</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Completed
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                        📄 Download
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Donation Modal */}
      {donateModalOpen && (
        <div className="fixed inset-0 z-50">
          <div className="modal-backdrop fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={closeDonateModal}></div>
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl"></span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Make a Donation</h3>
                  <p className="text-gray-600">Your contribution makes a real difference</p>
                  <button 
                    onClick={closeDonateModal} 
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>
                <form onSubmit={processDonation}>
                  {/* Campaign Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Campaign/Category</label>
                    <select 
                      value={donationCategory} 
                      onChange={(e) => setDonationCategory(e.target.value)}
                      className="form-input w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      required
                    >
                      <option value="">Choose a category...</option>
                      <option value="emergency">🚨 Emergency Fund</option>
                      <option value="scholarship">🎓 Scholarships</option>
                      <option value="infrastructure">🏗️ Infrastructure</option>
                      <option value="sports">🏃‍♂️ Sports & Recreation</option>
                      <option value="library">📚 Library & Resources</option>
                      <option value="events">🎉 Events & Programs</option>
                      <option value="research">🔬 Research & Innovation</option>
                      <option value="environment">🌱 Environmental Initiatives</option>
                      <option value="general">💝 General Fund</option>
                    </select>
                  </div>

                  {/* Amount Selection */}
                  <div className="mb-8">
                    <label className="block text-lg font-semibold text-gray-900 mb-4">Choose Amount</label>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <button 
                        type="button" 
                        onClick={() => selectAmount(1000)} 
                        className={`amount-btn border-2 rounded-xl py-4 text-center font-semibold transition-all ${
                          selectedAmount === 1000 
                            ? 'border-blue-500 bg-blue-500 text-white' 
                            : 'border-gray-300 hover:border-blue-500'
                        }`}
                      >
                        ₹1,000
                      </button>
                      <button 
                        type="button" 
                        onClick={() => selectAmount(2500)} 
                        className={`amount-btn border-2 rounded-xl py-4 text-center font-semibold transition-all ${
                          selectedAmount === 2500 
                            ? 'border-blue-500 bg-blue-500 text-white' 
                            : 'border-gray-300 hover:border-blue-500'
                        }`}
                      >
                        ₹2,500
                      </button>
                      <button 
                        type="button" 
                        onClick={() => selectAmount(5000)} 
                        className={`amount-btn border-2 rounded-xl py-4 text-center font-semibold transition-all ${
                          selectedAmount === 5000 
                            ? 'border-blue-500 bg-blue-500 text-white' 
                            : 'border-gray-300 hover:border-blue-500'
                        }`}
                      >
                        ₹5,000
                      </button>
                      <button 
                        type="button" 
                        onClick={() => selectAmount('custom')} 
                        className={`amount-btn border-2 rounded-xl py-4 text-center font-semibold transition-all ${
                          selectedAmount === 'custom' 
                            ? 'border-blue-500 bg-blue-500 text-white' 
                            : 'border-gray-300 hover:border-blue-500'
                        }`}
                      >
                        Custom
                      </button>
                    </div>
                    {selectedAmount === 'custom' && (
                      <input 
                        type="number" 
                        value={customAmount} 
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="form-input w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg font-semibold" 
                        placeholder="Enter amount..." 
                        min="100"
                        required
                      />
                    )}
                  </div>

                  {/* Payment Method */}
                  <div className="mb-8">
                    <label className="block text-lg font-semibold text-gray-900 mb-4">Payment Method</label>
                    <div className="grid grid-cols-2 gap-3">
                      <div 
                        onClick={() => selectPaymentMethod('upi')} 
                        className={`payment-method border-2 rounded-xl p-4 flex flex-col items-center cursor-pointer transition-all ${
                          selectedPaymentMethod === 'upi' 
                            ? 'border-green-500 bg-green-50' 
                            : 'border-gray-300 hover:border-green-500'
                        }`}
                      >
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                          📱
                        </div>
                        <div className="font-semibold text-center">UPI</div>
                        <div className="text-xs text-gray-500 text-center">Google Pay, PhonePe</div>
                      </div>
                      <div 
                        onClick={() => selectPaymentMethod('card')} 
                        className={`payment-method border-2 rounded-xl p-4 flex flex-col items-center cursor-pointer transition-all ${
                          selectedPaymentMethod === 'card' 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-300 hover:border-blue-500'
                        }`}
                      >
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                          💳
                        </div>
                        <div className="font-semibold text-center">Card</div>
                        <div className="text-xs text-gray-500 text-center">Visa, Mastercard</div>
                      </div>
                    </div>
                  </div>

                  {/* Donor Information */}
                  <div className="mb-8">
                    <label className="block text-lg font-semibold text-gray-900 mb-4">Your Details</label>
                    <div className="space-y-4">
                      <input 
                        type="text" 
                        value={donorName} 
                        onChange={(e) => setDonorName(e.target.value)}
                        className="form-input w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="Full Name" 
                        required
                      />
                      <input 
                        type="email" 
                        value={donorEmail} 
                        onChange={(e) => setDonorEmail(e.target.value)}
                        className="form-input w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="Email Address" 
                        required
                      />
                      <input 
                        type="tel" 
                        value={donorPhone} 
                        onChange={(e) => setDonorPhone(e.target.value)}
                        className="form-input w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="Phone Number" 
                        required
                      />
                    </div>
                  </div>

                  {/* Tax Benefit Info */}
                  <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="text-green-600 mr-2">💰</div>
                      <div>
                        <div className="text-sm font-medium text-green-800">Tax Benefit Available</div>
                        <div className="text-xs text-green-600 mt-1">Your donation is eligible for tax deduction under Section 80G. You'll receive a tax receipt via email.</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4 pt-6">
                    <button 
                      type="button" 
                      onClick={closeDonateModal} 
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl hover:from-green-600 hover:to-blue-600 transition-all font-semibold transform hover:scale-105"
                    >
                      Donate Now
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-transform duration-300">
          {notification}
        </div>
      )}

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        body { 
          font-family: 'Inter', sans-serif; 
        }
        .gradient-bg { 
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); 
        }
        .donation-card { 
          transition: all 0.3s ease; 
          animation: slideIn 0.5s ease-out;
        }
        .donation-card:hover { 
          transform: translateY(-2px); 
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        .campaign-card {
          transition: all 0.3s ease;
          animation: slideIn 0.5s ease-out;
        }
        .campaign-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .tab-active {
          background: #3b82f6;
          color: white;
          border-bottom: 3px solid #1d4ed8;
        }
        .tab {
          transition: all 0.3s ease;
        }
        .tab:hover {
          background: #eff6ff;
          color: #3b82f6;
        }
        .form-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        .progress-bar {
          background: linear-gradient(90deg, #10b981, #059669);
          transition: width 0.5s ease;
        }
        .amount-btn {
          transition: all 0.2s ease;
        }
        .amount-btn:hover {
          transform: scale(1.05);
        }
        .payment-method {
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .payment-method:hover {
          background: #f3f4f6;
        }
      `}</style>
    </div>
  );
};

export default DonationPage;