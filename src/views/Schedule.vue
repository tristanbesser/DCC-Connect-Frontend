<script setup lang="ts">

import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

defineOptions({
    name: 'scheduler',
});

const options = ref(['Location 1', 'Location 2', 'Location 3']);
const shifts = ref([]);

class Shift {
    constructor(start_time, day, location, duration){
        this.start_time = start_time;
        this.day = day;
        this.location = location;
        this.duration = duration;
    }
}

// Add initial shift
shifts.value.push(new Shift(7, 0, 'main', 4));
shifts.value.push(new Shift(4, 3, 'main', 8));
shifts.value.push(new Shift(20, 3, 'main', 8));
shifts.value.push(new Shift(14, 6, 'main', 4));

function getShiftStyle(shift) {
    return {
        position: 'absolute',
        top: `${50 + 50 * shift.day + shift.day * 3}px`,
        left: `${4 + 4 * shift.start_time}%`,
        width: `${4 * shift.duration}%`,
        height:'50px',
        backgroundColor: 'blue',
    };
}
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
        <div id="visual-schedule">
            <div id="schedule-container">
                <div v-for="(shift, index) in shifts" :key="index" :style="getShiftStyle(shift)">
                    Shift: {{ shift.start_time }} - {{ shift.duration }} hours
                </div>
                <div id="schedule-day">Day</div>
                <div id="schedule-day">Mon</div>
                <div id="schedule-day">Tue</div>
                <div id="schedule-day">Wed</div>
                <div id="schedule-day">Thu</div>
                <div id="schedule-day">Fri</div>
                <div id="schedule-day">Sat</div>
                <div id="schedule-day">Sun</div>
            </div>
        </div>


    </div>
    

</template>




<style>
    #schedule-shift{
        position: absolute;
        top: 50px;
        left: 16%;
        height:50px;
        width:50px;
        background-color: aquamarine;
    }
    #schedule-container {
        display:flex;
        flex-direction: column;
        width: 100%;
        height:100%;
        background-color: rgb(188, 141, 141);
        position:relative;
    }
    #schedule-day {
        display:flex;
        flex-direction: row;
        height:50px;
        background-color: rgb(105, 56, 56);
        border-bottom: 2px solid black;
        align-items: center;
        justify-content: space-between;

    }
    #visual-schedule {
        display: flex;
        flex-direction: row;
        height:100%;
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