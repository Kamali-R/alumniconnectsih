import React, { useState } from "react";

// Ensure Tailwind CSS is set up in your project
// Add the Poppins font in your index.html or via @import in CSS

const AlumniConnectHome = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Custom styles for gradients and hover effects
  React.useEffect(() => {
    document.body.style.fontFamily = "'Poppins', sans-serif";
    document.body.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div className="bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                {/* Logo SVG */}
                <svg className="h-10 w-10 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 
18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"></path>
                </svg>
                <span className="ml-2 text-xl font-bold text-gray-800">ABC University Alumni Connect</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-indigo-600 px-3 py-2 font-medium">Home</a>
              <a href="#about" className="text-gray-700 hover:text-indigo-600 px-3 py-2 font-medium">About</a>
              <a href="#features" className="text-gray-700 hover:text-indigo-600 px-3 py-2 font-medium">Features</a>
              <a href="#contact" className="text-gray-700 hover:text-indigo-600 px-3 py-2 font-medium">Contact</a>
              <div className="flex items-center space-x-2">
                <button className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-4 py-2 rounded-md font-medium transition duration-300">Login</button>
                <button className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md font-medium transition duration-300">Register</button>
              </div>
            </div>
            <div className="md:hidden flex items-center">
              <button
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setMobileMenuOpen((open) => !open)}
                aria-label="Open mobile menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#home" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">Home</a>
              <a href="#about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">About</a>
              <a href="#features" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">Features</a>
              <a href="#contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">Contact</a>
              <div className="flex flex-col space-y-2 pt-2">
                <button className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-4 py-2 rounded-md font-medium transition duration-300">Login</button>
                <button className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md font-medium transition duration-300">Register</button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="pt-28 pb-20"
        style={{
          background: "linear-gradient(135deg, #4f46e5 0%, #7e22ce 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                Connect with your ABC University community
              </h1>
              <p className="text-indigo-100 text-lg mb-8">
                Alumni Connect brings together students and alumni in one powerful platform to foster mentorship, networking, and lifelong connections within our university community.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="bg-white text-indigo-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium text-lg shadow-lg transition duration-300">
                  Get Started
                </button>
                <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-indigo-700 px-6 py-3 rounded-lg font-medium text-lg transition duration-300">
                  Learn More
                </button>
              </div>
            </div>
            <div className="md:w-1/2">
              {/* Hero Illustration SVG */}
              <svg className="w-full h-auto" viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
                <rect x="50" y="50" width="400" height="300" rx="20" fill="#f0f4ff" />
                <circle cx="250" cy="150" r="60" fill="#c7d2fe" />
                <rect x="100" y="250" width="300" height="40" rx="8" fill="#a5b4fc" />
                <rect x="150" y="310" width="200" height="20" rx="4" fill="#818cf8" />
                <path d="M220,130 Q250,100 280,130 Q300,150 280,170 Q250,200 220,170 Q200,150 220,130" fill="#4f46e5" />
                <circle cx="235" cy="140" r="5" fill="white" />
                <circle cx="265" cy="140" r="5" fill="white" />
                <path d="M235,160 Q250,175 265,160" stroke="white" strokeWidth="3" fill="none" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-16 bg-white" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Who Benefits from Alumni Connect?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform serves both alumni and current students with tailored features to enhance their experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Alumni Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="bg-indigo-600 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Alumni</h3>
              <p className="text-gray-600 mb-6">
                Stay connected with your alma mater, mentor current students, share job opportunities, and network with fellow graduates from ABC University.
              </p>
              <ul className="space-y-2 mb-6">
                {["Mentorship opportunities", "Job posting privileges", "Alumni-exclusive events"].map((item, idx) => (
                  <li className="flex items-center" key={idx}>
                    <svg className="w-5 h-5 text-indigo-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button className="bg-indigo-600 text-white hover:bg-indigo-700 px-6 py-2 rounded-lg font-medium transition duration-300 w-full">
                Alumni Portal
              </button>
            </div>
            {/* Student Card */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="bg-purple-600 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Students</h3>
              <p className="text-gray-600 mb-6">
                Connect with successful ABC University alumni, find mentors in your field, discover internships, and prepare for your career journey.
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  { text: "Career guidance", color: "purple-600" },
                  { text: "Internship opportunities", color: "purple-600" },
                  { text: "Networking workshops", color: "purple-600" },
                ].map((item, idx) => (
                  <li className="flex items-center" key={idx}>
                    <svg className={`w-5 h-5 text-${item.color} mr-2`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
              <button className="bg-purple-600 text-white hover:bg-purple-700 px-6 py-2 rounded-lg font-medium transition duration-300 w-full">
                Student Portal
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Special Features</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover the powerful tools that make Alumni Connect the ultimate platform for our university community.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl p-8 shadow-md transition-all duration-300 hover:shadow-xl">
              <div className="bg-indigo-100 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Mentorship Matching</h3>
              <p className="text-gray-600">
                Our system connects students with alumni mentors based on career interests, skills, and goals for personalized guidance.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white rounded-xl p-8 shadow-md transition-all duration-300 hover:shadow-xl">
              <div className="bg-purple-100 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path>
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community Forums</h3>
              <p className="text-gray-600">
                Engage in discussions, ask questions, and share insights with specialized forums for different fields and interests.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white rounded-xl p-8 shadow-md transition-all duration-300 hover:shadow-xl">
              <div className="bg-teal-100 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                {/* You may need to add the actual SVG for the third feature here */}
                <svg className="w-7 h-7 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8" />
                  <path d="M10 6v4l3 3" stroke="#fff" strokeWidth="2" fill="none" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Events & Opportunities</h3>
              <p className="text-gray-600">
                Stay updated with exclusive events, job postings, and networking opportunities tailored for ABC University’s community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section (You can add your own content here) */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-lg text-gray-600 mb-6">
            Have questions or want to get involved? Reach out to our alumni office at <a href="mailto:alumni@abcuniversity.edu" className="text-indigo-600 underline">alumni@abcuniversity.edu</a>
          </p>
          <button className="bg-indigo-600 text-white hover:bg-indigo-700 px-6 py-3 rounded-lg font-medium transition duration-300">
            Send a Message
          </button>
        </div>
      </section>
    </div>
  );
};

export default AlumniConnectHome;
