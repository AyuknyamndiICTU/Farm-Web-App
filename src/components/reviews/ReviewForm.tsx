'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function ReviewForm({ orderId, locale }: { orderId: string, locale: string }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const token = Cookies.get('token');
      await axios.post(`${apiBase}/api/reviews`, {
        orderId,
        rating,
        comment
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      router.push(`/${locale}/orders`);
      router.refresh();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 border rounded-2xl shadow-sm space-y-4">
      <h3 className="text-xl font-bold">Leave a Review</h3>
      
      {error && <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}

      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="focus:outline-none"
          >
            <Star 
              size={32} 
              className={`${(hover || rating) >= star ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
            />
          </button>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-600">Your Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-3 border rounded-md h-32 focus:ring-2 focus:ring-green-500 outline-none"
          placeholder="What did you think of the product and service?"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-3 rounded-md font-bold hover:bg-green-700 transition disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
