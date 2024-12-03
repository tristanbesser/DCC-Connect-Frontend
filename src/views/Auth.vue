<script setup lang="ts">
import RoundedBox from '../components/LoginFrame.vue'
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import axios from '../config/axios.js';

const formData = ref({
    email: "",
    credential: ""
})

const errorMessage = ref("")
const signOutMessage = ref("") // Add a ref to store the sign-out message

const route = useRoute();
const router = useRouter();

onMounted(() => {
  if (route.query.message === 'signed_out') {
    signOutMessage.value = 'You have signed out successfully';
    setTimeout(() => {
      signOutMessage.value = '';
    }, 3000); // Remove the message after 3 seconds
  }
});

async function loginProcess() {
  const data = {
    email: formData.value.email, 
    credential: formData.value.credential
  }

  try {
    const response = await axios.post('user/login', data, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })
    if (response.status === 200) { // Assuming 200 indicates successful login
      console.log('Response:', response.data); // Debugging log

      router.push({
        path: './2FA',
        query: { email: formData.value.email }
      });
      
    } else {
      errorMessage.value = response.data.message || "Login failed. Please try again.";
    }
  }
  catch(err) {
    errorMessage.value = err.response?.data?.message || "Login failed. Please try again.";
  }
}

const gotoAccountRecovery = () => {
  router.push('./account-recovery')
};

defineOptions({
    name: 'Auth',
});

const goToSchedule = () => {
  router.push('./scheduler')
};

const goTo2FA = () => {
  router.push('./TwoFA')
};
</script>


<template>
  <div id="holder">
    <RoundedBox>
      <div id="heading">
        <div v-if="signOutMessage" class="sign-out-message">
          {{ signOutMessage }}!
        </div>
        <h1>DCC Connect</h1>
        <h2>Welcome to DCC Connect, a simplified scheduling platform for DCC staff.</h2>
      </div>
      <form @submit.prevent="loginProcess">
        <div id="email">
          <label>Email</label>
          <input v-model="formData.email" type="text" name="email" placeholder="you@example.com">
        </div>
        <div id="password">
          <label>Password</label>
          <input v-model="formData.credential" type="password" name="password" placeholder="Enter your password">
        </div>
        <div>
          <button id="sign-in">Sign In</button>
        </div>
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
      </form>
    </RoundedBox>
  </div>
</template>

 
<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

  #holder {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #D0E1F9;
  }

  a:visited {
    text-decoration: none;
    color: #E47809;
  }

  a:link {
    text-decoration: none;
    font-family: 'Poppins';
    color: #E47809;
  }

  a {
    text-decoration: none;
    font-family: 'Poppins';
    color: #E47809;
    cursor: pointer;
  }
  
  #forgot-pass {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 14px;
  }
  
  #sign-in {
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

  #sign-in:hover {
    background-color: #1e417a;
  }

  #password {
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

  input[type=password], select {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    border: 1px solid #ccc;
    border-radius: 15px;
    box-sizing: border-box;
  }
  
  #email {
    display: flex;
    flex-direction: column;
    margin: 3px;
    font-family: 'Poppins';
    color: #2857A3;
  }
  
  #heading {
    display: flex;
    flex-direction: column;
    text-align: center;
    font-family: 'Poppins';
    color: #2857A3;
  }

  #btn-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
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

  
  #rounded-box {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 20px;
    width: 624px;
    background: white;
    border-radius: 15px;
  }

  .error-message {
  color: red;
  font-family: 'Poppins', sans-serif;
  margin-top: 10px;
  text-align: center;
}

.sign-out-message {
  color: green;
  font-family: 'Poppins', sans-serif;
  margin-top: 10px;
  text-align: center;
}
</style>