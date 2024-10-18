// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import ValidationInlog from '../data/storeLogInZ';

// const ProtectedRoute = ({ children }) => {
//   const isLoggedIn = ValidationInlog(state => state.isLoggedIn);
//   const navigate = useNavigate();

//   useEffect(() => { 
// 	console.log("isLoggedIn:", isLoggedIn);
//   if (!isLoggedIn) {
//     navigate('/login');
// 	console.log("Redirecting to login page...");
//   } 
//   }, [isLoggedIn, navigate]);
//   return isLoggedIn ? children : null;
// };

// export default ProtectedRoute;