
import { useState } from "react";

export default function OfferStrip() {
    
  const [visible, setVisible] = useState(true);
  if (!visible) return ;
  return (
    <>
    {visible && (
        <div className="bg-dark text-white text-center py-2 position-relative">
          <p className="small mb-0">
            Sign up and get 20% off to your first order.
            <a
              href="/login"
              className="ms-1 text-white border-bottom border-1 text-decoration-none"
            >
              Sign Up Now
            </a>
            <button
              className="btn btn-sm text-white position-absolute top-50 end-0 translate-middle-y me-3"
              onClick={() => setVisible(false)}
              aria-label="Close"
            >
              X
            </button>
          </p>
        </div>
      )}
    </>
  )
}
