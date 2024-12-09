<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import RoundedBox from '../components/LoginFrame.vue';
import axios from '../config/axios.js';
import type User from '@/models/user';

const router = useRouter();

const gotoChangePassword = () => {
  router.push('./change-password')
};

// Reactive data to store employee information
const employee = ref<User>();

// Method to fetch employee data
const getEmployeeData = async () => {
  try {
    const response = await axios.get('user/signedin', {
      withCredentials: true
    });

    // Assuming the response contains the employee data
    console.log(response.data)
    employee.value = response.data;
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
  router.push({ path: '/', query: { message: 'signed_out' } }); // Redirect to the login page with a query parameter
};
</script>

<template>
  <Navbar></Navbar>
  <div id="holder">
    <RoundedBox>
      <div id="heading">
        <h1>Account Information</h1>
      </div>
      <p>Name: {{ employee?.firstName }} {{ employee?.lastName }}</p>
      <p>Email: {{ employee?.email }}</p>
      <p>Role: {{ employee?.employeeRole }}</p>
      <div id="signoutnchangepassword">
        <button id="change-password" @click="gotoChangePassword">Change Password</button>
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

  #signoutnchangepassword {
    display: flex;
    justify-content: space-between;
    gap: 20px;
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

  #change-password {
    background-color: #1F4691;
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

  #change-password:hover {
    background-color: #17346d;
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
