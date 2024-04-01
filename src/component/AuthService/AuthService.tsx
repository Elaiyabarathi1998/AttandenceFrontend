

import axios from 'axios';


export const UserService = {


 
  // Function to set the token in local storage
  setUserToken:  (newToken:any) => {
    localStorage.setItem('userToken', newToken);
  },
  setAdminToken: (newToken: any) => {
    localStorage.setItem('adminToken', newToken);
  },
  getAdminToken: () => {
    return localStorage.getItem('adminToken');
  },


  // Function to get the user token from local storage
  getUserToken: () => {
    return localStorage.getItem('userToken');
  },


  // Function to remove the user token from local storage
  removeUserToken: () => {
    localStorage.removeItem('userToken');
  },

  removeAdminToken: () => {
    localStorage.removeItem('adminToken');
  },


  async login(username: string, password: string) {
    try {
      const response = await axios.post('http://localhost:8081/users/login', {
        username,
        password,
       
      });
    //   if (response.data) {
    //     localStorage.setItem("profile", JSON.stringify(response.data));
    //     console.log('Signin successful', response.data);                
       
    // } else {
    //     console.error('Token not found in the response');
        
    // }

      if (response.status === 200) {
        const newToken = response.data.token;
        UserService.setUserToken(newToken); // Store the token in local storage
      }
    } catch (error) {
      console.error('User login error:', error);
      alert('Incorrect username and password');
      throw error;
    }
  },


  async loginAdmin(username: string, password: string) {
    try {
      const response = await axios.post('http://localhost:8081/admin/login', {
        username,
        password,
      });
      console.log('Admin login response:', response);
      if (response.status === 200) {
        const newToken = response.data.token;
        console.log("Admin token:",newToken)
        UserService.setAdminToken(newToken); // Store the token in local storage
      }
    } catch (error) {
      console.error('Admin login error:', error);
      alert('Incorrect username and password');
      throw error;
    }
  },

 
  async fetchUserProfile() {
    const token = UserService.getUserToken();

    if (!token) {
      throw new Error('User token not found');
    }

    try {
      const response = await axios.get('http://localhost:8081/users/api/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        return response.data;
      } else if (response.status === 401) {
        UserService.removeUserToken(); // Remove the token if it's invalid
        throw new Error('Unauthorized');
      }
    } catch (error) {
      console.error('User profile fetch error:', error);
      throw error;
    }
  },
  async fetchUserProfileDetails() {
    const token = UserService.getUserToken();

    if (!token) {
      throw new Error('User token not found');
    }

    try {
      const response = await axios.get('http://localhost:8081/users/api/profiledetails', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        return response.data;
      } else if (response.status === 401) {
        UserService.removeUserToken(); // Remove the token if it's invalid
        throw new Error('Unauthorized');
      }
    } catch (error) {
      console.error('User profile fetch error:', error);
      throw error;
    }
  },

  
  async fetchAdminProfile() {
    const token = UserService.getAdminToken();
    console.log("Auth service admin fetch:",token)
    if (!token) {
      throw new Error('Admin token not found');
    }

    try {
      const response = await axios.get('http://localhost:8081/admin/api/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        return response.data;
      } else if (response.status === 401) {
        // UserService.removeAdminToken(); // Remove the token if it's invalid
        throw new Error('Unauthorized');
      }
    } catch (error) {
      console.error('Another profile fetch error:', error);
      throw error;
    }
  },

 
};