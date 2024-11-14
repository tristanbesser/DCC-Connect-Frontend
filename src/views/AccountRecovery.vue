<script setup>
import { useRouter } from 'vue-router';
import RoundedBox from '../components/LoginFrame.vue';

const router = useRouter();

const gotoAccountRecoveryCode = () => {
  router.push('/account-recovery-code');
};
</script>

<template>
    <div id='holder'>
    <RoundedBox id="loginframe">
        <div id="heading">
            <h1>Account Recovery</h1>
            <h2>Forgot your password? Enter your email and we will send you a verification code to reset your password.</h2>
        </div>
        <div id="email">
            <label>Email</label>
            <input type="text" name="email" placeholder="you@example.com" />
        </div>
        <div id="sign-in-button">
            <button id="sign-in" @click="gotoAccountRecoveryCode">Send Code</button>
        </div>
    </RoundedBox>
    </div>
</template>


<style scoped>
  #holder {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #D0E1F9;
  }
    #sign-in-button {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    #sign-in {
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

    #email {
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
</style>