import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaVenusMars, FaCalendar, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGraduationCap, FaUniversity, FaIdCard, FaCertificate, FaCodeBranch, FaCalendarAlt, FaBriefcase, FaTools, FaStar, FaUserEdit, FaGlobe, FaUpload, FaShieldAlt, FaInfoCircle, FaPlus, FaTimes, FaArrowRight, FaCheckCircle, FaWrench, FaHeart, FaDollarSign, FaBuilding, FaLightbulb, FaGraduationCap as FaGraduation, FaSearch, FaExclamationCircle, FaLinkedin, FaGithub } from 'react-icons/fa';

const StudentProfile = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

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
    graduationYear: '',
    expectedGraduationYear: '', // ✅ ADDED THIS FIELD
    cgpa: ''
  });

  // Professional Information State
  const [professionalInfo, setProfessionalInfo] = useState({
    employmentStatus: '',
    salaryRange: ''
  });

  // Career Status State
  const [careerStatus, setCareerStatus] = useState('');
  const [careerDetails, setCareerDetails] = useState({
    careerGoal: ''
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

  // Validation states
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Refs
  const fileInputRef = useRef(null);

  // Options for dropdowns
  const degreeOptions = [
    'B.Tech', 'B.E', 'B.Sc', 'B.A', 'B.Com', 'BBA', 'BCA', 'B.Arch', 'B.Des', 'B.Pharm',
    'M.Tech', 'M.E', 'M.Sc', 'M.A', 'M.Com', 'MBA', 'MCA', 'M.Arch', 'M.Des', 'M.Pharm',
    'PhD', 'MPhil', 'Post Doc', 'Diploma', 'Integrated Dual Degree', 'Other'
  ];

  const branchOptions = [
    'Computer Science', 'Computer Science & Engineering', 'Information Technology',
    'Electrical Engineering', 'Electrical & Electronics Engineering', 'Electronics & Communication Engineering',
    'Electronics & Instrumentation Engineering', 'Mechanical Engineering', 'Mechanical & Automation Engineering',
    'Civil Engineering', 'Chemical Engineering', 'Aerospace Engineering', 'Biotechnology',
    'Information Technology', 'Electronics and Communication', 'Instrumentation Engineering',
    'Production Engineering', 'Metallurgical Engineering', 'Mining Engineering', 'Petroleum Engineering',
    'Biomedical Engineering', 'Environmental Engineering', 'Industrial Engineering', 'Agricultural Engineering',
    'Marine Engineering', 'Nuclear Engineering', 'Business Administration', 'Economics', 'Mathematics',
    'Physics', 'Chemistry', 'Biology', 'English Literature', 'History', 'Psychology', 'Sociology',
    'Philosophy', 'Fine Arts', 'Performing Arts', 'Architecture', 'Pharmacy', 'Medicine', 'Dentistry',
    'Nursing', 'Public Health', 'Law', 'Education', 'Journalism', 'Hospitality Management', 'Other'
  ];

  const locationOptions = [
    'Karur, Tamil Nadu, India', 'Chennai, Tamil Nadu, India', 'Coimbatore, Tamil Nadu, India',
    'Madurai, Tamil Nadu, India', 'Salem, Tamil Nadu, India', 'Tiruchirappalli, Tamil Nadu, India',
    'Bangalore, Karnataka, India', 'Mysore, Karnataka, India', 'Hubli, Karnataka, India',
    'Mangalore, Karnataka, India', 'Mumbai, Maharashtra, India', 'Pune, Maharashtra, India',
    'Nagpur, Maharashtra, India', 'Nashik, Maharashtra, India', 'Delhi, Delhi, India',
    'New Delhi, Delhi, India', 'Gurgaon, Haryana, India', 'Faridabad, Haryana, India',
    'Kolkata, West Bengal, India', 'Howrah, West Bengal, India', 'Hyderabad, Telangana, India',
    'Secunderabad, Telangana, India', 'Ahmedabad, Gujarat, India', 'Surat, Gujarat, India',
    'Vadodara, Gujarat, India', 'Jaipur, Rajasthan, India', 'Jodhpur, Rajasthan, India',
    'Udaipur, Rajasthan, India', 'Lucknow, Uttar Pradesh, India', 'Kanpur, Uttar Pradesh, India',
    'Agra, Uttar Pradesh, India', 'Patna, Bihar, India', 'Gaya, Bihar, India',
    'Bhopal, Madhya Pradesh, India', 'Indore, Madhya Pradesh, India', 'Chandigarh, Punjab, India',
    'Amritsar, Punjab, India', 'Dehradun, Uttarakhand, India', 'Rishikesh, Uttarakhand, India',
    'Guwahati, Assam, India', 'Shillong, Meghalaya, India', 'Bhubaneswar, Odisha, India',
    'Ranchi, Jharkhand, India', 'Thiruvananthapuram, Kerala, India', 'Kochi, Kerala, India',
    'Goa, Goa, India', 'Puducherry, Puducherry, India', 'Andaman and Nicobar Islands, Andaman and Nicobar Islands, India',
    'Lakshadweep, Lakshadweep, India', 'Daman and Diu, Daman and Diu, India',
    'Dadra and Nagar Haveli, Dadra and Nagar Haveli, India', 'Ladakh, Ladakh, India',
    'Jammu and Kashmir, Jammu and Kashmir, India'
  ];

  const skillSuggestions = [
    'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'HTML/CSS', 'TypeScript', 'Angular', 'Vue.js', 'PHP',
    'C++', 'C#', 'Ruby', 'Go', 'Swift', 'Kotlin', 'SQL', 'MongoDB', 'Express.js', 'Django',
    'Machine Learning', 'Data Science', 'DevOps', 'AWS', 'Docker', 'Kubernetes', 'Git', 'REST API', 'GraphQL', 'UI/UX Design'
  ];

  const interestSuggestions = [
    'Web Development', 'Mobile Development', 'Data Science', 'Machine Learning', 'Artificial Intelligence',
    'Cybersecurity', 'Cloud Computing', 'DevOps', 'UI/UX Design', 'Game Development',
    'Entrepreneurship', 'Digital Marketing', 'Project Management', 'Finance', 'Consulting',
    'Research', 'Open Source', 'Blockchain', 'IoT', 'Robotics'
  ];

  // Handle input changes
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAcademicInfoChange = (e) => {
    const { name, value } = e.target;
    setAcademicInfo(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleProfessionalInfoChange = (e) => {
    const { name, value } = e.target;
    setProfessionalInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleCareerStatusChange = (e) => {
    const value = e.target.value;
    setCareerStatus(value);
    if (errors.careerStatus) {
      setErrors(prev => ({ ...prev, careerStatus: '' }));
    }
  };

  const handleCareerDetailsChange = (e) => {
    const { name, value } = e.target;
    setCareerDetails(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleOtherInfoChange = (e) => {
    const { name, value, type, checked } = e.target;
    setOtherInfo(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle blur events to mark fields as touched
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    
    // Personal info validation
    if (!personalInfo.fullName) newErrors.fullName = 'Full name is required';
    if (!personalInfo.gender) newErrors.gender = 'Gender is required';
    if (!personalInfo.dob) newErrors.dob = 'Date of birth is required';
    if (!personalInfo.personalEmail) newErrors.personalEmail = 'Personal email is required';
    if (!personalInfo.phone) newErrors.phone = 'Phone number is required';
    if (!personalInfo.location) newErrors.location = 'Location is required';
    
    // Academic info validation
    if (!academicInfo.collegeEmail) newErrors.collegeEmail = 'College email is required';
    if (!academicInfo.enrollmentNumber) newErrors.enrollmentNumber = 'Enrollment number is required';
    if (!academicInfo.degree) newErrors.degree = 'Degree is required';
    if (!academicInfo.branch) newErrors.branch = 'Branch is required';
    if (!academicInfo.graduationYear) newErrors.graduationYear = 'Graduation year is required';
    if (!academicInfo.expectedGraduationYear) newErrors.expectedGraduationYear = 'Expected graduation year is required';
    
    // Career status validation
    if (!careerStatus) newErrors.careerStatus = 'Career status is required';
    
    // Career details validation
    if (careerStatus === 'not-working' && !careerDetails.careerGoal) {
      newErrors.careerGoal = 'Career goal is required';
    }
    
    // Terms acceptance validation
    if (!otherInfo.termsAccept) newErrors.termsAccept = 'You must accept the terms and conditions';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
    ).slice(0, 8);
    
    setFilteredSkills(filtered);
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
    ).slice(0, 8);
    
    setFilteredInterests(filtered);
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
    
    if (errors.location) {
      setErrors(prev => ({ ...prev, location: '' }));
    }
    
    if (value.trim() === '') {
      setShowLocationDropdown(false);
      return;
    }
    
    const filtered = locationOptions.filter(location => 
      location.toLowerCase().includes(value.toLowerCase())
    ).slice(0, 8);
    
    setFilteredLocations(filtered);
    setShowLocationDropdown(true);
  };

  const selectLocation = (location) => {
    setLocationInput(location);
    setPersonalInfo(prev => ({ ...prev, location }));
    if (errors.location) {
      setErrors(prev => ({ ...prev, location: '' }));
    }
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const isValid = validateForm();
    
    if (!isValid) {
      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
      return;
    }
    
    // Prepare form data for submission
    const formData = {
      personalInfo,
      academicInfo,
      professionalInfo,
      careerStatus,
      careerDetails,
      otherInfo: {
        ...otherInfo,
        termsAccept: undefined
      },
      skills,
      interests,
      resumeFileName: resumeFile ? resumeFile.name : null
    };
    
    setLoading(true);
    
    try {
      // Save profile to backend using STUDENT endpoint
      const result = await saveProfileToBackend(formData);
      
      console.log('Student profile saved successfully:', result);
      setShowSuccess(true);
      
      // Update local storage
      localStorage.setItem('profileCompleted', 'true');
      
      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        navigate('/student-dashboard');
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage({
        text: error.message || 'Failed to save profile. Please try again.',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ CRITICAL: Save to STUDENT endpoint
  const saveProfileToBackend = async (formData) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:5000/api/student/complete-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to save profile');
      }
      
      return data;
    } catch (error) {
      console.error('Error saving profile:', error);
      throw error;
    }
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
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen py-8 relative">
      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 shadow-lg max-w-md">
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 p-2 rounded-full">
                <FaCheckCircle className="text-green-600 text-xl" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-green-800">Registration Successful!</h3>
                <p className="text-green-700 text-sm mt-1">
                  Your student profile has been created successfully. You can now connect with other students and alumni.
                </p>
              </div>
              <button 
                onClick={() => setShowSuccess(false)}
                className="text-green-600 hover:text-green-800 transition-colors duration-200"
              >
                <FaTimes />
              </button>
            </div>
          </div>
        </div>
      )}

      {message.text && (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in ${
          message.type === 'error' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-green-50 border-green-200 text-green-700'
        } border rounded-xl p-4 shadow-lg max-w-md`}>
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-full ${
              message.type === 'error' ? 'bg-red-100' : 'bg-green-100'
            }`}>
              {message.type === 'error' ? (
                <FaExclamationCircle className="text-red-600 text-xl" />
              ) : (
                <FaCheckCircle className="text-green-600 text-xl" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm">{message.text}</p>
            </div>
            <button 
              onClick={() => setMessage({ text: '', type: '' })}
              className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Student Profile Setup</h1>
          <p className="text-lg text-gray-600">Complete your profile to connect with the student network</p>
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
              {/* Full Name */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    name="fullName"
                    value={personalInfo.fullName}
                    onChange={handlePersonalInfoChange}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-4 py-3 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-xl input-focus transition-all duration-200`} 
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.fullName && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <FaExclamationCircle className="mr-1" />
                    {errors.fullName}
                  </p>
                )}
              </div>
              
              {/* Gender */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Gender *</label>
                <div className="relative">
                  <FaVenusMars className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select 
                    name="gender"
                    value={personalInfo.gender}
                    onChange={handlePersonalInfoChange}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-4 py-3 border ${errors.gender ? 'border-red-500' : 'border-gray-300'} rounded-xl input-focus transition-all duration-200 appearance-none bg-white`}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
                {errors.gender && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <FaExclamationCircle className="mr-1" />
                    {errors.gender}
                  </p>
                )}
              </div>
              
              {/* Date of Birth */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Date of Birth *</label>
                <div className="relative">
                  <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input 
                    type="date" 
                    name="dob"
                    value={personalInfo.dob}
                    onChange={handlePersonalInfoChange}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-4 py-3 border ${errors.dob ? 'border-red-500' : 'border-gray-300'} rounded-xl input-focus transition-all duration-200`}
                  />
                </div>
                {errors.dob && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <FaExclamationCircle className="mr-1" />
                    {errors.dob}
                  </p>
                )}
              </div>
              
              {/* Personal Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Personal Email *</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input 
                    type="email" 
                    name="personalEmail"
                    value={personalInfo.personalEmail}
                    onChange={handlePersonalInfoChange}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-4 py-3 border ${errors.personalEmail ? 'border-red-500' : 'border-gray-300'} rounded-xl input-focus transition-all duration-200`} 
                    placeholder="your.email@example.com"
                  />
                </div>
                {errors.personalEmail && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <FaExclamationCircle className="mr-1" />
                    {errors.personalEmail}
                  </p>
                )}
              </div>
              
              {/* Phone Number */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Phone Number *</label>
                <div className="relative">
                  <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input 
                    type="tel" 
                    name="phone"
                    value={personalInfo.phone}
                    onChange={handlePersonalInfoChange}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-xl input-focus transition-all duration-200`} 
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <FaExclamationCircle className="mr-1" />
                    {errors.phone}
                  </p>
                )}
              </div>
              
              {/* Location */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Location *</label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    value={locationInput}
                    onChange={handleLocationInputChange}
                    onClick={(e) => e.stopPropagation()}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-4 py-3 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-xl input-focus transition-all duration-200`} 
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
                {errors.location && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <FaExclamationCircle className="mr-1" />
                    {errors.location}
                  </p>
                )}
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
              {/* College Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">College Email *</label>
                <div className="relative">
                  <FaUniversity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input 
                    type="email" 
                    name="collegeEmail"
                    value={academicInfo.collegeEmail}
                    onChange={handleAcademicInfoChange}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-4 py-3 border ${errors.collegeEmail ? 'border-red-500' : 'border-gray-300'} rounded-xl input-focus transition-all duration-200`} 
                    placeholder="student@university.edu"
                  />
                </div>
                {errors.collegeEmail && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <FaExclamationCircle className="mr-1" />
                    {errors.collegeEmail}
                  </p>
                )}
              </div>
              
              {/* Enrollment Number */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Enrollment Number *</label>
                <div className="relative">
                  <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    name="enrollmentNumber"
                    value={academicInfo.enrollmentNumber}
                    onChange={handleAcademicInfoChange}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-4 py-3 border ${errors.enrollmentNumber ? 'border-red-500' : 'border-gray-300'} rounded-xl input-focus transition-all duration-200`} 
                    placeholder="Enter enrollment number"
                  />
                </div>
                {errors.enrollmentNumber && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <FaExclamationCircle className="mr-1" />
                    {errors.enrollmentNumber}
                  </p>
                )}
              </div>
              
              {/* Degree */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Degree *</label>
                <div className="relative">
                  <FaCertificate className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select 
                    name="degree"
                    value={academicInfo.degree}
                    onChange={handleAcademicInfoChange}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-4 py-3 border ${errors.degree ? 'border-red-500' : 'border-gray-300'} rounded-xl input-focus transition-all duration-200 appearance-none bg-white`}
                  >
                    <option value="">Select Degree</option>
                    {degreeOptions.map(degree => (
                      <option key={degree} value={degree.toLowerCase().replace(/\s+/g, '-')}>
                        {degree}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.degree && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <FaExclamationCircle className="mr-1" />
                    {errors.degree}
                  </p>
                )}
              </div>
              
              {/* Branch */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Branch *</label>
                <div className="relative">
                  <FaCodeBranch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select 
                    name="branch"
                    value={academicInfo.branch}
                    onChange={handleAcademicInfoChange}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-4 py-3 border ${errors.branch ? 'border-red-500' : 'border-gray-300'} rounded-xl input-focus transition-all duration-200 appearance-none bg-white`}
                  >
                    <option value="">Select Branch</option>
                    {branchOptions.map(branch => (
                      <option key={branch} value={branch.toLowerCase().replace(/\s+/g, '-')}>
                        {branch}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.branch && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <FaExclamationCircle className="mr-1" />
                    {errors.branch}
                  </p>
                )}
              </div>
              
              {/* Graduation Year */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Graduation Year *</label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select 
                    name="graduationYear"
                    value={academicInfo.graduationYear}
                    onChange={handleAcademicInfoChange}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-4 py-3 border ${errors.graduationYear ? 'border-red-500' : 'border-gray-300'} rounded-xl input-focus transition-all duration-200 appearance-none bg-white`}
                  >
                    <option value="">Select Year</option>
                    {Array.from({ length: 10 }, (_, i) => {
                      const year = new Date().getFullYear() + i;
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                </div>
                {errors.graduationYear && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <FaExclamationCircle className="mr-1" />
                    {errors.graduationYear}
                  </p>
                )}
              </div>
              
              {/* Expected Graduation Year - ✅ ADDED THIS FIELD */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Expected Graduation Year *</label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select 
                    name="expectedGraduationYear"
                    value={academicInfo.expectedGraduationYear}
                    onChange={handleAcademicInfoChange}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-4 py-3 border ${errors.expectedGraduationYear ? 'border-red-500' : 'border-gray-300'} rounded-xl input-focus transition-all duration-200 appearance-none bg-white`}
                  >
                    <option value="">Select Year</option>
                    {Array.from({ length: 10 }, (_, i) => {
                      const year = new Date().getFullYear() + i;
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                </div>
                {errors.expectedGraduationYear && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <FaExclamationCircle className="mr-1" />
                    {errors.expectedGraduationYear}
                  </p>
                )}
              </div>
              
              {/* CGPA */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">CGPA (Optional)</label>
                <div className="relative">
                  <FaGraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    name="cgpa"
                    value={academicInfo.cgpa}
                    onChange={handleAcademicInfoChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl input-focus transition-all duration-200" 
                    placeholder="e.g., 8.5 or 3.8"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Section 3: Career Status */}
          <div className="space-y-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-purple-100 p-3 rounded-full">
                <FaBriefcase className="text-purple-600 text-xl" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Career Status</h2>
            </div>
            <div className="section-divider mb-8"></div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Current Career Status *</label>
                {errors.careerStatus && (
                  <p className="text-red-500 text-sm flex items-center mb-2">
                    <FaExclamationCircle className="mr-1" />
                    {errors.careerStatus}
                  </p>
                )}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setCareerStatus('studies');
                      if (errors.careerStatus) {
                        setErrors(prev => ({ ...prev, careerStatus: '' }));
                      }
                    }}
                    className={`py-3 px-4 rounded-xl border transition-all duration-200 flex flex-col items-center justify-center ${
                      careerStatus === 'studies'
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <FaGraduation className="text-lg mb-1" />
                    <span className="text-sm font-medium">Higher Studies</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => {
                      setCareerStatus('not-working');
                      if (errors.careerStatus) {
                        setErrors(prev => ({ ...prev, careerStatus: '' }));
                      }
                    }}
                    className={`py-3 px-4 rounded-xl border transition-all duration-200 flex flex-col items-center justify-center ${
                      careerStatus === 'not-working'
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <FaSearch className="text-lg mb-1" />
                    <span className="text-sm font-medium">Not Working</span>
                  </button>
                </div>
              </div>
              
              {/* Career Goal for Not Working */}
              {careerStatus === 'not-working' && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <FaSearch className="text-blue-600 mr-2" />
                    Career Focus Details
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Career Goal/Focus *</label>
                      <textarea 
                        name="careerGoal"
                        value={careerDetails.careerGoal}
                        onChange={handleCareerDetailsChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-2 border ${errors.careerGoal ? 'border-red-500' : 'border-gray-300'} rounded-lg input-focus transition-all duration-200 resize-none`} 
                        rows="3" 
                        placeholder="Describe your career goals or focus areas..."
                      ></textarea>
                      {errors.careerGoal && (
                        <p className="text-red-500 text-sm flex items-center mt-1">
                          <FaExclamationCircle className="mr-1" />
                          {errors.careerGoal}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Section 4: Skills & Interests */}
          <div className="space-y-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-purple-100 p-3 rounded-full">
                <FaTools className="text-purple-600 text-xl" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Skills & Interests</h2>
            </div>
            <div className="section-divider mb-8"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Skills & Technologies */}
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
                          className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto mt-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {filteredSkills.map((skill, index) => (
                            <div 
                              key={index}
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
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-all duration-200"
                    >
                      <FaPlus />
                    </button>
                  </div>
                  
                  <div className="min-h-[60px] p-4 border border-gray-200 rounded-lg bg-white">
                    {skills.length === 0 ? (
                      <p className="text-gray-500 text-sm">No skills added yet. Type above and press Enter or click + to add.</p>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                          <span key={index} className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {skill}
                            <button 
                              type="button" 
                              onClick={() => removeSkill(skill)} 
                              className="text-blue-600 hover:text-blue-800"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Areas of Interest */}
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
                          className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto mt-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {filteredInterests.map((interest, index) => (
                            <div 
                              key={index}
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
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition-all duration-200"
                    >
                      <FaPlus />
                    </button>
                  </div>
                  
                  <div className="min-h-[60px] p-4 border border-gray-200 rounded-lg bg-white">
                    {interests.length === 0 ? (
                      <p className="text-gray-500 text-sm">No interests added yet. Type above and press Enter or click + to add.</p>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {interests.map((interest, index) => (
                          <span key={index} className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                            {interest}
                            <button 
                              type="button" 
                              onClick={() => removeInterest(interest)} 
                              className="text-green-600 hover:text-green-800"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Section 5: Other Essentials */}
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
                {/* LinkedIn ID */}
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
                
                {/* GitHub ID */}
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
                
                {/* Portfolio */}
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
                
                {/* Resume Upload */}
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
                  onBlur={handleBlur}
                  className={`mt-1 h-4 w-4 text-blue-600 ${errors.termsAccept ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-blue-500 focus:ring-2`}
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
                  . I understand that my information will be used to connect me with the student network and may be shared with other verified members. *
                </label>
              </div>
              {errors.termsAccept && (
                <p className="text-red-500 text-sm flex items-center mt-1">
                  <FaExclamationCircle className="mr-1" />
                  {errors.termsAccept}
                </p>
              )}
              
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
                  I would like to receive updates about student events, networking opportunities, and relevant career information via email. (Optional)
                </label>
              </div>
              
              <div className="bg-blue-100 p-4 rounded-lg">
                <div className="flex items-start space-x-2">
                  <FaInfoCircle className="text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Your Privacy Matters</p>
                    <p>We protect your personal information and only share it with verified members for networking purposes. You can update your privacy preferences anytime after registration.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end pt-8">
            <button 
              type="submit" 
              disabled={loading}
              className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold px-12 py-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-3 ${
                loading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-lg">Saving...</span>
                </>
              ) : (
                <>
                  <span className="text-lg">Complete Registration</span>
                  <FaArrowRight />
                </>
              )}
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
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default StudentProfile;