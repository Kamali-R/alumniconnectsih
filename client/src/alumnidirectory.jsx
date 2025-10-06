import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AlumniDirectory = () => {
  const [activeSection, setActiveSection] = React.useState('directory');
  const [alumniData, setAlumniData] = React.useState([]);
  const [filteredAlumni, setFilteredAlumni] = React.useState([]);
  const [successStories, setSuccessStories] = React.useState([]);
  const [filteredStories, setFilteredStories] = React.useState([]);
  const [forumPosts, setForumPosts] = React.useState([]);
  const [currentForumCategory, setCurrentForumCategory] = React.useState('all');
  const [selectedStory, setSelectedStory] = React.useState(null);
  const [selectedPostId, setSelectedPostId] = React.useState(null);
  const [filters, setFilters] = React.useState({
    search: '',
    year: '',
    branch: '',
    industry: '',
    careerStatus: '',
    skill: '',
    location: '',
    interest: ''
  });
  const [storyFilters, setStoryFilters] = React.useState({
    category: '',
    search: ''
  });
  
  const navigate = useNavigate();

  // Sample data initialization
  React.useEffect(() => {
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
    setSuccessStories(sampleSuccessStories);
    setFilteredStories(sampleSuccessStories);
    setForumPosts(sampleForumPosts);
  }, []);

  // Filter alumni when filters change
  React.useEffect(() => {
    const filtered = alumniData.filter(alumni => {
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
    
    setFilteredAlumni(filtered);
  }, [filters, alumniData]);

  // Filter stories when story filters change
  React.useEffect(() => {
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
  const sendConnectionRequest = (personId) => {
    const updatedAlumni = alumniData.map(alumni => {
      if (alumni.id === personId) {
        return { ...alumni, pending: true };
      }
      return alumni;
    });
    
    setAlumniData(updatedAlumni);
    
    const alumni = updatedAlumni.find(a => a.id === personId);
    toast.success(`Connection request sent to ${alumni.name}!`);
  };

  const acceptConnection = (personId) => {
    const updatedAlumni = alumniData.map(alumni => {
      if (alumni.id === personId) {
        return { ...alumni, pending: false, connected: true };
      }
      return alumni;
    });
    
    setAlumniData(updatedAlumni);
    
    const alumni = updatedAlumni.find(a => a.id === personId);
    toast.success(`You are now connected with ${alumni.name}!`);
  };

  const declineConnection = (personId) => {
    const updatedAlumni = alumniData.map(alumni => {
      if (alumni.id === personId) {
        return { ...alumni, pending: false };
      }
      return alumni;
    });
    
    setAlumniData(updatedAlumni);
    toast.info("Connection request declined.");
  };

  // Story management
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
          author: "You",
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

  const selectedPost = selectedPostId ? forumPosts.find(post => post.id === selectedPostId) : null;

  // Navigation items - includes Success Stories but without sharing option
  const navItems = [
    { id: 'directory', label: 'Alumni Directory', icon: (
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 9v1a6.996 6.996 0 00-2.567-5.408A7 7 0 0112 2c-1.168 0-2.276.29-3.25.804.536.932.896 2.021 1.014 3.196A5 5 0 0112 7a5 5 0 015 5 5c0 .34-.028.675-.083 1H15a3 3 0 110 6h1.071A7.002 7.002 0 0112 19c-1.68 0-3.24-.58-4.47-1.55a9.956 9.956 0 01-.7.95A8.96 8.96 0 0012 20a8.96 8.96 0 005.43-1.822A8.974 8.974 0 0017 17z"/>
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

  // Alumni Card Component
  const AlumniCard = ({ alumni, onConnect }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-xl mr-4">
          {alumni.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{alumni.name}</h3>
          <p className="text-gray-600">{alumni.currentRole} at {alumni.company}</p>
          <p className="text-sm text-gray-500">Class of {alumni.graduationYear}</p>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex flex-wrap gap-1 mb-2">
          {alumni.skills.slice(0, 3).map((skill, index) => (
            <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {skill}
            </span>
          ))}
          {alumni.skills.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              +{alumni.skills.length - 3} more
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600">{alumni.location}</p>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {alumni.industry} • {alumni.branch}
        </div>
        {!alumni.connected && !alumni.pending && (
          <button 
            onClick={onConnect}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Connect
          </button>
        )}
        {alumni.pending && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Pending
          </span>
        )}
        {alumni.connected && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Connected
          </span>
        )}
      </div>
    </div>
  );

  // Pending Request Card Component
  const PendingRequestCard = ({ person, onAccept, onDecline }) => (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-lg mr-4">
          {person.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{person.name}</h4>
          <p className="text-sm text-gray-600">{person.currentRole} at {person.company}</p>
        </div>
      </div>
      <div className="flex space-x-2">
        <button 
          onClick={onAccept}
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors"
        >
          Accept
        </button>
        <button 
          onClick={onDecline}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium transition-colors"
        >
          Decline
        </button>
      </div>
    </div>
  );

  // Connection Card Component
  const ConnectionCard = ({ person }) => (
    <div className="flex items-center p-4 border border-gray-200 rounded-lg">
      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-lg mr-4">
        {person.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
      </div>
      <div>
        <h4 className="font-medium text-gray-900">{person.name}</h4>
        <p className="text-sm text-gray-600">{person.currentRole} at {person.company}</p>
      </div>
    </div>
  );

  // Story Card Component
  const StoryCard = ({ story, onLike, onOpen }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-2">
            {story.categoryName}
          </span>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{story.title}</h3>
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium">{story.author}</span>
            <span className="mx-2">•</span>
            <span>{story.authorRole}</span>
            <span className="mx-2">•</span>
            <span>{story.timestamp}</span>
          </div>
        </div>
        <span className="text-sm text-gray-500">{story.readTime}</span>
      </div>
      
      <p className="text-gray-700 mb-6">{story.content}</p>
      
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <button 
            onClick={() => onLike(story.id)}
            className={`flex items-center ${story.liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
          >
            <svg className="w-5 h-5 mr-1" fill={story.liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {story.likes}
          </button>
        </div>
        <button 
          onClick={() => onOpen(story.id)}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Read Full Story
        </button>
      </div>
    </div>
  );

  // Story Modal Component
  const StoryModal = ({ story, onClose, onLike }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-2">
                {story.categoryName}
              </span>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{story.title}</h2>
              <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium">{story.author}</span>
                <span className="mx-2">•</span>
                <span>{story.authorRole}</span>
                <span className="mx-2">•</span>
                <span>{story.timestamp}</span>
                <span className="mx-2">•</span>
                <span>{story.readTime}</span>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="prose max-w-none mb-8">
            <p className="whitespace-pre-line">{story.fullContent}</p>
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <button 
              onClick={() => onLike(story.id)}
              className={`flex items-center ${story.liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
            >
              <svg className="w-5 h-5 mr-1" fill={story.liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {story.likes}
            </button>
            <div className="text-sm text-gray-500">
              Class of {story.graduationYear}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Forum Post Card Component
  const ForumPostCard = ({ post, onLike, onSelect }) => (
    <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer" onClick={() => onSelect(post.id)}>
      <div className="flex items-start justify-between mb-2">
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {post.categoryName}
        </span>
        <span className="text-sm text-gray-500">{post.timestamp}</span>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
      
      <div className="flex items-center text-sm text-gray-600 mb-3">
        <span className="font-medium">{post.author}</span>
        <span className="mx-2">•</span>
        <span>{post.authorRole}</span>
      </div>
      
      <p className="text-gray-700 mb-4 line-clamp-2">{post.content}</p>
      
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onLike(post.id);
            }}
            className={`flex items-center ${post.liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
          >
            <svg className="w-5 h-5 mr-1" fill={post.liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {post.likes}
          </button>
          <div className="flex items-center text-gray-500">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {post.replies}
          </div>
        </div>
        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
          Read More
        </button>
      </div>
    </div>
  );

  // Forum Post Detail Component
  const ForumPostDetail = ({ post, onBack, onLike, onComment }) => (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <button 
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-6"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Discussions
      </button>
      
      <div className="mb-6">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-3">
          {post.categoryName}
        </span>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{post.title}</h2>
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <span className="font-medium">{post.author}</span>
          <span className="mx-2">•</span>
          <span>{post.authorRole}</span>
          <span className="mx-2">•</span>
          <span>{post.timestamp}</span>
        </div>
        <p className="text-gray-700 whitespace-pre-line">{post.fullContent || post.content}</p>
      </div>
      
      <div className="flex items-center mb-6">
        <button 
          onClick={() => onLike(post.id)}
          className={`flex items-center mr-4 ${post.liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
        >
          <svg className="w-5 h-5 mr-1" fill={post.liked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {post.likes}
        </button>
        <div className="flex items-center text-gray-500">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          {post.replies} comments
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Comments</h3>
        
        <div className="space-y-4 mb-6">
          {post.comments.map(comment => (
            <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-sm mr-3">
                  {comment.author.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </div>
                <div>
                  <span className="font-medium text-gray-900">{comment.author}</span>
                  <span className="text-xs text-gray-500 ml-2">{comment.timestamp}</span>
                </div>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))}
        </div>
        
        <form onSubmit={(e) => onComment(post.id, e)}>
          <div className="mb-4">
            <label htmlFor={`commentInput-${post.id}`} className="block text-sm font-medium text-gray-700 mb-1">
              Add a comment
            </label>
            <textarea
              id={`commentInput-${post.id}`}
              rows={3}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
              placeholder="Write your comment here..."
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Post Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Render functions for different sections
  const renderAlumniDirectory = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Alumni Directory</h2>
      
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              id="search"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
              placeholder="Name, company, role..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label>
            <select
              id="year"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
              value={filters.year}
              onChange={(e) => handleFilterChange('year', e.target.value)}
            >
              <option value="">All Years</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
            <select
              id="branch"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
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
            <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <select
              id="industry"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
              value={filters.industry}
              onChange={(e) => handleFilterChange('industry', e.target.value)}
            >
              <option value="">All Industries</option>
              <option value="Technology">Technology</option>
              <option value="Finance">Finance</option>
              <option value="Aerospace">Aerospace</option>
              <option value="Consulting">Consulting</option>
              <option value="Retail">Retail</option>
              <option value="Education">Education</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label htmlFor="careerStatus" className="block text-sm font-medium text-gray-700 mb-1">Career Status</label>
            <select
              id="careerStatus"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
              value={filters.careerStatus}
              onChange={(e) => handleFilterChange('careerStatus', e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Currently Working">Currently Working</option>
              <option value="Entrepreneur">Entrepreneur</option>
              <option value="Higher Studies">Higher Studies</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="skill" className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
            <select
              id="skill"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
              value={filters.skill}
              onChange={(e) => handleFilterChange('skill', e.target.value)}
            >
              <option value="">All Skills</option>
              <option value="Python">Python</option>
              <option value="React">React</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="Product Strategy">Product Strategy</option>
              <option value="Data Analysis">Data Analysis</option>
              <option value="Leadership">Leadership</option>
              <option value="Financial Modeling">Financial Modeling</option>
              <option value="CAD">CAD</option>
              <option value="Project Management">Project Management</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              id="location"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
              placeholder="City, state..."
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-1">Interests</label>
            <select
              id="interest"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
              value={filters.interest}
              onChange={(e) => handleFilterChange('interest', e.target.value)}
            >
              <option value="">All Interests</option>
              <option value="Photography">Photography</option>
              <option value="Travel">Travel</option>
              <option value="Sports">Sports</option>
              <option value="Music">Music</option>
              <option value="Reading">Reading</option>
              <option value="Cooking">Cooking</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={clearFilters}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Clear Filters
          </button>
        </div>
      </div>
      
      <div className="mb-4 flex justify-between items-center">
        <p className="text-gray-600">Found {filteredAlumni.length} alumni</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlumni.map(alumni => (
          <AlumniCard 
            key={alumni.id} 
            alumni={alumni} 
            onConnect={() => sendConnectionRequest(alumni.id)} 
          />
        ))}
      </div>
      
      {filteredAlumni.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No alumni found</h3>
          <p className="mt-1 text-gray-500">Try adjusting your filters to find more alumni.</p>
        </div>
      )}
    </div>
  );

  const renderConnections = () => {
    const connectedAlumni = alumniData.filter(alumni => alumni.connected);
    const pendingAlumni = alumniData.filter(alumni => alumni.pending);
    
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">My Connections</h2>
        
        {pendingAlumni.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Requests ({pendingAlumni.length})</h3>
            <div className="space-y-3">
              {pendingAlumni.map(person => (
                <PendingRequestCard 
                  key={person.id} 
                  person={person} 
                  onAccept={() => acceptConnection(person.id)} 
                  onDecline={() => declineConnection(person.id)} 
                />
              ))}
            </div>
          </div>
        )}
        
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Connected Alumni ({connectedAlumni.length})</h3>
          
          {connectedAlumni.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {connectedAlumni.map(person => (
                <ConnectionCard key={person.id} person={person} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No connections yet</h3>
              <p className="mt-1 text-gray-500">Connect with alumni from the directory to build your network.</p>
              <div className="mt-6">
                <button
                  onClick={() => handleNavClick('directory')}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Browse Alumni Directory
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderForums = () => {
    const forumCategories = [
      { id: 'career', name: 'Career Advice', count: forumPosts.filter(p => p.category === 'career').length },
      { id: 'industry', name: 'Industry Insights', count: forumPosts.filter(p => p.category === 'industry').length },
      { id: 'networking', name: 'Networking Events', count: forumPosts.filter(p => p.category === 'networking').length }
    ];
    
    const filteredForumPosts = currentForumCategory === 'all' 
      ? forumPosts 
      : forumPosts.filter(post => post.category === currentForumCategory);
    
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Discussion Forums</h2>
        
        {selectedPost ? (
          <ForumPostDetail 
            post={selectedPost} 
            onBack={backToDiscussions} 
            onLike={togglePostLike} 
            onComment={postComment} 
          />
        ) : (
          <div>
            {currentForumCategory === 'all' ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {forumCategories.map(category => (
                  <div 
                    key={category.id} 
                    className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => showForumPosts(category.id)}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                    <p className="text-gray-600 mb-4">{category.count} discussions</p>
                    <button className="text-blue-600 hover:text-blue-800 font-medium">
                      View Discussions
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mb-6">
                <button 
                  onClick={showForumCategories}
                  className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Categories
                </button>
                <h3 className="text-xl font-semibold text-gray-900">
                  {forumCategories.find(c => c.id === currentForumCategory)?.name} Discussions
                </h3>
              </div>
            )}
            
            <div className="space-y-4">
              {filteredForumPosts.map(post => (
                <ForumPostCard 
                  key={post.id} 
                  post={post} 
                  onLike={togglePostLike} 
                  onSelect={showPostDetail} 
                />
              ))}
            </div>
            
            {filteredForumPosts.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No discussions yet</h3>
                <p className="mt-1 text-gray-500">Be the first to start a discussion in this category.</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderSuccessStories = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Success Stories</h2>
      
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="storyCategory" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              id="storyCategory"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
              value={storyFilters.category}
              onChange={(e) => handleStoryFilterChange('category', e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="career">Career Growth</option>
              <option value="entrepreneurship">Entrepreneurship</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="storySearch" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              id="storySearch"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
              placeholder="Title, author, company..."
              value={storyFilters.search}
              onChange={(e) => handleStoryFilterChange('search', e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {filteredStories.map(story => (
          <StoryCard 
            key={story.id} 
            story={story} 
            onLike={toggleStoryLike} 
            onOpen={openStoryModal} 
          />
        ))}
      </div>
      
      {filteredStories.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No stories found</h3>
          <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}
      
      {selectedStory && (
        <StoryModal 
          story={selectedStory} 
          onClose={closeStoryModal} 
          onLike={toggleStoryLike} 
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer position="bottom-right" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Alumni Network</h1>
          <p className="text-gray-600 mt-2">Connect with fellow alumni and explore success stories</p>
        </div>
         
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeSection === item.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => handleNavClick(item.id)}
                >
                  <div className="flex items-center">
                    {item.icon}
                    {item.label}
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>
        
        {/* Content Sections */}
        {activeSection === 'directory' && renderAlumniDirectory()}
        {activeSection === 'connections' && renderConnections()}
        {activeSection === 'forums' && renderForums()}
        {activeSection === 'stories' && renderSuccessStories()}
      </div>
    </div>
  );
};

export default AlumniDirectory;