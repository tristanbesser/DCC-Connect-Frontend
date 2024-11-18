<script setup lang="ts">

import { faAlignJustify } from '@fortawesome/free-solid-svg-icons/faAlignJustify';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import RoundedBox from '../components/LoginFrame.vue';


const router = useRouter();

defineOptions({
    name: 'info',
});

</script>

<template>
    <Navbar></Navbar>
    <div id="heading">
        <h1>Location Information</h1>
    </div>
    <div id="holder">
        <RoundedBox>
            <p>Woodside</p>
        </RoundedBox>
        <RoundedBox>
            <p>Indiana</p>
        </RoundedBox>
        <RoundedBox>
            <p>419 Indiana</p>
        </RoundedBox>
        <RoundedBox>
            <p>Ridge</p>
        </RoundedBox>
        <RoundedBox>
            <p>State Street</p>
        </RoundedBox>
        <RoundedBox>
            <p>Dakota</p>
        </RoundedBox>
        <RoundedBox>
            <p>Lunn</p>
        </RoundedBox>
        <RoundedBox>
            <p>King</p>
        </RoundedBox>
        <RoundedBox>
            <p>Bond</p>
        </RoundedBox>
        <RoundedBox>
            <p>Maplewood</p>
        </RoundedBox>
        <RoundedBox>
            <p>French</p>
        </RoundedBox>
        <RoundedBox>
            <p>Greenwood</p>
        </RoundedBox>
    </div>
</template>

<style scoped>
    .rounded-box {
        margin: 10px;
    }
    #heading {
        display: flex;
        color: #1F4691;
        background-color: #D0E1F9;
        justify-content: center;
        align-items: center;
        font-family: "Poppins";
        padding: 25px;
    }
    #holder {
        display: flex;
        height: 100%;
        flex-wrap: wrap;
        justify-content: center;
        font-family: "Poppins";
        background-color: #D0E1F9;
    }
</style>
