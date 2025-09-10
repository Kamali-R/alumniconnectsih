import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const AlumniConnectProfile = () => {
   const location = useLocation();
  const { userData } = location.state || {};
  // State for form data
  const [formData, setFormData] = useState({
    firstName: userData?.name?.split(' ')[0] || '',
    lastName: userData?.name?.split(' ')[1] || '',
    email: userData?.email || '',
    phone: '',
    dob: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    country: '',
    degreeType: '',
    fieldOfStudy: '',
    graduationYear: '',
    gpa: '',
    studentId: '',
    activities: '',
    experiences: [{
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      jobDescription: '',
      industry: '',
      workLocation: ''
    }],
    linkedin: '',
    website: '',
    skills: [],
    bio: '',
    networking: [],
    privacy: ['profile-visible', 'email-notifications'],
    terms: false
  });

  const [progress, setProgress] = useState(0);
  const [skillInput, setSkillInput] = useState('');
  const formRef = useRef(null);

  // Populate graduation years
  const graduationYears = [];
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= 1950; year--) {
    graduationYears.push(year);
  }

  // Update progress
  useEffect(() => {
    if (formRef.current) {
      const requiredFields = formRef.current.querySelectorAll('input[required], select[required]');
      const filledFields = Array.from(requiredFields).filter(field => field.value.trim() !== '');
      const newProgress = Math.round((filledFields.length / requiredFields.length) * 100);
      setProgress(newProgress);
    }
  }, [formData]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'terms') {
        setFormData(prev => ({ ...prev, [name]: checked }));
      } else if (name === 'networking[]' || name === 'privacy[]') {
        const key = name === 'networking[]' ? 'networking' : 'privacy';
        setFormData(prev => {
          const newArray = checked 
            ? [...prev[key], value]
            : prev[key].filter(item => item !== value);
          return { ...prev, [key]: newArray };
        });
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle experience changes
  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;
    const fieldName = name.replace('[]', '');
    
    setFormData(prev => {
      const newExperiences = [...prev.experiences];
      newExperiences[index] = { ...newExperiences[index], [fieldName]: value };
      return { ...prev, experiences: newExperiences };
    });
  };

  // Add new experience
  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        {
          jobTitle: '',
          company: '',
          startDate: '',
          endDate: '',
          jobDescription: '',
          industry: '',
          workLocation: ''
        }
      ]
    }));
  };

  // Remove experience
  const removeExperience = (index) => {
    if (formData.experiences.length <= 1) return;
    
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index)
    }));
  };

  // Add skill
  const addSkill = (skill) => {
    const trimmedSkill = skill.trim();
    if (trimmedSkill && !formData.skills.includes(trimmedSkill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, trimmedSkill]
      }));
      setSkillInput('');
    }
  };

  // Remove skill
  const removeSkill = (index) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = formRef.current.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        field.classList.add('border-red-500');
        isValid = false;
      } else {
        field.classList.remove('border-red-500');
      }
    });

    if (!isValid) {
      alert('Please fill in all required fields marked with *');
      return;
    }

    // Check terms agreement
    if (!formData.terms) {
      alert('Please agree to the Terms of Service and Privacy Policy to continue.');
      return;
    }

    // In a real application, you would submit the form data to your backend here
    console.log('Form data:', formData);
    alert('Profile completed successfully! Redirecting to dashboard...');
  };

  // Save as draft
  const saveAsDraft = () => {
    // In a real application, you would save the current form state
    alert('Profile saved as draft. You can complete it later from your account settings.');
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-indigo-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-600 text-white p-2 rounded-lg">
                <i className="fas fa-graduation-cap text-xl"></i>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Alumni Connect</h1>
            </div>
            <div className="text-sm text-gray-600">
              Step 1 of 1 • Complete Your Profile
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Message */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Alumni Connect!</h2>
          <p className="text-lg text-gray-600 mb-2">Let's complete your profile to connect you with fellow alumni</p>
          <p className="text-sm text-gray-500">This information helps us create meaningful connections within our alumni network</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="bg-gray-200 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2 text-center">
            {progress}% Complete
          </p>
        </div>

        {/* Form Container */}
        <form 
          ref={formRef}
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          {/* Personal Details Section */}
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <div className="bg-indigo-100 p-2 rounded-lg mr-3">
                <i className="fas fa-user text-indigo-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Personal Details</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                <input 
                  type="text" 
                  name="firstName" 
                  required 
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                  placeholder="Enter your first name" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                <input 
                  type="text" 
                  name="lastName" 
                  required 
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                  placeholder="Enter your last name" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                  placeholder="your.email@example.com" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                  placeholder="+1 (555) 123-4567" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <input 
                  type="date" 
                  name="dob" 
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select 
                  name="gender" 
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Address</label>
              <textarea 
                name="address" 
                rows="3" 
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                placeholder="Enter your current address"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                <input 
                  type="text" 
                  name="city" 
                  required 
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                  placeholder="City" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State/Province</label>
                <input 
                  type="text" 
                  name="state" 
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                  placeholder="State/Province" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                <select 
                  name="country" 
                  required 
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Select Country</option>
                  <option value="us">United States</option>
                  <option value="ca">Canada</option>
                  <option value="uk">United Kingdom</option>
                  <option value="au">Australia</option>
                  <option value="in">India</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Educational Details Section */}
          <div className="mb-8 border-t pt-8">
            <div className="flex items-center mb-6">
              <div className="bg-green-100 p-2 rounded-lg mr-3">
                <i className="fas fa-graduation-cap text-green-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Educational Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Degree Type *</label>
                <select 
                  name="degreeType" 
                  required 
                  value={formData.degreeType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Select Degree</option>
                  <option value="bachelor">Bachelor's Degree</option>
                  <option value="master">Master's Degree</option>
                  <option value="phd">PhD</option>
                  <option value="diploma">Diploma</option>
                  <option value="certificate">Certificate</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Field of Study *</label>
                <input 
                  type="text" 
                  name="fieldOfStudy" 
                  required 
                  value={formData.fieldOfStudy}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                  placeholder="e.g., Computer Science, Business Administration" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year *</label>
                <select 
                  name="graduationYear" 
                  required 
                  value={formData.graduationYear}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Select Year</option>
                  {graduationYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">GPA (Optional)</label>
                <input 
                  type="text" 
                  name="gpa" 
                  value={formData.gpa}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                  placeholder="e.g., 3.8/4.0" 
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Student ID (Optional)</label>
              <input 
                type="text" 
                name="studentId" 
                value={formData.studentId}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                placeholder="Your student ID number" 
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Activities & Achievements</label>
              <textarea 
                name="activities" 
                rows="3" 
                value={formData.activities}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                placeholder="Clubs, societies, awards, honors, etc."
              ></textarea>
            </div>
          </div>

          {/* Professional Experience Section */}
          <div className="mb-8 border-t pt-8">
            <div className="flex items-center mb-6">
              <div className="bg-purple-100 p-2 rounded-lg mr-3">
                <i className="fas fa-briefcase text-purple-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Professional Experience</h3>
            </div>

            <div id="experienceContainer">
              {formData.experiences.map((experience, index) => (
                <div key={index} className="experience-entry border border-gray-200 rounded-lg p-6 mb-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-medium text-gray-800">
                      {index === 0 ? 'Current/Most Recent Position' : `Experience ${index + 1}`}
                    </h4>
                    {index > 0 && (
                      <button 
                        type="button" 
                        onClick={() => removeExperience(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Job Title {index === 0 && '*'}
                      </label>
                      <input 
                        type="text" 
                        name="jobTitle[]"
                        value={experience.jobTitle}
                        onChange={(e) => handleExperienceChange(index, e)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                        placeholder="e.g., Software Engineer" 
                        required={index === 0}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name {index === 0 && '*'}
                      </label>
                      <input 
                        type="text" 
                        name="company[]"
                        value={experience.company}
                        onChange={(e) => handleExperienceChange(index, e)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                        placeholder="Company name" 
                        required={index === 0}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                      <input 
                        type="month" 
                        name="startDate[]"
                        value={experience.startDate}
                        onChange={(e) => handleExperienceChange(index, e)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                      <input 
                        type="month" 
                        name="endDate[]"
                        value={experience.endDate}
                        onChange={(e) => handleExperienceChange(index, e)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                        placeholder="Leave blank if current" 
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
                    <textarea 
                      name="jobDescription[]"
                      rows="3" 
                      value={experience.jobDescription}
                      onChange={(e) => handleExperienceChange(index, e)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                      placeholder="Describe your role and responsibilities"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                      <select 
                        name="industry[]"
                        value={experience.industry}
                        onChange={(e) => handleExperienceChange(index, e)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option value="">Select Industry</option>
                        <option value="technology">Technology</option>
                        <option value="finance">Finance</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="education">Education</option>
                        <option value="consulting">Consulting</option>
                        <option value="manufacturing">Manufacturing</option>
                        <option value="retail">Retail</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input 
                        type="text" 
                        name="workLocation[]"
                        value={experience.workLocation}
                        onChange={(e) => handleExperienceChange(index, e)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                        placeholder="City, State/Country" 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              type="button" 
              onClick={addExperience}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <i className="fas fa-plus mr-2"></i>Add Another Experience
            </button>
          </div>

          {/* Additional Information Section */}
          <div className="mb-8 border-t pt-8">
            <div className="flex items-center mb-6">
              <div className="bg-orange-100 p-2 rounded-lg mr-3">
                <i className="fas fa-info-circle text-orange-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Additional Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile</label>
                <input 
                  type="url" 
                  name="linkedin" 
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                  placeholder="https://linkedin.com/in/yourprofile" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Personal Website</label>
                <input 
                  type="url" 
                  name="website" 
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                  placeholder="https://yourwebsite.com" 
                />
              </div>
            </div>

            {/* Skills Section */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                <i className="fas fa-star text-yellow-500 mr-2"></i>Skills & Expertise
              </label>
              
              <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
                {/* Skills Input */}
                <div>
                  <div className="flex space-x-3">
                    <input 
                      type="text" 
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addSkill(skillInput);
                        }
                      }}
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm" 
                      placeholder="Type a skill and press Enter" 
                    />
                    <button 
                      type="button" 
                      onClick={() => addSkill(skillInput)}
                      className="bg-indigo-600 text-white px-4 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                    >
                      Add Skill
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Press Enter or click "Add Skill" to add</p>
                </div>

                {/* Your Skills Display */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-gray-700">Your Skills</h4>
                    <span className="text-xs text-gray-500">
                      {formData.skills.length} skill{formData.skills.length !== 1 ? 's' : ''} added
                    </span>
                  </div>
                  <div className="min-h-[60px] p-3 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.length === 0 ? (
                        <p className="text-sm text-gray-400 italic w-full text-center py-2">
                          No skills added yet
                        </p>
                      ) : (
                        formData.skills.map((skill, index) => (
                          <div key={index} className="bg-indigo-500 text-white px-3 py-1.5 rounded-lg text-sm flex items-center space-x-2 shadow-sm">
                            <span>{skill}</span>
                            <button 
                              type="button" 
                              onClick={() => removeSkill(index)}
                              className="text-indigo-200 hover:text-white ml-2 transition-colors"
                            >
                              <i className="fas fa-times text-xs"></i>
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Popular Skills Categories */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Add - Popular Skills</h4>
                  
                  {/* Technical Skills */}
                  <div className="mb-4">
                    <p className="text-xs font-medium text-gray-600 mb-2 uppercase tracking-wide">Technical</p>
                    <div className="flex flex-wrap gap-2">
                      {['JavaScript', 'Python', 'SQL', 'Machine Learning', 'Data Analysis'].map(skill => (
                        <button 
                          key={skill}
                          type="button" 
                          onClick={() => addSkill(skill)}
                          className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-md text-xs hover:bg-blue-100 transition-colors border border-blue-200"
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Business Skills */}
                  <div className="mb-4">
                    <p className="text-xs font-medium text-gray-600 mb-2 uppercase tracking-wide">Business</p>
                    <div className="flex flex-wrap gap-2">
                      {['Project Management', 'Leadership', 'Marketing', 'Sales', 'Finance'].map(skill => (
                        <button 
                          key={skill}
                          type="button" 
                          onClick={() => addSkill(skill)}
                          className="bg-green-50 text-green-700 px-3 py-1.5 rounded-md text-xs hover:bg-green-100 transition-colors border border-green-200"
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Soft Skills */}
                  <div>
                    <p className="text-xs font-medium text-gray-600 mb-2 uppercase tracking-wide">Soft Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {['Communication', 'Problem Solving', 'Teamwork', 'Critical Thinking', 'Adaptability'].map(skill => (
                        <button 
                          key={skill}
                          type="button" 
                          onClick={() => addSkill(skill)}
                          className="bg-purple-50 text-purple-700 px-3 py-1.5 rounded-md text-xs hover:bg-purple-100 transition-colors border border-purple-200"
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio/About Me</label>
              <textarea 
                name="bio" 
                rows="4" 
                value={formData.bio}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                placeholder="Tell us about yourself, your interests, and what you're looking for in the alumni network"
              ></textarea>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-4">Networking Preferences</label>
              <div className="space-y-3">
                {[
                  { value: 'mentoring', label: 'Open to mentoring current students' },
                  { value: 'job-referrals', label: 'Available for job referrals' },
                  { value: 'collaboration', label: 'Interested in business collaborations' },
                  { value: 'events', label: 'Want to attend alumni events' }
                ].map(pref => (
                  <label key={pref.value} className="flex items-center">
                    <input 
                      type="checkbox" 
                      name="networking[]"
                      value={pref.value}
                      checked={formData.networking.includes(pref.value)}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
                    />
                    <span className="ml-2 text-sm text-gray-700">{pref.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="mb-8 border-t pt-8">
            <div className="flex items-center mb-6">
              <div className="bg-red-100 p-2 rounded-lg mr-3">
                <i className="fas fa-shield-alt text-red-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Privacy Settings</h3>
            </div>

            <div className="space-y-4">
              {[
                { value: 'profile-visible', label: 'Make my profile visible to other alumni', checked: true },
                { value: 'contact-info', label: 'Allow other alumni to see my contact information' },
                { value: 'email-notifications', label: 'Receive email notifications about network activities', checked: true }
              ].map(setting => (
                <label key={setting.value} className="flex items-center">
                  <input 
                    type="checkbox" 
                    name="privacy[]"
                    value={setting.value}
                    checked={formData.privacy.includes(setting.value)}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
                  />
                  <span className="ml-2 text-sm text-gray-700">{setting.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Terms and Submit */}
          <div className="border-t pt-8">
            <div className="mb-6">
              <label className="flex items-start">
                <input 
                  type="checkbox" 
                  name="terms" 
                  required 
                  checked={formData.terms}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mt-1" 
                />
                <span className="ml-2 text-sm text-gray-700">
  I agree to the{' '}
  <button 
    type="button" 
    className="text-indigo-600 hover:text-indigo-800 underline bg-transparent border-none p-0 cursor-pointer"
    onClick={() => alert('Terms of Service would open here')}
  >
    Terms of Service
  </button>{' '}
  and{' '}
  <button 
    type="button" 
    className="text-indigo-600 hover:text-indigo-800 underline bg-transparent border-none p-0 cursor-pointer"
    onClick={() => alert('Privacy Policy would open here')}
  >
    Privacy Policy
  </button>{' '}
  *
</span>
              </label>
            </div>

            <div className="flex justify-between items-center">
              <button 
                type="button" 
                onClick={saveAsDraft}
                className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Save as Draft
              </button>
              <button 
                type="submit" 
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
              >
                Complete Profile & Continue
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AlumniConnectProfile;