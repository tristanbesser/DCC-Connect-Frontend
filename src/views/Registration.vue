<script setup lang="ts">
import RoundedBox from '../components/LoginFrame.vue';
import { useRouter } from 'vue-router';
import axios from '../config/axios.js';
import { ref } from 'vue';
import Navbar from '@/components/Navbar.vue';

const formData = ref({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    employeeRole: ""
})

async function registrationProcess() {

    const data = {
        email: formData.value.email,
        firstName: formData.value.firstName,
        lastName: formData.value.lastName,
        phoneNumber: formData.value.phoneNumber,
        employeeRole: formData.value.employeeRole, 
    }


    try {
        const response = await axios.post('user/register', data, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
        if (response.status === 200) { // Assuming 200 indicates successful login
          console.log('Response:', response.data);
        }
    }
    catch(err) {
        console.log(err)
    }
}

</script>

<template>
  <Navbar></Navbar>
    <div id="holder">
        <RoundedBox>
            <div id = "heading">
                <h1>Account Registration</h1>
                <h2>Fill out the following fields to add an employee.</h2>
            </div>
            <form id="userinfo" @submit.prevent="registrationProcess" action="/account-recovery">
                <div id = "first-name">
                    <label>First Name</label>
                    <input v-model="formData.firstName" type="text" name = "firstName" placeholder="e.g John">
                </div>
                <div id = "last-name">
                    <label>Last Name</label>
                    <input v-model="formData.lastName" type="text" name = "lastName" placeholder="e.g Smith">
                </div>  
                <div id = "Email">
                    <label>Email</label>
                    <input v-model="formData.email" type="text" name = "email" placeholder="e.g someone@example.com">
                </div>   
                <div id = "phone-number">
                    <label>Phone Number</label>
                    <input v-model="formData.phoneNumber" type="text" name = "phoneNumber" placeholder="">
                </div>
                <div id = "employee-role">
                    <label>Employee Role</label>
                    <select v-model="formData.employeeRole" name="roles" id="roles">
                        <option value="Employee">Employee</option>
                        <option value="HouseLead">House Lead</option>
                        <option value="HouseManager">House Manager</option>
                        <option value="Manager">Manager</option>
                    </select>
                </div>   
            <div>
            <button id = "submit">Submit</button>
          </div>
        </form>
        </RoundedBox>
    </div>
</template>

<style scoped>
  #roles {
    display: flex;
    flex-direction: column;
    margin: 3px;
    font-family: 'Poppins';
    color: black;
  }
  #submit {
    background-color: #2857A3;
    border: none;
    width: 100%;
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
  #userinfo {
    display: flex;
    flex-direction: column;
    margin: 3px;
    font-family: 'Poppins';
    color: #2857A3;
  }
  ::placeholder {
    font-family: 'Poppins';
    font-size: 14px;
    color: #A0A0A0;
  }

  input[type=text], select {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    border: 1px solid #ccc;
    border-radius: 15px;
    box-sizing: border-box;
  }

  #holder {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #D0E1F9;
  }

  #heading {
    display: flex;
    flex-direction: column;
    text-align: center;
    font-family: 'Poppins';
    color: #2857A3;
  }


  h1 {
    font-size: 18px;
    line-height: 1.4;
    font-weight: 700;
    margin: 0;
  }

  h2 {
    font-family: 'Poppins';
    margin-bottom: 10px;
    margin-top: 0;
    font-size: 14px;
    line-height: 1.6;
    font-weight: 400;
  }
</style>