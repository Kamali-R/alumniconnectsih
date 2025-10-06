import React, { useState, useEffect } from 'react';
import {
  FaUser, FaVenusMars, FaCalendar, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaGraduationCap, FaUniversity, FaIdCard, FaCertificate, FaCodeBranch, FaCalendarAlt,
  FaBriefcase, FaTools, FaStar, FaUserEdit, FaGlobe, FaUpload, FaShieldAlt, FaInfoCircle,
  FaPlus, FaTimes, FaArrowRight, FaCheckCircle, FaWrench, FaHeart, FaDollarSign,
  FaBuilding, FaLightbulb, FaGraduationCap as FaGraduation, FaSearch, FaExclamationCircle,
  FaEdit, FaCamera, FaTrophy, FaAward, FaMedal, FaSave, FaLinkedin, FaGithub, FaFile,
  FaBook, FaSchool, FaChalkboardTeacher
} from 'react-icons/fa';
import axios from 'axios';

const StudentProfileDisplay = () => {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    personalInfo: {},
    academicInfo: {},
    skills: [],
    interests: [],
    otherInfo: {}
  });
  const [updateLoading, setUpdateLoading] = useState(false);
 
  useEffect(() => {
    fetchProfileData();
  }, []);
 
  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/student/profile', {
        headers: {
          'Authorization': `Bearer ${token}`  // Fixed: using backticks instead of single quotes
        }
      });
     
      setProfileData(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching profile data:', err);
      setError('Failed to load profile data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
 
  const handleEditClick = () => {
    setIsEditing(true);
    // Initialize editData with current profile data
    setEditData({
      personalInfo: { ...profileData.personalInfo },
      academicInfo: { ...profileData.academicInfo },
      skills: [...profileData.skills],
      interests: [...profileData.interests],
      otherInfo: { ...profileData.otherInfo }
    });
  };
 
  const handleCancelEdit = () => {
    setIsEditing(false);
  };
 
  const handleInputChange = (section, field, value) => {
    setEditData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };
 
  const handleArrayChange = (arrayName, index, value) => {
    setEditData(prev => {
      const newArray = [...prev[arrayName]];
      newArray[index] = value;
      return {
        ...prev,
        [arrayName]: newArray
      };
    });
  };
 
  const handleAddItem = (arrayName) => {
    setEditData(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], '']
    }));
  };
 
  const handleRemoveItem = (arrayName, index) => {
    setEditData(prev => {
      const newArray = [...prev[arrayName]];
      newArray.splice(index, 1);
      return {
        ...prev,
        [arrayName]: newArray
      };
    });
  };
 
  const handleUpdateProfile = async () => {
    try {
      setUpdateLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:5000/api/student/profile', editData, {
        headers: {
          'Authorization': `Bearer ${token}`  // Fixed: using backticks instead of single quotes
        }
      });
     
      setProfileData(response.data);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      console.error('Error updating profile data:', err);
      setError('Failed to update profile. Please try again later.');
    } finally {
      setUpdateLoading(false);
    }
  };
 
  const getDegreeDisplayValue = (degreeValue) => {
    if (!degreeValue) return 'Not specified';
   
    const degreeMap = {
      'btech': 'B.Tech',
      'be': 'B.E',
      'bsc': 'B.Sc',
      'ba': 'B.A',
      'bcom': 'B.Com',
      'bba': 'BBA',
      'bca': 'BCA',
      'mtech': 'M.Tech',
      'me': 'M.E',
      'msc': 'M.Sc',
      'ma': 'M.A',
      'mcom': 'M.Com',
      'mba': 'MBA',
      'mca': 'MCA',
      'phd': 'PhD',
      'other': 'Other'
    };
   
    return degreeMap[degreeValue.toLowerCase()] || degreeValue;
  };
 
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
 
  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }
 
  if (!profileData) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">No profile data found. Please complete your profile first.</p>
          </div>
        </div>
      </div>
    );
  }
 
  const { personalInfo, academicInfo, skills, interests, otherInfo } = profileData;
 
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Student Profile</h1>
          {isEditing ? (
            <div className="flex space-x-3">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 flex items-center"
              >
                <FaTimes className="mr-2" /> Cancel
              </button>
              <button
                onClick={handleUpdateProfile}
                disabled={updateLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center disabled:opacity-50"
              >
                {updateLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <FaSave className="mr-2" /> Update Profile
                  </>
                )}
              </button>
            </div>
          ) : (
            <button
              onClick={handleEditClick}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
            >
              <FaUserEdit className="mr-2" /> Edit Profile
            </button>
          )}
        </div>
       
        {/* Profile Image Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center space-x-6">
            <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
              {personalInfo?.fullName ? (
                <div className="w-full h-full flex items-center justify-center bg-blue-600 text-white text-4xl font-bold">
                  {personalInfo.fullName.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </div>
              ) : (
                <FaUser className="text-gray-400 text-4xl" />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.personalInfo.fullName || ''}
                    onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
                    className="text-2xl font-bold bg-gray-100 px-3 py-1 rounded w-full"
                  />
                ) : (
                  personalInfo?.fullName || 'Not specified'
                )}
              </h2>
              <p className="text-gray-600">
                {isEditing ? (
                  <div className="flex space-x-2">
                    <select
                      value={editData.academicInfo.degree || ''}
                      onChange={(e) => handleInputChange('academicInfo', 'degree', e.target.value)}
                      className="bg-gray-100 px-3 py-1 rounded"
                    >
                      <option value="">Select Degree</option>
                      <option value="btech">B.Tech</option>
                      <option value="be">B.E</option>
                      <option value="bsc">B.Sc</option>
                      <option value="ba">B.A</option>
                      <option value="bcom">B.Com</option>
                      <option value="bba">BBA</option>
                      <option value="bca">BCA</option>
                      <option value="mtech">M.Tech</option>
                      <option value="me">M.E</option>
                      <option value="msc">M.Sc</option>
                      <option value="ma">M.A</option>
                      <option value="mcom">M.Com</option>
                      <option value="mba">MBA</option>
                      <option value="mca">MCA</option>
                      <option value="phd">PhD</option>
                      <option value="other">Other</option>
                    </select>
                    <input
                      type="text"
                      value={editData.academicInfo.branch || ''}
                      onChange={(e) => handleInputChange('academicInfo', 'branch', e.target.value)}
                      placeholder="Branch"
                      className="bg-gray-100 px-3 py-1 rounded"
                    />
                  </div>
                ) : (
                  <>
                    {academicInfo?.degree ? getDegreeDisplayValue(academicInfo.degree) : 'Degree not specified'}
                    {academicInfo?.branch ? ` in ${academicInfo.branch}` : ''}
                  </>
                )}
              </p>
              <p className="text-gray-600">
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.academicInfo.expectedGraduationYear || ''}
                    onChange={(e) => handleInputChange('academicInfo', 'expectedGraduationYear', e.target.value)}
                    placeholder="Expected Graduation Year"
                    className="bg-gray-100 px-3 py-1 rounded"
                  />
                ) : (
                  academicInfo?.expectedGraduationYear ? `Class of ${academicInfo.expectedGraduationYear}` : 'Graduation year not specified'
                )}
              </p>
              <p className="text-gray-600 mt-2">
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.personalInfo.location || ''}
                    onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
                    placeholder="Location"
                    className="bg-gray-100 px-3 py-1 rounded"
                  />
                ) : (
                  personalInfo?.location || 'Location not specified'
                )}
              </p>
            </div>
          </div>
        </div>
       
        {/* Personal Information */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-blue-100 p-2 rounded-full">
              <FaUser className="text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.personalInfo.fullName || ''}
                  onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              ) : (
                <p className="text-gray-900">{personalInfo?.fullName || 'Not specified'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Gender</label>
              {isEditing ? (
                <select
                  value={editData.personalInfo.gender || ''}
                  onChange={(e) => handleInputChange('personalInfo', 'gender', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              ) : (
                <p className="text-gray-900">{personalInfo?.gender || 'Not specified'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Date of Birth</label>
              {isEditing ? (
                <input
                  type="date"
                  value={editData.personalInfo.dob ? new Date(editData.personalInfo.dob).toISOString().split('T')[0] : ''}
                  onChange={(e) => handleInputChange('personalInfo', 'dob', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              ) : (
                <p className="text-gray-900">
                  {personalInfo?.dob ? new Date(personalInfo.dob).toLocaleDateString() : 'Not specified'}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Personal Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={editData.personalInfo.personalEmail || ''}
                  onChange={(e) => handleInputChange('personalInfo', 'personalEmail', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              ) : (
                <p className="text-gray-900">{personalInfo?.personalEmail || 'Not specified'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editData.personalInfo.phone || ''}
                  onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              ) : (
                <p className="text-gray-900">{personalInfo?.phone || 'Not specified'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Location</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.personalInfo.location || ''}
                  onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              ) : (
                <p className="text-gray-900">{personalInfo?.location || 'Not specified'}</p>
              )}
            </div>
          </div>
        </div>
       
        {/* Academic Information */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-green-100 p-2 rounded-full">
              <FaGraduationCap className="text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Academic Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">College Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={editData.academicInfo.collegeEmail || ''}
                  onChange={(e) => handleInputChange('academicInfo', 'collegeEmail', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              ) : (
                <p className="text-gray-900">{academicInfo?.collegeEmail || 'Not specified'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Enrollment Number</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.academicInfo.enrollmentNumber || ''}
                  onChange={(e) => handleInputChange('academicInfo', 'enrollmentNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              ) : (
                <p className="text-gray-900">{academicInfo?.enrollmentNumber || 'Not specified'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Degree</label>
              {isEditing ? (
                <select
                  value={editData.academicInfo.degree || ''}
                  onChange={(e) => handleInputChange('academicInfo', 'degree', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Degree</option>
                  <option value="btech">B.Tech</option>
                  <option value="be">B.E</option>
                  <option value="bsc">B.Sc</option>
                  <option value="ba">B.A</option>
                  <option value="bcom">B.Com</option>
                  <option value="bba">BBA</option>
                  <option value="bca">BCA</option>
                  <option value="mtech">M.Tech</option>
                  <option value="me">M.E</option>
                  <option value="msc">M.Sc</option>
                  <option value="ma">M.A</option>
                  <option value="mcom">M.Com</option>
                  <option value="mba">MBA</option>
                  <option value="mca">MCA</option>
                  <option value="phd">PhD</option>
                  <option value="other">Other</option>
                </select>
              ) : (
                <p className="text-gray-900">
                  {academicInfo?.degree ? getDegreeDisplayValue(academicInfo.degree) : 'Not specified'}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Branch</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.academicInfo.branch || ''}
                  onChange={(e) => handleInputChange('academicInfo', 'branch', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              ) : (
                <p className="text-gray-900">{academicInfo?.branch || 'Not specified'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Expected Graduation Year</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.academicInfo.expectedGraduationYear || ''}
                  onChange={(e) => handleInputChange('academicInfo', 'expectedGraduationYear', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              ) : (
                <p className="text-gray-900">{academicInfo?.expectedGraduationYear || 'Not specified'}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">CGPA</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.academicInfo.cgpa || ''}
                  onChange={(e) => handleInputChange('academicInfo', 'cgpa', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              ) : (
                <p className="text-gray-900">{academicInfo?.cgpa || 'Not specified'}</p>
              )}
            </div>
          </div>
        </div>
       
        {/* Skills & Interests */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-yellow-100 p-2 rounded-full">
              <FaTools className="text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Skills & Interests</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Skills Section */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Skills</label>
              {isEditing ? (
                <div>
                  {editData.skills.map((skill, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input
                        type="text"
                        value={skill}
                        onChange={(e) => handleArrayChange('skills', index, e.target.value)}
                        className="flex-grow px-3 py-2 border border-gray-300 rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveItem('skills', index)}
                        className="ml-2 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleAddItem('skills')}
                    className="mt-2 px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center"
                  >
                    <FaPlus className="mr-1" /> Add Skill
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {skills && skills.length > 0 ? (
                    skills.map((skill, index) => (
                      <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500">No skills added yet.</p>
                  )}
                </div>
              )}
            </div>
            {/* Interests Section */}
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Interests</label>
              {isEditing ? (
                <div>
                  {editData.interests.map((interest, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input
                        type="text"
                        value={interest}
                        onChange={(e) => handleArrayChange('interests', index, e.target.value)}
                        className="flex-grow px-3 py-2 border border-gray-300 rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveItem('interests', index)}
                        className="ml-2 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleAddItem('interests')}
                    className="mt-2 px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center"
                  >
                    <FaPlus className="mr-1" /> Add Interest
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {interests && interests.length > 0 ? (
                    interests.map((interest, index) => (
                      <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        {interest}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500">No interests added yet.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
       
        {/* Additional Information */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-indigo-100 p-2 rounded-full">
              <FaInfoCircle className="text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Additional Information</h3>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Bio</label>
              {isEditing ? (
                <textarea
                  value={editData.otherInfo.bio || ''}
                  onChange={(e) => handleInputChange('otherInfo', 'bio', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              ) : (
                <p className="text-gray-900 whitespace-pre-line">
                  {otherInfo?.bio || 'No bio added yet.'}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">LinkedIn</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.otherInfo.linkedin || ''}
                    onChange={(e) => handleInputChange('otherInfo', 'linkedin', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                ) : (
                  <p className="text-gray-900">
                    {otherInfo?.linkedin ? (
                      <a href={otherInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {otherInfo.linkedin}
                      </a>
                    ) : 'Not provided'}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">GitHub</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.otherInfo.github || ''}
                    onChange={(e) => handleInputChange('otherInfo', 'github', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                ) : (
                  <p className="text-gray-900">
                    {otherInfo?.github ? (
                      <a href={otherInfo.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {otherInfo.github}
                      </a>
                    ) : 'Not provided'}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Portfolio</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.otherInfo.portfolio || ''}
                    onChange={(e) => handleInputChange('otherInfo', 'portfolio', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                ) : (
                  <p className="text-gray-900">
                    {otherInfo?.portfolio ? (
                      <a href={otherInfo.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {otherInfo.portfolio}
                      </a>
                    ) : 'Not provided'}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Resume</label>
                <p className="text-gray-900">
                  {profileData?.resumeFileName ? (
                    <div className="flex items-center">
                      <FaFile className="text-gray-400 mr-2" />
                      <span>{profileData.resumeFileName}</span>
                    </div>
                  ) : 'No resume uploaded'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileDisplay;