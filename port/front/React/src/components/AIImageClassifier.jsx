import { useState, useRef, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import bccSampleImage from '../assets/bcc.jpg';
import melanomaSampleImage from '../assets/melanoma.jpg';
import sqccSampleImage from '../assets/sqcc.jpg';
import pathee from '../assets/pathees.jpg';
import pathee2 from '../assets/pathees2.png';
import pathee3 from '../assets/magalong.png';

const AIImageClassifier = () => {
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [classifying, setClassifying] = useState(false);
  const [result, setResult] = useState(null);
  const [draggedOver, setDraggedOver] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [error, setError] = useState(null);
  const [draggedSample, setDraggedSample] = useState(null);
  
  const fileInputRef = useRef(null);

  const Carousel = () => (
    <div className="mb-4">
      <h4 className="text-center text-sm font-bold text-white mb-2">🏆 Project Rewards</h4>
      <div className="relative w-40 h-28 mx-auto overflow-hidden rounded-lg shadow-xl border border-gray-600 bg-gray-800 group">
        <img
          src={rewardImages[rewardIndex].src}
          alt={rewardImages[rewardIndex].title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-2 text-white">
          <h5 className="text-xs font-bold mb-1 drop-shadow-lg">{rewardImages[rewardIndex].title}</h5>
        </div>
        
        <button
          onClick={prevReward}
          className="absolute left-1 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white w-6 h-6 rounded-full transition-all duration-300 flex items-center justify-center text-xs font-bold shadow-lg hover:scale-110 opacity-80 hover:opacity-100"
        >
          ←
        </button>
        <button
          onClick={nextReward}
          className="absolute right-1 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white w-6 h-6 rounded-full transition-all duration-300 flex items-center justify-center text-xs font-bold shadow-lg hover:scale-110 opacity-80 hover:opacity-100"
        >
          →
        </button>
        
        <div className="absolute top-1 right-1 bg-black/50 backdrop-blur-sm text-white text-xs px-1 py-0.5 rounded border border-white/20">
          {rewardIndex + 1}/{rewardImages.length}
        </div>
      </div>
      
      <div className="flex justify-center mt-2 space-x-1">
        {rewardImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setRewardIndex(idx)}
            className={`transition-all duration-300 ${
              rewardIndex === idx 
                ? "w-4 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" 
                : "w-1.5 h-1.5 bg-gray-500 hover:bg-gray-400 rounded-full"
            }`}
          />
        ))}
      </div>
    </div>
  );

  const rewardImages = [
    {
      src: pathee,
      title: "Certificate of Recognition",
      description: "Awarded for competing the AI skin cancer project."
    },
    {
      src: pathee2,
      title: "Top 10",
      description: "Recognized for being in the top 10 out of 67 contestants."
    },
    {
      src: pathee3,
      title: "Picture with Mayor Magalong",
      description: "Picture with the mayor of Baguio"
    }
  ];

  const [rewardIndex, setRewardIndex] = useState(0);

  const nextReward = () => {
    setRewardIndex((prev) => (prev + 1) % rewardImages.length);
  };

  const prevReward = () => {
    setRewardIndex((prev) => (prev - 1 + rewardImages.length) % rewardImages.length);
  };

  const sampleImages = [
    {
      id: 'bcc',
      name: 'BCC Sample',
      description: 'Basal Cell Carcinoma',
      src: bccSampleImage,
      expectedClass: 'BCC'
    },
    {
      id: 'melanoma',
      name: 'Melanoma Sample',
      description: 'Melanoma',
      src: melanomaSampleImage,
      expectedClass: 'Melanoma'
    },
    {
      id: 'sqcc',
      name: 'SQCC Sample',
      description: 'Squamous Cell Carcinoma',
      src: sqccSampleImage,
      expectedClass: 'SQCC'
    }
  ];

  useEffect(() => {
    loadModel();
  }, []);

  const loadModel = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const loadedModel = await tf.loadGraphModel(`${window.location.origin}/models/model.json`);
      
      setModel(loadedModel);
      setLoading(false);
      console.log('Model loaded successfully');
    } catch (error) {
      console.error('Error loading model:', error);
      setError('Failed to load AI model. Please check if model files are available.');
      setLoading(false);
    }
  };

  const preprocessImage = async (imageElement) => {
    return tf.tidy(() => {
      const tensor = tf.browser.fromPixels(imageElement)
        .resizeBilinear([416, 416])
        .expandDims(0)
        .toFloat()
        .div(tf.scalar(255));
      
      return tensor;
    });
  };

  const classifyImage = async (imageFile) => {
    if (!model) {
      console.error('Model not loaded');
      return;
    }

    setClassifying(true);
    setError(null);
    
    try {
      const img = new Image();
      img.onload = async () => {
        try {
          const imageTensor = await preprocessImage(img);
          const predictions = await model.predict(imageTensor).data();
          imageTensor.dispose();
          
          const classes = ['BCC', 'Melanoma', 'SQCC', 'Undefined'];
          const formattedPredictions = {};
          
          predictions.forEach((confidence, index) => {
            formattedPredictions[classes[index]] = {
              confidence: confidence,
              class_id: index,
            };
          });

          const maxConfidenceIndex = predictions.indexOf(Math.max(...predictions));
          const predictedClass = classes[maxConfidenceIndex];
          const maxConfidence = predictions[maxConfidenceIndex];

          setResult({
            predicted_classes: [predictedClass],
            predicted_class: predictedClass,
            confidence: maxConfidence,
            all_predictions: formattedPredictions,
            inference_id: new Date().getTime().toString(),
            time: Date.now() - startTime
          });
          
          setClassifying(false);
        } catch (predictionError) {
          console.error('Prediction error:', predictionError);
          setError('Error during image classification. Please try again.');
          setClassifying(false);
        }
      };
      
      img.onerror = () => {
        setError('Error loading image. Please try a different image.');
        setClassifying(false);
      };

      const startTime = Date.now();
      img.src = URL.createObjectURL(imageFile);
      
    } catch (error) {
      console.error('Classification error:', error);
      setError('Error during image classification. Please try again.');
      setClassifying(false);
    }
  };

  const classifySampleImage = async (imageSrc) => {
    try {
      const response = await fetch(imageSrc);
      const blob = await response.blob();
      const file = new File([blob], 'sample-image.jpg', { type: 'image/jpeg' });
      
      setUploadedImage(imageSrc);
      setResult(null);
      setError(null);
      classifyImage(file);
    } catch (error) {
      console.error('Error loading sample image:', error);
      setError('Error loading sample image. Please try again.');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDraggedOver(false);
    setDraggedSample(null);
    
    const sampleId = e.dataTransfer.getData('text/sample-id');
    if (sampleId) {
      const sample = sampleImages.find(img => img.id === sampleId);
      if (sample) {
        classifySampleImage(sample.src);
        return;
      }
    }
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        setResult(null);
        setError(null);
        classifyImage(imageFile);
      };
      reader.readAsDataURL(imageFile);
    } else if (files.length > 0) {
      setError('Please upload a valid image file (JPG, PNG, etc.)');
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        setResult(null);
        setError(null);
        classifyImage(file);
      };
      reader.readAsDataURL(file);
    } else {
      setError('Please upload a valid image file (JPG, PNG, etc.)');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDraggedOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDraggedOver(false);
    setDraggedSample(null);
  };

  const handleSampleDragStart = (e, sample) => {
    e.dataTransfer.setData('text/sample-id', sample.id);
    setDraggedSample(sample.id);
  };

  const handleSampleDragEnd = () => {
    setDraggedSample(null);
  };

  const getConfidenceColor = (confidence) => {
    if (confidence > 0.7) return 'text-green-400';
    if (confidence > 0.5) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getClassDescription = (className) => {
    const descriptions = {
      'BCC': 'Basal Cell Carcinoma - Most common skin cancer',
      'SQCC': 'Squamous Cell Carcinoma - Second most common skin cancer',  
      'Melanoma': 'Melanoma - Most dangerous form of skin cancer',
      'Undefined': 'Classification unclear - Consult dermatologist'
    };
    return descriptions[className] || 'Unknown classification';
  };

  const clearImage = () => {
    setUploadedImage(null);
    setResult(null);
    setClassifying(false);
    setError(null);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="text-white mt-3 text-lg">Loading AI Model...</p>
        <p className="text-gray-400 text-sm mt-1">This may take a few moments</p>
      </div>
    );
  }

  if (error && !model) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <div className="text-red-400 text-4xl mb-3">⚠️</div>
        <p className="text-red-400 text-lg text-center">{error}</p>
        <button 
          onClick={loadModel}
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Retry Loading Model
        </button>
      </div>
    );
  }

  return (
    <div className="w-full h-[80vh] max-w-7xl mx-auto p-4 pt-0 -mt-30">


      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold text-white mb-2">
          🤖 AI Skin Cancer Classifier
        </h3>
        <p className="text-gray-300 text-sm">
          Upload a skin lesion image or drag a sample. This doesn't display fake results
        </p>
      </div>

      <div className="flex gap-4 h-full">
 
        <div className="w-80 flex flex-col space-y-3 h-full overflow-y-auto">
    
          <div className="bg-gray-900/80 rounded-lg p-3 backdrop-blur-sm border border-gray-700 flex-shrink-0">
            <Carousel />
          </div>

  
          <div className="bg-gray-900/80 rounded-lg p-3 backdrop-blur-sm border border-gray-700 flex-shrink-0">
            <h4 className="text-sm font-bold text-white mb-2">📊 Model Performance</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="text-center p-2 bg-gray-800 rounded">
                <div className="text-green-400 font-bold">93.75%</div>
                <div className="text-gray-300">Accuracy</div>
              </div>
              <div className="text-center p-2 bg-gray-800 rounded">
                <div className="text-green-400 font-bold">93.75%</div>
                <div className="text-gray-300">Precision</div>
              </div>
              <div className="text-center p-2 bg-gray-800 rounded">
                <div className="text-blue-400 font-bold">50</div>
                <div className="text-gray-300">Epochs</div>
              </div>
              <div className="text-center p-2 bg-gray-800 rounded">
                <div className="text-blue-400 font-bold">16</div>
                <div className="text-gray-300">Batch Size</div>
              </div>
            </div>
          </div>

     
          <div className="bg-gray-900/80 rounded-lg p-3 backdrop-blur-sm border border-gray-700 flex-1 min-h-0">
            <h4 className="text-sm font-bold text-white mb-2">📋 Sample Images</h4>
            <p className="text-gray-400 text-xs mb-3">Drag these samples to test</p>
            
            <div className="space-y-2 overflow-y-auto h-full">
              {sampleImages.map((sample) => (
                <div
                  key={sample.id}
                  draggable
                  onDragStart={(e) => handleSampleDragStart(e, sample)}
                  onDragEnd={handleSampleDragEnd}
                  onClick={() => classifySampleImage(sample.src)}
                  className={`bg-gray-800 rounded-lg p-2 cursor-move hover:bg-gray-700 transition-all duration-300 border border-transparent hover:border-blue-400 ${
                    draggedSample === sample.id ? 'opacity-50 scale-95' : 'hover:scale-105'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <img
                      src={sample.src}
                      alt={sample.name}
                      className="w-10 h-10 rounded object-cover flex-shrink-0"
                      draggable={false}
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="text-white text-xs font-medium truncate">{sample.name}</h5>
                      <p className="text-gray-400 text-xs truncate">{sample.description}</p>
                      <div className="text-xs text-blue-400">
                        🎯 {sample.expectedClass}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
             
                  
            </div>
                
            
          </div>
        </div>

    
        <div className="flex-1 flex flex-col h-full">
          <div className="bg-gray-900/80 rounded-lg p-4 backdrop-blur-sm border border-gray-700 flex-1 flex flex-col">
            <div className="flex gap-4 h-full">
    
              <div className="flex-1 flex flex-col">
                <div
                  className={`relative border-2 border-dashed rounded-lg p-4 text-center transition-all duration-300 flex-1 ${
                    draggedOver 
                      ? draggedSample
                        ? 'border-purple-400 bg-purple-500/20 scale-105' 
                        : 'border-blue-400 bg-blue-500/20' 
                      : uploadedImage 
                        ? 'border-green-400 bg-green-500/10' 
                        : 'border-gray-500 bg-gray-800/50'
                  } hover:border-blue-400 hover:bg-blue-500/10 cursor-pointer flex items-center justify-center`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                  
                  {uploadedImage ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img 
                        src={uploadedImage} 
                        alt="Uploaded" 
                        className="max-w-full max-h-full object-contain rounded-lg"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          clearImage();
                        }}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="text-4xl mb-3">🏥</div>
                      <p className="text-gray-300 mb-2 text-lg">
                        {draggedSample ? 'Release to classify sample' : 'Drop your skin lesion image here'}
                      </p>
                      <p className="text-sm text-gray-500 mb-3">
                        or click to browse files • Drag samples from the left ←
                      </p>
                      <div className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-block transition-colors">
                        Select Image
                      </div>
                    </div>
                  )}
                </div>

            
                {error && (
                  <div className="mt-2 p-2 bg-red-900/50 border border-red-500 rounded-lg">
                    <p className="text-red-400 text-center text-sm">{error}</p>
                  </div>
                )}

       
                {classifying && (
                  <div className="mt-2 p-3 bg-blue-900/50 border border-blue-500 rounded-lg text-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400 mx-auto mb-2"></div>
                    <p className="text-blue-400 text-sm">Analyzing image...</p>
                  </div>
                )}
              </div>

      
              {result && !classifying && (
                <div className="w-80 bg-gray-800 rounded-lg p-4 overflow-y-auto">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="text-lg font-bold text-white">🎯 Result</h5>
                    <span className="text-gray-400 text-xs">ID: {result.inference_id.slice(-6)}</span>
                  </div>
                  
                 
                  <div className="bg-gray-700 rounded-lg p-3 mb-3">
                    <div className="text-center">
                      <div className="text-2xl mb-2">
                        {result.predicted_class === 'BCC' ? '🔴' :
                         result.predicted_class === 'SQCC' ? '🟠' :
                         result.predicted_class === 'Melanoma' ? '⚫' : '❓'}
                      </div>
                      <h6 className="text-lg font-bold text-white mb-1">{result.predicted_class}</h6>
                      <p className="text-gray-300 text-xs mb-2">{getClassDescription(result.predicted_class)}</p>
                      <div className={`text-xl font-bold ${getConfidenceColor(result.confidence)}`}>
                        {(result.confidence * 100).toFixed(1)}%
                      </div>
                    </div>
                    
             
                    <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          result.confidence > 0.7 ? 'bg-green-500' :
                          result.confidence > 0.5 ? 'bg-yellow-500' : 'bg-orange-500'
                        }`}
                        style={{ width: `${result.confidence * 100}%` }}
                      ></div>
                    </div>
                  </div>

            
                  <div>
                    <h6 className="text-sm font-semibold text-white mb-2">All Scores:</h6>
                    <div className="space-y-1">
                      {Object.entries(result.all_predictions).map(([className, predictionData]) => (
                        <div key={className} className="flex justify-between items-center bg-gray-700 p-2 rounded text-xs">
                          <span className="text-gray-300">{className}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-400">
                              {(predictionData.confidence * 100).toFixed(1)}%
                            </span>
                            <div className="w-12 bg-gray-600 rounded-full h-1">
                              <div 
                                className="bg-blue-400 h-1 rounded-full transition-all duration-500"
                                style={{ width: `${predictionData.confidence * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

              
                  {result.time && (
                    <div className="mt-2 text-center">
                      <span className="text-gray-400 text-xs">
                        Time: {result.time}ms
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIImageClassifier;