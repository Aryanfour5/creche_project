// FeedbackForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = ({ nannyId, userId }) => {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/feedback/submit', {
        nannyId,
        userId,
        rating,
        comment
      });

      setMessage(response.data.message);
    } catch (err) {
      setMessage('Error submitting feedback');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Rating:</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Comment:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <button type="submit">Submit Feedback</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default FeedbackForm;
