import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews, addReview, resetAddReviewStatus } from '../../store/reviews/reviewSlice';
import { Box, Typography, Tabs, Tab, Button, Grid, Paper, Rating, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Alert, IconButton } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useParams } from 'react-router-dom';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const ProductReviews = ({ product }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { reviews, loading, addReviewStatus } = useSelector((state) => state.reviews);
    const { user: currentUser } = useSelector((state) => state.auth);
    const [tabValue, setTabValue] = useState(0);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [submitError, setSubmitError] = useState('');
    const [visibleCount, setVisibleCount] = useState(6);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 6);
    };

    useEffect(() => {
        if (id) {
            dispatch(fetchReviews(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (addReviewStatus === 'succeeded') {
            setOpen(false);
            setRating(0);
            setComment('');
            dispatch(resetAddReviewStatus());
        }
    }, [addReviewStatus, dispatch]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleOpen = () => {
        if (!currentUser) {
            alert("Please login to write a review.");
            return;
        }
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const handleSubmit = () => {
        if (rating === 0) {
            setSubmitError('Please select a rating.');
            return;
        }
        setSubmitError('');
        dispatch(addReview({ productId: id, reviewData: { rating, comment } }));
    };

    return (
        <Box sx={{ mt: 5 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleTabChange} centered>
                    <Tab label="Product Details" />
                    <Tab label="Rating & Reviews" />
                    <Tab label="FAQs" />
                </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    {product?.description || "No description available."}
                </Typography>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Typography variant="h5" fontWeight="bold"> All Reviews <span style={{ fontSize: '0.8em', color: '#888' }}>({reviews.length})</span></Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {/* Filter Button */}
                         <IconButton sx={{ bgcolor: '#f0f0f0', borderRadius: '50%', p: 1.5 }}>
                            <TuneIcon />
                        </IconButton>

                         {/* Sort Button */}
                         <Button 
                            variant="contained" 
                            endIcon={<KeyboardArrowDownIcon />} 
                            sx={{ 
                                borderRadius: '20px', 
                                textTransform: 'none', 
                                px: 3, 
                                bgcolor: '#f0f0f0',
                                color: 'black',
                                boxShadow: 'none',
                                '&:hover': { bgcolor: '#e0e0e0', boxShadow: 'none' }
                            }}
                        >
                            Latest
                        </Button>

                        <Button variant="contained" onClick={handleOpen} sx={{ borderRadius: '20px', textTransform: 'none', px: 4, py: 1.5, bgcolor: 'black', '&:hover': { bgcolor: '#333' } }}>
                            Write a Review
                        </Button>
                    </Box>
                </Box>

                <Grid container spacing={2} justifyContent="center">
                    {loading ? (
                        <Typography sx={{ p: 2 }}>Loading reviews...</Typography>
                    ) : reviews.length === 0 ? (
                         <Typography sx={{ p: 2, width: '100%', textAlign: 'center' }}>No reviews yet. Be the first to write one!</Typography>
                    ) : (
                        reviews.slice(0, visibleCount).map((review) => (
                            <Grid item xs={12} md={6} key={review.id} sx={{ display: 'flex', justifyContent: { xs: 'start', md: 'center' } }}>
                                <Paper elevation={0} sx={{ p: 4, border: '1px solid #e0e0e0', borderRadius: '20px', height: '100%', minHeight: '250px', width: { xs: '100%', md: '45vw' }, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                            <Rating value={review.rating} readOnly sx={{ color: '#ffc229' }} />
                                            <IconButton size="small">
                                                <MoreHorizIcon sx={{ color: '#ccc' }} />
                                            </IconButton>
                                        </Box>
                                        
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                            <Typography variant="h6" fontWeight="bold" sx={{ mr: 1, fontSize: '20px' }}>
                                                {review.User?.name || 'Anonymous'}
                                            </Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#01AB31" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
                                                </svg>
                                            </Box>
                                        </Box>

                                        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6, mb: 4 }}>
                                            "{review.comment}"
                                        </Typography>
                                    </Box>

                                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '15px', color: '#888' }}>
                                        Posted on {new Date(review.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))
                    )}
                </Grid>
                
                {reviews.length > visibleCount && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Button variant="outlined" onClick={handleLoadMore} sx={{ borderRadius: '20px', textTransform: 'none', px: 4, color: 'black', borderColor: '#e0e0e0' }}>
                            Load More Reviews
                        </Button>
                    </Box>
                )}

                   {/* Write Review Dialog */}
                   <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                    <DialogTitle>Write a Review</DialogTitle>
                    <DialogContent>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                            {submitError && <Alert severity="error">{submitError}</Alert>}
                            <Box>
                                <Typography component="legend">Rating</Typography>
                                <Rating
                                    name="simple-controlled"
                                    value={rating}
                                    onChange={(event, newValue) => {
                                        setRating(newValue);
                                    }}
                                />
                            </Box>
                            <TextField
                                label="Your Review"
                                multiline
                                rows={4}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                fullWidth
                                variant="outlined"
                                placeholder="Share your thoughts..."
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="inherit">Cancel</Button>
                        <Button onClick={handleSubmit} variant="contained" sx={{ bgcolor: 'black' }} disabled={addReviewStatus === 'loading'}>
                            {addReviewStatus === 'loading' ? 'Submitting...' : 'Submit Review'}
                        </Button>
                    </DialogActions>
                </Dialog>

            </TabPanel>

            <TabPanel value={tabValue} index={2}>
                 <Typography variant="body1" color="text.secondary" align="center">
                    No FAQs available for this product yet.
                </Typography>
            </TabPanel>
        </Box>
    );
};

export default ProductReviews;
