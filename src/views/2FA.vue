<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import RoundedBox from '../components/LoginFrame.vue';
import axios from 'axios';

const route = useRoute();
const router = useRouter();

const email = ref(route.query.email || "");
const credential = ref(""); 
const errorMessage = ref("");

async function verifyCredential() {
  const apiurl = "https://api.dccconnect.com/email/validate2fa";

  const data = {
    email: email.value,
    credential: credential.value, 
  };

  try {
    const response = await axios.post(apiurl, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (response.status === 200) {
      router.push('/scheduler'); 
    } else {
      errorMessage.value = response.data.message || "Verification failed. Please try again.";
    }
  } catch (err) {
    errorMessage.value = err.response?.data?.message || "Verification failed. Please try again.";
  }
}
</script>


<template>
    <div id="holder">
    <RoundedBox>
      <div id="heading">
        <h1>Two-Factor Authentication</h1>
        <h2>Enter your credential for email: {{ email }}</h2>
      </div>
      <form @submit.prevent="verifyCredential">
        <div id="credential">
          <label id="cred">Verification Code</label>
          <input v-model="credential" type="text" placeholder="Enter code" />
        </div>
        <div id="button">
            <button id="verify-button">Verify</button>
        </div>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      </form>
    </RoundedBox>
    </div>
  </template>
  

<style scoped>
#holder {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #D0E1F9;
}

#rounded-box {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  width: 624px;
  background: white;
  border-radius: 15px;
}

#heading {
  display: flex;
  flex-direction: column;
  text-align: center;
  font-family: 'Poppins';
  color: #2857A3;
}

#button {
    display: flex;
    justify-content: center;
}

#cred {
    color: #2857A3;
}

#credential {
    font-family: "Poppins"

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
  color: #2857A3;
}

input[type='text'] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 15px;
  box-sizing: border-box;
}

button {
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

.error-message {
  color: red;
  font-family: 'Poppins', sans-serif;
  margin-top: 10px;
  text-align: center;
}
</style>
