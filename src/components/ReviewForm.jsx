import react, { useState } from "react";

function ReviewForm({ appointmentId, onAddreview}) {
    const [reviewText, setReviewText] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!reviewText.trim()) return;

        onAddreview(appointmentId, reviewText);
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
        </form>

    );
}

export default ReviewForm;