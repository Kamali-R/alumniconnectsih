import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaGraduationCap, FaBriefcase, FaChartLine, FaSignOutAlt, FaUserCircle, FaUser, FaEnvelope, FaBuilding, FaPlus, FaTimes, FaTag, FaFilter, FaSearch, FaMapMarkerAlt, FaBriefcase as FaWork, FaCalendarAlt, FaUserCheck, FaUserPlus, FaUserTimes, FaEye, FaUsers, FaClipboardList } from 'react-icons/fa';

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [showCreateJobForm, setShowCreateJobForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showJobDetails, setShowJobDetails] = useState(false);
  
  const [skills, setSkills] = useState([
    {
      name: 'Artificial Intelligence & Machine Learning',
      description: 'High demand for AI/ML engineers. Focus on Python, TensorFlow, and data analysis.',
      status: 'Hot'
    },
    {
      name: 'Cloud Computing (AWS/Azure)',
      description: 'Essential for modern development. Start with AWS fundamentals and containerization.',
      status: 'Trending'
    },
    {
      name: 'React & Modern JavaScript',
      description: 'Frontend development essential. Learn React, Next.js, and TypeScript.',
      status: 'Stable'
    },
    {
      name: 'Cybersecurity',
      description: 'Growing field with excellent job security. Focus on network security and ethical hacking.',
      status: 'Growing'
    }
  ]);
  
  // Job form state
  const [jobForm, setJobForm] = useState({
    jobTitle: '',
    jobDescription: '',
    location: '',
    salaryRange: '',
    applicationDeadline: '',
    skills: [],
    jobType: 'Full-time',
    applyLink: ''
  });
  
  const [newSkill, setNewSkill] = useState({
    name: '',
    description: ''
  });
  
  const [currentJobSkill, setCurrentJobSkill] = useState('');
  
  // Alumni and Student Directory State
  const [alumniData, setAlumniData] = useState([]);
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    year: '',
    branch: '',
    industry: '',
    careerStatus: '',
    skill: '',
    location: '',
    interest: ''
  });
  
  const alumniDataInitial = [
    {
      id: 1,
      name: "Sarah Johnson",
      graduationYear: "2022",
      branch: "Computer Science",
      currentRole: "Software Engineer",
      company: "Google",
      location: "San Francisco, CA",
      industry: "Technology",
      careerStatus: "Currently Working",
      skills: ["Python", "React", "Machine Learning"],
      interests: ["Photography", "Travel"],
      email: "sarah.johnson@email.com",
      linkedin: "linkedin.com/in/sarahjohnson",
      connected: false,
      pending: false,
      requestReceived: false,
      type: "alumni"
    },
    {
      id: 2,
      name: "Michael Chen",
      graduationYear: "2021",
      branch: "Electrical Engineering",
      currentRole: "Product Manager",
      company: "Tesla",
      location: "Austin, TX",
      industry: "Technology",
      careerStatus: "Currently Working",
      skills: ["Product Strategy", "Data Analysis", "Leadership"],
      interests: ["Sports", "Music"],
      email: "michael.chen@email.com",
      linkedin: "linkedin.com/in/michaelchen",
      connected: false,
      pending: false,
      requestReceived: false,
      type: "alumni"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      graduationYear: "2023",
      branch: "Business Administration",
      currentRole: "Financial Analyst",
      company: "Goldman Sachs",
      location: "New York, NY",
      industry: "Finance",
      careerStatus: "Currently Working",
      skills: ["Financial Modeling", "Excel", "Risk Analysis"],
      interests: ["Reading", "Cooking"],
      email: "emily.rodriguez@email.com",
      linkedin: "linkedin.com/in/emilyrodriguez",
      connected: true,
      pending: false,
      requestReceived: false,
      type: "alumni"
    },
    {
      id: 4,
      name: "David Kim",
      graduationYear: "2020",
      branch: "Mechanical Engineering",
      currentRole: "Design Engineer",
      company: "Boeing",
      location: "Seattle, WA",
      industry: "Aerospace",
      careerStatus: "Currently Working",
      skills: ["CAD", "Project Management", "Manufacturing"],
      interests: ["Travel", "Photography"],
      email: "david.kim@email.com",
      linkedin: "linkedin.com/in/davidkim",
      connected: false,
      pending: true,
      requestReceived: false,
      type: "alumni"
    },
    {
      id: 5,
      name: "Jennifer Liu",
      graduationYear: "2019",
      branch: "Computer Science",
      currentRole: "Data Scientist",
      company: "Microsoft",
      location: "Redmond, WA",
      industry: "Technology",
      careerStatus: "Currently Working",
      skills: ["Python", "Data Analysis", "Machine Learning"],
      interests: ["Hiking", "Photography"],
      email: "jennifer.liu@email.com",
      linkedin: "linkedin.com/in/jenniferliu",
      connected: false,
      pending: false,
      requestReceived: true,
      type: "alumni"
    }
  ];
  
  const studentDataInitial = [
    {
      id: 101,
      name: "Alex Rivera",
      graduationYear: "2025",
      branch: "Computer Science",
      currentRole: "Student",
      company: "University Name",
      location: "Boston, MA",
      industry: "Education",
      careerStatus: "Student",
      skills: ["Java", "Web Development", "Data Structures"],
      interests: ["Gaming", "Music"],
      email: "alex.rivera@university.edu",
      linkedin: "",
      connected: false,
      pending: false,
      requestReceived: false,
      type: "student"
    },
    {
      id: 102,
      name: "Maya Patel",
      graduationYear: "2024",
      branch: "Business Administration",
      currentRole: "Student",
      company: "University Name",
      location: "New York, NY",
      industry: "Education",
      careerStatus: "Student",
      skills: ["Marketing", "Excel", "Presentation"],
      interests: ["Travel", "Photography"],
      email: "maya.patel@university.edu",
      linkedin: "",
      connected: true,
      pending: false,
      requestReceived: false,
      type: "student"
    },
    {
      id: 103,
      name: "Jordan Lee",
      graduationYear: "2026",
      branch: "Electrical Engineering",
      currentRole: "Student",
      company: "University Name",
      location: "Chicago, IL",
      industry: "Education",
      careerStatus: "Student",
      skills: ["Circuit Design", "MATLAB", "Robotics"],
      interests: ["Sports", "Technology"],
      email: "jordan.lee@university.edu",
      linkedin: "",
      connected: false,
      pending: false,
      requestReceived: true,
      type: "student"
    }
  ];
  
  const [jobPostings, setJobPostings] = useState([
    {
      id: 1,
      title: 'Senior Software Engineer',
      type: 'Full-time • Remote',
      applications: 15,
      posted: '3 days ago',
      status: 'Active',
      company: 'TechCorp Solutions',
      location: 'Remote',
      experience: '5+ years',
      description: 'We are looking for an experienced Senior Software Engineer to join our dynamic team. The ideal candidate will have strong problem-solving skills and expertise in modern web technologies.',
      skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
      applyLink: 'https://techcorp.com/careers/senior-software-engineer'
    },
    {
      id: 2,
      title: 'Product Manager',
      type: 'Full-time • San Francisco, CA',
      applications: 8,
      posted: '1 week ago',
      status: 'Active',
      company: 'Innovate Inc',
      location: 'San Francisco, CA',
      experience: '3-5 years',
      description: 'Seeking a Product Manager to drive product strategy and execution. You will work closely with engineering, design, and marketing teams to deliver exceptional products.',
      skills: ['Product Strategy', 'Agile', 'Data Analysis', 'Leadership'],
      applyLink: 'https://innovate.com/careers/product-manager'
    },
    {
      id: 3,
      title: 'UX Designer',
      type: 'Full-time • New York, NY',
      applications: 0,
      posted: '2 days ago',
      status: 'Draft',
      company: 'Design Studio',
      location: 'New York, NY',
      experience: '2-4 years',
      description: 'Join our design team as a UX Designer and create amazing user experiences. We are looking for someone with a strong portfolio and experience in user research.',
      skills: ['UI/UX Design', 'Figma', 'User Research', 'Prototyping'],
      applyLink: 'https://designstudio.com/careers/ux-designer'
    }
  ]);
  
  // Initialize alumni and student data
  useEffect(() => {
    setAlumniData(alumniDataInitial);
    setFilteredAlumni(alumniDataInitial);
    setStudentData(studentDataInitial);
    setFilteredStudents(studentDataInitial);
  }, []);
  
  // Filter alumni when filters change
  useEffect(() => {
    const filteredAlumni = alumniData.filter(alumni => {
      const matchesSearch = !filters.search || 
        alumni.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        alumni.company.toLowerCase().includes(filters.search.toLowerCase()) ||
        alumni.currentRole.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesYear = !filters.year || alumni.graduationYear === filters.year;
      const matchesBranch = !filters.branch || alumni.branch === filters.branch;
      const matchesIndustry = !filters.industry || alumni.industry === filters.industry;
      const matchesCareerStatus = !filters.careerStatus || alumni.careerStatus === filters.careerStatus;
      const matchesSkill = !filters.skill || alumni.skills.includes(filters.skill);
      const matchesLocation = !filters.location || alumni.location.includes(filters.location);
      const matchesInterest = !filters.interest || alumni.interests.includes(filters.interest);
      
      return matchesSearch && matchesYear && matchesBranch && matchesIndustry && 
             matchesCareerStatus && matchesSkill && matchesLocation && matchesInterest;
    });
    
    const filteredStudents = studentData.filter(student => {
      const matchesSearch = !filters.search || 
        student.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        student.company.toLowerCase().includes(filters.search.toLowerCase()) ||
        student.currentRole.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesYear = !filters.year || student.graduationYear === filters.year;
      const matchesBranch = !filters.branch || student.branch === filters.branch;
      const matchesIndustry = !filters.industry || student.industry === filters.industry;
      const matchesCareerStatus = !filters.careerStatus || student.careerStatus === filters.careerStatus;
      const matchesSkill = !filters.skill || student.skills.includes(filters.skill);
      const matchesLocation = !filters.location || student.location.includes(filters.location);
      const matchesInterest = !filters.interest || student.interests.includes(filters.interest);
      
      return matchesSearch && matchesYear && matchesBranch && matchesIndustry && 
             matchesCareerStatus && matchesSkill && matchesLocation && matchesInterest;
    });
    
    setFilteredAlumni(filteredAlumni);
    setFilteredStudents(filteredStudents);
  }, [filters, alumniData, studentData]);
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Draft': return 'bg-yellow-100 text-yellow-700';
      case 'Hot': return 'bg-red-100 text-red-700';
      case 'Trending': return 'bg-orange-100 text-orange-700';
      case 'Stable': return 'bg-blue-100 text-blue-700';
      case 'Growing': return 'bg-green-100 text-green-700';
      case 'New': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };
  
  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('profileCompleted');
    
    // Show confirmation
    if (window.confirm("Are you sure you want to logout?")) {
      // Redirect to login page
      navigate('/login');
    }
  };
  
  const handleCreateJob = () => {
    setShowCreateJobForm(true);
    setShowJobDetails(false);
  };
  
  const handleCancelJob = () => {
    setShowCreateJobForm(false);
    setJobForm({
      jobTitle: '',
      jobDescription: '',
      location: '',
      salaryRange: '',
      applicationDeadline: '',
      skills: [],
      jobType: 'Full-time',
      applyLink: ''
    });
  };
  
  const handleSubmitJob = (e) => {
    e.preventDefault();
    if (!jobForm.jobTitle || !jobForm.jobDescription || !jobForm.location || 
        !jobForm.applicationDeadline || jobForm.skills.length === 0 || 
        !jobForm.jobType || !jobForm.applyLink) {
      alert("Please fill in all required fields");
      return;
    }
    
    const newJob = {
      id: jobPostings.length + 1,
      title: jobForm.jobTitle,
      type: `${jobForm.jobType} • ${jobForm.location}`,
      applications: 0,
      posted: 'Just now',
      status: 'Draft',
      company: 'TechCorp Solutions',
      location: jobForm.location,
      experience: 'Not specified',
      description: jobForm.jobDescription,
      skills: jobForm.skills,
      applyLink: jobForm.applyLink
    };
    
    setJobPostings([newJob, ...jobPostings]);
    setShowCreateJobForm(false);
    setJobForm({
      jobTitle: '',
      jobDescription: '',
      location: '',
      salaryRange: '',
      applicationDeadline: '',
      skills: [],
      jobType: 'Full-time',
      applyLink: ''
    });
    
    alert("Job posted successfully!");
  };
  
  const handleJobClick = (job) => {
    setSelectedJob(job);
    setShowJobDetails(true);
    setShowCreateJobForm(false);
  };
  
  const handleAlumniClick = (name) => {
    console.log(`Viewing profile for: ${name}`);
  };
  
  const handleStudentClick = (name) => {
    console.log(`Viewing profile for: ${name}`);
  };
  
  const handleAddSkill = () => {
    if (!newSkill.name.trim() || !newSkill.description.trim()) {
      return;
    }
    const newSkillObj = {
      name: newSkill.name,
      description: newSkill.description,
      status: 'New'
    };
    setSkills([newSkillObj, ...skills]);
    setNewSkill({ name: '', description: '' });
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSkill(prev => ({ ...prev, [name]: value }));
  };
  
  const handleJobInputChange = (e) => {
    const { name, value } = e.target;
    setJobForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleJobSkillAdd = (e) => {
    if (e.key === 'Enter' && currentJobSkill.trim() !== '') {
      e.preventDefault();
      if (!jobForm.skills.includes(currentJobSkill.trim())) {
        setJobForm(prev => ({
          ...prev,
          skills: [...prev.skills, currentJobSkill.trim()]
        }));
      }
      setCurrentJobSkill('');
    }
  };
  
  const handleRemoveJobSkill = (skillToRemove) => {
    setJobForm(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddSkill();
    }
  };
  
  // Filter handlers
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };
  
  const clearFilters = () => {
    setFilters({
      search: '',
      year: '',
      branch: '',
      industry: '',
      careerStatus: '',
      skill: '',
      location: '',
      interest: ''
    });
  };
  
  // Connection management
  const sendConnectionRequest = (personId, type) => {
    if (type === 'alumni') {
      const updatedAlumni = alumniData.map(alumni => {
        if (alumni.id === personId) {
          return { ...alumni, pending: true };
        }
        return alumni;
      });
      
      setAlumniData(updatedAlumni);
    } else {
      const updatedStudents = studentData.map(student => {
        if (student.id === personId) {
          return { ...student, pending: true };
        }
        return student;
      });
      
      setStudentData(updatedStudents);
    }
  };
  
  const acceptConnection = (personId, type) => {
    if (type === 'alumni') {
      const updatedAlumni = alumniData.map(alumni => {
        if (alumni.id === personId) {
          return { ...alumni, pending: false, connected: true, requestReceived: false };
        }
        return alumni;
      });
      
      setAlumniData(updatedAlumni);
    } else {
      const updatedStudents = studentData.map(student => {
        if (student.id === personId) {
          return { ...student, pending: false, connected: true, requestReceived: false };
        }
        return student;
      });
      
      setStudentData(updatedStudents);
    }
  };
  
  const declineConnection = (personId, type) => {
    if (type === 'alumni') {
      const updatedAlumni = alumniData.map(alumni => {
        if (alumni.id === personId) {
          return { ...alumni, pending: false, requestReceived: false };
        }
        return alumni;
      });
      
      setAlumniData(updatedAlumni);
    } else {
      const updatedStudents = studentData.map(student => {
        if (student.id === personId) {
          return { ...student, pending: false, requestReceived: false };
        }
        return student;
      });
      
      setStudentData(updatedStudents);
    }
  };
  
  // Get connection counts
  const getAlumniConnectionCount = () => {
    return alumniData.filter(alumni => alumni.connected).length;
  };
  
  const getStudentConnectionCount = () => {
    return studentData.filter(student => student.connected).length;
  };
  
  const getJobPostingsCount = () => {
    return jobPostings.length;
  };
  
  const DashboardStatsCard = ({ title, value, icon, color }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center">
        <div className={`${color} w-12 h-12 rounded-xl flex items-center justify-center mr-4`}>
          {icon}
        </div>
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
  
  const DashboardSection = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardStatsCard 
          title="Alumni Connections" 
          value={getAlumniConnectionCount()} 
          icon={<FaUserCheck className="text-white text-xl" />} 
          color="bg-blue-500" 
        />
        <DashboardStatsCard 
          title="Student Connections" 
          value={getStudentConnectionCount()} 
          icon={<FaUserCheck className="text-white text-xl" />} 
          color="bg-green-500" 
        />
        <DashboardStatsCard 
          title="Jobs Posted" 
          value={getJobPostingsCount()} 
          icon={<FaBriefcase className="text-white text-xl" />} 
          color="bg-purple-500" 
        />
        <DashboardStatsCard 
          title="Pending Requests" 
          value={alumniData.filter(a => a.requestReceived).length + studentData.filter(s => s.requestReceived).length} 
          icon={<FaUserPlus className="text-white text-xl" />} 
          color="bg-yellow-500" 
        />
      </div>
      
      {/* Trending Skills Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <FaChartLine className="text-blue-600 text-xl mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Trending Skills & Technologies</h2>
          </div>
        </div>
        
        {/* Existing Skills List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill, index) => (
            <div key={index} className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">{skill.name}</h4>
                  <p className="text-sm text-gray-600">{skill.description}</p>
                </div>
                <span className={`text-xs ${getStatusColor(skill.status)} px-2 py-1 rounded-full font-medium ml-3`}>
                  {skill.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
  const AlumniCard = ({ alumni, onConnect, onAccept, onDecline }) => {
    let buttonContent;
    let buttonClass;
    
    if (alumni.connected) {
      buttonContent = (
        <div className="flex items-center justify-center">
          <FaUserCheck className="mr-2" />
          Connected
        </div>
      );
      buttonClass = 'bg-green-600 text-white cursor-not-allowed';
    } else if (alumni.pending) {
      buttonContent = (
        <div className="flex items-center justify-center">
          <FaUserPlus className="mr-2" />
          Request Sent
        </div>
      );
      buttonClass = 'bg-yellow-600 text-white cursor-not-allowed';
    } else if (alumni.requestReceived) {
      return (
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                <span className="text-blue-600 font-semibold text-lg">{alumni.name.charAt(0)}</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{alumni.name}</h3>
                <p className="text-gray-600">{alumni.currentRole} at {alumni.company}</p>
                <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs mt-1">
                  Alumni
                </span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
              {alumni.branch} • Class of {alumni.graduationYear}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              {alumni.location}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
              {alumni.industry}
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Skills:</p>
            <div className="flex flex-wrap gap-2">
              {alumni.skills.map(skill => (
                <span key={skill} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={onAccept}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium text-sm flex-1 transition-colors flex items-center justify-center"
            >
              <FaUserCheck className="mr-2" />
              Accept
            </button>
            <button 
              onClick={onDecline}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium text-sm flex-1 transition-colors flex items-center justify-center"
            >
              <FaUserTimes className="mr-2" />
              Decline
            </button>
          </div>
        </div>
      );
    } else {
      buttonContent = (
        <div className="flex items-center justify-center">
          <FaUserPlus className="mr-2" />
          Connect
        </div>
      );
      buttonClass = 'bg-blue-600 hover:bg-blue-700 text-white';
    }
    
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
              <span className="text-blue-600 font-semibold text-lg">{alumni.name.charAt(0)}</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{alumni.name}</h3>
              <p className="text-gray-600">{alumni.currentRole} at {alumni.company}</p>
              <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs mt-1">
                Alumni
                {alumni.connected && <span className="ml-1">✓</span>}
              </span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
            {alumni.branch} • Class of {alumni.graduationYear}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            {alumni.location}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
            {alumni.industry}
            {alumni.connected && <span className="ml-2 text-green-600">✓ Connected</span>}
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Skills:</p>
          <div className="flex flex-wrap gap-2">
            {alumni.skills.map(skill => (
              <span key={skill} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={onConnect}
            className={`${buttonClass} px-4 py-2 rounded-lg font-medium text-sm flex-1 transition-colors`}
            disabled={alumni.connected || alumni.pending}
          >
            {buttonContent}
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm">
            View Profile
          </button>
        </div>
      </div>
    );
  };
  
  const StudentCard = ({ student, onConnect, onAccept, onDecline }) => {
    let buttonContent;
    let buttonClass;
    
    if (student.connected) {
      buttonContent = (
        <div className="flex items-center justify-center">
          <FaUserCheck className="mr-2" />
          Connected
        </div>
      );
      buttonClass = 'bg-green-600 text-white cursor-not-allowed';
    } else if (student.pending) {
      buttonContent = (
        <div className="flex items-center justify-center">
          <FaUserPlus className="mr-2" />
          Request Sent
        </div>
      );
      buttonClass = 'bg-yellow-600 text-white cursor-not-allowed';
    } else if (student.requestReceived) {
      return (
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                <span className="text-green-600 font-semibold text-lg">{student.name.charAt(0)}</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                <p className="text-gray-600">{student.currentRole} at {student.company}</p>
                <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs mt-1">
                  Student
                </span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
              {student.branch} • Class of {student.graduationYear}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              {student.location}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
              {student.industry}
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Skills:</p>
            <div className="flex flex-wrap gap-2">
              {student.skills.map(skill => (
                <span key={skill} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={onAccept}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium text-sm flex-1 transition-colors flex items-center justify-center"
            >
              <FaUserCheck className="mr-2" />
              Accept
            </button>
            <button 
              onClick={onDecline}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium text-sm flex-1 transition-colors flex items-center justify-center"
            >
              <FaUserTimes className="mr-2" />
              Decline
            </button>
          </div>
        </div>
      );
    } else {
      buttonContent = (
        <div className="flex items-center justify-center">
          <FaUserPlus className="mr-2" />
          Connect
        </div>
      );
      buttonClass = 'bg-blue-600 hover:bg-blue-700 text-white';
    }
    
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
              <span className="text-green-600 font-semibold text-lg">{student.name.charAt(0)}</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
              <p className="text-gray-600">{student.currentRole} at {student.company}</p>
              <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs mt-1">
                Student
                {student.connected && <span className="ml-1">✓</span>}
              </span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
            {student.branch} • Class of {student.graduationYear}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            {student.location}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
            {student.industry}
            {student.connected && <span className="ml-2 text-green-600">✓ Connected</span>}
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Skills:</p>
          <div className="flex flex-wrap gap-2">
            {student.skills.map(skill => (
              <span key={skill} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={onConnect}
            className={`${buttonClass} px-4 py-2 rounded-lg font-medium text-sm flex-1 transition-colors`}
            disabled={student.connected || student.pending}
          >
            {buttonContent}
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm">
            View Profile
          </button>
        </div>
      </div>
    );
  };
  
  const AlumniDirectorySection = () => (
    <div className="mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Alumni Directory</h2>
        <p className="text-gray-600">Connect with fellow alumni from your institution</p>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <FaFilter className="text-gray-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          </div>
          <button onClick={clearFilters} className="text-blue-600 hover:text-blue-800 font-medium">
            Clear All
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Alumni</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search by name..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year</label>
            <select 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.year}
              onChange={(e) => handleFilterChange('year', e.target.value)}
            >
              <option value="">All Years</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Branch</label>
            <select 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.branch}
              onChange={(e) => handleFilterChange('branch', e.target.value)}
            >
              <option value="">All Branches</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Business Administration">Business Administration</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
            <select 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.industry}
              onChange={(e) => handleFilterChange('industry', e.target.value)}
            >
              <option value="">All Industries</option>
              <option value="Technology">Technology</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Consulting">Consulting</option>
              <option value="Aerospace">Aerospace</option>
              <option value="Retail">Retail</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Alumni Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlumni.map(alumni => (
          <AlumniCard 
            key={alumni.id} 
            alumni={alumni} 
            onConnect={() => sendConnectionRequest(alumni.id, 'alumni')}
            onAccept={() => acceptConnection(alumni.id, 'alumni')}
            onDecline={() => declineConnection(alumni.id, 'alumni')}
          />
        ))}
      </div>
    </div>
  );
  
  const StudentDirectorySection = () => (
    <div className="mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Student Directory</h2>
        <p className="text-gray-600">Connect with current students from your institution</p>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <FaFilter className="text-gray-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          </div>
          <button onClick={clearFilters} className="text-blue-600 hover:text-blue-800 font-medium">
            Clear All
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Students</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search by name..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Expected Graduation</label>
            <select 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.year}
              onChange={(e) => handleFilterChange('year', e.target.value)}
            >
              <option value="">All Years</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Branch</label>
            <select 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.branch}
              onChange={(e) => handleFilterChange('branch', e.target.value)}
            >
              <option value="">All Branches</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Business Administration">Business Administration</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
            <select 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.skill}
              onChange={(e) => handleFilterChange('skill', e.target.value)}
            >
              <option value="">All Skills</option>
              <option value="Java">Java</option>
              <option value="Python">Python</option>
              <option value="Web Development">Web Development</option>
              <option value="Data Structures">Data Structures</option>
              <option value="Marketing">Marketing</option>
              <option value="Excel">Excel</option>
              <option value="Circuit Design">Circuit Design</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Student Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map(student => (
          <StudentCard 
            key={student.id} 
            student={student} 
            onConnect={() => sendConnectionRequest(student.id, 'student')}
            onAccept={() => acceptConnection(student.id, 'student')}
            onDecline={() => declineConnection(student.id, 'student')}
          />
        ))}
      </div>
    </div>
  );
  
  const AlumniList = () => (
    <div className="max-w-4xl mx-auto">
      <AlumniDirectorySection />
    </div>
  );
  
  const StudentList = () => (
    <div className="max-w-4xl mx-auto">
      <StudentDirectorySection />
    </div>
  );
  
  const ProfileCard = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center mb-6">
        <FaUserCircle className="text-blue-600 text-xl mr-3" />
        <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center p-4 bg-gray-50 rounded-xl">
          <FaUser className="text-gray-400 w-5 mr-4" />
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="font-medium text-gray-900">Sarah Mitchell</p>
          </div>
        </div>
        
        <div className="flex items-center p-4 bg-gray-50 rounded-xl">
          <FaEnvelope className="text-gray-400 w-5 mr-4" />
          <div>
            <p className="text-sm text-gray-500">Email Address</p>
            <p className="font-medium text-gray-900">sarah.mitchell@techcorp.com</p>
          </div>
        </div>
        
        <div className="flex items-center p-4 bg-gray-50 rounded-xl">
          <FaBuilding className="text-gray-400 w-5 mr-4" />
          <div>
            <p className="text-sm text-gray-500">Company</p>
            <p className="font-medium text-gray-900">TechCorp Solutions</p>
          </div>
        </div>
      </div>
    </div>
  );
  
  const JobPostingsCard = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FaBriefcase className="text-blue-600 text-xl mr-3" />
          <h2 className="text-xl font-semibold text-gray-900">Job Postings</h2>
        </div>
        <button 
          onClick={handleCreateJob}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium transition-all duration-200 flex items-center shadow-sm"
        >
          <FaPlus className="mr-2" />
          Create New Job
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobPostings.map((job) => (
          <div key={job.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-all duration-200 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                <p className="text-blue-600 font-medium mb-1">{job.company}</p>
                <p className="text-gray-600 text-sm mb-2 flex items-center">
                  <FaMapMarkerAlt className="mr-1" />
                  {job.location}
                </p>
                <p className="text-gray-600 text-sm mb-2 flex items-center">
                  <FaWork className="mr-1" />
                  {job.experience}
                </p>
                <p className="text-gray-600 text-sm mb-3 flex items-center">
                  <FaCalendarAlt className="mr-1" />
                  Posted: {job.posted}
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500 text-sm">Status:</span>
                  <span className={`${getStatusColor(job.status)} text-xs font-medium px-2 py-1 rounded-full`}>
                    {job.status}
                  </span>
                </div>
              </div>
              <span className={`${getStatusColor(job.type)} text-xs font-medium px-2 py-1 rounded-full`}>
                {job.type}
              </span>
            </div>
            <div className="mt-auto">
              <button 
                onClick={() => handleJobClick(job)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                <FaEye className="mr-2" />
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  const JobDetailsCard = ({ job }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Job Details</h2>
        <button 
          onClick={() => setShowJobDetails(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <FaTimes />
        </button>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h3>
          <div className="flex items-center text-gray-600 mb-4">
            <span className="mr-4">{job.company}</span>
            <span className="flex items-center">
              <FaMapMarkerAlt className="mr-1" />
              {job.location}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className={`${getStatusColor(job.status)} text-xs font-medium px-2 py-1 rounded-full`}>
              {job.status}
            </span>
            <span className="text-gray-500 text-sm">Posted: {job.posted}</span>
            <span className="text-gray-500 text-sm">Applications: {job.applications}</span>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Job Description</h4>
          <p className="text-gray-600">{job.description}</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Required Skills</h4>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex space-x-4">
          <a 
            href={job.applyLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Apply Now
          </a>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors">
            Share Job
          </button>
        </div>
      </div>
    </div>
  );
  
  const CreateJobForm = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Create New Job</h2>
        <button 
          onClick={handleCancelJob}
          className="text-gray-500 hover:text-gray-700"
        >
          <FaTimes />
        </button>
      </div>
      
      <form onSubmit={handleSubmitJob} className="space-y-6">
        {/* Job Title */}
        <div>
          <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
            Job Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={jobForm.jobTitle}
            onChange={handleJobInputChange}
            placeholder="Enter job title (e.g., Frontend Developer)"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <p className="mt-1 text-sm text-gray-500">A short, descriptive title for the job.</p>
        </div>
        
        {/* Job Description */}
        <div>
          <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-1">
            Job Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="jobDescription"
            name="jobDescription"
            value={jobForm.jobDescription}
            onChange={handleJobInputChange}
            placeholder="Describe the job role, responsibilities, and expectations..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <p className="mt-1 text-sm text-gray-500">Detailed description of the job.</p>
        </div>
        
        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={jobForm.location}
            onChange={handleJobInputChange}
            placeholder="Enter location (e.g., Chennai, Remote)"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <p className="mt-1 text-sm text-gray-500">The job's work location or if it's remote.</p>
        </div>
        
        {/* Salary Range */}
        <div>
          <label htmlFor="salaryRange" className="block text-sm font-medium text-gray-700 mb-1">
            Salary Range
          </label>
          <input
            type="text"
            id="salaryRange"
            name="salaryRange"
            value={jobForm.salaryRange}
            onChange={handleJobInputChange}
            placeholder="Enter salary range (e.g., ₹30,000 - ₹50,000/month)"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="mt-1 text-sm text-gray-500">Approximate compensation offered.</p>
        </div>
        
        {/* Application Deadline */}
        <div>
          <label htmlFor="applicationDeadline" className="block text-sm font-medium text-gray-700 mb-1">
            Application Deadline <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="applicationDeadline"
            name="applicationDeadline"
            value={jobForm.applicationDeadline}
            onChange={handleJobInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <p className="mt-1 text-sm text-gray-500">Last date to apply.</p>
        </div>
        
        {/* Required Skills */}
        <div>
          <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
            Required Skills & Technologies <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center mb-2">
            <input
              type="text"
              id="skills"
              value={currentJobSkill}
              onChange={(e) => setCurrentJobSkill(e.target.value)}
              onKeyPress={handleJobSkillAdd}
              placeholder="Add skills (e.g., JavaScript, React, Communication)"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {jobForm.skills.map((skill, index) => (
              <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveJobSkill(skill)}
                  className="ml-2 text-blue-600 hover:text-blue-900"
                >
                  <FaTimes className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
          <p className="mt-1 text-sm text-gray-500">Key skills or technologies needed for the job.</p>
        </div>
        
        {/* Job Type */}
        <div>
          <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-1">
            Internship or Full-time <span className="text-red-500">*</span>
          </label>
          <select
            id="jobType"
            name="jobType"
            value={jobForm.jobType}
            onChange={handleJobInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="Internship">Internship</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
          </select>
          <p className="mt-1 text-sm text-gray-500">Job type selection.</p>
        </div>
        
        {/* Apply Link */}
        <div>
          <label htmlFor="applyLink" className="block text-sm font-medium text-gray-700 mb-1">
            Apply Link or Contact Email <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="applyLink"
            name="applyLink"
            value={jobForm.applyLink}
            onChange={handleJobInputChange}
            placeholder="Enter apply link or contact email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <p className="mt-1 text-sm text-gray-500">Where applicants can send their resumes or apply.</p>
        </div>
        
        {/* Buttons */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={handleCancelJob}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
  
  const AlumniDashboardCard = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FaGraduationCap className="text-blue-600 text-xl mr-3" />
          <h2 className="text-xl font-semibold text-gray-900">Alumni</h2>
        </div>
        <span className="text-sm text-gray-500">{getAlumniConnectionCount()} connections</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlumni.slice(0, 3).map(alumni => (
          <AlumniCard 
            key={alumni.id} 
            alumni={alumni} 
            onConnect={() => sendConnectionRequest(alumni.id, 'alumni')}
            onAccept={() => acceptConnection(alumni.id, 'alumni')}
            onDecline={() => declineConnection(alumni.id, 'alumni')}
          />
        ))}
      </div>
    </div>
  );
  
  const StudentsDashboardCard = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FaGraduationCap className="text-blue-600 text-xl mr-3" />
          <h2 className="text-xl font-semibold text-gray-900">Students</h2>
        </div>
        <span className="text-sm text-gray-500">{getStudentConnectionCount()} connections</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.slice(0, 3).map(student => (
          <StudentCard 
            key={student.id} 
            student={student} 
            onConnect={() => sendConnectionRequest(student.id, 'student')}
            onAccept={() => acceptConnection(student.id, 'student')}
            onDecline={() => declineConnection(student.id, 'student')}
          />
        ))}
      </div>
    </div>
  );
  
  const TrendingSkillsCard = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FaChartLine className="text-blue-600 text-xl mr-3" />
          <h2 className="text-xl font-semibold text-gray-900">Trending Skills & Technologies</h2>
        </div>
      </div>
      
      {/* Add New Skill Form */}
      <div className="mb-6 p-4 bg-blue-50 rounded-xl">
        <h3 className="font-medium text-gray-900 mb-3">Add New Trending Skill</h3>
        <div className="space-y-3">
          <input 
            type="text" 
            name="name"
            value={newSkill.name}
            onChange={handleInputChange}
            placeholder="Skill/Technology name" 
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <textarea 
            name="description"
            value={newSkill.description}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Brief description or learning path" 
            rows="2" 
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          <button 
            onClick={handleAddSkill}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center"
          >
            <FaPlus className="mr-2" />
            Add Skill
          </button>
        </div>
      </div>
      
      {/* Existing Skills List */}
      <div className="space-y-3">
        {skills.map((skill, index) => (
          <div key={index} className="p-4 border border-gray-100 rounded-xl">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-1">{skill.name}</h4>
                <p className="text-sm text-gray-600">{skill.description}</p>
              </div>
              <span className={`text-xs ${getStatusColor(skill.status)} px-2 py-1 rounded-full font-medium ml-3`}>
                {skill.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  const renderSection = () => {
    switch (activeSection) {
      case 'Dashboard':
        return <DashboardSection />;
      case 'Alumni List':
        return <AlumniList />;
      case 'Student List':
        return <StudentList />;
      case 'Job Postings':
        return (
          <div className="max-w-4xl mx-auto">
            <JobPostingsCard />
            {showCreateJobForm && <CreateJobForm />}
            {showJobDetails && selectedJob && <JobDetailsCard job={selectedJob} />}
          </div>
        );
      case 'Trending Skills':
        return (
          <div className="max-w-4xl mx-auto">
            <TrendingSkillsCard />
          </div>
        );
      default:
        return <DashboardSection />;
    }
  };
  
  return (
    <div className="flex min-h-screen bg-gray-50 font-inter antialiased">
      {/* Sidebar */}
      <div className="w-72 bg-white shadow-lg flex flex-col">
        {/* Profile Section */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg mr-4">
              SM
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Sarah Mitchell</h3>
              <p className="text-sm text-gray-500">TechCorp Solutions</p>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => setActiveSection('Dashboard')}
                className={`flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-200 w-full text-left ${
                  activeSection === 'Dashboard' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                }`}
              >
                <FaHome className="w-5 h-5 mr-3" />
                Dashboard
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveSection('Alumni List')}
                className={`flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-200 w-full text-left ${
                  activeSection === 'Alumni List' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                }`}
              >
                <FaGraduationCap className="w-5 h-5 mr-3" />
                Alumni List
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveSection('Student List')}
                className={`flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-200 w-full text-left ${
                  activeSection === 'Student List' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                }`}
              >
                <FaUsers className="w-5 h-5 mr-3" />
                Student List
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveSection('Job Postings')}
                className={`flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-200 w-full text-left ${
                  activeSection === 'Job Postings' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                }`}
              >
                <FaBriefcase className="w-5 h-5 mr-3" />
                Job Postings
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveSection('Trending Skills')}
                className={`flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-200 w-full text-left ${
                  activeSection === 'Trending Skills' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                }`}
              >
                <FaChartLine className="w-5 h-5 mr-3" />
                Trending Skills
              </button>
            </li>
          </ul>
        </nav>
        
        {/* Logout */}
        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="flex items-center px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200 w-full text-left"
          >
            <FaSignOutAlt className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Welcome Message */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {activeSection === 'Dashboard' ? 'Welcome, Sarah Mitchell! 👋' : `${activeSection} - Sarah Mitchell`}
          </h1>
          <p className="text-gray-600">Here's what's happening with your alumni network today.</p>
        </div>
        
        {/* Section Content */}
        {renderSection()}
      </div>
    </div>
  );
};
export default RecruiterDashboard;