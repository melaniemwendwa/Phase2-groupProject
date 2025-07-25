import react, { useState } from "react";

function ReviewForm({ appointmentId, onAddreview, user }) {
    const [reviewText, setReviewText] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!reviewText.trim()) return;

        onAddreview(appointmentId, reviewText, user);
        setReviewText("");

    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="leave a review here ...."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
            />
            <button type="submit">Submit</button>
        </form>

    );
}

export default ReviewForm;