// api/authAPI.js

import axios from 'axios';

const API_URL = 'https://e-commerce-app-4d68a-default-rtdb.firebaseio.com/users.json'; // JSON Server

export const registerUser = async (userData) => {
  const response = await axios.post(API_URL, userData);
  console.log('response >> ',response)
  return { user: response.data};
};

export const loginUser = async ({ email, password }) => {
  try {
    // 1. Get all users
    const response = await axios.get(API_URL);
    const users = response.data;

    // 2. Find user by email
    const userKey = Object.keys(users).find(key => 
      users[key].email === email
    );

    if (!userKey) {
      throw new Error('User not found');
    }

       // 3. Verify password
    if (users[userKey].password !== password) {
      throw new Error('Invalid password');
    }

    // 4. Return user data
    return { 
      user: { 
        id: userKey,
        ...users[userKey] 
      },
      token: 'dummy_token' 
    };
    
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};