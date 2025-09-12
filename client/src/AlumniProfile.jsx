import React, { useState, useRef, useEffect } from 'react';
import { 
  FaUser, FaVenusMars, FaCalendar, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaGraduationCap, FaUniversity, FaIdCard, FaCertificate, FaCodeBranch, FaCalendarAlt,
  FaBriefcase, FaTools, FaStar, FaUserEdit, FaGlobe, FaUpload, FaShieldAlt, FaInfoCircle,
  FaPlus, FaTimes, FaArrowRight, FaCheckCircle, FaWrench, FaHeart, FaDollarSign
} from 'react-icons/fa';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const AlumniConnectProfile = () => {
  // Personal Information State
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    gender: '',
    dob: '',
    personalEmail: '',
    phone: '',
    location: ''
  });
  // Academic Information State
  const [academicInfo, setAcademicInfo] = useState({
    collegeEmail: '',
    enrollmentNumber: '',
    degree: '',
    branch: '',
    graduationYear: ''
  });
  // Professional Information State
  const [professionalInfo, setProfessionalInfo] = useState({
    employmentStatus: '',
    salaryRange: ''
  });
  // Other Information State
  const [otherInfo, setOtherInfo] = useState({
    bio: '',
    linkedin: '',
    github: '',
    portfolio: '',
    termsAccept: false,
    emailConsent: false
  });
  // Dynamic sections state
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [resumeFile, setResumeFile] = useState(null);
  // Dropdown states
  const [skillInput, setSkillInput] = useState('');
  const [interestInput, setInterestInput] = useState('');
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);
  const [showInterestDropdown, setShowInterestDropdown] = useState(false);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [filteredInterests, setFilteredInterests] = useState([]);
  
  // Location dropdown states
  const [locationInput, setLocationInput] = useState('');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState([]);
  
  // Refs
  const fileInputRef = useRef(null);
  
  // Options for dropdowns
  const branchOptions = [
    'Computer Science',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Chemical Engineering',
    'Aerospace Engineering',
    'Biotechnology',
    'Information Technology',
    'Electronics and Communication',
    'Instrumentation Engineering',
    'Production Engineering',
    'Metallurgical Engineering',
    'Mining Engineering',
    'Petroleum Engineering',
    'Biomedical Engineering',
    'Environmental Engineering',
    'Industrial Engineering',
    'Agricultural Engineering',
    'Marine Engineering',
    'Nuclear Engineering',
    'Business Administration',
    'Economics',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'English Literature',
    'History',
    'Psychology',
    'Sociology',
    'Philosophy',
    'Fine Arts',
    'Performing Arts',
    'Architecture',
    'Pharmacy',
    'Medicine',
    'Dentistry',
    'Nursing',
    'Public Health',
    'Law',
    'Education',
    'Journalism',
    'Hospitality Management',
    'Other'
  ];
  
  const locationOptions = [
    'Karur, Tamil Nadu, India',
    'Chennai, Tamil Nadu, India',
    'Coimbatore, Tamil Nadu, India',
    'Madurai, Tamil Nadu, India',
    'Salem, Tamil Nadu, India',
    'Tiruchirappalli, Tamil Nadu, India',
    'Bangalore, Karnataka, India',
    'Mysore, Karnataka, India',
    'Hubli, Karnataka, India',
    'Mangalore, Karnataka, India',
    'Mumbai, Maharashtra, India',
    'Pune, Maharashtra, India',
    'Nagpur, Maharashtra, India',
    'Nashik, Maharashtra, India',
    'Delhi, Delhi, India',
    'New Delhi, Delhi, India',
    'Gurgaon, Haryana, India',
    'Faridabad, Haryana, India',
    'Kolkata, West Bengal, India',
    'Howrah, West Bengal, India',
    'Hyderabad, Telangana, India',
    'Secunderabad, Telangana, India',
    'Ahmedabad, Gujarat, India',
    'Surat, Gujarat, India',
    'Vadodara, Gujarat, India',
    'Jaipur, Rajasthan, India',
    'Jodhpur, Rajasthan, India',
    'Udaipur, Rajasthan, India',
    'Lucknow, Uttar Pradesh, India',
    'Kanpur, Uttar Pradesh, India',
    'Agra, Uttar Pradesh, India',
    'Patna, Bihar, India',
    'Gaya, Bihar, India',
    'Bhopal, Madhya Pradesh, India',
    'Indore, Madhya Pradesh, India',
    'Chandigarh, Punjab, India',
    'Amritsar, Punjab, India',
    'Dehradun, Uttarakhand, India',
    'Rishikesh, Uttarakhand, India',
    'Guwahati, Assam, India',
    'Shillong, Meghalaya, India',
    'Bhubaneswar, Odisha, India',
    'Ranchi, Jharkhand, India',
    'Thiruvananthapuram, Kerala, India',
    'Kochi, Kerala, India',
    'Goa, Goa, India',
    'Puducherry, Puducherry, India',
    'Andaman and Nicobar Islands, Andaman and Nicobar Islands, India',
    'Lakshadweep, Lakshadweep, India',
    'Daman and Diu, Daman and Diu, India',
    'Dadra and Nagar Haveli, Dadra and Nagar Haveli, India',
    'Ladakh, Ladakh, India',
    'Jammu and Kashmir, Jammu and Kashmir, India',
    'New York, New York, USA',
    'Los Angeles, California, USA',
    'Chicago, Illinois, USA',
    'Houston, Texas, USA',
    'Phoenix, Arizona, USA',
    'Philadelphia, Pennsylvania, USA',
    'San Antonio, Texas, USA',
    'San Diego, California, USA',
    'Dallas, Texas, USA',
    'San Jose, California, USA',
    'Austin, Texas, USA',
    'Jacksonville, Florida, USA',
    'London, England, United Kingdom',
    'Birmingham, England, United Kingdom',
    'Manchester, England, United Kingdom',
    'Glasgow, Scotland, United Kingdom',
    'Liverpool, England, United Kingdom',
    'Edinburgh, Scotland, United Kingdom',
    'Leeds, England, United Kingdom',
    'Sheffield, England, United Kingdom',
    'Bristol, England, United Kingdom',
    'Toronto, Ontario, Canada',
    'Montreal, Quebec, Canada',
    'Vancouver, British Columbia, Canada',
    'Calgary, Alberta, Canada',
    'Edmonton, Alberta, Canada',
    'Ottawa, Ontario, Canada',
    'Sydney, New South Wales, Australia',
    'Melbourne, Victoria, Australia',
    'Brisbane, Queensland, Australia',
    'Perth, Western Australia, Australia',
    'Adelaide, South Australia, Australia',
    'Canberra, Australian Capital Territory, Australia',
    'Gold Coast, Queensland, Australia',
    'Newcastle, New South Wales, Australia',
    'Central Coast, New South Wales, Australia',
    'Singapore, Singapore, Singapore',
    'Dubai, Dubai, United Arab Emirates',
    'Abu Dhabi, Abu Dhabi, United Arab Emirates',
    'Sharjah, Sharjah, United Arab Emirates',
    'Tokyo, Tokyo, Japan',
    'Osaka, Osaka, Japan',
    'Kyoto, Kyoto, Japan',
    'Yokohama, Kanagawa, Japan',
    'Nagoya, Aichi, Japan',
    'Sapporo, Hokkaido, Japan',
    'Kobe, Hyogo, Japan',
    'Fukuoka, Fukuoka, Japan'
  ];
  
  const skillSuggestions = [
    'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'Angular', 'Vue.js', 'TypeScript',
    'HTML/CSS', 'SQL', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes', 'Git',
    'Project Management', 'Agile/Scrum', 'Leadership', 'Communication', 'Problem Solving',
    'Data Analysis', 'Machine Learning', 'Artificial Intelligence', 'Cybersecurity',
    'Digital Marketing', 'Content Writing', 'Graphic Design', 'UI/UX Design', 'Photography',
    'Sales', 'Customer Service', 'Business Analysis', 'Financial Analysis', 'Accounting',
    'C++', 'C#', 'PHP', 'Ruby', 'Swift', 'Kotlin', 'Go', 'Rust', 'Scala', 'Perl',
    'MATLAB', 'R', 'SPSS', 'Excel', 'Tableau', 'Power BI', 'SAS', 'TensorFlow',
    'PyTorch', 'Natural Language Processing', 'Computer Vision', 'Deep Learning',
    'Blockchain', 'Solidity', 'Web3', 'DevOps', 'CI/CD', 'Terraform', 'Ansible',
    'Jenkins', 'Microservices', 'RESTful APIs', 'GraphQL', 'Firebase', 'MongoDB Atlas',
    'Redis', 'Elasticsearch', 'Kafka', 'RabbitMQ', 'Network Security', 'Penetration Testing',
    'Ethical Hacking', 'Cloud Security', 'Identity Management', 'Risk Assessment',
    'Adobe Creative Suite', 'Figma', 'Sketch', 'InVision', 'User Research', 'Prototyping',
    'Wireframing', 'Information Architecture', 'Interaction Design', 'Visual Design',
    'SEO', 'SEM', 'Social Media Marketing', 'Email Marketing', 'Content Strategy',
    'Copywriting', 'Brand Management', 'Public Relations', 'Event Planning', 'Salesforce',
    'HubSpot', 'Market Research', 'A/B Testing', 'Conversion Optimization', 'Google Analytics',
    'Financial Modeling', 'Valuation', 'Budgeting', 'Forecasting', 'Risk Management',
    'Audit', 'Tax Preparation', 'QuickBooks', 'SAP', 'Oracle', 'Financial Reporting',
    'Strategic Planning', 'Business Development', 'Partnership Management', 'Contract Negotiation',
    'Team Building', 'Public Speaking', 'Presentation Skills', 'Time Management', 'Conflict Resolution',
    'Critical Thinking', 'Decision Making', 'Adaptability', 'Creativity', 'Emotional Intelligence'
  ];
  
  const interestSuggestions = [
    'Technology', 'Artificial Intelligence', 'Machine Learning', 'Data Science', 'Cybersecurity',
    'Web Development', 'Mobile Development', 'Cloud Computing', 'DevOps', 'Blockchain',
    'Entrepreneurship', 'Startups', 'Innovation', 'Leadership', 'Management', 'Consulting',
    'Finance', 'Investment', 'Marketing', 'Digital Marketing', 'Social Media', 'Content Creation',
    'Design', 'User Experience', 'Photography', 'Video Production', 'Writing', 'Blogging',
    'Travel', 'Sports', 'Fitness', 'Music', 'Art', 'Reading', 'Gaming', 'Cooking',
    'Volunteering', 'Social Impact', 'Sustainability', 'Environment', 'Education', 'Research',
    'Healthcare', 'Biotechnology', 'Pharmaceuticals', 'Mental Health', 'Wellness',
    'Film', 'Theater', 'Dance', 'Fashion', 'Interior Design', 'Architecture',
    'History', 'Philosophy', 'Politics', 'Economics', 'Psychology', 'Sociology',
    'Science', 'Space Exploration', 'Astronomy', 'Physics', 'Chemistry', 'Biology',
    'Engineering', 'Robotics', 'Automotive', 'Aviation', 'Renewable Energy', 'Sustainability',
    'Agriculture', 'Food Science', 'Nutrition', 'Culinary Arts', 'Wine', 'Craft Beer',
    'Outdoor Activities', 'Hiking', 'Camping', 'Cycling', 'Running', 'Swimming',
    'Yoga', 'Meditation', 'Mindfulness', 'Personal Development', 'Coaching', 'Mentoring'
  ];
  
  // Handle input changes
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAcademicInfoChange = (e) => {
    const { name, value } = e.target;
    setAcademicInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleProfessionalInfoChange = (e) => {
    const { name, value } = e.target;
    setProfessionalInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleOtherInfoChange = (e) => {
    const { name, value, type, checked } = e.target;
    setOtherInfo(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };
  
  // Experience management
  const addExperience = () => {
    const newExperience = {
      id: Date.now(),
      company: '',
      title: '',
      location: '',
      duration: '',
      description: ''
    };
    setExperiences(prev => [...prev, newExperience]);
  };
  
  const removeExperience = (id) => {
    setExperiences(prev => prev.filter(exp => exp.id !== id));
  };
  
  const handleExperienceChange = (id, field, value) => {
    setExperiences(prev => 
      prev.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };
  
  // Skills management
  const handleSkillInputChange = (e) => {
    const value = e.target.value;
    setSkillInput(value);
    
    if (value.trim() === '') {
      setShowSkillDropdown(false);
      return;
    }
    
    const filtered = skillSuggestions.filter(skill => 
      skill.toLowerCase().startsWith(value.toLowerCase()) && 
      !skills.includes(skill)
    );
    
    setFilteredSkills(filtered.slice(0, 8));
    setShowSkillDropdown(true);
  };
  
  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills(prev => [...prev, skillInput.trim()]);
      setSkillInput('');
      setShowSkillDropdown(false);
    }
  };
  
  const removeSkill = (skill) => {
    setSkills(prev => prev.filter(s => s !== skill));
  };
  
  const selectSkill = (skill) => {
    if (!skills.includes(skill)) {
      setSkills(prev => [...prev, skill]);
    }
    setSkillInput('');
    setShowSkillDropdown(false);
  };
  
  // Interests management
  const handleInterestInputChange = (e) => {
    const value = e.target.value;
    setInterestInput(value);
    
    if (value.trim() === '') {
      setShowInterestDropdown(false);
      return;
    }
    
    const filtered = interestSuggestions.filter(interest => 
      interest.toLowerCase().startsWith(value.toLowerCase()) && 
      !interests.includes(interest)
    );
    
    setFilteredInterests(filtered.slice(0, 8));
    setShowInterestDropdown(true);
  };
  
  const addInterest = () => {
    if (interestInput.trim() && !interests.includes(interestInput.trim())) {
      setInterests(prev => [...prev, interestInput.trim()]);
      setInterestInput('');
      setShowInterestDropdown(false);
    }
  };
  
  const removeInterest = (interest) => {
    setInterests(prev => prev.filter(i => i !== interest));
  };
  
  const selectInterest = (interest) => {
    if (!interests.includes(interest)) {
      setInterests(prev => [...prev, interest]);
    }
    setInterestInput('');
    setShowInterestDropdown(false);
  };
  
  // Location management
  const handleLocationInputChange = (e) => {
    const value = e.target.value;
    setLocationInput(value);
    setPersonalInfo(prev => ({ ...prev, location: value }));
    
    if (value.trim() === '') {
      setShowLocationDropdown(false);
      return;
    }
    
    const filtered = locationOptions.filter(location => 
      location.toLowerCase().includes(value.toLowerCase())
    );
    
    setFilteredLocations(filtered.slice(0, 8));
    setShowLocationDropdown(true);
  };
  
  const selectLocation = (location) => {
    setLocationInput(location);
    setPersonalInfo(prev => ({ ...prev, location }));
    setShowLocationDropdown(false);
  };
  
  // File upload handling
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  
  const removeResumeFile = () => {
    setResumeFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    const requiredFields = [
      ...Object.values(personalInfo),
      ...Object.values(academicInfo),
      professionalInfo.employmentStatus,
      otherInfo.termsAccept
    ];
    
    if (requiredFields.some(field => field === '' || field === false)) {
      alert('Please fill in all required fields marked with *');
      return;
    }
    
    // Form data
    const formData = {
      personalInfo,
      academicInfo,
      professionalInfo,
      otherInfo,
      experiences,
      skills,
      interests,
      resumeFile
    };
    
    console.log('Form submitted:', formData);
    alert('Registration successful!');
    // Here you would typically send the data to a server
  };
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowSkillDropdown(false);
      setShowInterestDropdown(false);
      setShowLocationDropdown(false);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  
  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Alumni Profile Setup</h1>
          <p className="text-lg text-gray-600">Complete your profile to connect with the alumni network</p>
        </div>
        
        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-12">
          
          {/* Section 1: Personal Information */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-blue-100 p-3 rounded-full">
                <FaUser className="text-blue-600 text-xl" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Personal Information</h2>
            </div>
            <div className="section-divider mb-8"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    name="fullName"
                    value={personalInfo.fullName}
                    onChange={handlePersonalInfoChange}
                    required 
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl input-focus transition-all duration-200" 
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Gender *</label>
                <div className="relative">
                  <FaVenusMars className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select 
                    name="gender"
                    value={personalInfo.gender}
                    onChange={handlePersonalInfoChange}
                    required 
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl input-focus transition-all duration-200 appearance-none bg-white"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Date of Birth *</label>
                <div className="relative">
                  <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input 
                    type="date" 
                    name="dob"
                    value={personalInfo.dob}
                    onChange={handlePersonalInfoChange}
                    required 
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl input-focus transition-all duration-200"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Personal Email *</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input 
                    type="email" 
                    name="personalEmail"
                    value={personalInfo.personalEmail}
                    onChange={handlePersonalInfoChange}
                    required 
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl input-focus transition-all duration-200" 
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Phone Number *</label>
                <div className="relative">
                  <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input 
                    type="tel" 
                    name="phone"
                    value={personalInfo.phone}
                    onChange={handlePersonalInfoChange}
                    required 
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl input-focus transition-all duration-200" 
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Location *</label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    name="location"
                    value={personalInfo.location}
                    onChange={handleLocationInputChange}
                    onClick={(e) => e.stopPropagation()}
                    required 
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl input-focus transition-all duration-200" 
                    placeholder="City, State, Country"
                  />
                  {showLocationDropdown && (
                    <div 
                      className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto mt-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {filteredLocations.map(location => (
                        <div 
                          key={location}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0" 
                          onClick={() => selectLocation(location)}
                        >
                          {location}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Section 2: Academic Information */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-green-100 p-3 rounded-full">
                <FaGraduationCap className="text-green-600 text-xl" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Academic Information</h2>
            </div>
            <div className="section-divider mb-8"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">College Email *</label>
                <div className="relative">
                  <FaUniversity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input 
                    type="email" 
                    name="collegeEmail"
                    value={academicInfo.collegeEmail}
                    onChange={handleAcademicInfoChange}
                    required 
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl input-focus transition-all duration-200" 
                    placeholder="student@university.edu"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Enrollment Number *</label>
                <div className="relative">
                  <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    name="enrollmentNumber"
                    value={academicInfo.enrollmentNumber}
                    onChange={handleAcademicInfoChange}
                    required 
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl input-focus transition-all duration-200" 
                    placeholder="Enter enrollment number"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Degree *</label>
                <div className="relative">
                  <FaCertificate className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select 
                    name="degree"
                    value={academicInfo.degree}
                    onChange={handleAcademicInfoChange}
                    required 
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl input-focus transition-all duration-200 appearance-none bg-white"
                  >
                    <option value="">Select Degree</option>
                    <option value="bachelor">Bachelor's</option>
                    <option value="master">Master's</option>
                    <option value="phd">PhD</option>
                    <option value="diploma">Diploma</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Branch *</label>
                <div className="relative">
                  <FaCodeBranch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select 
                    name="branch"
                    value={academicInfo.branch}
                    onChange={handleAcademicInfoChange}
                    required 
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl input-focus transition-all duration-200 appearance-none bg-white"
                  >
                    <option value="">Select Branch</option>
                    {branchOptions.map(branch => (
                      <option key={branch} value={branch.toLowerCase().replace(/\s+/g, '-')}>
                        {branch}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Graduation Year *</label>
                <div className="relative max-w-xs">
                  <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select 
                    name="graduationYear"
                    value={academicInfo.graduationYear}
                    onChange={handleAcademicInfoChange}
                    required 
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl input-focus transition-all duration-200 appearance-none bg-white"
                  >
                    <option value="">Select Year</option>
                    {Array.from({ length: 30 }, (_, i) => {
                      const year = new Date().getFullYear() - i;
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          {/* Section 3: Professional Information */}
          <div className="space-y-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-purple-100 p-3 rounded-full">
                <FaBriefcase className="text-purple-600 text-xl" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Professional Information</h2>
            </div>
            <div className="section-divider mb-8"></div>
            
            {/* Professional Experience Section */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FaBriefcase className="text-purple-600 text-lg" />
                  <h3 className="text-lg font-semibold text-gray-900">Professional Experience</h3>
                </div>
                <button 
                  type="button" 
                  onClick={addExperience}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                >
                  <FaPlus />
                  <span>Add Experience</span>
                </button>
              </div>
              
              <div className="space-y-4">
                {experiences.map(exp => (
                  <div key={exp.id} className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">Experience</h4>
                      <button 
                        type="button" 
                        onClick={() => removeExperience(exp.id)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-200"
                      >
                        <FaTimes />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Company Name</label>
                        <input 
                          type="text" 
                          value={exp.company}
                          onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg input-focus transition-all duration-200" 
                          placeholder="Company name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Job Title</label>
                        <input 
                          type="text" 
                          value={exp.title}
                          onChange={(e) => handleExperienceChange(exp.id, 'title', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg input-focus transition-all duration-200" 
                          placeholder="Your role/position"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <input 
                          type="text" 
                          value={exp.location}
                          onChange={(e) => handleExperienceChange(exp.id, 'location', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg input-focus transition-all duration-200" 
                          placeholder="City, State/Country"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Duration</label>
                        <input 
                          type="text" 
                          value={exp.duration}
                          onChange={(e) => handleExperienceChange(exp.id, 'duration', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg input-focus transition-all duration-200" 
                          placeholder="e.g., Jan 2020 - Present"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Description (Optional)</label>
                      <textarea 
                        value={exp.description}
                        onChange={(e) => handleExperienceChange(exp.id, 'description', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg input-focus transition-all duration-200 resize-none" 
                        rows="2" 
                        placeholder="Brief description of your role and achievements..."
                      ></textarea>
                    </div>
                  </div>
                ))}
                
                {experiences.length === 0 && (
                  <p className="text-sm text-gray-600 italic">Add your work experiences, internships, or projects. Click "Add Experience" to include multiple roles.</p>
                )}
              </div>
            </div>
            
            {/* Skills Section */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <FaTools className="text-purple-600 text-lg" />
                <h3 className="text-lg font-semibold text-gray-900">Skills & Technologies</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <FaWrench className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
                    <input 
                      type="text" 
                      value={skillInput}
                      onChange={handleSkillInputChange}
                      onClick={(e) => e.stopPropagation()}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg input-focus transition-all duration-200" 
                      placeholder="Type a skill and press Enter" 
                      autoComplete="off"
                    />
                    {showSkillDropdown && (
                      <div 
                        className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {filteredSkills.map(skill => (
                          <div 
                            key={skill}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0" 
                            onClick={() => selectSkill(skill)}
                          >
                            {skill}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <button 
                    type="button" 
                    onClick={addSkill}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200"
                  >
                    <FaPlus />
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2 min-h-[40px] p-3 border border-gray-200 rounded-lg bg-white">
                  {skills.length === 0 ? (
                    <span className="text-gray-500 text-sm">No skills added yet. Type above and press Enter or click + to add.</span>
                  ) : (
                    skills.map(skill => (
                      <span key={skill} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                        {skill}
                        <button 
                          type="button" 
                          onClick={() => removeSkill(skill)}
                          className="ml-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
                        >
                          <FaTimes className="text-xs" />
                        </button>
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>
            
            {/* Areas of Interest Section */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <FaStar className="text-purple-600 text-lg" />
                <h3 className="text-lg font-semibold text-gray-900">Areas of Interest</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <FaHeart className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
                    <input 
                      type="text" 
                      value={interestInput}
                      onChange={handleInterestInputChange}
                      onClick={(e) => e.stopPropagation()}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg input-focus transition-all duration-200" 
                      placeholder="Type an interest and press Enter" 
                      autoComplete="off"
                    />
                    {showInterestDropdown && (
                      <div 
                        className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {filteredInterests.map(interest => (
                          <div 
                            key={interest}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0" 
                            onClick={() => selectInterest(interest)}
                          >
                            {interest}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <button 
                    type="button" 
                    onClick={addInterest}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200"
                  >
                    <FaPlus />
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2 min-h-[40px] p-3 border border-gray-200 rounded-lg bg-white">
                  {interests.length === 0 ? (
                    <span className="text-gray-500 text-sm">No interests added yet. Type above and press Enter or click + to add.</span>
                  ) : (
                    interests.map(interest => (
                      <span key={interest} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
                        {interest}
                        <button 
                          type="button" 
                          onClick={() => removeInterest(interest)}
                          className="ml-2 text-green-600 hover:text-green-800 transition-colors duration-200"
                        >
                          <FaTimes className="text-xs" />
                        </button>
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>
            
            {/* Additional Professional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Employment Status *</label>
                <div className="relative">
                  <FaBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select 
                    name="employmentStatus"
                    value={professionalInfo.employmentStatus}
                    onChange={handleProfessionalInfoChange}
                    required 
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl input-focus transition-all duration-200 appearance-none bg-white"
                  >
                    <option value="">Select Status</option>
                    <option value="full-time">Full-time Employee</option>
                    <option value="part-time">Part-time Employee</option>
                    <option value="freelancer">Freelancer</option>
                    <option value="consultant">Consultant</option>
                    <option value="entrepreneur">Entrepreneur</option>
                    <option value="student">Student</option>
                    <option value="unemployed">Currently Unemployed</option>
                    <option value="retired">Retired</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Annual Salary Range</label>
                <div className="relative">
                  <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select 
                    name="salaryRange"
                    value={professionalInfo.salaryRange}
                    onChange={handleProfessionalInfoChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl input-focus transition-all duration-200 appearance-none bg-white"
                  >
                    <option value="">Select Range (Optional)</option>
                    <option value="under-30k">Under $30,000</option>
                    <option value="30k-50k">$30,000 - $50,000</option>
                    <option value="50k-75k">$50,000 - $75,000</option>
                    <option value="75k-100k">$75,000 - $100,000</option>
                    <option value="100k-150k">$100,000 - $150,000</option>
                    <option value="150k-200k">$150,000 - $200,000</option>
                    <option value="200k+">$200,000+</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          {/* Section 4: Other Essentials */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-orange-100 p-3 rounded-full">
                <FaStar className="text-orange-600 text-xl" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Other Essentials</h2>
            </div>
            <div className="section-divider mb-8"></div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <div className="relative">
                  <FaUserEdit className="absolute left-3 top-4 text-gray-400" />
                  <textarea 
                    name="bio"
                    value={otherInfo.bio}
                    onChange={handleOtherInfoChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl input-focus transition-all duration-200 resize-none" 
                    rows="4" 
                    placeholder="Tell us about yourself, your interests, and what you're passionate about..."
                  ></textarea>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">LinkedIn ID</label>
                  <div className="relative">
                    <FaLinkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input 
                      type="url" 
                      name="linkedin"
                      value={otherInfo.linkedin}
                      onChange={handleOtherInfoChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl input-focus transition-all duration-200" 
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">GitHub ID</label>
                  <div className="relative">
                    <FaGithub className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input 
                      type="url" 
                      name="github"
                      value={otherInfo.github}
                      onChange={handleOtherInfoChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl input-focus transition-all duration-200" 
                      placeholder="https://github.com/yourusername"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Portfolio</label>
                  <div className="relative">
                    <FaGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input 
                      type="url" 
                      name="portfolio"
                      value={otherInfo.portfolio}
                      onChange={handleOtherInfoChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl input-focus transition-all duration-200" 
                      placeholder="https://yourportfolio.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Resume Upload</label>
                  <div className="relative">
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept=".pdf,.doc,.docx" 
                      className="hidden"
                    />
                    <div className="flex items-center">
                      <button 
                        type="button" 
                        onClick={triggerFileInput}
                        className="flex-1 flex items-center justify-center h-12 border-2 border-dashed border-gray-300 rounded-l-xl hover:border-blue-400 transition-colors duration-200"
                      >
                        <div className="flex items-center space-x-2 text-gray-500">
                          <FaUpload />
                          <span className="text-sm">
                            {resumeFile ? resumeFile.name : 'Choose file or drag here'}
                          </span>
                        </div>
                      </button>
                      {resumeFile && (
                        <button 
                          type="button" 
                          onClick={removeResumeFile}
                          className="bg-red-100 hover:bg-red-200 text-red-600 h-12 px-4 rounded-r-xl transition-colors duration-200"
                          title="Remove file"
                        >
                          <FaTimes />
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Terms and Policy Agreement */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <FaShieldAlt className="text-blue-600 text-lg" />
              <h3 className="text-lg font-semibold text-gray-900">Terms & Privacy</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <input 
                  type="checkbox" 
                  id="termsAccept"
                  name="termsAccept"
                  checked={otherInfo.termsAccept}
                  onChange={handleOtherInfoChange}
                  required 
                  className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="termsAccept" className="text-sm text-gray-700 leading-relaxed">
                  I agree to the{' '}
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      // Handle terms of service click
                    }}
                    className="text-blue-600 hover:text-blue-800 underline font-medium"
                  >
                    Terms of Service
                  </button>{' '}
                  and{' '}
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      // Handle privacy policy click
                    }}
                    className="text-blue-600 hover:text-blue-800 underline font-medium"
                  >
                    Privacy Policy
                  </button>
                  . I understand that my information will be used to connect me with the alumni network and may be shared with other verified alumni members. *
                </label>
              </div>
              
              <div className="flex items-start space-x-3">
                <input 
                  type="checkbox" 
                  id="emailConsent"
                  name="emailConsent"
                  checked={otherInfo.emailConsent}
                  onChange={handleOtherInfoChange}
                  className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="emailConsent" className="text-sm text-gray-700 leading-relaxed">
                  I would like to receive updates about alumni events, networking opportunities, and relevant career information via email. (Optional)
                </label>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <FaInfoCircle className="text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Your Privacy Matters</p>
                    <p>We protect your personal information and only share it with verified alumni members for networking purposes. You can update your privacy preferences anytime after registration.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end pt-8">
            <button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-12 py-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-3"
            >
              <span className="text-lg">Complete Registration</span>
              <FaArrowRight />
            </button>
          </div>
        </form>
      </div>
      
      <style jsx>{`
        .section-divider {
          background: linear-gradient(90deg, #3b82f6 0%, #e5e7eb 50%, #3b82f6 100%);
          height: 2px;
        }
        .input-focus:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
      `}</style>
    </div>
  );
};

export default AlumniConnectProfile;