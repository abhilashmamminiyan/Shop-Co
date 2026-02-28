
export default function StarRating(rating) {
  
    const stars = [];

    if (!rating) {
      for (let i = 0; i < 5; i++) {
        stars.push(
          <i key={`empty-${i}`} className="bi bi-star text-warning"></i>
        );
      }
      return stars;
    }

    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    // full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="bi bi-star-fill text-warning"></i>);
    }
  
    // half star
    if (hasHalfStar) {
      stars.push(<i key="half" className="bi bi-star-half text-warning"></i>);
    }
  
    // empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="bi bi-star text-warning"></i>);
    }
  
    return stars;
};
