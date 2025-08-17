import ProjectShowcase from '../ProjectShowcase';
import image from '../../assets/fakenews1.png';
import image1 from '../../assets/fake.png';
import image2 from '../../assets/real.png';

const FakeNews = () => {
  const projectData = {
    title: "Fake News Detection",
    description: "A comprehensive fake news detection system utilizing BERT (Bidirectional Encoder Representations from Transformers) combined with sentiment analysis to identify misinformation in news articles. The system achieved 97% accuracy and includes a user-friendly web application for real-time detection. Model was trained on Google colab",
    
    technologies: [
      "BERT",
      "Python",
      "Natural Language Processing",
      "Sentiment Analysis",
      "Streamlit",
      "Machine Learning",
      "HTML/CSS",
      "Kaggle Dataset",
      "Deep Learning"
    ],
    
    screenshots: [
      {
        url: image,
        title: "Application Interface",
        description: "UI of Fake News Detector using streamlit."
      },
      {
        url: image1,
        title: "Sample Fake News Detected",
        description: "Real News on unseen data."
      },
      {
        url: image2,
        title: "Sample Real News Detected",
        description: "Fake News on unseen data."
      }
    ],
    
    liveUrl: null,
    githubUrl: null, 
    
    features: [
      "Two distinct BERT models: standalone and integrated with sentiment analysis",
      "97% accuracy in fake news detection with the standard BERT model",
      "96% accuracy with sentiment-enhanced BERT model showing better language pattern recognition",
      "Real-time sentiment analysis with polarity scores ranging from -1 to +1",
      "Interactive web application with three analysis options: Sentiment, Fake News Detection, or Both",
      "Visual feedback using emojis for sentiment representation (happy, sad, neutral)",
      "Probability percentages for fake vs. real news classification",
      "Pre-trained on 200,000+ news articles from diverse sources",
      "Bidirectional context analysis for enhanced text understanding",
      "Public deployment on Streamlit Community for accessibility"
    ],

    challenges: [
      "Balancing model complexity while avoiding overfitting with large datasets",
      "Integrating sentiment analysis without significantly impacting overall accuracy",
      "Managing training and validation loss inconsistencies across epochs",
      "Handling diverse news article formats and writing styles from multiple sources",
      "Optimizing the model for both speed and accuracy in real-time web deployment",
      "Ensuring the model generalizes well to unseen news sources and topics",
      "Dealing with the subtle differences between satirical content and genuine fake news"
    ],

    learnings: [
      "Deep understanding of transformer architecture and BERT's bidirectional processing",
      "Practical implementation of sentiment analysis for content classification enhancement",
      "Experience with model evaluation metrics: accuracy, precision, recall, F1-score, and perplexity",
      "Insight that sentiment analysis integration improves language pattern recognition (lower perplexity: 1.03 vs 1.19)",
      "Understanding the trade-offs between model accuracy and interpretability",
      "Hands-on experience with Streamlit for rapid ML model deployment",
      "Knowledge of handling large-scale text datasets and preprocessing techniques",
      "Recognition that standalone BERT can achieve high accuracy, but sentiment analysis adds valuable contextual understanding"
    ]
  };

  return <ProjectShowcase {...projectData} />;
};

export default FakeNews;