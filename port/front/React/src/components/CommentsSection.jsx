import { useState, useEffect } from 'react';

const API_BASE = 'https://portfolio-ahuh.onrender.com/api';

const CommentsSection = ({ isMobile }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch(`${API_BASE}/comments`);
      const data = await response.json();
      if (data.success) {
        setComments(data.comments || []);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newComment.name.trim() || !newComment.message.trim()) {
      alert('Please fill in both name and message fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newComment.name.trim(),
          message: newComment.message.trim(),
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setComments(prev => [data.comment, ...prev]);
        setNewComment({ name: '', message: '' });
      } else {
        alert('Failed to submit comment. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Error submitting comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setNewComment(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`bg-black/40 backdrop-blur-sm rounded-2xl border border-purple-500/30 ${
      isMobile ? 'p-4 max-w-full' : 'p-8 max-w-4xl'
    } mx-auto`}>
      <h3 className={`font-bold text-white mb-6 ${isMobile ? 'text-xl' : 'text-2xl'}`}>
        Leave a Comment
      </h3>
    
      <form onSubmit={handleSubmit} className="mb-8">
        <div className={`grid gap-4 mb-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
          <input
            type="text"
            placeholder="Your Name"
            value={newComment.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`bg-white/10 border border-purple-400/30 rounded-lg text-white placeholder-gray-400 
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
              ${isMobile ? 'px-3 py-2 text-sm' : 'px-4 py-3'}`}
            maxLength={50}
            disabled={isSubmitting}
          />
          
          {!isMobile && (
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting || !newComment.name.trim() || !newComment.message.trim()}
                className={`bg-purple-600 text-white rounded-lg hover:bg-purple-700 
                  disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                  ${isMobile ? 'px-4 py-2 text-sm' : 'px-6 py-3'}`}
              >
                {isSubmitting ? 'Submitting...' : 'Post Comment'}
              </button>
            </div>
          )}
        </div>
        
        <textarea
          placeholder="Your message..."
          value={newComment.message}
          onChange={(e) => handleInputChange('message', e.target.value)}
          className={`w-full bg-white/10 border border-purple-400/30 rounded-lg text-white placeholder-gray-400 
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none
            ${isMobile ? 'px-3 py-2 text-sm min-h-[80px]' : 'px-4 py-3 min-h-[100px]'}`}
          maxLength={500}
          disabled={isSubmitting}
        />
        
        {isMobile && (
          <button
            type="submit"
            disabled={isSubmitting || !newComment.name.trim() || !newComment.message.trim()}
            className={`w-full mt-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 
              disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
              px-4 py-2 text-sm`}
          >
            {isSubmitting ? 'Submitting...' : 'Post Comment'}
          </button>
        )}
        
        <div className="flex justify-between items-center mt-2">
          <span className="text-gray-400 text-xs">
            {newComment.message.length}/500 characters
          </span>
        </div>
      </form>


      <div className="space-y-4">
        <h4 className={`font-semibold text-white ${isMobile ? 'text-lg' : 'text-xl'}`}>
          Comments ({comments.length})
        </h4>
        
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
            <p className="text-gray-400 mt-2">Loading comments...</p>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">No comments yet. Be the first to leave one!</p>
          </div>
        ) : (
          <div className={`space-y-4 ${isMobile ? 'max-h-80' : 'max-h-96'} overflow-y-auto`}>
            {comments.map((comment, index) => (
              <div 
                key={comment._id || index} 
                className="bg-white/5 border border-purple-400/20 rounded-lg p-4 hover:bg-white/10 transition-colors duration-300"
              >
                <div className="flex justify-between items-start mb-2">
                  <h5 className={`font-medium text-purple-300 ${isMobile ? 'text-sm' : 'text-base'}`}>
                    {comment.name}
                  </h5>
                  <span className={`text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
                <p className={`text-gray-200 ${isMobile ? 'text-sm' : 'text-base'} leading-relaxed`}>
                  {comment.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentsSection;