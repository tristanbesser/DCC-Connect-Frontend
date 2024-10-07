<script setup lang="ts">

import { useRouter } from 'vue-router';

const router = useRouter();

defineOptions({
        name: 'scheduler',
});


const options = ['Location 1', 'Location 2', 'Location 3'];

</script>


<template>
    <div id = 'scheduler'>
        <div id = 'heading'>
            <div>
                DCC Connect
            </div>
            <div id = 'nav-bar'>
                <div id = "nav-items">
                    <i class="fa-regular fa-calendar fa-2x"></i> <!-- make these buttons when they have something to link to.-->
                    <i class="fa-regular fa-clock fa-2x"></i>
                    <i class="fa-solid fa-circle-question fa-2x"></i>
                    <i class="fa-regular fa-user fa-2x"></i>
                </div>
            </div>
            
        </div>
        <div id = 'filters'>
            <i class="fa-solid fa-sliders fa-2x"></i>
            <select id="options" v-model="selectedOption">
                <option v-for="option in options" :key="option" :value="option">
                    {{ option }}
                </option>
            </select>

        </div>
        <div id = 'visual-schedule'>
            <div> 7 AM</div>
            <div> 8 AM</div>
            <div> 9 AM</div>
            <div> 10 AM</div>
            <div> 11 AM</div>
            <div> 12 AM</div>
            <div> 1 PM</div>
            <div> 2 PM</div>
            <div> 3 PM</div>
            <div> 4 PM</div>
            <div> 5 PM</div>
            <div> 6 PM</div>
            <div> 7 PM</div>
            <div> 8 PM</div>
            <div> 9 PM</div>
            <div> 10 PM</div>
            <div> 11 PM</div>
            <div> 12 PM</div>
            <div> 1 AM</div>
            <div> 2 AM</div>
            <div> 3 AM</div>
            <div> 4 AM</div>
            <div> 5 AM</div>
            <div> 6 AM</div>
            


        </div>

    </div>
    

</template>




<style>
    #visual-schedule {
        display: flex;
        flex-direction: row;
        height:auto;
        justify-content: space-between;
        background-color: #b8b8b8;
    }
    
    #scheduler {
        color: black;
        display:flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: initial; 
        width:100%;
        margin: 0;
        padding: 0;
    }
    #heading {
        display: flex;
        flex-direction: row;
        justify-content: space-between; /* Space between logo, nav, and button */
        align-items: center; /* Center items vertically */
        padding: 15px 20px; /* Padding around the header */
        background-color: #ffffff; /* Background color */
        color: #4f4f4f; /* Text color */
        border-bottom: 2px solid black;
        
    }
    #filters {
        display: flex;
        flex-direction: column;
        justify-content: center; /* Space between logo, nav, and button */
        align-items: center; /* Center items vertically */
        padding: 15px 20px; /* Padding around the header */
        background-color: #ffffff; /* Background color */
        color: #4f4f4f; /* Text color */
        border-bottom: 2px solid black;
        
    }
    #nav-items {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width:150px;
    }
    #html, body{
        margin: 0;
        padding: 0;
        
    }
    #app {
        height: auto; /* or whatever height you need */
        display: block; /* change display to block or any other desired value */
        justify-content: initial; /* Resetting the justification */
        align-items: initial; /* Resetting the alignment */
        margin: 0;
        border: 0;
        padding: 0;
    }
</style>