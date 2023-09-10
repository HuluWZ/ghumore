import { useEffect, useState } from 'react';
import { createReview, getAllReview } from '../apiCalls/booking';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ReviewComponent = ({ activityId, token,user }) => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [allReview,setAllReview] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const [averageRating, setAverageRating] = useState(3.4);

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };
  const handleError = () => {
    toast.error("review add failed");
  };
  const handleSuccess = () => {
    toast.success("review added");
  };
  const handleRatingChange = (event) => {
    setRating(Number(event.target.value));
  };

  const handleCreateReview = async () => {
    const response = await createReview(activityId, review, rating, token);
    if (response.success) {
      handleSuccess();
      setTimeout(() => {
        window.location.reload(); // Reload the page after 6 seconds
      }, 6000);
    } else {
      handleError();
    }
  };

  

  const getAllReviews = async () => {
    const response = await getAllReview(activityId);
    if (response.success) {
        console.log(response.activity.reviews)
        setAllReview(response.activity.reviews)

        const ratings = response.activity.reviews.map((review) => review.rating);
    const sum = ratings.reduce((total, rating) => total + rating, 0);
    const average = sum / ratings.length;
    // setAverageRating(average);
    } else {
      console.log('error ')
    }
  };

  useEffect(()=>{
    getAllReviews()
  },[])
console.log('the list of all reviews in allreview variable',allReview)
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle review submission here (e.g., sending the review and rating to a server)
    handleCreateReview();
    // ...

    // Set submitted to true to display the review
    setSubmitted(true);
  };
const [showAllReviews, setShowAllReviews] = useState(false);

  return (
    <div className=" w-[350px] ml-[-25px] mt-4 mx-auto md:ml-32 lg:flex lg:flex-row lg:gap-44  lg:w-screen">
      <div>
      <h2>Review this Activity</h2>
      <span className="text-gray-600 ml-2 flex items-center">
       Average Rating: {averageRating.toFixed(1)}
      <div className="ml-1 flex">
      {[1, 2, 3, 4, 5].map((value) => {
      const starPercentage = (averageRating - value + 1) * 20;
      const filledStar = starPercentage >= 10;
      const decimalStar = starPercentage === 5;
      const fillColor = filledStar ? 'text-yellow-500' : 'text-gray-400';
      const decimalFillColor = decimalStar ? 'text-yellow-500' : 'text-gray-400';

      return (
        <svg
          key={value}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-4 h-4 ${filledStar ? fillColor : decimalFillColor}`}
        >
          <polygon
            points="12 2 15.09 8.36 22 9.27 17 14.14 18.18 21 12 17.77 5.82 21 7 14.14 2 9.27 8.91 8.36 12 2"
            fill="none"
          />
          {decimalStar && (
            <polygon
              points="12 2 15.09 8.36 22 9.27 17 14.14 18.18 21 12 17.77 5.82 21 7 14.14 2 9.27 8.91 8.36 12 2"
              fill="none"
              className={decimalFillColor}
              style={{ strokeDasharray: '50% 50%' }}
            />
          )}
        </svg>
      );
    })}
  </div>
</span>
      {user && user.fullName ?  
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full lg:w-[330px] p-2 mb-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
          rows="4"
          placeholder="Write a review..."
          value={review}
          onChange={handleReviewChange}
          disabled={submitted} // Disable the textarea when the review has been submitted
        ></textarea>

        <div className="flex items-center mb-2">
          <span className="mr-2">Rate:</span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={value} className="mr-1">
                <input
                  type="radio"
                  name="rating"
                  value={value}
                  checked={rating === value}
                  onChange={handleRatingChange}
                  disabled={submitted} // Disable the radio buttons when the review has been submitted
                  className="sr-only"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`w-5 h-5 ${
                    value <= rating ? 'text-yellow-500' : 'text-gray-400'
                  }`}
                >
                  <polygon
                    points="12 2 15.09 8.36 22 9.27 17 14.14 18.18 21 12 17.77 5.82 21 7 14.14 2 9.27 8.91 8.36 12 2"
                    fill="none"
                  />
                </svg>
              </label>
            ))}

          </div>
        </div>

        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
          type="submit"
          disabled={submitted} // Disable the submit button when the review has been submitted
        >
          Submit Review
        </button>
      </form>:<a href="/login" className=" text-blue-300 text-2xl font-bold text-start"> Login to give a review</a>}
{/* //show the reviews */}
      </div>
<div className="mt-7 p-2 border border-gray-400 rounded-md text-start pl-5 pr-20">
      <h3 className="text-[25px] font-bold mb-2 underline">Customer Reviews</h3>

      
      {showAllReviews ? (
        // Display all reviews if showAllReviews is true
        <>
          {allReview.map((review) => (
            <div className="mt-2" key={review.id}>
              <p className="font-bold">{review.message}</p>
              <div className="flex items-center">
                <span className="mr-2">Rating:</span>
                {[1, 2, 3, 4, 5].map((value) => (
                  <svg
                    key={value}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`w-5 h-5 ${
                      value <= review.rating ? 'text-yellow-500' : 'text-gray-400'
                    }`}
                  >
                    <polygon
                      points="12 2 15.09 8.36 22 9.27 17 14.14 18.18 21 12 17.77 5.82 21 7 14.14 2 9.27 8.91 8.36 12 2"
                      fill="none"
                    />
                  </svg>
                ))}
              </div>
            </div>
          ))}
          <button
            className="mt-2 text-blue-500 underline"
            onClick={() => setShowAllReviews(false)}
          >
            Less
          </button>
        </>
      ) : (
        // Display only the first five reviews initially
        <>
          {allReview.slice(0, 4).map((review) => (
            <div className="mt-2" key={review.id}>
                            <p className="font-bold">{review.user.fullName}</p>

                            <p className=" font-serif">{review.message}</p>
              <div className="flex items-center">
                
                {[1, 2, 3, 4, 5].map((value) => (
                  <svg
                    key={value}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`w-5 h-5 ${
                      value <= review.rating ? 'text-yellow-500' : 'text-gray-400'
                    }`}
                  >
                    <polygon
                      points="12 2 15.09 8.36 22 9.27 17 14.14 18.18 21 12 17.77 5.82 21 7 14.14 2 9.27 8.91 8.36 12 2"
                      fill="none"
                    />
                  </svg>
                ))}
              </div>
            </div>
          ))}
          {allReview.length > 5 && (
            <button
              className="mt-2 text-blue-500 underline"
              onClick={() => setShowAllReviews(true)}
            >
              More
            </button>
          )}
        </>
      )}
      </div>
    </div>
  );
};

export default ReviewComponent;