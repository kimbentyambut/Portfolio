import ProjectShowcase from '../ProjectShowcase';
import image from '../../assets/backup.png';
import image2 from '../../assets/cropped.png';
import image3 from '../../assets/snippet.png';
import image4 from '../../assets/historical.png';
const Ocr = () => {
  const projectData = {
    title: "Optical Character Recognition",
    description: "Developed a Python-based OCR automation tool to extract Australian energy futures pricing data from screenshots. The system uses OpenCV for preprocessing, EasyOCR for text recognition, and advanced regex cleaning to handle OCR inaccuracies. It parses both monthly and quarterly market data for multiple states (NSW, VIC, QLD, SA), organizes it by category (Base Month, Base Quarter, Caps, Peak Quarter), and stores results in MongoDB for structured retrieval. The solution includes automated cropping, data validation, error correction, and dynamic sorting to ensure clean, accurate, and ready-to-use market datasets for analytics or reporting.",
    
    technologies: [
      "Python",
      "OpenCV",
      "EasyOCR",
      "NumPy",
      "MongoDB",
    ],
    
    screenshots: [
      {
        url: image,
        title: "Sample Historical Data Screenshot",
        description: "Since historical data was captures with image instead of HTML."
      },
      {
        url: image2,
        title: "Automated Image Cropping per section",
        description: "Image cropping per section to make it easier for OCR to extract."
      },
      {
        url: image3,
        title: "Snippet on how it works",
        description: "Data will then be retrieved from the image and stored to the DB."
      },
      {
        url: image4,
        title: "Output",
        description: "Data inserted to Mongo."
      }
    ],
    
    liveUrl: null,
    githubUrl: null, 
    
    features: [
  "Automated extraction of Australian energy futures pricing data from market screenshots",
  "Image preprocessing with OpenCV (grayscale conversion, resizing, sharpening) to improve OCR accuracy",
  "EasyOCR integration for recognizing both monthly and quarterly market data",
  "Regex-based cleaning to fix OCR misreads and standardize formats",
  "Parsing and categorization of data by state (NSW, VIC, QLD, SA) and market segment (Base Month, Base Quarter, Caps, Peak Quarter)",
  "Automated cropping of image sections based on predefined coordinates",
  "Dynamic sorting of extracted data for structured reporting",
  "MongoDB integration for scalable and structured storage of extracted datasets",
  "Timestamping of entries for historical tracking and analytics",
  "Full automation from image input to database storage without manual intervention"
],

challenges: [
  "Improving OCR accuracy when dealing with small text, poor contrast, or compressed images",
  "Cleaning and normalizing inconsistent OCR output, including common misreads",
  "Ensuring correct parsing of both month/year and quarter/year formats",
  "Mapping extracted values to the correct states and market categories",
  "Designing preprocessing steps that balance sharpness and noise reduction",
  "Handling variable text spacing and alignment in source screenshots",
  "Maintaining accurate state order when storing data in MongoDB"
],

learnings: [
  "Optimizing OCR performance by combining targeted image preprocessing with EasyOCR",
  "Developing regex cleaning pipelines to systematically correct recurring OCR errors",
  "Structuring MongoDB collections for time-series market data storage",
  "Automating multi-step data extraction workflows from image to database",
  "Implementing robust value parsing for different date and pricing formats",
  "Using Python’s OpenCV and NumPy to manipulate and enhance image clarity",
  "Designing scripts that are adaptable to changes in screenshot layout or format"
]

  };

  return <ProjectShowcase {...projectData} />;
};

export default Ocr;