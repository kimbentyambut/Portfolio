import ProjectShowcase from '../ProjectShowcase';
import image from '../../assets/futures.png';
import image2 from '../../assets/futures2.png';
import image3 from '../../assets/chart.png';

const Webscraping = () => {
  const projectData = {
    title: "Webscrapers",
    description: "8 Scheduled automated web scrapers with various data from https://www.asxenergy.com.au/, https://www.aemo.com.au/, https://www.bom.gov.au/, https://tradingeconomics.com/, https://www.accc.gov.au/inquiries-and-consultations/gas-inquiry-2017-30/lng-netback-price-series,https://explore.openelectricity.org.au for Energin.co. Housed in a private virtual machine",
    
    technologies: [
      "Python",
      "MongoDB",
      "Task Scheduler",
      "Selenium",
      "Beautiful Soup",
      "Gspread API",
      "Zoho Analytics"
    ],
    
    screenshots: [
      {
        url: image,
        title: "Automated Scraper Demo for ASXENERGY",
        description: "Scraper utilizing selenium to mimic human interaction on scraping."
      },
      {
        url: image2,
        title: "Database Insertion Demo",
        description: "Scraped data will then be transferred to the database."
      },
      {
        url: image3,
        title: "Database to Reports and Dashboards",
        description: "Data will then be transformed to charts and dashboards for usage."
      }
    ],
    
    liveUrl: null,
    githubUrl: null, 
    
    features: [
  "Automated data scraping from six different energy and economic data sources",
  "Scheduled execution using Task Scheduler to run scrapers at predefined intervals",
  "Selenium-based scraping to mimic human interaction for dynamic websites",
  "Beautiful Soup for fast parsing of static HTML content",
  "Data cleaning and transformation before database insertion",
  "MongoDB storage for scalable and flexible data management",
  "Integration with Google Sheets via Gspread API for quick data sharing",
  "Automated push of cleaned datasets to Zoho Analytics for visualization",
  "Error logging and retry logic for improved scraper reliability",
  "Runs in a private virtual machine for security and isolation"
],

challenges: [
  "Handling different website structures and HTML patterns across multiple sources",
  "Managing dynamic content and JavaScript-heavy pages with Selenium",
  "Avoiding IP bans by introducing scraping delays and request handling",
  "Ensuring accurate time-based scheduling for daily, weekly, and monthly scrapes",
  "Dealing with sudden source website structure changes that break selectors",
  "Cleaning and normalizing inconsistent data formats for database storage",
  "Maintaining scraper uptime and reliability in a private VM environment"
],

learnings: [
  "Building resilient scrapers capable of adapting to frequent HTML structure changes",
  "Leveraging Selenium for dynamic web interaction and Beautiful Soup for lightweight parsing",
  "Optimizing MongoDB schema design for time-series and large datasets",
  "Integrating Python scripts with external APIs such as Gspread for seamless workflows",
  "Implementing logging and monitoring for proactive issue detection",
  "Improving scheduling accuracy using Task Scheduler in a Windows-based VM",
  "Balancing scraping efficiency with ethical and legal considerations"
]

  };

  return <ProjectShowcase {...projectData} />;
};

export default Webscraping;