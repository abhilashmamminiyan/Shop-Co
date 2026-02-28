import React from 'react';
import '../styles/TestimonialCarousel.css';

const TestimonialCarousel = ({ testimonials = [] }) => {
    // Triple the testimonials to create an infinite loop effect
    const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];
    const originalLength = testimonials.length;
    
    // Start from the middle set
    const [currentIndex, setCurrentIndex] = React.useState(originalLength);
    const [isTransitioning, setIsTransitioning] = React.useState(true);

    const next = () => {
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev + 1);
    };

    const prev = () => {
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev - 1);
    };

    // Handle the infinite loop jump
    React.useEffect(() => {
        if (currentIndex === originalLength * 2) {
            // After transition, jump back to the middle set
            const timer = setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(originalLength);
            }, 600); // Match transition duration
            return () => clearTimeout(timer);
        }
        if (currentIndex === originalLength - 1) {
            // Jump forward to the end of the middle set
            const timer = setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(originalLength * 2 - 1);
            }, 600);
            return () => clearTimeout(timer);
        }
    }, [currentIndex, originalLength]);

    const renderStars = () => {
        return (
            <div className="stars">
                {[...Array(5)].map((_, i) => (
                    <span key={i} className="star">★</span>
                ))}
            </div>
        );
    };

    return (
        <div className="carousel-container-full">
            <div className="carousel-header px-4">
                <h2 className="carousel-title">
                    <span>OUR HAPPY</span> <span>CUSTOMERS</span>
                </h2>
                <div className="carousel-controls">
                    <button onClick={prev} className="carousel-button" aria-label="Previous">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                    </button>
                    <button onClick={next} className="carousel-button" aria-label="Next">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </button>
                </div>
            </div>
            <div className="carousel-viewport">
                <div 
                    className="testimonial-track" 
                    style={{ 
                        '--current-index': currentIndex,
                        transition: isTransitioning ? 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
                    }}
                >
                    {extendedTestimonials.map((testimonial, index) => {
                        // Blurred if index is outside [currentIndex, currentIndex + 2]
                        const isBlurred = index < currentIndex || index > currentIndex + 2;
                        return (
                            <div key={index} className={`testimonial-card ${isBlurred ? 'blurred' : ''}`}>
                                <div className="card-top">
                                    {renderStars()}
                                    <div className="author-container">
                                        <h4 className="testimonial-author">{testimonial.name}</h4>
                                        <div className="verified-badge">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="#01AB31" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <p className="testimonial-text">{testimonial.message}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default TestimonialCarousel;