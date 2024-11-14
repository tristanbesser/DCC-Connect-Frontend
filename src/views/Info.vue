<script setup lang="ts">

import { faAlignJustify } from '@fortawesome/free-solid-svg-icons/faAlignJustify';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '@/components/Navbar.vue';


const router = useRouter();

defineOptions({
    name: 'info',
});

</script>

<template>
    <Navbar></Navbar>
    <h1>Info</h1>
    <p>Hours scheduled this week: </p>
    <p>Role:</p>
    <p>Overtime this week:</p>
    <p>Total hours this year:</p>
    <p>Vaction time accrued:</p>
    <p>Sick time accrued:</p>
</template>

<style>
#signOut{
    margin: 10px;
    padding: 5px;
    color:red;
    background-color: pink;
    border-radius: 5%;
    width: 10%;
}
</style>
