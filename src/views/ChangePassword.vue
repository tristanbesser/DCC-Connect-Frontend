<script setup>
import { NavigationFailureType } from 'vue-router';
import RoundedBox from '../components/LoginFrame.vue'
import Navbar from '@/components/Navbar.vue';
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
                <input type="text" name = "email" placeholder="Enter a new password">
            </div>
            <div id = "confirm-pass">
                <label>Confirm Password</label>
                <input type="text" name = "password" placeholder="Enter the same password">
            </div>
            <div id="set-password-button">
                <button id ="set-password" @click="gotoChangePassword">Set Password</button>
            </div>
        </RoundedBox>
    </div>
</template>

<style scoped>

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
</style>