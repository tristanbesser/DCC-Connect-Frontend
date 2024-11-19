<script setup lang="ts">

import { faAlignJustify } from '@fortawesome/free-solid-svg-icons/faAlignJustify';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import RoundedBox from '../components/LoginFrame.vue';
import axios from 'axios';


const router = useRouter();

defineOptions({
    name: 'account',
});

</script>

<template>
    <Navbar></Navbar>
    <div id="holder">
        <RoundedBox>
            <div id="heading">
              <h1>Account Information</h1>
            </div>
            <p>Name: </p>
            <p>Email:</p>
            <p>Role:</p>
            <div id="signout">
                <button id="sign-out">Sign Out</button>
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
