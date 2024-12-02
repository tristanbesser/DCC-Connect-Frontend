<script setup>
import { NavigationFailureType } from 'vue-router';
import RoundedBox from '../components/LoginFrame.vue'
import Navbar from '@/components/Navbar.vue';

defineOptions({
    name: "ChangePassword"
});

</script>

<template>
    <div id="holder">
        <RoundedBox id="frame">
            <div id="heading">
                <h1>Change Password</h1>
                <h2>Enter a new password that contains at least 8 characters, 1 number and 1 special character.</h2>
            </div>
            <div id = "new-pass">
                <label>New Password</label>
                <input type="password" name = "password" placeholder="Enter a new password">
            </div>
            <div id = "confirm-pass">
                <label>Confirm Password</label>
                <input type="password" name = "password" placeholder="Enter the same password">
            </div>
            <div id="set-password-button">
                <button id ="set-password" @click="gotoChangePassword">Set Password</button>
            </div>
        </RoundedBox>
    </div>
</template>

<style scoped>

  #heading {
    display: flex;
    flex-direction: column;
    text-align: center;
    font-family: 'Poppins';
    color: #2857A3;
  }

  #holder {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #D0E1F9;
  }
    input[type=password], select {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        border: 1px solid #ccc;
        border-radius: 15px;
        box-sizing: border-box;
        font-family: 'Poppins';
    }

  h1 {
    font-size: 18px;
    line-height: 1.4;
    font-weight: 700;
    margin: 0;
    font-family: 'Poppins';
    color:#2857A3;
  }

  h2 {
        font-family: 'Poppins';
        margin-bottom: 10px;
        margin-top: 0;
        font-size: 14px;
        line-height: 1.6;
        font-weight: 400;
        color: #2857A3;
    }

    label {
        font-family: 'Poppins';
        color: #2857A3;
    }

    #set-password-button {
        display: flex;
        align-items: center;
        justify-content: center;
    }


    #set-password {
        background-color: #2857A3;
        border: none;
        width: 50%;
        border-radius: 15px;
        color: #f0f0f0;
        padding: 10px 50px;
        margin-top: 5px;
        text-align: center;
        text-decoration: none;
        font-size: 16px;
        font-family: 'Poppins';
        cursor: pointer;
    }

    #set-password:hover {
        background-color: #17346d;
    }
</style>