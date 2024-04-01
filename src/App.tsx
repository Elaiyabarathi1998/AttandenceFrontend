// import React, { useState, useEffect } from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import PrimarySearchAppBar from './component/layoutNav/TopNavbar';
// import { AdminLogin } from './component/login&signup/adminLogin';
// import { Signup } from './component/login&signup/signup';
// import { EmployeeLogin } from './component/login&signup/signin';
// import { AdminDashboard } from './component/DashBoard/Admin/AdminDashboard';
// import { EmployeeDashboard } from './component/DashBoard/Employee/EmployeeMainLayout';
// import { Employeedetail } from './component/DashBoard/Admin/Employeedetail';
// import { Attendance } from './component/DashBoard/Admin/Attendance';
// import { Timelog } from './component/DashBoard/Admin/Request';
// import { Payroll } from './component/DashBoard/Admin/payroll';
// import Loader from './component/layoutNav/loader';
// // import { useNavigate } from 'react-router-dom';
// // import { Outlet } from 'react-router-dom';
// import { useAuth } from "./component/context/context";
// import LandingPage from './component/landingpage';
// function App() {
//   const { user, logout, admin } = useAuth();
//   // const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     // Simulate a delay to show loading screen (e.g., 2 seconds)
//     const delay = setTimeout(() => {
//       setLoading(false);
//       clearTimeout(delay);
//     }, 2000); // Adjust the delay as needed
//     return () => clearTimeout(delay); // Cleanup if the component unmounts
//   }, [loading]);
//   return (
//     <BrowserRouter>
//       {loading ? ( 
//         <Loader />
//       ) : ( 
//         <Routes>         
//             <Route path="/" element={<PrimarySearchAppBar />}>
//               <Route path="/admindashboard" element={<AdminDashboard />} />
//               <Route path="/attendance" element={<Attendance />} />
//               <Route path="/timelog" element={<Timelog />} />
//               <Route path="/payroll" element={<Payroll />} />
//               <Route path='/employeedetails' element={<Employeedetail/>} />
//             </Route>
//           {user ? (
//             <Route path='/employeedashboard' element={<EmployeeDashboard />} />
//           ) : null}
//           <Route path="/homepage" element={<LandingPage/>} />
//           <Route path="/adminlogin" element={<AdminLogin />} />
//           <Route path="/signin" element={<EmployeeLogin />} />      
//           <Route path="/signup" element={<Signup />} />
//           {/* <Outlet /> */}
//         </Routes>
//       )}  
//     </BrowserRouter>





import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrimarySearchAppBar from './component/layoutNav/TopNavbar';
import { AdminLogin } from './component/login&signup/adminLogin';
import { Signup } from './component/login&signup/signup';
import { EmployeeLogin } from './component/login&signup/signin';
import { AdminDashboard } from './component/DashBoard/Admin/AdminDashboard';
import { EmployeeDashboard } from './component/DashBoard/Employee/EmployeeMainLayout';
import { Employeedetail } from './component/DashBoard/Admin/Employeedetail';
import { Attendance } from './component/DashBoard/Admin/Attendance';
import { Timelog } from './component/DashBoard/Admin/Request';
import { Payroll } from './component/DashBoard/Admin/payroll';
import Loader from './component/layoutNav/loader';
// import { useNavigate } from 'react-router-dom';
// import { Outlet } from 'react-router-dom';
import { useAuth } from "./component/context/context";
import LandingPage from './component/LandingPage/landingpage';
import { AdminSignup } from './component/login&signup/adminSignup';
import NotFound from './component/login&signup/NotFound';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { user, logout, admin } = useAuth();
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay to show loading screen (e.g., 2 seconds)
    const delay = setTimeout(() => {
      setLoading(false);
      clearTimeout(delay);
    }, 2000); 

    return () => clearTimeout(delay);
  }, [loading]);


  // useEffect(() => {
  //   // Set up a quote interval with a toast
  //   const quoteInterval = setInterval(() => {
  //     const quotes = [
  //       {
  //         title: "The Power of Now",
  //         content: "Realize deeply that the present moment is all you ever have. Make the Now the primary focus of your life.",
  //         author: "Eckhart Tolle",
  //       },
  //       {
  //         title: "Success and Failure",
  //         content: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  //         author: "Winston Churchill",
  //       },
  //       {
  //         title: "The Road Not Taken",
  //         content: "Two roads diverged in a wood, and I—I took the one less traveled by, And that has made all the difference.",
  //         author: "Robert Frost",
  //       },
  //       {
  //         title: "The Alchemist",
  //         content: "When you want something, all the universe conspires in helping you to achieve it.",
  //         author: "Paulo Coelho",
  //       },
  //       {
  //         title: "Believe You Can",
  //         content: "Believe you can and you're halfway there.",
  //         author: "Theodore Roosevelt",
  //       },
  //       {
  //         title: "The Great Gatsby",
  //         content: "So we beat on, boats against the current, borne back ceaselessly into the past.",
  //         author: "F. Scott Fitzgerald",
  //       },
  //       {
  //         title: "Mindfulness",
  //         content: "You cannot control the past, but you can control where you go next.",
  //         author: "Kristin Hannah",
  //       },
  //       {
  //         title: "Inspirational Dreams",
  //         content: "All our dreams can come true if we have the courage to pursue them.",
  //         author: "Walt Disney",
  //       },
  //       {
  //         title: "Life is What Happens",
  //         content: "Life is what happens when you're busy making other plans.",
  //         author: "John Lennon",
  //       },
  //       {
  //         title: "The Hobbit",
  //         content: "The greatest adventure is what lies ahead.",
  //         author: "J.R.R. Tolkien",
  //       },
  //       // Add more quotes with titles and authors
  //       // ...
  //     ];
  
  //     const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  //     toast.info(`${randomQuote.title} - ${randomQuote.content} - ${randomQuote.author}`);
  //   }, 25000); // 20 seconds interval
  
  //   // Clear the interval on component unmount
  //   return () => clearInterval(quoteInterval);
  // }, []);
  
  

  return (
    <BrowserRouter>
      {loading ? ( 
        <Loader />
      ) : (   

        <Routes>
          <Route  path="/" element={<PrimarySearchAppBar />}>
              <Route path="/admindashboard" element={<AdminDashboard />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/timelog" element={<Timelog />} />
              <Route path="/payroll" element={<Payroll />} />
              <Route path='/employeedetails' element={<Employeedetail/>} />
          </Route>
          <Route path='/employeedashboard' element={<EmployeeDashboard />} />
          <Route path="/homepage" element={<LandingPage/>} />
          <Route path="/adminsignup" element={<AdminSignup />} />
          <Route path="/adminsignin" element={<AdminLogin />} />

          <Route path="/signin" element={<EmployeeLogin />} />      
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
          {/* <Outlet /> */}
        </Routes>
      )}  
      {/* <ToastContainer position="bottom-right" autoClose={5000} /> */}
    </BrowserRouter>
  );
}

export default App;

