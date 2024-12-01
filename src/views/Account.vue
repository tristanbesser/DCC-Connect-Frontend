<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import RoundedBox from '../components/LoginFrame.vue';
import axios from 'axios';

const router = useRouter();

// Reactive data to store employee information
const employee = ref({
  firstName: '',
  lastName: '',
  email: '',
  role: '',
});

// API URL to fetch employee data
const apiurl = "https://localhost:32774/user/signedin";

// Method to fetch employee data
const getEmployeeData = async () => {
  try {
    const response = await axios.get(apiurl, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    });

    // Assuming the response contains the employee data
    const employeeData = response.data;
    employee.value.firstName = employeeData.firstName;
    employee.value.lastName = employeeData.lastName;
    employee.value.email = employeeData.email;
    employee.value.role = employeeData.employeeRole;
  } catch (error) {
    console.error("Error fetching employee data:", error);
  }
};

// Fetch employee data when the component is mounted
onMounted(() => {
  getEmployeeData();
});

// Sign out function
const signOut = () => {
  // Handle sign out logic, e.g., clearing tokens and redirecting to login page
  localStorage.removeItem('authToken'); // Assuming you're using localStorage for authentication token
  router.push('/login'); // Redirect to the login page
};
</script>

<template>
  <Navbar></Navbar>
  <div id="holder">
    <RoundedBox>
      <div id="heading">
        <h1>Account Information</h1>
      </div>
      <p>Name: {{ employee.firstName }} {{ employee.lastName }}</p>
      <p>Email: {{ employee.email }}</p>
      <p>Role: {{ employee.role }}</p>
      <div id="signout">
        <button id="sign-out" @click="signOut">Sign Out</button>
      </div>
    </RoundedBox>
  </div>
</template>

<style scoped>
  #heading {
    display: flex;
    justify-content: center;
  }

  #signout {
    display: flex;
    justify-content: center;
  }

  #sign-out {
    background-color: #F44336;
    border: none;
    justify-content: center;
    align-items: center;
    width: 60%;
    border-radius: 15px;
    color: #f0f0f0;
    padding: 10px 50px;
    margin-top: 14px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    font-family: 'Poppins';
    cursor: pointer;
  }

  #sign-out:hover {
    background-color: #c2352b;
  }

  #holder {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #D0E1F9;
    font-family: "Poppins";
  }

  p {
    color: #1F4691;
  }

  h1 {
    font-family: "Poppins";
    font-size: 18px;
    line-height: 1.4;
    font-weight: 700;
    margin: 0;
    color: #1F4691;
  }
</style>
