import React, { useState, useEffect } from 'react';
import { X, Star, MessageSquare } from 'lucide-react';
import { getProductReviews, addReview } from '../../api/productsApi';

export const ProductDetailsModal = ({ product, isOpen, onClose, onAddToCart }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen && product) {
      fetchReviews();
    }
  }, [isOpen, product]);

  const fetchReviews = async () => {
    try {
      const data = await getProductReviews(product.id);
      setReviews(data);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      setIsSubmitting(true);
      await addReview(product.id, { rating, comment });
      setComment('');
      setRating(5);
      fetchReviews();
    } catch (error) {
      console.error('Failed to add review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !product) return null;

  return (
    <div onClick={(e) => e.stopPropagation()} className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex justify-center items-end sm:items-center">
      <div className="bg-white/90 backdrop-blur-xl border border-white/60 shadow-glass w-full sm:w-[500px] h-[85vh] sm:h-[80vh] sm:rounded-3xl rounded-t-3xl flex flex-col relative animate-slide-up overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-white/50">
          <h2 className="font-black text-lg truncate pr-4 text-gray-800">{product.name}</h2>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 space-y-6">
          {/* Product Image & Info */}
          <div className="flex gap-4">
            <div className="w-32 h-32 bg-gradient-light rounded-2xl overflow-hidden flex-shrink-0 flex items-center justify-center text-6xl shadow-inner">
              {product.image?.startsWith('/') ? (
                <img src={`http://localhost:3001${product.image}`} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                product.image || '📦'
              )}
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">{product.store}</p>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl font-black text-gray-900">₹{product.price.toLocaleString()}</span>
                <span className="text-sm text-gray-400 line-through">₹{product.mrp.toLocaleString()}</span>
              </div>
              <p className="text-sm text-gray-700">{product.description || 'No description available for this product.'}</p>
            </div>
          </div>

          <hr />

          {/* Add Review Form */}
          <div>
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <MessageSquare size={18} />
              Write a Review
            </h3>
            <form onSubmit={handleSubmitReview} className="space-y-3">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-1 focus:outline-none"
                  >
                    <Star size={24} className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                  </button>
                ))}
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What did you like or dislike?"
                className="w-full border-gray-200 bg-white/60 rounded-xl p-3 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 outline-none h-24 resize-none transition-all shadow-sm"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 disabled:opacity-50 shadow-md active:scale-[0.98] transition-transform"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>

          <hr />

          {/* Reviews List */}
          <div>
            <h3 className="font-bold mb-4">Customer Reviews ({reviews.length})</h3>
            {reviews.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">No reviews yet. Be the first to review!</p>
            ) : (
              <div className="space-y-4 pb-20">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm">{review.user?.name || 'Anonymous'}</span>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star size={14} className="fill-yellow-500" />
                        <span className="text-sm font-bold">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer Add To Cart */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-100">
          <button 
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
            className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-indigo-700 transition-all active:scale-[0.98]"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
