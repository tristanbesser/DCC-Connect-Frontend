<script setup lang="ts">

import { faAlignJustify } from '@fortawesome/free-solid-svg-icons/faAlignJustify';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

defineOptions({
    name: 'scheduler',
});

const options = ref(['Location 1', 'Location 2', 'Location 3', 'Show All']);
const shifts = ref([]);
const selectedOption = ref('Show All');

class Shift {
    constructor(start_time, day, location, duration){
        this.start_time = start_time;
        this.day = day;
        this.location = location;
        this.duration = duration;
    }
}

// Add initial shift
shifts.value.push(new Shift(7, 0, 'Location 1', 4));
shifts.value.push(new Shift(4, 3, 'Location 2', 8));
shifts.value.push(new Shift(20, 3, 'Location 1', 8));
shifts.value.push(new Shift(14, 6, 'Location 3', 4));

function getShiftStyle(shift) {
    // Use the selectedOption value and compare it with the shift location
    if(shift.location === selectedOption.value || selectedOption.value === 'Show All'){
        return {
            position: 'absolute',
            top: `${50 + 50 * shift.day + 2 + shift.day * 1.5}px`,
            left: `${4 + 4 * shift.start_time}%`,
            width: `${4 * shift.duration}%`,
            height: '50px',
            backgroundColor: 'blue',
            color: 'black',
            display: 'flex',                // Center content
            justifyContent: 'center',       // Horizontally center
            alignItems: 'center',           // Vertically center
            borderRadius: '10px',           // Rounded corners
        };
    }
    else{
        return {
            display:'none',
        }
    }
    return {};
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
                <div id="schedule-day">
                    <div> Day </div>
                    <div> 7 AM </div>
                    <div> 8 AM </div>
                    <div> 9 AM </div>
                    <div> 10 AM </div>
                    <div> 11 AM </div>
                    <div> 12 PM </div>
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
                    <div> 12 AM</div>
                    <div> 1 AM</div>
                    <div> 2 AM</div>
                    <div> 3 AM</div>
                    <div> 4 AM</div>
                    <div> 5 AM</div>
                    <div> 6 AM</div>                    
                </div>
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
    }
    #schedule-container {
        display:flex;
        flex-direction: column;
        width: 100%;
        height:100%;
        position:relative;
    }
    #schedule-day {
        display:flex;
        flex-direction: row;
        height:50px;
        border-bottom: 2px solid #A0A0A0;
        align-items: center;
        justify-content: space-between;

    }
    #visual-schedule {
        display: flex;
        flex-direction: row;
        height:100%;
        justify-content: space-between;
        background-color: white;
        color: #2857A3;
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