import React, { useState, useEffect, useRef } from 'react';

const InternHub = () => {
  // State for form inputs
  const [filters, setFilters] = useState({
    mainSearch: '',
    domain: '',
    location: '',
    duration: '',
    stipend: '',
    workMode: '',
    companyType: '',
    workType: '',
    eligibility: '',
    certificate: false,
    ppo: false,
    training: false
  });
  
  // State for custom inputs
  const [customInputs, setCustomInputs] = useState({
    domain: '',
    location: '',
    duration: '',
    stipend: '',
    workMode: '',
    companyType: '',
    workType: '',
    eligibility: ''
  });
  
  // State for UI controls
  const [showMainSuggestions, setShowMainSuggestions] = useState(false);
  const [showSkillsSuggestions, setShowSkillsSuggestions] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [showResults, setShowResults] = useState(true);
  
  // State for results
  const [searchResults, setSearchResults] = useState([]);
  const [displayedResults, setDisplayedResults] = useState([]);
  const [resultsPerPage] = useState(6);
  
  // State for skills
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skillsInput, setSkillsInput] = useState('');
  
  // Refs for input elements
  const mainSearchRef = useRef(null);
  const skillsInputRef = useRef(null);
  
  // Sample data
  const locations = [
    'Remote', 'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur',
    'Noida', 'Gurgaon', 'Kochi', 'Indore', 'Bhopal', 'Lucknow', 'Chandigarh', 'Coimbatore', 'Nagpur', 'Surat',
    'New York', 'London', 'Singapore', 'Dubai', 'Toronto', 'Sydney', 'Berlin', 'Tokyo', 'San Francisco', 'Boston'
  ];
  
  const allSkills = [
    // Programming Languages
    'Python', 'Java', 'JavaScript', 'C++', 'C#', 'TypeScript', 'PHP', 'Ruby', 'Go', 'Swift', 'Kotlin', 'Rust',
    
    // Web Technologies
    'HTML', 'CSS', 'React', 'Angular', 'Vue.js', 'Node.js', 'Express.js', 'Bootstrap', 'Tailwind CSS', 'SASS',
    
    // Databases
    'SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Oracle', 'SQLite', 'Cassandra', 'Elasticsearch',
    
    // Data Science & AI
    'Machine Learning', 'Data Analysis', 'Pandas', 'NumPy', 'TensorFlow', 'PyTorch', 'Power BI', 'Tableau', 'Excel',
    
    // Design & Creative
    'Photoshop', 'Figma', 'Canva', 'Illustrator', 'Sketch', 'UX Design', 'UI Design', 'InDesign',
    
    // Marketing & Business
    'Social Media Marketing', 'Content Writing', 'SEO', 'Digital Marketing', 'Project Management', 'Communication',
    
    // Cloud & DevOps
    'AWS', 'Azure', 'Google Cloud Platform', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'Ansible',
    
    // Mobile Development
    'Android Development', 'iOS Development', 'React Native', 'Flutter', 'Xamarin', 'Ionic',
    
    // Testing & Quality Assurance
    'Manual Testing', 'Automation Testing', 'Selenium', 'Cypress', 'Jest', 'Mocha', 'Chai',
    
    // Tools & Software
    'Git', 'GitHub', 'GitLab', 'Jira', 'Slack', 'Trello', 'Notion', 'VS Code', 'IntelliJ IDEA'
  ];
  
  const companies = [
    'Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Netflix', 'Tesla', 'Uber', 'Airbnb', 'Spotify',
    'TCS', 'Infosys', 'Wipro', 'Accenture', 'Cognizant', 'HCL', 'Tech Mahindra', 'Capgemini',
    'Flipkart', 'Zomato', 'Swiggy', 'Paytm', 'PhonePe', 'Razorpay', 'Freshworks', 'Zoho', 'InMobi'
  ];
  
  const jobRoles = [
    'Software Developer', 'Data Analyst', 'UI Designer', 'Marketing Specialist', 'Web Developer', 
    'Mobile Developer', 'DevOps Engineer', 'Product Manager', 'Business Analyst', 'Content Writer'
  ];
  
  const sampleInternships = [
    {
      id: 1,
      title: 'Software Development Intern',
      company: 'TechCorp Solutions',
      location: 'Bangalore',
      workMode: 'Hybrid',
      duration: '3 months',
      stipend: '₹15,000/month',
      domain: 'Software Development',
      skills: ['Python', 'Django', 'SQL'],
      type: 'startup',
      eligibility: '2nd Year+',
      certificate: true,
      ppo: true,
      deadline: '2024-02-15'
    },
    {
      id: 2,
      title: 'Data Science Intern',
      company: 'DataMinds Analytics',
      location: 'Remote',
      workMode: 'Remote',
      duration: '6 months',
      stipend: '₹20,000/month',
      domain: 'Data Science',
      skills: ['Python', 'Machine Learning', 'Pandas'],
      type: 'mnc',
      eligibility: 'Final Year',
      certificate: true,
      ppo: false,
      deadline: '2024-02-20'
    },
    {
      id: 3,
      title: 'UI/UX Design Intern',
      company: 'Creative Studios',
      location: 'Mumbai',
      workMode: 'On-site',
      duration: '2 months',
      stipend: '₹12,000/month',
      domain: 'Design/UI-UX',
      skills: ['Figma', 'Photoshop', 'User Research'],
      type: 'startup',
      eligibility: 'Any Year',
      certificate: true,
      ppo: false,
      deadline: '2024-02-10'
    },
    {
      id: 4,
      title: 'Marketing Intern',
      company: 'BrandBoost Agency',
      location: 'Delhi',
      workMode: 'Hybrid',
      duration: '3 months',
      stipend: '₹10,000/month',
      domain: 'Marketing',
      skills: ['Social Media', 'Content Writing', 'SEO'],
      type: 'startup',
      eligibility: '1st Year+',
      certificate: false,
      ppo: true,
      deadline: '2024-02-25'
    },
    {
      id: 5,
      title: 'Web Development Intern',
      company: 'WebWorks Inc',
      location: 'Hyderabad',
      workMode: 'Remote',
      duration: '4 months',
      stipend: '₹18,000/month',
      domain: 'Web Development',
      skills: ['React', 'Node.js', 'MongoDB'],
      type: 'mnc',
      eligibility: '2nd Year+',
      certificate: true,
      ppo: true,
      deadline: '2024-03-01'
    },
    {
      id: 6,
      title: 'AI/ML Research Intern',
      company: 'AI Innovations Lab',
      location: 'Chennai',
      workMode: 'On-site',
      duration: '6 months',
      stipend: '₹25,000/month',
      domain: 'AI/ML',
      skills: ['Python', 'TensorFlow', 'Deep Learning'],
      type: 'startup',
      eligibility: 'Final Year',
      certificate: true,
      ppo: true,
      deadline: '2024-02-18'
    }
  ];
  
  // Suggestions for main search
  const [mainSuggestions, setMainSuggestions] = useState([]);
  const [skillsSuggestions, setSkillsSuggestions] = useState([]);
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFilters(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [name]: value
      }));
      
      // Handle autocomplete for specific inputs
      if (name === 'mainSearch') {
        handleMainSearchChange(value);
      } else if (name === 'skillsInput') {
        handleSkillsChange(value);
      }
      
      // Handle custom input visibility
      if (value === 'others') {
        setCustomInputs(prev => ({
          ...prev,
          [name]: ''
        }));
      }
    }
  };
  
  // Handle custom input changes
  const handleCustomInputChange = (e) => {
    const { name, value } = e.target;
    setCustomInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle main search input change
  const handleMainSearchChange = (value) => {
    if (value.trim() === '') {
      setMainSuggestions([]);
      setShowMainSuggestions(false);
      return;
    }
    
    const allSuggestions = [...companies, ...allSkills, ...jobRoles];
    const matches = allSuggestions.filter(item => 
      item.toLowerCase().includes(value.toLowerCase())
    ).slice(0, 8);
    
    setMainSuggestions(matches);
    setShowMainSuggestions(true);
  };
  
  // Handle skills input change
  const handleSkillsChange = (value) => {
    setSkillsInput(value);
    
    if (value.trim() === '') {
      setSkillsSuggestions([]);
      setShowSkillsSuggestions(false);
      return;
    }
    
    const matches = allSkills.filter(skill => 
      skill.toLowerCase().includes(value.toLowerCase()) && !selectedSkills.includes(skill)
    ).slice(0, 10);
    
    setSkillsSuggestions(matches);
    setShowSkillsSuggestions(true);
  };
  
  // Handle suggestion click
  const handleSuggestionClick = (type, value) => {
    if (type === 'mainSearch') {
      setFilters(prev => ({
        ...prev,
        mainSearch: value
      }));
      setShowMainSuggestions(false);
    } else if (type === 'skill') {
      if (!selectedSkills.includes(value)) {
        setSelectedSkills(prev => [...prev, value]);
      }
      setSkillsInput('');
      setShowSkillsSuggestions(false);
    }
  };
  
  // Add skill from input
  const addSkillFromInput = () => {
    const skill = skillsInput.trim();
    if (skill && !selectedSkills.includes(skill)) {
      setSelectedSkills(prev => [...prev, skill]);
      setSkillsInput('');
      setShowSkillsSuggestions(false);
    }
  };
  
  // Remove skill
  const removeSkill = (skillToRemove) => {
    setSelectedSkills(prev => prev.filter(skill => skill !== skillToRemove));
  };
  
  // Handle clicks outside to hide suggestions
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mainSearchRef.current && !mainSearchRef.current.contains(e.target)) {
        setShowMainSuggestions(false);
      }
      
      if (skillsInputRef.current && !skillsInputRef.current.contains(e.target)) {
        setShowSkillsSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Search internships
  const searchInternships = () => {
    // Prepare filter values including custom inputs
    const preparedFilters = {
      ...filters,
      domain: filters.domain === 'others' ? customInputs.domain : filters.domain,
      location: filters.location === 'others' ? customInputs.location : filters.location,
      duration: filters.duration === 'others' ? customInputs.duration : filters.duration,
      stipend: filters.stipend === 'others' ? customInputs.stipend : filters.stipend,
      workMode: filters.workMode === 'others' ? customInputs.workMode : filters.workMode,
      companyType: filters.companyType === 'others' ? customInputs.companyType : filters.companyType,
      workType: filters.workType === 'others' ? customInputs.workType : filters.workType,
      eligibility: filters.eligibility === 'others' ? customInputs.eligibility : filters.eligibility,
      skills: selectedSkills.join(',')
    };
    
    const results = filterInternships(sampleInternships, preparedFilters);
    setSearchResults(results);
    setDisplayedResults(results.slice(0, resultsPerPage));
    setShowResults(true);
    
    // Update active filters
    const active = [];
    Object.entries(preparedFilters).forEach(([key, value]) => {
      if (value && value !== '' && value !== false) {
        active.push({ key, value });
      }
    });
    setActiveFilters(active);
  };
  
  // Filter internships based on filters
  const filterInternships = (internships, filters) => {
    return internships.filter(internship => {
      // Main search filter
      if (filters.mainSearch) {
        const searchTerm = filters.mainSearch.toLowerCase();
        const searchableText = `${internship.title} ${internship.company} ${internship.skills.join(' ')}`.toLowerCase();
        if (!searchableText.includes(searchTerm)) return false;
      }
      
      // Domain filter
      if (filters.domain && !internship.domain.toLowerCase().includes(filters.domain.toLowerCase())) return false;
      
      // Location filter
      if (filters.location && !internship.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
      
      // Duration filter
      if (filters.duration && filters.duration !== 'flexible') {
        const durationNum = parseInt(internship.duration);
        if (durationNum !== parseInt(filters.duration)) return false;
      }
      
      // Work mode filter
      if (filters.workMode && internship.workMode.toLowerCase() !== filters.workMode.toLowerCase()) return false;
      
      // Company type filter
      if (filters.companyType && internship.type !== filters.companyType) return false;
      
      // Skills filter
      if (filters.skills) {
        const requiredSkills = filters.skills.toLowerCase().split(',').map(s => s.trim()).filter(s => s);
        const internshipSkills = internship.skills.map(s => s.toLowerCase());
        if (!requiredSkills.some(skill => internshipSkills.some(iSkill => iSkill.includes(skill)))) return false;
      }
      
      // Certificate filter
      if (filters.certificate && !internship.certificate) return false;
      
      // PPO filter
      if (filters.ppo && !internship.ppo) return false;
      
      return true;
    });
  };
  
  // Remove filter
  const removeFilter = (key) => {
    setFilters(prev => ({
      ...prev,
      [key]: key === 'certificate' || key === 'ppo' || key === 'training' ? false : ''
    }));
    
    // Reset custom input if needed
    if (customInputs[key]) {
      setCustomInputs(prev => ({
        ...prev,
        [key]: ''
      }));
    }
    
    // Reset skills if needed
    if (key === 'skills') {
      setSelectedSkills([]);
    }
    
    // Re-run search
    searchInternships();
  };
  
  // Load more results
  const loadMoreResults = () => {
    const currentLength = displayedResults.length;
    const newResults = searchResults.slice(currentLength, currentLength + resultsPerPage);
    setDisplayedResults(prev => [...prev, ...newResults]);
  };
  
  // Apply to internship
  const applyToInternship = (internshipId) => {
    alert(`Application submitted for internship ID: ${internshipId}! You'll receive a confirmation email shortly.`);
  };
  
  // Handle sort change
  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    setSortBy(sortValue);
    
    const sortedResults = [...searchResults];
    
    sortedResults.sort((a, b) => {
      switch(sortValue) {
        case 'date':
          return new Date(b.deadline) - new Date(a.deadline);
        case 'stipend':
          const aStipend = parseInt(a.stipend.replace(/[^\d]/g, '')) || 0;
          const bStipend = parseInt(b.stipend.replace(/[^\d]/g, '')) || 0;
          return bStipend - aStipend;
        case 'duration':
          return parseInt(a.duration) - parseInt(b.duration);
        default:
          return 0;
      }
    });
    
    setSearchResults(sortedResults);
    setDisplayedResults(sortedResults.slice(0, resultsPerPage));
  };
  
  // Initialize with sample results on component mount
  useEffect(() => {
    setSearchResults(sampleInternships);
    setDisplayedResults(sampleInternships.slice(0, resultsPerPage));
  }, []);
  
  // Custom input visibility
  const shouldShowCustomInput = (filterName) => {
    return filters[filterName] === 'others';
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"></path>
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">InternHub</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 font-medium">Find Your Perfect Internship</span>
            </div>
          </div>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Find Your Perfect Internship</h2>
          
          {/* Main Search Bar */}
          <div className="mb-6">
            <div className="relative" ref={mainSearchRef}>
              <input
                type="text"
                name="mainSearch"
                value={filters.mainSearch}
                onChange={handleInputChange}
                placeholder="Search by company, role, or skills..."
                className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none pl-12"
              />
              <svg className="w-6 h-6 text-gray-400 absolute left-4 top-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              {showMainSuggestions && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                  {mainSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                      onClick={() => handleSuggestionClick('mainSearch', suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))}
                  <div
                    className="px-4 py-2 cursor-pointer text-sm border-t border-gray-200 text-blue-600 font-medium hover:bg-gray-100"
                    onClick={() => {
                      setShowMainSuggestions(false);
                      mainSearchRef.current?.focus();
                    }}
                  >
                    ✏ Others (Type your own)
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Filter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Domain Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Domain/Field</label>
              <div className="relative">
                <select
                  name="domain"
                  value={filters.domain}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Any Domain</option>
                  <option value="software">Software Development</option>
                  <option value="web">Web Development</option>
                  <option value="data">Data Science</option>
                  <option value="ai">AI/ML</option>
                  <option value="cyber">Cybersecurity</option>
                  <option value="marketing">Marketing</option>
                  <option value="hr">HR</option>
                  <option value="finance">Finance</option>
                  <option value="business">Business Development</option>
                  <option value="content">Content Writing</option>
                  <option value="design">Design/UI-UX</option>
                  <option value="mechanical">Mechanical</option>
                  <option value="civil">Civil</option>
                  <option value="electronics">Electronics</option>
                  <option value="others">Others (Specify your domain)</option>
                </select>
                {shouldShowCustomInput('domain') && (
                  <input
                    type="text"
                    name="domain"
                    value={customInputs.domain}
                    onChange={handleCustomInputChange}
                    placeholder="Enter your custom domain..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none mt-2"
                  />
                )}
              </div>
            </div>
            
            {/* Location Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Location</label>
              <div className="relative">
                <select
                  name="location"
                  value={filters.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Any Location</option>
                  <option value="remote">Remote</option>
                  <optgroup label="Maharashtra">
                    <option value="mumbai">Mumbai</option>
                    <option value="pune">Pune</option>
                    <option value="nagpur">Nagpur</option>
                    <option value="nashik">Nashik</option>
                  </optgroup>
                  <optgroup label="Karnataka">
                    <option value="bangalore">Bangalore</option>
                    <option value="mysore">Mysore</option>
                    <option value="mangalore">Mangalore</option>
                  </optgroup>
                  <optgroup label="Delhi NCR">
                    <option value="delhi">Delhi</option>
                    <option value="noida">Noida</option>
                    <option value="gurgaon">Gurgaon</option>
                    <option value="faridabad">Faridabad</option>
                  </optgroup>
                  <optgroup label="International">
                    <option value="newyork">New York, USA</option>
                    <option value="london">London, UK</option>
                    <option value="singapore">Singapore</option>
                    <option value="dubai">Dubai, UAE</option>
                    <option value="toronto">Toronto, Canada</option>
                    <option value="sydney">Sydney, Australia</option>
                    <option value="berlin">Berlin, Germany</option>
                    <option value="tokyo">Tokyo, Japan</option>
                  </optgroup>
                  <option value="others">Others (Specify your location)</option>
                </select>
                {shouldShowCustomInput('location') && (
                  <input
                    type="text"
                    name="location"
                    value={customInputs.location}
                    onChange={handleCustomInputChange}
                    placeholder="Enter your custom location..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none mt-2"
                  />
                )}
              </div>
            </div>
            
            {/* Duration Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Duration</label>
              <div className="relative">
                <select
                  name="duration"
                  value={filters.duration}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Any Duration</option>
                  <option value="1">1 month</option>
                  <option value="2">2 months</option>
                  <option value="3">3 months</option>
                  <option value="6">6 months</option>
                  <option value="flexible">Flexible</option>
                  <option value="others">Others (Specify duration)</option>
                </select>
                {shouldShowCustomInput('duration') && (
                  <input
                    type="text"
                    name="duration"
                    value={customInputs.duration}
                    onChange={handleCustomInputChange}
                    placeholder="Enter custom duration (e.g., 4 months, 1 year)..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none mt-2"
                  />
                )}
              </div>
            </div>
            
            {/* Stipend Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Stipend</label>
              <div className="relative">
                <select
                  name="stipend"
                  value={filters.stipend}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Any Stipend</option>
                  <option value="unpaid">Unpaid</option>
                  <option value="5000">Minimum ₹5,000/month</option>
                  <option value="10000">Minimum ₹10,000/month</option>
                  <option value="15000">Minimum ₹15,000/month</option>
                  <option value="20000">Minimum ₹20,000/month</option>
                  <option value="flexible">Flexible</option>
                  <option value="others">Others (Specify amount)</option>
                </select>
                {shouldShowCustomInput('stipend') && (
                  <input
                    type="text"
                    name="stipend"
                    value={customInputs.stipend}
                    onChange={handleCustomInputChange}
                    placeholder="Enter custom stipend (e.g., ₹25,000/month, $500/month)..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none mt-2"
                  />
                )}
              </div>
            </div>
            
            {/* Work Mode Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Work Mode</label>
              <div className="relative">
                <select
                  name="workMode"
                  value={filters.workMode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Any Mode</option>
                  <option value="remote">Remote</option>
                  <option value="onsite">On-site</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="others">Others (Specify work mode)</option>
                </select>
                {shouldShowCustomInput('workMode') && (
                  <input
                    type="text"
                    name="workMode"
                    value={customInputs.workMode}
                    onChange={handleCustomInputChange}
                    placeholder="Enter custom work mode..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none mt-2"
                  />
                )}
              </div>
            </div>
            
            {/* Company Type Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Company Type</label>
              <div className="relative">
                <select
                  name="companyType"
                  value={filters.companyType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Any Company</option>
                  <option value="startup">Startup</option>
                  <option value="mnc">MNC</option>
                  <option value="ngo">NGO</option>
                  <option value="government">Government</option>
                  <option value="others">Others (Specify company type)</option>
                </select>
                {shouldShowCustomInput('companyType') && (
                  <input
                    type="text"
                    name="companyType"
                    value={customInputs.companyType}
                    onChange={handleCustomInputChange}
                    placeholder="Enter custom company type..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none mt-2"
                  />
                )}
              </div>
            </div>
          </div>
          
          {/* Additional Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {/* Work Type Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Work Type</label>
              <div className="relative">
                <select
                  name="workType"
                  value={filters.workType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Any Type</option>
                  <option value="fulltime">Full-time</option>
                  <option value="parttime">Part-time</option>
                  <option value="flexible">Flexible hours</option>
                  <option value="others">Others (Specify work type)</option>
                </select>
                {shouldShowCustomInput('workType') && (
                  <input
                    type="text"
                    name="workType"
                    value={customInputs.workType}
                    onChange={handleCustomInputChange}
                    placeholder="Enter custom work type..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none mt-2"
                  />
                )}
              </div>
            </div>
            
            {/* Eligibility Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Eligibility</label>
              <div className="relative">
                <select
                  name="eligibility"
                  value={filters.eligibility}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                >
                  <option value="">Any Year</option>
                  <option value="1st">1st Year</option>
                  <option value="2nd">2nd Year</option>
                  <option value="3rd">3rd Year</option>
                  <option value="final">Final Year</option>
                  <option value="others">Others (Specify eligibility)</option>
                </select>
                {shouldShowCustomInput('eligibility') && (
                  <input
                    type="text"
                    name="eligibility"
                    value={customInputs.eligibility}
                    onChange={handleCustomInputChange}
                    placeholder="Enter custom eligibility (e.g., Graduate, MBA, PhD)..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none mt-2"
                  />
                )}
              </div>
            </div>
            
            {/* Skills Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Skills</label>
              <div className="relative" ref={skillsInputRef}>
                <input
                  type="text"
                  name="skillsInput"
                  value={skillsInput}
                  onChange={handleInputChange}
                  placeholder="Search and add skills..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none pr-12"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkillFromInput();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={addSkillFromInput}
                  className="absolute right-3 top-3 text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Add
                </button>
                {showSkillsSuggestions && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
                    {skillsSuggestions.map((skill, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                        onClick={() => handleSuggestionClick('skill', skill)}
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2"
                    >
                      <span>{skill}</span>
                      <button
                        onClick={() => removeSkill(skill)}
                        className="text-blue-600 hover:text-blue-800 ml-1 text-lg leading-none"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional Preferences */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Additional Preferences</label>
            <div className="flex flex-wrap gap-3">
              <label className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                <input
                  type="checkbox"
                  name="certificate"
                  checked={filters.certificate}
                  onChange={handleInputChange}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium">Certificate Provided</span>
              </label>
              <label className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                <input
                  type="checkbox"
                  name="ppo"
                  checked={filters.ppo}
                  onChange={handleInputChange}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium">PPO Chance</span>
              </label>
              <label className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                <input
                  type="checkbox"
                  name="training"
                  checked={filters.training}
                  onChange={handleInputChange}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium">Training Included</span>
              </label>
            </div>
          </div>
          
          {/* Search Button */}
          <div className="mt-8 text-center">
            <button
              onClick={searchInternships}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-4 rounded-xl font-semibold text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              🔍 Search Internships
            </button>
          </div>
          
          {/* Active Filters Display */}
          {activeFilters.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Active Filters:</h3>
              <div className="flex flex-wrap gap-2">
                {activeFilters.map((filter, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2 transition-transform hover:scale-105"
                  >
                    <span>{filter.key}: {filter.value}</span>
                    <button
                      onClick={() => removeFilter(filter.key)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Results Section */}
        {showResults && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Search Results</h3>
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">{searchResults.length} internships found</span>
                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                >
                  <option value="relevance">Sort by Relevance</option>
                  <option value="date">Latest First</option>
                  <option value="stipend">Highest Stipend</option>
                  <option value="duration">Duration</option>
                </select>
              </div>
            </div>
            
            {/* Internship Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedResults.map(internship => (
                <div
                  key={internship.id}
                  className="internship-card bg-white rounded-xl shadow-lg p-6 border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{internship.title}</h3>
                      <p className="text-blue-600 font-semibold">{internship.company}</p>
                    </div>
                    <div className="flex space-x-1">
                      {internship.certificate && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Certificate</span>
                      )}
                      {internship.ppo && (
                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">PPO</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      <span className="text-sm">{internship.location} • {internship.workMode}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span className="text-sm">{internship.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                      </svg>
                      <span className="text-sm font-semibold text-green-600">{internship.stipend}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {internship.skills.map(skill => (
                        <span key={skill} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Deadline: {internship.deadline}</span>
                    <button
                      onClick={() => applyToInternship(internship.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Load More Button */}
            {displayedResults.length < searchResults.length && (
              <div className="text-center mt-8">
                <button
                  onClick={loadMoreResults}
                  className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg font-semibold"
                >
                  Load More Results
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InternHub;