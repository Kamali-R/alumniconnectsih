import React, { useState } from 'react';
import Head from 'next/head';

const AlumniConnect = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    userType: '',
    message: ''
  });

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.firstName || !formData.lastName || !formData.email || 
        !formData.userType || !formData.message) {
      alert('Please fill in all fields');
      return;
    }
    
    // In a real application, you would send this data to your server
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      userType: '',
      message: ''
    });
  };

  const handleLogin = () => {
    alert('Login functionality would be implemented here');
  };

  const handleRegister = () => {
    alert('Registration functionality would be implemented here');
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 64,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="bg-gray-50 font-sans">
      <Head>
        <title>Alumni Connect - ABC University</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Navigation */}
      <nav className="bg-white shadow-md fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <svg className="h-10 w-10 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"></path>
                </svg>
                <span className="ml-2 text-xl font-bold text-gray-800">ABC University Alumni Connect</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-indigo-600 px-3 py-2 font-medium">Home</button>
              <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-indigo-600 px-3 py-2 font-medium">About</button>
              <button onClick={() => scrollToSection('features')} className="text-gray-700 hover:text-indigo-600 px-3 py-2 font-medium">Features</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-indigo-600 px-3 py-2 font-medium">Contact</button>
              <div className="flex items-center space-x-2">
                <button onClick={handleLogin} className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-4 py-2 rounded-md font-medium transition duration-300">Login</button>
                <button onClick={handleRegister} className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md font-medium transition duration-300">Register</button>
              </div>
            </div>
            <div className="md:hidden flex items-center">
              <button onClick={handleMobileMenuToggle} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div id="mobileMenu" className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white shadow-md`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <button onClick={() => scrollToSection('home')} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">Home</button>
          <button onClick={() => scrollToSection('about')} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">About</button>
          <button onClick={() => scrollToSection('features')} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">Features</button>
          <button onClick={() => scrollToSection('contact')} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">Contact</button>
          <div className="flex flex-col space-y-2 pt-2">
            <button onClick={handleLogin} className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-4 py-2 rounded-md font-medium transition duration-300">Login</button>
            <button onClick={handleRegister} className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md font-medium transition duration-300">Register</button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section id="home" className="hero-gradient pt-28 pb-20" style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7e22ce 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">Connect with your ABC University community</h1>
              <p className="text-indigo-100 text-lg mb-8">Alumni Connect brings together students and alumni in one powerful platform to foster mentorship, networking, and lifelong connections within our university community.</p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="bg-white text-indigo-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium text-lg shadow-lg transition duration-300">Get Started</button>
                <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-indigo-700 px-6 py-3 rounded-lg font-medium text-lg transition duration-300">Learn More</button>
              </div>
            </div>
            <div className="md:w-1/2">
              <svg className="w-full h-auto" viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
                <rect x="50" y="50" width="400" height="300" rx="20" fill="#f0f4ff"/>
                <circle cx="250" cy="150" r="60" fill="#c7d2fe"/>
                <rect x="100" y="250" width="300" height="40" rx="8" fill="#a5b4fc"/>
                <rect x="150" y="310" width="200" height="20" rx="4" fill="#818cf8"/>
                <path d="M220,130 Q250,100 280,130 Q300,150 280,170 Q250,200 220,170 Q200,150 220,130" fill="#4f46e5"/>
                <circle cx="235" cy="140" r="5" fill="white"/>
                <circle cx="265" cy="140" r="5" fill="white"/>
                <path d="M235,160 Q250,175 265,160" stroke="white" strokeWidth="3" fill="none"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Who Benefits from Alumni Connect?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Our platform serves both alumni and current students with tailored features to enhance their experience.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Alumni Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="bg-indigo-600 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Alumni</h3>
              <p className="text-gray-600 mb-6">Stay connected with your alma mater, mentor current students, share job opportunities, and network with fellow graduates from ABC University.</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-indigo-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Mentorship opportunities</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-indigo-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Job posting privileges</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-indigo-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Alumni-exclusive events</span>
                </li>
              </ul>
              <button className="bg-indigo-600 text-white hover:bg-indigo-700 px-6 py-2 rounded-lg font-medium transition duration-300 w-full">Alumni Portal</button>
            </div>
            
            {/* Student Card */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="bg-purple-600 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 06.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.514-2.222"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Students</h3>
              <p className="text-gray-600 mb-6">Connect with successful ABC University alumni, find mentors in your field, discover internships, and prepare for your career journey.</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Career guidance</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Internship opportunities</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Networking workshops</span>
                </li>
              </ul>
              <button className="bg-purple-600 text-white hover:bg-purple-700 px-6 py-2 rounded-lg font-medium transition duration-300 w-full">Student Portal</button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Special Features</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Discover the powerful tools that make Alumni Connect the ultimate platform for our university community.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl p-8 shadow-md transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg">
              <div className="bg-indigo-100 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 02M18 8a2 2 0 11-4 0 2 2 0 014 02M14 15a4 4 0 00-8 0v1h8v-12M6 8a2 2 0 11-4 0 2 2 0 014 02M16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-32M4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Mentorship Matching</h3>
              <p className="text-gray-600">Our system connects students with alumni mentors based on career interests, skills, and goals for personalized guidance.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-xl p-8 shadow-md transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg">
              <div className="bg-purple-100 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9I-3 3v-3H4a2 2 0 01-2-2V5z"></path>
                  <path d="M15 7v2a4 4 0 01-4 4H9.828I-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2v9a2 2 0 00-2-2h-1z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community Forums</h3>
              <p className="text-gray-600">Engage in discussions, ask questions, and share insights with specialized forums for different fields and interests.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white rounded-xl p-8 shadow-md transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg">
              <div className="bg-teal-100 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2v6a2 2 0 00-2-2h-1v3a1 1 0 10-2 0v1H7v3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Event Management</h3>
              <p className="text-gray-600">Organize, promote, and manage virtual and in-person events, reunions, and networking opportunities for our community.</p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white rounded-xl p-8 shadow-md transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg">
              <div className="bg-amber-100 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 17a1 1 0 001.447.8944-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.8944-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.7884-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.7884.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.8944 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.8944-4-2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Job Board</h3>
              <p className="text-gray-600">Access exclusive job and internship opportunities posted by alumni and partner companies specifically for ABC University students.</p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-white rounded-xl p-8 shadow-md transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg">
              <div className="bg-rose-100 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-rose-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.80Av10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.80Av10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.80Av12a1 1 0 11-2 0V4.804z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Resource Library</h3>
              <p className="text-gray-600">Access a curated collection of career resources, guides, and educational materials shared by alumni and faculty.</p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-white rounded-xl p-8 shadow-md transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg">
              <div className="bg-blue-100 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Alumni Directory</h3>
              <p className="text-gray-600">Search and connect with ABC University alumni based on industry, location, graduation year, and other filters.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Alumni Connect</h2>
              <p className="text-lg text-gray-600 mb-6">Alumni Connect was founded with a simple mission: to bridge the gap between past and present ABC University students, creating a powerful network that benefits everyone.</p>
              <p className="text-lg text-gray-600 mb-6">Built on the MERN stack (MongoDB, Express, React, Node.js), our platform helps our university maintain strong relationships with alumni while providing current students with valuable mentorship and career opportunities.</p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-bold text-indigo-600">5,000+</span>
                  <span className="text-gray-600 mt-2">Active Alumni</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-bold text-indigo-600">20+</span>
                  <span className="text-gray-600 mt-2">Departments</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-bold text-indigo-600">1,200+</span>
                  <span className="text-gray-600 mt-2">Successful Mentorships</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-bold text-indigo-600">98%</span>
                  <span className="text-gray-600 mt-2">Satisfaction Rate</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-200 rounded-lg transform rotate-3"></div>
                <div className="absolute inset-0 bg-indigo-300 rounded-lg transform -rotate-3"></div>
                <div className="relative bg-indigo-600 rounded-lg overflow-hidden shadow-x">
                  <svg className="w-full" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                    <rect width="400" height="300" fill="#4146e5"/>
                    <circle cx="150" cy="150" r="80" fill="#818cf8"/>
                    <circle cx="250" cy="80" r="40" fill="#a5b4fc"/>
                    <path d="M0,250 Q100,200 200,250 T400,250 L400,300 L0,300 Z" fill="#c7d2fe"/>
                    <path d="M300,0 L400,0 L400,100 Z" fill="#e0e7ff"/>
                    <circle cx="320" cy="220" r="20" fill="#e0e7ff"/>
                    <circle cx="80" cy="70" r="30" fill="#6366f1" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white p-6">
                      <h3 className="text-2xl font-bold mb-2">Join Our Community</h3>
                      <p className="mb-4">Be part of ABC University's growing network of professionals and students.</p>
                      <button className="bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-2 rounded-lg font-medium transition duration-300">Learn More</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 testimonial-gradient" style={{ background: 'linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Hear from alumni and students who have experienced the power of Alumni Connect at ABC University.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-xl p-8 shadow-md">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-xl font-bold text-indigo-600">JD</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Jane Doe</h4>
                  <p className="text-gray-600 text-sm">Alumni, Class of 2015</p>
                </div>
              </div>
              <p className="text-gray-600">"Alumni Connect has allowed me to give back to ABC University by mentoring students. It's incredibly rewarding to help shape the next generation of professionals in my field."</p>
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 011.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.811-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 01-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l.2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.6911.07-3.292z"></path>
                  </svg>
                ))}
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white rounded-xl p-8 shadow-md">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-xl font-bold text-purple-600">MS</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Michael Smith</h4>
                  <p className="text-gray-600 text-sm">Current Student</p>
                </div>
              </div>
              <p className="text-gray-600">"Through Alumni Connect, I found a mentor who helped me land my dream internship. The guidance and connections I've made through this platform have been invaluable to my career journey."</p>
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-xl p-8 shadow-md">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-xl font-bold text-blue-600">RJ</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Robert Johnson</h4>
                  <p className="text-gray-600 text-sm">Alumni, Class of 2010</p>
                </div>
              </div>
              <p className="text-gray-600">"The Alumni Connect platform has helped me stay connected with my alma mater and fellow graduates. I've hired three talented students from my department through connections made here."</p>
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Have questions about Alumni Connect? We're here to help you get started.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gray-50 rounded-xl p-8 shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-indigo-100 rounded-full p-3 mr-4">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Phone</h4>
                    <p className="text-gray-600 mt-1">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-indigo-100 rounded-full p-3 mr-4">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Email</h4>
                    <p className="text-gray-600 mt-1">alumni@abcuniversity.edu</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-indigo-100 rounded-full p-3 mr-4">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Address</h4>
                    <p className="text-gray-600 mt-1">123 University Avenue<br />College Town, ST 12345</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h4 className="font-medium text-gray-900 mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="bg-indigo-100 hover:bg-indigo-200 text-indigo-600 p-3 rounded-full transition duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"></path>
                    </svg>
                  </a>
                  <a href="#" className="bg-indigo-100 hover:bg-indigo-200 text-indigo-600 p-3 rounded-full transition duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
                    </svg>
                  </a>
                  <a href="#" className="bg-indigo-100 hover:bg-indigo-200 text-indigo-600 p-3 rounded-full transition duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S17.52 0 12 0zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"></path>
                    </svg>
                  </a>
                  <a href="#" className="bg-indigo-100 hover:bg-indigo-200 text-indigo-600 p-3 rounded-full transition duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input type="text" id="firstName" name="firstName" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input type="text" id="lastName" name="lastName" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" id="email" name="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                  <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-1">I am a:</label>
                  <select id="userType" name="userType" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="">Please select</option>
                    <option value="alumni">Alumni</option>
                    <option value="student">Student</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea id="message" name="message" rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                </div>
                <div>
                  <button type="submit" className="w-full bg-indigo-600 text-white hover:bg-indigo-700 px-6 py-3 rounded-md font-medium transition duration-300">Send Message</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center mb-6">
                <svg className="h-10 w-10 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"></path>
                </svg>
                <span className="ml-2 text-xl font-bold text-white">ABC University Alumni Connect</span>
              </div>
              <p className="text-gray-400 mb-6">Bridging the gap between alumni and students to create meaningful connections and opportunities within our university community.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S17.52 0 12 0zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-400 hover:text-white transition duration-300">Home</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-white transition duration-300">About Us</a></li>
                <li><a href="#features" className="text-gray-400 hover:text-white transition duration-300">Features</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition duration-300">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates and features.</p>
              <form className="space-y-4">
                <div>
                  <input type="email" placeholder="Your email address" className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-white" />
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md font-medium transition duration-300">Subscribe</button>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">&copy; 2023 ABC University Alumni Connect. All rights reserved. Built with MERN Stack.</p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white text-sm transition duration-300">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition duration-300">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition duration-300">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AlumniConnect;