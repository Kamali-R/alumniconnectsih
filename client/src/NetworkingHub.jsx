import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NetworkingHub = () => {
  const [activeSection, setActiveSection] = useState('directory');
  const [alumniData, setAlumniData] = useState([]);
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [successStories, setSuccessStories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [forumPosts, setForumPosts] = useState([]);
  const [currentForumCategory, setCurrentForumCategory] = useState('all');
  const [showAddStoryForm, setShowAddStoryForm] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
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
  const [storyFilters, setStoryFilters] = useState({
    category: '',
    search: ''
  });

  // Sample data initialization
  useEffect(() => {
    // Sample alumni data - expanded
    const sampleAlumniData = [
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
        type: "alumni"
      },
      {
        id: 5,
        name: "Lisa Wang",
        graduationYear: "2022",
        branch: "Computer Science",
        currentRole: "Data Scientist",
        company: "Netflix",
        location: "Los Angeles, CA",
        industry: "Technology",
        careerStatus: "Currently Working",
        skills: ["Python", "SQL", "Machine Learning", "Statistics"],
        interests: ["Music", "Sports"],
        email: "lisa.wang@email.com",
        linkedin: "linkedin.com/in/lisawang",
        connected: false,
        pending: false,
        type: "alumni"
      },
      {
        id: 6,
        name: "James Wilson",
        graduationYear: "2021",
        branch: "Business Administration",
        currentRole: "Management Consultant",
        company: "McKinsey & Company",
        location: "Chicago, IL",
        industry: "Consulting",
        careerStatus: "Currently Working",
        skills: ["Strategy", "Analytics", "Presentation"],
        interests: ["Reading", "Travel"],
        email: "james.wilson@email.com",
        linkedin: "linkedin.com/in/jameswilson",
        connected: false,
        pending: false,
        type: "alumni"
      },
      {
        id: 7,
        name: "Alex Thompson",
        graduationYear: "2020",
        branch: "Computer Science",
        currentRole: "Founder & CEO",
        company: "TechStart Inc.",
        location: "San Francisco, CA",
        industry: "Technology",
        careerStatus: "Entrepreneur",
        skills: ["Leadership", "Product Strategy", "Fundraising"],
        interests: ["Photography", "Cooking"],
        email: "alex.thompson@email.com",
        linkedin: "linkedin.com/in/alexthompson",
        connected: false,
        pending: false,
        type: "alumni"
      },
      {
        id: 8,
        name: "Priya Sharma",
        graduationYear: "2023",
        branch: "Electrical Engineering",
        currentRole: "PhD Student",
        company: "MIT",
        location: "Boston, MA",
        industry: "Education",
        careerStatus: "Higher Studies",
        skills: ["Research", "Python", "Signal Processing"],
        interests: ["Reading", "Music"],
        email: "priya.sharma@email.com",
        linkedin: "linkedin.com/in/priyasharma",
        connected: false,
        pending: false,
        type: "alumni"
      },
      // Additional alumni
      {
        id: 9,
        name: "Robert Martinez",
        graduationYear: "2019",
        branch: "Mechanical Engineering",
        currentRole: "Senior Engineer",
        company: "SpaceX",
        location: "Hawthorne, CA",
        industry: "Aerospace",
        careerStatus: "Currently Working",
        skills: ["CAD", "CFD", "Project Management"],
        interests: ["Astronomy", "Hiking"],
        email: "robert.martinez@email.com",
        linkedin: "linkedin.com/in/robertmartinez",
        connected: false,
        pending: false,
        type: "alumni"
      },
      {
        id: 10,
        name: "Jennifer Lee",
        graduationYear: "2021",
        branch: "Business Administration",
        currentRole: "Marketing Director",
        company: "Nike",
        location: "Portland, OR",
        industry: "Retail",
        careerStatus: "Currently Working",
        skills: ["Digital Marketing", "Brand Strategy", "Analytics"],
        interests: ["Fitness", "Travel"],
        email: "jennifer.lee@email.com",
        linkedin: "linkedin.com/in/jenniferlee",
        connected: false,
        pending: false,
        type: "alumni"
      },
      {
        id: 11,
        name: "Daniel Brown",
        graduationYear: "2020",
        branch: "Computer Science",
        currentRole: "Senior Developer",
        company: "Amazon",
        location: "Seattle, WA",
        industry: "Technology",
        careerStatus: "Currently Working",
        skills: ["Java", "AWS", "System Design"],
        interests: ["Gaming", "Photography"],
        email: "daniel.brown@email.com",
        linkedin: "linkedin.com/in/danielbrown",
        connected: false,
        pending: false,
        type: "alumni"
      },
      {
        id: 12,
        name: "Amanda Garcia",
        graduationYear: "2022",
        branch: "Electrical Engineering",
        currentRole: "Hardware Engineer",
        company: "Apple",
        location: "Cupertino, CA",
        industry: "Technology",
        careerStatus: "Currently Working",
        skills: ["Circuit Design", "PCB Layout", "Testing"],
        interests: ["Music", "Art"],
        email: "amanda.garcia@email.com",
        linkedin: "linkedin.com/in/amandagarcia",
        connected: false,
        pending: false,
        type: "alumni"
      }
    ];
    
    // Sample student data - expanded
    const sampleStudentData = [
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
        type: "student"
      },
      // Additional students
      {
        id: 104,
        name: "Sophia Chen",
        graduationYear: "2025",
        branch: "Computer Science",
        currentRole: "Student",
        company: "University Name",
        location: "San Francisco, CA",
        industry: "Education",
        careerStatus: "Student",
        skills: ["Python", "Machine Learning", "Data Analysis"],
        interests: ["AI Research", "Tennis"],
        email: "sophia.chen@university.edu",
        linkedin: "",
        connected: false,
        pending: false,
        type: "student"
      },
      {
        id: 105,
        name: "Tyler Johnson",
        graduationYear: "2024",
        branch: "Mechanical Engineering",
        currentRole: "Student",
        company: "University Name",
        location: "Austin, TX",
        industry: "Education",
        careerStatus: "Student",
        skills: ["CAD", "3D Modeling", "Thermodynamics"],
        interests: ["Automotive Design", "Basketball"],
        email: "tyler.johnson@university.edu",
        linkedin: "",
        connected: false,
        pending: false,
        type: "student"
      },
      {
        id: 106,
        name: "Olivia Martinez",
        graduationYear: "2026",
        branch: "Business Administration",
        currentRole: "Student",
        company: "University Name",
        location: "Los Angeles, CA",
        industry: "Education",
        careerStatus: "Student",
        skills: ["Finance", "Accounting", "Leadership"],
        interests: ["Entrepreneurship", "Dance"],
        email: "olivia.martinez@university.edu",
        linkedin: "",
        connected: false,
        pending: false,
        type: "student"
      },
      {
        id: 107,
        name: "Ethan Wilson",
        graduationYear: "2025",
        branch: "Electrical Engineering",
        currentRole: "Student",
        company: "University Name",
        location: "Seattle, WA",
        industry: "Education",
        careerStatus: "Student",
        skills: ["Signal Processing", "Embedded Systems", "C++"],
        interests: ["IoT", "Rock Climbing"],
        email: "ethan.wilson@university.edu",
        linkedin: "",
        connected: false,
        pending: false,
        type: "student"
      },
      {
        id: 108,
        name: "Isabella Taylor",
        graduationYear: "2024",
        branch: "Computer Science",
        currentRole: "Student",
        company: "University Name",
        location: "New York, NY",
        industry: "Education",
        careerStatus: "Student",
        skills: ["Web Development", "UI/UX Design", "JavaScript"],
        interests: ["Design", "Yoga"],
        email: "isabella.taylor@university.edu",
        linkedin: "",
        connected: false,
        pending: false,
        type: "student"
      }
    ];
    
    // Sample success stories
    const sampleSuccessStories = [
      {
        id: 1,
        title: "From Intern to Tech Lead at Google",
        author: "Sarah Johnson",
        authorRole: "Tech Lead at Google",
        category: "career",
        categoryName: "Career Growth",
        content: "My journey from a nervous intern to leading a team of 15 engineers at Google. It wasn't easy, but persistence and continuous learning made all the difference.",
        fullContent: "My journey from a nervous intern to leading a team of 15 engineers at Google. It wasn't easy, but persistence and continuous learning made all the difference.\n\nWhen I started as an intern at a small startup during my final year, I could barely write a functioning web application. I was intimidated by senior developers and felt like I didn't belong in tech.\n\nKey milestones in my journey:\n• Started as an intern at a local startup\n• Joined Google as a junior developer after graduation\n• Promoted to senior engineer within 2 years\n• Led my first project with 3 team members\n• Currently leading a team of 15 engineers working on Search infrastructure\n\nChallenges I overcame:\n- Imposter syndrome in my early career\n- Learning to communicate technical concepts clearly\n- Balancing technical depth with leadership responsibilities\n- Managing a diverse team across different time zones\n\nAdvice for fellow alumni:\n1. Never stop learning - technology evolves rapidly\n2. Build strong relationships with your colleagues\n3. Don't be afraid to take on challenging projects\n4. Seek feedback regularly and act on it\n5. Remember that leadership is about serving your team\n\nThe key was staying curious, being willing to fail, and always helping others along the way.",
        currentPosition: "Tech Lead",
        company: "Google",
        timestamp: "3 days ago",
        likes: 89,
        liked: false,
        graduationYear: "2022",
        readTime: "4 min read",
        authorType: "alumni"
      },
      {
        id: 2,
        title: "Building a $10M Startup from My Dorm Room",
        author: "Alex Thompson",
        authorRole: "Founder & CEO at TechStart Inc.",
        category: "entrepreneurship",
        categoryName: "Entrepreneurship",
        content: "How I went from a computer science student with an idea to running a multi-million dollar company. The ups, downs, and everything in between.",
        fullContent: "How I went from a computer science student with an idea to running a multi-million dollar company. The ups, downs, and everything in between.\n\nIt all started in my junior year when I noticed how difficult it was for students to find study groups. I built a simple web app to solve this problem, and it gained traction quickly across campus.\n\nThe journey:\n• Started with a simple idea to help students connect\n• Built the first version in my dorm room over winter break\n• Gained 10,000 users within the first semester\n• Dropped out in my final year to focus on the company\n• Raised $2M in seed funding\n• Scaled to 500,000 users across 200 universities\n• Recently closed Series A for $10M\n\nBiggest challenges:\n- Convincing my parents that dropping out was the right choice\n- Learning business skills while being a technical founder\n- Hiring the right people when resources were limited\n- Dealing with competition from larger companies\n- Managing rapid growth and scaling issues\n\nLessons learned:\n1. Start with a real problem you're passionate about solving\n2. Get feedback from users as early as possible\n3. Don't be afraid to pivot when something isn't working\n4. Surround yourself with people smarter than you\n5. Take care of your mental health - entrepreneurship is a marathon\n\nThe most rewarding part has been seeing how our platform has helped millions of students succeed academically and build lasting friendships.",
        currentPosition: "Founder & CEO",
        company: "TechStart Inc.",
        timestamp: "1 week ago",
        likes: 156,
        liked: true,
        graduationYear: "2020",
        readTime: "6 min read",
        authorType: "alumni"
      },
      {
        id: 3,
        title: "PhD to Product Manager: Transitioning from Academia",
        author: "Dr. Priya Sharma",
        authorRole: "Senior Product Manager at Microsoft",
        category: "career",
        categoryName: "Career Growth",
        content: "After completing my PhD in Electrical Engineering, I made the leap to product management. Here's how I successfully transitioned from academia to industry.",
        fullContent: "After completing my PhD in Electrical Engineering, I made the leap to product management. Here's how I successfully transitioned from academia to industry.\n\nDuring my PhD, I spent 5 years researching signal processing algorithms. While I loved the research, I realized I wanted to have a more direct impact on products that millions of people use.\n\nThe transition process:\n• Identified transferable skills from my PhD research\n• Started taking online courses in product management\n• Attended industry meetups and conferences\n• Did informational interviews with PMs at tech companies\n• Applied for APM (Associate Product Manager) programs\n• Landed a role at Microsoft despite having no industry experience\n\nSkills that transferred well:\n- Analytical thinking and problem-solving\n- Data analysis and statistical modeling\n- Project management and timeline planning\n- Technical communication and presentation skills\n- Ability to work with cross-functional teams\n\nNew skills I had to develop:\n- Understanding business metrics and KPIs\n- Customer research and user experience design\n- Agile development methodologies\n- Stakeholder management\n- Go-to-market strategy\n\nChallenges faced:\n- Overcoming the perception that academics can't work in fast-paced environments\n- Learning to make decisions with incomplete information\n- Adapting to shorter project cycles compared to research\n- Understanding market dynamics and competitive landscape\n\nAdvice for academics considering industry:\n1. Start networking early and build relationships\n2. Highlight your analytical and problem-solving skills\n3. Learn the business side of technology\n4. Be prepared to start at a more junior level\n5. Embrace the faster pace and iterative approach\n\nTwo years later, I'm now a Senior PM leading a team working on Azure AI services, and I couldn't be happier with my decision.",
        currentPosition: "Senior Product Manager",
        company: "Microsoft",
        timestamp: "2 weeks ago",
        likes: 73,
        liked: false,
        graduationYear: "2021",
        readTime: "5 min read",
        authorType: "alumni"
      }
    ];
    
    // Sample forum posts
    const sampleForumPosts = [
      {
        id: 1,
        category: "career",
        categoryName: "Career Advice",
        title: "Transitioning from Engineering to Product Management",
        author: "Michael Chen",
        authorRole: "Product Manager at Tesla",
        content: "I recently made the transition from electrical engineering to product management. Happy to share my experience and answer questions about the process. The key was understanding user needs and business metrics while leveraging my technical background.",
        fullContent: "I recently made the transition from electrical engineering to product management. Happy to share my experience and answer questions about the process. The key was understanding user needs and business metrics while leveraging my technical background.\n\nThe transition wasn't easy, but here are the steps I took:\n1. Started by taking on more cross-functional projects in my engineering role\n2. Learned about user research and data analysis\n3. Built relationships with product managers and asked lots of questions\n4. Eventually applied for internal PM roles\n\nHappy to answer any specific questions about the process!",
        timestamp: "2 hours ago",
        likes: 15,
        replies: 8,
        liked: false,
        authorType: "alumni",
        comments: [
          { 
            id: 1, 
            author: "Sarah Johnson", 
            content: "This is really helpful! How long did the transition take?", 
            timestamp: "1 hour ago",
            authorType: "alumni"
          },
          { 
            id: 2, 
            author: "Alex Rivera", 
            content: "Did you need to take any specific courses?", 
            timestamp: "45 minutes ago",
            authorType: "student"
          }
        ]
      },
      {
        id: 2,
        category: "industry",
        categoryName: "Industry Insights",
        title: "The Future of AI in Healthcare",
        author: "Dr. Sarah Johnson",
        authorRole: "Software Engineer at Google",
        content: "With recent advances in machine learning, I believe we're on the cusp of revolutionary changes in healthcare. What are your thoughts on the ethical implications?",
        fullContent: "With recent advances in machine learning, I believe we're on the cusp of revolutionary changes in healthcare. What are your thoughts on the ethical implications?\n\nSome key areas where AI is making impact:\n- Diagnostic imaging and radiology\n- Drug discovery and development\n- Personalized treatment plans\n- Predictive analytics for patient outcomes\n\nHowever, we need to address:\n- Data privacy concerns\n- Algorithmic bias\n- Regulatory compliance\n- Integration with existing healthcare systems\n\nWhat are your thoughts on balancing innovation with patient safety?",
        timestamp: "5 hours ago",
        likes: 23,
        replies: 12,
        liked: true,
        authorType: "alumni",
        comments: [
          { 
            id: 1, 
            author: "Emily Rodriguez", 
            content: "Great points! The regulatory aspect is particularly challenging.", 
            timestamp: "3 hours ago",
            authorType: "alumni"
          },
          { 
            id: 2, 
            author: "Alex Thompson", 
            content: "We're working on some of these challenges at our startup.", 
            timestamp: "2 hours ago",
            authorType: "alumni"
          }
        ]
      },
      {
        id: 3,
        category: "networking",
        categoryName: "Networking Events",
        title: "Alumni Meetup in San Francisco - March 15th",
        author: "Lisa Wang",
        authorRole: "Data Scientist at Netflix",
        content: "Organizing a casual meetup for Bay Area alumni. We'll be at Cafe Central at 6 PM. Come join us for networking and good conversation!",
        fullContent: "Organizing a casual meetup for Bay Area alumni. We'll be at Cafe Central at 6 PM. Come join us for networking and good conversation!\n\nEvent Details:\n📅 Date: March 15th, 2024\n🕕 Time: 6:00 PM - 9:00 PM\n📍 Location: Cafe Central, 2417 California St, San Francisco\n\nWhat to expect:\n- Casual networking with fellow alumni\n- Light refreshments\n- Industry discussions\n- Potential collaboration opportunities\n\nPlease RSVP in the comments so we can get a headcount. Looking forward to seeing everyone!",
        timestamp: "1 day ago",
        likes: 31,
        replies: 18,
        liked: false,
        authorType: "alumni",
        comments: [
          { 
            id: 1, 
            author: "Sarah Johnson", 
            content: "Count me in! Looking forward to it.", 
            timestamp: "20 hours ago",
            authorType: "alumni"
          },
          { 
            id: 2, 
            author: "Michael Chen", 
            content: "I'll try to make it if I'm in town.", 
            timestamp: "18 hours ago",
            authorType: "alumni"
          }
        ]
      }
    ];
    
    setAlumniData(sampleAlumniData);
    setFilteredAlumni(sampleAlumniData.filter(alumni => !alumni.connected));
    setStudentData(sampleStudentData);
    setFilteredStudents(sampleStudentData.filter(student => !student.connected));
    setSuccessStories(sampleSuccessStories);
    setFilteredStories(sampleSuccessStories);
    setForumPosts(sampleForumPosts);
  }, []);

  // Filter alumni when filters change
  // Combined effect for filtering both alumni and students
  useEffect(() => {
    // Filter alumni
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
    
    // Filter students
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


  // Filter stories when story filters change
  useEffect(() => {
    const filtered = successStories.filter(story => {
      const matchesCategory = !storyFilters.category || story.category === storyFilters.category;
      const matchesSearch = !storyFilters.search || 
        story.title.toLowerCase().includes(storyFilters.search.toLowerCase()) ||
        story.author.toLowerCase().includes(storyFilters.search.toLowerCase()) ||
        story.content.toLowerCase().includes(storyFilters.search.toLowerCase()) ||
        (story.company && story.company.toLowerCase().includes(storyFilters.search.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
    
    setFilteredStories(filtered);
  }, [storyFilters, successStories]);

  // Navigation handler
  const handleNavClick = (section) => {
    setActiveSection(section);
  };

  // Filter handlers
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const handleStoryFilterChange = (filterName, value) => {
    setStoryFilters(prev => ({ ...prev, [filterName]: value }));
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
    toast.success("Filters cleared successfully!");
  };

  // Connection management
  // Connection management - update both states
  const sendConnectionRequest = (personId, type) => {
    if (type === 'alumni') {
      const updatedAlumni = alumniData.map(alumni => {
        if (alumni.id === personId) {
          return { ...alumni, pending: true };
        }
        return alumni;
      });
      
      setAlumniData(updatedAlumni);
      
      const alumni = updatedAlumni.find(a => a.id === personId);
      toast.success(`Connection request sent to ${alumni.name}!`);
    } else {
      const updatedStudents = studentData.map(student => {
        if (student.id === personId) {
          return { ...student, pending: true };
        }
        return student;
      });
      
      setStudentData(updatedStudents);
      
      const student = updatedStudents.find(s => s.id === personId);
      toast.success(`Connection request sent to ${student.name}!`);
    }
  };

  const acceptConnection = (personId, type) => {
    if (type === 'alumni') {
      const updatedAlumni = alumniData.map(alumni => {
        if (alumni.id === personId) {
          return { ...alumni, pending: false, connected: true };
        }
        return alumni;
      });
      
      setAlumniData(updatedAlumni);
      
      const alumni = updatedAlumni.find(a => a.id === personId);
      toast.success(`You are now connected with ${alumni.name}!`);
    } else {
      const updatedStudents = studentData.map(student => {
        if (student.id === personId) {
          return { ...student, pending: false, connected: true };
        }
        return student;
      });
      
      setStudentData(updatedStudents);
      
      const student = updatedStudents.find(s => s.id === personId);
      toast.success(`You are now connected with ${student.name}!`);
    }
  };

  const declineConnection = (personId, type) => {
    if (type === 'alumni') {
      const updatedAlumni = alumniData.map(alumni => {
        if (alumni.id === personId) {
          return { ...alumni, pending: false };
        }
        return alumni;
      });
      
      setAlumniData(updatedAlumni);
    } else {
      const updatedStudents = studentData.map(student => {
        if (student.id === personId) {
          return { ...student, pending: false };
        }
        return student;
      });
      
      setStudentData(updatedStudents);
    }
    toast.info("Connection request declined.");
  };

  // Story management
  const submitStory = (e) => {
    e.preventDefault();
    
    const title = e.target.elements.storyTitle.value;
    const category = e.target.elements.storyCategory.value;
    const content = e.target.elements.storyContent.value;
    const position = e.target.elements.storyPosition.value;
    const company = e.target.elements.storyCompany.value;
    
    const categoryNames = {
      'career': 'Career Growth',
      'entrepreneurship': 'Entrepreneurship',
      'education': 'Higher Education',
      'innovation': 'Innovation & Research',
      'leadership': 'Leadership',
      'social-impact': 'Social Impact'
    };
    
    const newStory = {
      id: successStories.length + 1,
      title: title,
      author: "You", // In a real app, this would be the current user's name
      authorRole: position ? `${position} at ${company}` : "Alumni",
      category: category,
      categoryName: categoryNames[category],
      content: content.substring(0, 200) + (content.length > 200 ? '...' : ''),
      fullContent: content,
      currentPosition: position,
      company: company,
      timestamp: "Just now",
      likes: 0,
      liked: false,
      graduationYear: "2024", // In a real app, this would come from user profile
      readTime: Math.ceil(content.split(' ').length / 200) + " min read",
      authorType: "alumni"
    };
    
    // Update both successStories and filteredStories
    const updatedStories = [newStory, ...successStories];
    setSuccessStories(updatedStories);
    setFilteredStories(updatedStories);
    
    setShowAddStoryForm(false);
    toast.success('Your success story has been published!');
    
    // Reset form
    e.target.reset();
  };

  const toggleStoryLike = (storyId) => {
    const updatedStories = successStories.map(story => {
      if (story.id === storyId) {
        return { 
          ...story, 
          likes: story.liked ? story.likes - 1 : story.likes + 1,
          liked: !story.liked 
        };
      }
      return story;
    });
    
    setSuccessStories(updatedStories);
    
    // Also update filtered stories if needed
    const updatedFilteredStories = filteredStories.map(story => {
      if (story.id === storyId) {
        return { 
          ...story, 
          likes: story.liked ? story.likes - 1 : story.likes + 1,
          liked: !story.liked 
        };
      }
      return story;
    });
    
    setFilteredStories(updatedFilteredStories);
  };

  const openStoryModal = (storyId) => {
    const story = successStories.find(s => s.id === storyId);
    setSelectedStory(story);
  };

  const closeStoryModal = () => {
    setSelectedStory(null);
  };

  // Forum management
  const showForumPosts = (category) => {
    setCurrentForumCategory(category);
  };

  const showForumCategories = () => {
    setCurrentForumCategory('all');
  };

  const showPostDetail = (postId) => {
    setSelectedPostId(postId);
  };

  const backToDiscussions = () => {
    setSelectedPostId(null);
  };

  const postComment = (postId, e) => {
    e.preventDefault();
    const commentInput = e.target.elements[`commentInput-${postId}`];
    const commentText = commentInput.value.trim();
    
    if (commentText === '') {
      toast.error('Please enter a comment before posting.');
      return;
    }
    
    const updatedPosts = forumPosts.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: post.comments.length + 1,
          author: "You", // In a real app, this would be the current user's name
          content: commentText,
          timestamp: "Just now",
          authorType: "alumni"
        };
        
        return {
          ...post,
          comments: [...post.comments, newComment],
          replies: post.replies + 1
        };
      }
      return post;
    });
    
    setForumPosts(updatedPosts);
    commentInput.value = '';
    toast.success('Comment posted successfully!');
  };

  const togglePostLike = (postId) => {
    const updatedPosts = forumPosts.map(post => {
      if (post.id === postId) {
        return { 
          ...post, 
          likes: post.liked ? post.likes - 1 : post.likes + 1,
          liked: !post.liked 
        };
      }
      return post;
    });
    
    setForumPosts(updatedPosts);
  };

  // Get the selected post from forumPosts using selectedPostId
  const selectedPost = selectedPostId ? forumPosts.find(post => post.id === selectedPostId) : null;

  // Navigation items
  const navItems = [
    { id: 'directory', label: 'Alumni Directory', icon: (
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 9v1a6.996 6.996 0 00-2.567-5.408A7 7 0 0112 2c-1.168 0-2.276.29-3.25.804.536.932.896 2.021 1.014 3.196A5 5 0 0112 7a5 5 0 015 5 5c0 .34-.028.675-.083 1H15a3 3 0 110 6h1.071A7.002 7.002 0 0112 19c-1.68 0-3.24-.58-4.47-1.55a9.956 9.956 0 01-.7.95A8.96 8.96 0 0012 20a8.96 8.96 0 005.43-1.822A8.974 8.974 0 0017 17z"/>
        </svg>
      ) },
    { id: 'student-directory', label: 'Student Directory', icon: (
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z"/>
          <path d="M3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1h3z"/>
        </svg>
      ) },
    { id: 'connections', label: 'My Connections', icon: (
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
        </svg>
      ) },
    { id: 'forums', label: 'Discussion Forums', icon: (
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd"/>
        </svg>
      ) },
    { id: 'stories', label: 'Success Stories', icon: (
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ) },
  ];

  // Render methods for different sections
  const renderAlumniDirectory = () => (
    <div className="mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Alumni Directory</h2>
        <p className="text-gray-600">Connect with fellow alumni from your institution</p>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Alumni</label>
            <input 
              type="text" 
              placeholder="Search by name..." 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Career Status</label>
            <select 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.careerStatus}
              onChange={(e) => handleFilterChange('careerStatus', e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Currently Working">Currently Working</option>
              <option value="Entrepreneur">Entrepreneur</option>
              <option value="Higher Studies">Higher Studies</option>
              <option value="Not Working">Not Working</option>
              <option value="Freelancer">Freelancer</option>
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
              <option value="Python">Python</option>
              <option value="React">React</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="Data Analysis">Data Analysis</option>
              <option value="Leadership">Leadership</option>
              <option value="Project Management">Project Management</option>
              <option value="Financial Modeling">Financial Modeling</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <select 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
            >
              <option value="">All Locations</option>
              <option value="San Francisco">San Francisco, CA</option>
              <option value="New York">New York, NY</option>
              <option value="Austin">Austin, TX</option>
              <option value="Seattle">Seattle, WA</option>
              <option value="Chicago">Chicago, IL</option>
              <option value="Los Angeles">Los Angeles, CA</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Interests</label>
            <select 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.interest}
              onChange={(e) => handleFilterChange('interest', e.target.value)}
            >
              <option value="">All Interests</option>
              <option value="Photography">Photography</option>
              <option value="Travel">Travel</option>
              <option value="Music">Music</option>
              <option value="Sports">Sports</option>
              <option value="Reading">Reading</option>
              <option value="Cooking">Cooking</option>
            </select>
          </div>
        </div>
        <button onClick={clearFilters} className="text-blue-600 hover:text-blue-800 font-medium">Clear All Filters</button>
      </div>
      
      {/* Alumni Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlumni.map(alumni => (
          <AlumniCard 
            key={alumni.id} 
            alumni={alumni} 
            onConnect={() => sendConnectionRequest(alumni.id, 'alumni')} 
          />
        ))}
      </div>
    </div>
  );

  const renderStudentDirectory = () => (
    <div className="mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Student Directory</h2>
        <p className="text-gray-600">Connect with current students from your institution</p>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Students</label>
            <input 
              type="text" 
              placeholder="Search by name..." 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
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
        <button onClick={clearFilters} className="text-blue-600 hover:text-blue-800 font-medium">Clear All Filters</button>
      </div>
      
      {/* Student Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map(student => (
          <StudentCard 
            key={student.id} 
            student={student} 
            onConnect={() => sendConnectionRequest(student.id, 'student')} 
          />
        ))}
      </div>
    </div>
  );

  const renderConnections = () => {
    const pendingAlumni = alumniData.filter(a => a.pending);
    const connectedAlumni = alumniData.filter(a => a.connected);
    const pendingStudents = studentData.filter(s => s.pending);
    const connectedStudents = studentData.filter(s => s.connected);
    
    return (
      <div className="mb-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">My Connections</h2>
          <p className="text-gray-600">Manage your professional network</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Connection Requests */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Pending Requests</h3>
            <div className="space-y-4">
              {pendingAlumni.length === 0 && pendingStudents.length === 0 ? (
                <p className="text-gray-500">No pending requests</p>
              ) : (
                <>
                  {pendingAlumni.map(alumni => (
                    <PendingRequestCard 
                      key={alumni.id} 
                      person={alumni} 
                      onAccept={() => acceptConnection(alumni.id, 'alumni')}
                      onDecline={() => declineConnection(alumni.id, 'alumni')}
                    />
                  ))}
                  {pendingStudents.map(student => (
                    <PendingRequestCard 
                      key={student.id} 
                      person={student} 
                      onAccept={() => acceptConnection(student.id, 'student')}
                      onDecline={() => declineConnection(student.id, 'student')}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
          
          {/* My Connections */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">My Network</h3>
            <div className="space-y-4">
              {connectedAlumni.length === 0 && connectedStudents.length === 0 ? (
                <p className="text-gray-500">No connections yet</p>
              ) : (
                <>
                  {connectedAlumni.map(alumni => (
                    <ConnectionCard key={alumni.id} person={alumni} />
                  ))}
                  {connectedStudents.map(student => (
                    <ConnectionCard key={student.id} person={student} />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSuccessStories = () => (
    <div className="mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Success Stories</h2>
        <p className="text-gray-600">Share your journey and get inspired by fellow alumni achievements</p>
      </div>
      
      {/* Add Story Button */}
      <div className="mb-6">
        <button 
          onClick={() => setShowAddStoryForm(true)} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Share Your Success Story
        </button>
      </div>
      
      {/* Add Story Form */}
      {showAddStoryForm && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Share Your Success Story</h3>
          <form onSubmit={submitStory}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Story Title</label>
                <input 
                  type="text" 
                  name="storyTitle" 
                  required 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  placeholder="e.g., From Student to Tech Lead at Google" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select 
                  name="storyCategory" 
                  required 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Category</option>
                  <option value="career">Career Growth</option>
                  <option value="entrepreneurship">Entrepreneurship</option>
                  <option value="education">Higher Education</option>
                  <option value="innovation">Innovation & Research</option>
                  <option value="leadership">Leadership</option>
                  <option value="social-impact">Social Impact</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Story</label>
              <textarea 
                name="storyContent" 
                required 
                rows="6" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                placeholder="Share your journey, challenges you overcame, key milestones, and advice for fellow alumni..."
              ></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Position</label>
                <input 
                  type="text" 
                  name="storyPosition" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  placeholder="e.g., Senior Software Engineer" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                <input 
                  type="text" 
                  name="storyCompany" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  placeholder="e.g., Google" 
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">Publish Story</button>
              <button type="button" onClick={() => setShowAddStoryForm(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium">Cancel</button>
            </div>
          </form>
        </div>
      )}
      
      {/* Filter Stories */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <label className="text-sm font-medium text-gray-700">Filter by category:</label>
          <select 
            value={storyFilters.category}
            onChange={(e) => handleStoryFilterChange('category', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            <option value="career">Career Growth</option>
            <option value="entrepreneurship">Entrepreneurship</option>
            <option value="education">Higher Education</option>
            <option value="innovation">Innovation & Research</option>
            <option value="leadership">Leadership</option>
            <option value="social-impact">Social Impact</option>
          </select>
          <input 
            type="text" 
            value={storyFilters.search}
            onChange={(e) => handleStoryFilterChange('search', e.target.value)}
            placeholder="Search stories..." 
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
          />
        </div>
      </div>
      
      {/* Success Stories Grid */}
      <div className="space-y-6">
        {filteredStories.map(story => (
          <StoryCard 
            key={story.id} 
            story={story} 
            onLike={toggleStoryLike} 
            onOpen={openStoryModal} 
          />
        ))}
      </div>
      
      {/* Story Detail Modal */}
      {selectedStory && (
        <StoryModal story={selectedStory} onClose={closeStoryModal} onLike={toggleStoryLike} />
      )}
    </div>
  );

  const renderForums = () => {
    const postsToShow = currentForumCategory === 'all' 
      ? forumPosts 
      : forumPosts.filter(post => post.category === currentForumCategory);
    
    return (
      <div className="mb-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Discussion Forums</h2>
          <p className="text-gray-600">Engage in meaningful conversations with fellow alumni</p>
        </div>
        
        {/* Forum Categories */}
        {!selectedPostId && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer" onClick={() => showForumPosts('career')}>
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 rounded-lg p-3 mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Career Advice</h3>
                  <p className="text-sm text-gray-600">24 discussions</p>
                </div>
              </div>
              <p className="text-gray-600">Share career insights and get professional guidance</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer" onClick={() => showForumPosts('industry')}>
              <div className="flex items-center mb-4">
                <div className="bg-green-100 rounded-lg p-3 mr-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Industry Insights</h3>
                  <p className="text-sm text-gray-600">18 discussions</p>
                </div>
              </div>
              <p className="text-gray-600">Discuss trends and developments in various industries</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer" onClick={() => showForumPosts('networking')}>
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 rounded-lg p-3 mr-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Networking Events</h3>
                  <p className="text-sm text-gray-600">12 discussions</p>
                </div>
              </div>
              <p className="text-gray-600">Organize and discuss upcoming networking events</p>
            </div>
          </div>
        )}
        
        {/* Forum Posts */}
        {!selectedPostId ? (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                {currentForumCategory === 'all' ? 'Recent Discussions' : `${currentForumCategory === 'career' ? 'Career Advice' : currentForumCategory === 'industry' ? 'Industry Insights' : 'Networking Events'} Discussions`}
              </h3>
              {currentForumCategory !== 'all' && (
                <button onClick={showForumCategories} className="text-blue-600 hover:text-blue-800 font-medium">← Back to Categories</button>
              )}
            </div>
            <div className="space-y-6">
              {postsToShow.map(post => (
                <ForumPostCard 
                  key={post.id} 
                  post={post} 
                  onLike={togglePostLike} 
                  onSelect={showPostDetail} 
                />
              ))}
            </div>
          </div>
        ) : (
          selectedPost && <ForumPostDetail post={selectedPost} onBack={backToDiscussions} onLike={togglePostLike} onComment={postComment} />
        )}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between">
            <div className="flex space-x-1 md:space-x-8">
              {navItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-4 text-sm font-medium rounded-t-lg transition-colors ${
                    activeSection === item.id
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    {item.icon}
                    {item.label}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Content Sections */}
        {activeSection === 'directory' && renderAlumniDirectory()}
        {activeSection === 'student-directory' && renderStudentDirectory()}
        {activeSection === 'connections' && renderConnections()}
        {activeSection === 'forums' && renderForums()}
        {activeSection === 'stories' && renderSuccessStories()}
      </div>
      
      <ToastContainer position="bottom-right" />
    </div>
  );
};

// Component for individual alumni cards
const AlumniCard = ({ alumni, onConnect }) => {
  let buttonText = 'Connect';
  let buttonClass = 'bg-blue-600 hover:bg-blue-700 text-white';
  
  if (alumni.connected) {
    buttonText = 'Connected';
    buttonClass = 'bg-green-600 text-white cursor-not-allowed';
  } else if (alumni.pending) {
    buttonText = 'Pending';
    buttonClass = 'bg-yellow-600 text-white cursor-not-allowed';
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
          onClick={onConnect}
          className={`${buttonClass} px-4 py-2 rounded-lg font-medium text-sm flex-1 transition-colors`}
          disabled={alumni.connected || alumni.pending}
        >
          {buttonText}
        </button>
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm">
          View Profile
        </button>
      </div>
    </div>
  );
};

// Component for individual student cards
const StudentCard = ({ student, onConnect }) => {
  let buttonText = 'Connect';
  let buttonClass = 'bg-blue-600 hover:bg-blue-700 text-white';
  
  if (student.connected) {
    buttonText = 'Connected';
    buttonClass = 'bg-green-600 text-white cursor-not-allowed';
  } else if (student.pending) {
    buttonText = 'Pending';
    buttonClass = 'bg-yellow-600 text-white cursor-not-allowed';
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
          onClick={onConnect}
          className={`${buttonClass} px-4 py-2 rounded-lg font-medium text-sm flex-1 transition-colors`}
          disabled={student.connected || student.pending}
        >
          {buttonText}
        </button>
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm">
          View Profile
        </button>
      </div>
    </div>
  );
};

// Component for pending connection requests
const PendingRequestCard = ({ person, onAccept, onDecline }) => (
  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
    <div className="flex items-center">
      <div className={`${person.type === 'alumni' ? 'bg-blue-100' : 'bg-green-100'} rounded-full w-10 h-10 flex items-center justify-center mr-3`}>
        <span className={`${person.type === 'alumni' ? 'text-blue-600' : 'text-green-600'} font-semibold`}>{person.name.charAt(0)}</span>
      </div>
      <div>
        <h4 className="font-medium text-gray-900">{person.name}</h4>
        <p className="text-sm text-gray-600">{person.currentRole} at {person.company}</p>
        <span className={`inline-block ${person.type === 'alumni' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'} px-2 py-1 rounded-full text-xs mt-1`}>
          {person.type === 'alumni' ? 'Alumni' : 'Student'}
        </span>
      </div>
    </div>
    <div className="flex space-x-2">
      <button onClick={onAccept} className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm">Accept</button>
      <button onClick={onDecline} className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded text-sm">Decline</button>
    </div>
  </div>
);

// Component for existing connections
const ConnectionCard = ({ person }) => (
  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
    <div className="flex items-center">
      <div className={`${person.type === 'alumni' ? 'bg-blue-100' : 'bg-green-100'} rounded-full w-10 h-10 flex items-center justify-center mr-3`}>
        <span className={`${person.type === 'alumni' ? 'text-blue-600' : 'text-green-600'} font-semibold`}>{person.name.charAt(0)}</span>
      </div>
      <div>
        <h4 className="font-medium text-gray-900">{person.name}</h4>
        <p className="text-sm text-gray-600">{person.currentRole} at {person.company}</p>
        <span className={`inline-block ${person.type === 'alumni' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'} px-2 py-1 rounded-full text-xs mt-1`}>
          {person.type === 'alumni' ? 'Alumni' : 'Student'}
        </span>
      </div>
    </div>
    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Message</button>
  </div>
);

// Component for success story cards
const StoryCard = ({ story, onLike, onOpen }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer" onClick={() => onOpen(story.id)}>
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center">
        <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
          <span className="text-blue-600 font-semibold text-lg">{story.author.charAt(0)}</span>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{story.author}</h3>
          <p className="text-sm text-gray-600">{story.authorRole}</p>
          <p className="text-xs text-gray-500">Class of {story.graduationYear}</p>
          <span className={`inline-block ${story.authorType === 'alumni' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'} px-2 py-1 rounded-full text-xs mt-1`}>
            {story.authorType === 'alumni' ? 'Alumni' : 'Student'}
          </span>
        </div>
      </div>
      <div className="text-right">
        <span className="text-sm text-gray-500">{story.timestamp}</span>
        <div className="text-xs text-blue-600 font-medium mt-1">{story.categoryName}</div>
      </div>
    </div>
    
    <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600">{story.title}</h2>
    <p className="text-gray-700 mb-4 line-clamp-3">{story.content}</p>
    
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button onClick={(e) => { e.stopPropagation(); onLike(story.id); }} className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
          <svg className={`w-5 h-5 ${story.liked ? 'text-blue-600 fill-current' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
          <span>{story.likes}</span>
        </button>
        <span className="text-sm text-gray-500">{story.readTime}</span>
      </div>
      <button onClick={(e) => { e.stopPropagation(); onOpen(story.id); }} className="text-blue-600 hover:text-blue-800 font-medium text-sm">Read Full Story →</button>
    </div>
  </div>
);

// Component for story modal
const StoryModal = ({ story, onClose, onLike }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
    <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Story Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">{story.categoryName}</span>
              <span className="text-sm text-gray-500">{story.timestamp} • {story.readTime}</span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-6">{story.title}</h1>
            
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mr-4">
                <span className="text-blue-600 font-semibold text-xl">{story.author.charAt(0)}</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{story.author}</h3>
                <p className="text-gray-600">{story.authorRole}</p>
                <p className="text-sm text-gray-500">Class of {story.graduationYear}</p>
                <span className={`inline-block ${story.authorType === 'alumni' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'} px-2 py-1 rounded-full text-xs mt-1`}>
                  {story.authorType === 'alumni' ? 'Alumni' : 'Student'}
                </span>
              </div>
            </div>
            
            <div className="prose max-w-none mb-8">
              <div className="text-gray-700 whitespace-pre-line leading-relaxed">{story.fullContent}</div>
            </div>
            
            <div className="flex items-center justify-between pt-6 border-t">
              <button onClick={() => onLike(story.id)} className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                <svg className={`w-6 h-6 ${story.liked ? 'text-blue-600 fill-current' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
                <span>{story.likes} likes</span>
              </button>
              <div className="flex space-x-4">
                <button className="text-blue-600 hover:text-blue-800 font-medium">Share Story</button>
                <button className="text-blue-600 hover:text-blue-800 font-medium">Connect with {story.author}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Component for forum post cards
const ForumPostCard = ({ post, onLike, onSelect }) => (
  <div className="border-b border-gray-200 pb-6 last:border-b-0 cursor-pointer hover:bg-gray-50 p-4 rounded-lg transition-colors" onClick={() => onSelect(post.id)}>
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center">
        <div className={`${post.authorType === 'alumni' ? 'bg-blue-100' : 'bg-green-100'} rounded-full w-10 h-10 flex items-center justify-center mr-3`}>
          <span className={`${post.authorType === 'alumni' ? 'text-blue-600' : 'text-green-600'} font-semibold`}>{post.author.charAt(0)}</span>
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{post.author}</h4>
          <p className="text-sm text-gray-600">{post.authorRole}</p>
          <span className={`inline-block ${post.authorType === 'alumni' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'} px-2 py-1 rounded-full text-xs mt-1`}>
            {post.authorType === 'alumni' ? 'Alumni' : 'Student'}
          </span>
        </div>
      </div>
      <div className="text-right">
        <span className="text-sm text-gray-500">{post.timestamp}</span>
        <div className="text-xs text-blue-600 font-medium mt-1">{post.categoryName}</div>
      </div>
    </div>
    
    <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600">{post.title}</h3>
    <p className="text-gray-700 mb-4">{post.content}</p>
    
    <div className="flex items-center space-x-6">
      <button onClick={(e) => { e.stopPropagation(); onLike(post.id); }} className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
        <svg className={`w-5 h-5 ${post.liked ? 'text-blue-600 fill-current' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
        <span>{post.likes} likes</span>
      </button>
      <button onClick={(e) => { e.stopPropagation(); onSelect(post.id); }} className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
        <span>{post.replies} replies</span>
      </button>
    </div>
  </div>
);

// Component for forum post detail
const ForumPostDetail = ({ post, onBack, onLike, onComment }) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-xl font-semibold text-gray-900">Discussion Details</h3>
      <button onClick={onBack} className="text-blue-600 hover:text-blue-800 font-medium">← Back to Discussions</button>
    </div>
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">{post.categoryName}</span>
          <span className="text-sm text-gray-500">{post.timestamp}</span>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h1>
        
        <div className="flex items-center mb-6">
          <div className={`${post.authorType === 'alumni' ? 'bg-blue-100' : 'bg-green-100'} rounded-full w-12 h-12 flex items-center justify-center mr-4`}>
            <span className={`${post.authorType === 'alumni' ? 'text-blue-600' : 'text-green-600'} font-semibold text-lg`}>{post.author.charAt(0)}</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{post.author}</h3>
            <p className="text-gray-600">{post.authorRole}</p>
            <span className={`inline-block ${post.authorType === 'alumni' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'} px-2 py-1 rounded-full text-xs mt-1`}>
              {post.authorType === 'alumni' ? 'Alumni' : 'Student'}
            </span>
          </div>
        </div>
        
        <div className="prose max-w-none mb-6">
          <p className="text-gray-700 whitespace-pre-line">{post.fullContent}</p>
        </div>
        
        <div className="flex items-center space-x-6 mb-8 pb-6 border-b">
          <button onClick={() => onLike(post.id)} className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
            <svg className={`w-5 h-5 ${post.liked ? 'text-blue-600 fill-current' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
            <span>{post.likes} likes</span>
          </button>
          <span className="flex items-center space-x-2 text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
            <span>{post.replies} replies</span>
          </span>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Comments</h3>
        <div className="space-y-4">
          {post.comments.map((comment, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <div className={`${comment.authorType === 'alumni' ? 'bg-blue-100' : 'bg-green-100'} rounded-full w-8 h-8 flex items-center justify-center mr-3`}>
                  <span className={`${comment.authorType === 'alumni' ? 'text-blue-600' : 'text-green-600'} font-semibold text-sm`}>{comment.author.charAt(0)}</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">{comment.author}</h4>
                  <p className="text-xs text-gray-500">{comment.timestamp}</p>
                  <span className={`inline-block ${comment.authorType === 'alumni' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'} px-2 py-1 rounded-full text-xs mt-1`}>
                    {comment.authorType === 'alumni' ? 'Alumni' : 'Student'}
                  </span>
                </div>
              </div>
              <p className="text-gray-700 ml-11">{comment.content}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <form onSubmit={(e) => onComment(post.id, e)}>
            <textarea 
              name={`commentInput-${post.id}`}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              rows="3" 
              placeholder="Add a comment..."
            ></textarea>
            <button type="submit" className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">Post Comment</button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

export default NetworkingHub;