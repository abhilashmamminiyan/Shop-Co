import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../store/slices/auth";
import { useNavigate } from "react-router-dom";
import Alert from "../components/common/Alert";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [alertState, setAlertState] = useState({ show: false, type: 'info', title: '', message: '' });
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      dispatch(login({ email: formData.email, password: formData.password }))
        .unwrap()
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          setAlertState({
            show: true,
            type: 'error',
            title: 'Login Failed',
            message: error || 'Invalid credentials. Please try again.'
          });
        });
    } else {
      // Send name, email, password, and default role "user"
      dispatch(register({ ...formData, role: 'user' }))
        .unwrap()
        .then(() => {
          setIsLogin(true);
          setAlertState({
            show: true,
            type: 'success',
            title: 'Success',
            message: 'Registration successful! Please login.'
          });
        })
        .catch((error) => {
          const errorMessage = error || "Registration failed";
          if (errorMessage.toLowerCase().includes("already exist") ||
            errorMessage.toLowerCase().includes("duplicate")) {
            setAlertState({
              show: true,
              type: 'error',
              title: 'Account Already Exists',
              message: 'An account with this email already exists. Please login instead.'
            });
            setIsLogin(true);
          } else {
            setAlertState({
              show: true,
              type: 'error',
              title: 'Registration Failed',
              message: errorMessage
            });
          }
        });
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-5 border rounded-4 shadow-sm" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="text-center fw-bold mb-4">{isLogin ? "Login" : "Sign Up"}</h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-dark w-100 rounded-pill py-2 mt-3">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="mb-0 text-secondary">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              className="btn btn-link text-dark fw-bold text-decoration-none"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
      <Alert
        show={alertState.show}
        onHide={() => setAlertState({ show: false, type: 'info', title: '', message: '' })}
        type={alertState.type}
        title={alertState.title}
        message={alertState.message}
      />
    </div>
  );
}
