import ProjectShowcase from '../ProjectShowcase';
import customerdash from '../../assets/tjbroz1.png';
import customerprofile from '../../assets/tjbroz2.png';
import attendant from '../../assets/attendant.png'
import attendant2 from '../../assets/claim.png'
import admin from '../../assets/admin.png'
import history from '../../assets/history.png'
import profile from '../../assets/attendantprofile.png'
import ticket from '../../assets/ticketclaim.png'
const Tjbroz = () => {
  const projectData = {
    title: "TJ Broz Laundry Management System",
    description: "A comprehensive laundry management system built for TJ Broz Laundry services. This web application features a customer loyalty program with stamp collection, multi-role user management (Customer, Attendant, Admin), and a complete business management dashboard. Customers earn stamps with each laundry service, and when they collect 10 stamps, they can claim a free wash or dry cycle.",
    
    technologies: [
      "React",
      "PHP", 
      "MySQL",
      "HTML5",
      "CSS3",
      "JavaScript",
      "Hostinger"
    ],
    
    screenshots: [
      {
        url: customerdash,
        title: "Customer Dashboard",
        description: "Main dashboard where customers can view their stamp progress and claim rewards"
      },
      {
        url: customerprofile,
        title: "Customer Profile",
        description: "Profile settings where users can change their details."
      },
      {
        url: ticket,
        title: "Customer Claimed Ticket",
        description: "Customer claimed ticket after 10 transactions for showing to the attendant."
      },
      {
        url: attendant,
        title: "Stamp Assigning", 
        description: "Visual representation of customer's stamp assigning process"
      },
      {
        url: attendant2,
        title: "Claim Request",
        description: "Interface for laundry attendants to award stamps"
      },
      {
        url: admin,
        title: "Admin Privilege",
        description: "Admin Homepage"
      },
      {
        url: history,
        title: "Transaction History",
        description: "Admin side interface to view transaction history"
      },
      {
        url: profile,
        title: "Attendant Profile",
        description: "Admin side interface to view attendants"
      }
    ],
    
    liveUrl: "https://tjbrozlaundry.com/",
    githubUrl: null, // Add if you have a public repo
    
    features: [
  "Customer dashboard displaying stamp progress and available rewards",
  "Profile management for customers and attendants with editable personal details",
  "Automated reward claim system triggered after 10 completed transactions",
  "Visual stamp assigning process for attendants",
  "Claim request interface for attendants to approve customer rewards",
  "Admin privilege dashboard for overseeing operations",
  "Admin-side transaction history tracking",
  "Attendant profile and management tools for admins",
  "Three-tier user management: Customer, Attendant, and Admin roles",
  "Real-time synchronization of stamps, rewards, and transaction history",
  "Responsive design for seamless use on mobile and desktop",
  "Secure authentication and session management for all user roles"
],

    
    challenges: [
  "Developing a secure and accurate stamp tracking system to prevent fraudulent claims",
  "Designing intuitive dashboards for customers, attendants, and admins with role-specific functions",
  "Synchronizing real-time updates between the attendant's stamp assignment and the customer's dashboard",
  "Managing complex database relationships between users, transactions, rewards, and profiles",
  "Ensuring smooth reward claim requests without delays or double-claims",
  "Building a scalable system that can handle multiple concurrent attendants and customers",
  "Maintaining consistent responsive layouts and usability across mobile and desktop devices"
],

    
    learnings: [
  "Optimizing PHP and MySQL for complex relational data handling in a loyalty system",
  "Implementing multi-role authentication and permission-based interface controls",
  "Using React state management to handle real-time stamp updates and reward claims",
  "Designing gamified customer loyalty features to boost engagement",
  "Applying responsive design principles for diverse devices and screen sizes",
  "Ensuring transactional integrity and preventing duplicate reward redemptions",
  "Enhancing user experience through clear visual feedback on dashboards and claim processes"
]
  };

  return <ProjectShowcase {...projectData} />;
};

export default Tjbroz;