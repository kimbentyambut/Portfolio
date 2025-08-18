import ProjectShowcase from '../ProjectShowcase';

import login from '../../assets/login.png';
import upload from '../../assets/upload.png';
import crop from '../../assets/crop.png';
import result from '../../assets/result.png';
import logs from '../../assets/logs.png';
import logModal from '../../assets/logmodal.png';
import chat from '../../assets/chat.png';
import repository from '../../assets/repository.png';



const Pathora = () => {
  const projectData = {
    title: "Pathora.AI",
    description: "A Progressive Web Application powered by YOLOv8 AI model for classifying microscopic skin cancer images. Designed to assist pathologists at Saint Louis University - Sacred Heart Medical Center in identifying Basal Cell Carcinoma, Squamous Cell Carcinoma, and Melanoma with 99.4% accuracy.",
    technologies: [
      "YOLOv8",
      "TensorFlow.js",
      "ReactJS",
      "Node.js",
      "MongoDB",
      "Python",
      "RoboFlow",
      "Google Colab",
      "HTML",
      "CSS",
      "Javascript",
    ],
    screenshots: [
      {
        url: login,
        title: "User Authentication",
        description: "Secure login system with role-based access for pathologists."
      },
      {
        url: upload,
        title: "Dashboard & Image Upload",
        description: "Central workspace for uploading, cropping, and analyzing microscopic skin cancer images."
      },
      {
        url: crop,
        title: "Image Cropping",
        description: "Zoom and crop images to select regions for inference."
      },
      {
        url: result,
        title: "Inference Results",
        description: "Displays diagnostic results after image processing and analysis."
      },
      {
        url: logs,
        title: "Activity Logs",
        description: "Detailed records of uploaded images and their corresponding inference results."
      },
      {
        url: logModal,
        title: "Log Details",
        description: "Modal view with detailed information about a selected log entry."
      },
      {
        url: repository,
        title: "Image Repository",
        description: "Shared repository where users can publish log images for community access."
      },
      {
        url: chat,
        title: "Collaboration Hub",
        description: "Real-time chat for pathologists to collaborate on shared specimens."
      }

    ],
    liveUrl: null,
    githubUrl: null,
    features: [
      "AI-powered skin cancer classification with 99.4% accuracy using YOLOv8 model",
      "Real-time analysis of microscopic skin tissue images",
      "Classification of Basal Cell Carcinoma (BCC), Squamous Cell Carcinoma (SQCC), and Melanoma",
      "Progressive Web Application accessible on desktop and mobile devices",
      "Image upload with cropping and zooming capabilities before analysis",
      "Collaborative chat system for pathologist consultation and second opinions",
      "Comprehensive logging and history tracking of all classifications",
      "Report generation for diagnostic records and case documentation",
      "Archive and restore functionality for specimen records management",
      "Admin panel for user account management and system administration",
      "Secure authentication with role-based access control",
      "Integration with MongoDB for scalable data storage"
    ],
    challenges: [
      "Training an accurate AI model with limited medical image datasets",
      "Achieving 99%+ accuracy required for medical diagnostic applications",
      "Converting YOLOv8 model to TensorFlow.js format for web deployment",
      "Designing intuitive UI/UX for medical professionals with varying tech skills",
      "Implementing real-time collaboration features for multi-pathologist consultation",
      "Managing model inference speed while maintaining accuracy on web browsers",
      "Validating AI predictions against expert pathologist diagnoses"
    ],
    learnings: [
      "Deep learning model development and optimization for medical imaging",
      "Converting and deploying machine learning models for web applications",
      "Understanding the critical importance of accuracy in medical AI systems",
      "Implementing progressive web app architecture for cross-platform compatibility",
      "Working with medical professionals to understand domain-specific requirements",
      "Integrating multiple technologies (AI, web dev, databases) into cohesive systems",
      "The value of extensive testing and validation in medical software development"
    ],
    additionalInfo: {
      accuracy: "99.4%",
      dataset: "34,000 images (8,500 per class)",
      trainingEpochs: "8 epochs optimal",
      batchSize: "64",
      targetUsers: "Pathologists at SLU-SHMC",
      medicalContext: "Addresses shortage of dermatologists and pathologists in the Philippines"
    }
  };

  return <ProjectShowcase {...projectData} />;
};

export default Pathora;