<script setup>
  import { useRouter } from 'vue-router';
  import RoundedBox from '../components/LoginFrame.vue';
  const router = useRouter();
  const gotoChangePassword = () => {
  router.push('/change-password');
};
</script>

<template>
  <div id="holder">
    <RoundedBox id = 'frame'>
      <div id="heading">
        <h1>Account Recovery</h1>
        <h2>We sent a verification code to your email.</h2>
      </div>
      <div id ="resend">
        <h2>Didn't get the code? <a @click="resend">RESEND IT</a></h2>
      </div>
      <div id="input">
        <label>Verification Code</label>
        <input type="text" placeholder="Enter Code">
      </div>
      <div id="next-button">
        <button id ="next" @click="gotoChangePassword">Next</button>
      </div>
    </RoundedBox>
  </div>
</template>

<style scoped>
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

  #resend {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  label {
    font-family: 'Poppins';
    color: #2857A3;
  }

  #next-button {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #next {
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

  #next:hover {
    background-color: #1e417a;
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
</style>