<script setup lang="ts">

import { faAlignJustify } from '@fortawesome/free-solid-svg-icons/faAlignJustify';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '@/components/Navbar.vue';


const router = useRouter();

defineOptions({
    name: 'scheduler',
});

const options = ref(['Location 1', 'Location 2', 'Location 3', 'Show All']);
const employees = ref(['My shifts', 'John Smits', 'Goku', 'Chris']);// this is a temp list
const shifts = ref([]);
const selectedOption = ref('Show All');
const defaultEmployee = ref('My shifts');
const colors = ['var(--pop1)', 'var(--pop2)', 'var(--pop3)', 'var(--pop4)', 'var(--pop5)'];
var colorIndex = 0;

class Shift {
    constructor(start_time, day, location, duration){
        this.start_time = start_time;
        this.day = day;
        this.location = location;
        this.duration = duration;
    }
}
const goToCreateShifts = () => {
    router.push('./create-shifts'); // Change this to the actual route
};
// Add initial shifts for testing
shifts.value.push(new Shift(7, 0, 'Location 1', 4));
shifts.value.push(new Shift(4, 3, 'Location 2', 8));
shifts.value.push(new Shift(20, 3, 'Location 1', 8));
shifts.value.push(new Shift(14, 6, 'Location 3', 4));

shifts.value.push(new Shift(14, 1, 'Location 2', 4));
shifts.value.push(new Shift(20, 2, 'Location 4', 4));
shifts.value.push(new Shift(12, 0, 'Location 1', 4));
shifts.value.push(new Shift(1, 4, 'Location 2', 4));
shifts.value.push(new Shift(0, 5, 'Location 1', 4));




function getShiftStyle(shift) {
    // Use the selectedOption value and compare it with the shift location
    if(shift.location === selectedOption.value || selectedOption.value === 'Show All'){
        colorIndex += 1;
        
        let currentColor = colors[colorIndex % 5];
        if (colorIndex === shifts.value.length) { // Use 'value' for reactivity if 'shifts' is a ref
            colorIndex = 0;
        }
        return {
            
            position: 'absolute',
            top: `${12.5 + 12.5 * shift.day}%`,
            left: `${4 + 4 * shift.start_time}%`,
            width: `${4 * shift.duration}%`,
            height: '12.5%',
            backgroundColor: currentColor,
            color: 'var(--text1)',
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
function getListStyle(shift) {
    // Use the selectedOption value and compare it with the shift location
    if(shift.location === selectedOption.value || selectedOption.value === 'Show All'){
        colorIndex += 1;
        
        let currentColor = colors[colorIndex % colors.length];
        if (colorIndex === shifts.value.length) { // Use 'value' for reactivity if 'shifts' is a ref
            colorIndex = 0;
        }
        return {
            width: `95%`,
            height: '60px',
            backgroundColor: 'var(--background)', // Apply the current color for the background
            color: 'var(--text1)',         // Text color
            display: 'flex',               // Center content
            justifyContent: 'center',      // Horizontally center
            alignItems: 'center',          // Vertically center
            borderRadius: '10px',          // Rounded corners
            margin: '2px',                 // Add spacing
            borderLeft: `5px solid ${currentColor}`, // Correctly interpolate the variable
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
        <Navbar></Navbar>
        
        <div style="text-align: center; font-size: 18px; margin-top: 10px">Options</div>
        <div id = 'filters'>
            
                <div id="filter-options">
                    <select id="options" v-model="selectedOption">
                        <option v-for="option in options" :key="option" :value="option" id="Filters">
                            {{ option }}
                        </option>
                    </select>
                </div>
                <div id="filter-options">
                    <select id="options" v-model="defaultEmployee">
                        <option v-for="option in employees" :key="option" :value="option" id="Filters">
                            {{ option }}
                        </option>
                    </select>
                </div>
            
            
                <div id="filter-options">
                <button 
                    class="create-shift-btn" 
                    @click="goToCreateShifts"
                >
                    Create Shifts
                </button>
            </div>
            
            

        </div>
        <div id="split-screen-container">
            <div id="shift-list-container">
                <p id="Shift-list-title"> Shifts</p>
                <div id="Shift-list-scroll">
                    <div v-for="(shift, index) in shifts" :key="index" :style="getListStyle(shift)">
                        <div id="shift-list-info">
                            <div v-if="(shift.day == 0)"> Monday</div>
                            <div v-if="(shift.day == 1)"> Tuesday</div>
                            <div v-if="(shift.day == 2)"> Wednesday</div>
                            <div v-if="(shift.day == 3)"> Thursday </div> <!-- replace this with date when finally link backend -->
                            <div v-if="(shift.day == 4)"> Friday</div>
                            <div v-if="(shift.day == 5)"> Saturday</div>
                            <div v-if="(shift.day == 6)"> Sunday</div>
                            <div>{{shift.location}}</div> 
                            <div>{{ shift.start_time }} - {{ shift.start_time + shift.duration }}</div>
                        </div>
                        

                        <button
                            class="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li><a class="dropdown-item" href="#">Offer Shift</a></li>
                        </ul>
                    </div>
                </div>
                
            </div>
            <div id="schedule-container">
                <div v-for="(shift, index) in shifts" :key="index" :style="getShiftStyle(shift)">
                    {{shift.location}}: {{ shift.start_time + 7}} - {{ shift.start_time + shift.duration + 7}}
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




<style scoped>
    .create-shift-btn {
        background-color: var(--second); /* Customize the background */
        color: var(--text1); /* Text color */
        border: none;
        padding: 10px 20px;
        font-size: 16px;
        border-radius: 5px;
        cursor: pointer;
        width: 100%; /* Ensures full width */
        text-align: center;
    }

    .create-shift-btn:hover {
        background-color: var(--first); /* Change color on hover */
        color: var(--third);
    }

    
    #shift-list-info {
        display: flex;
        justify-content: space-between; /* Space items evenly, with the first and last aligned to the edges */
        align-items: center;           /* Vertically center items */
        width: 100%;                   /* Ensure it spans the full width of the container */
        padding: 0 10px;               /* Optional: Add padding for inner spacing */
        box-sizing: border-box;        /* Ensure padding doesn't affect width calculation */
        color: var(--first);
    }

    #Shift-list-scroll {
        overflow-y:scroll; /* Enable vertical scrolling */
        overflow-x: hidden;
        width:90%;
        height: 400px;
    }
    #Shift-list-title {
        display: flex;                  /* Use flexbox */
        justify-content: center;        /* Horizontally center the text */
        align-items: center;            /* Vertically center the text */
        color: var(--text1);            /* Use your custom color */
        font-size: 50px;                /* Adjust text size */
        width: 60%;                    /* Full width container */
        height: auto;                   /* Adjust height to content */
        text-align: center;             /* Ensure the text is centered inside */
        border-bottom: 5px solid var(--first); 

    }
    #split-screen-container {
        width: 100%;
        display:flex;
        margin:5px;
        border:5px;
    }
    #shift-list-container{
        width:33%;
        flex:2;
        size: 20px;
        align-items: center;
        justify-content: center;   
        justify-items: center; 
        margin:5px;
        border:5px;
        display: flex;
        flex-direction: column;

    }
    
    #schedule-container {
        display:flex;
        flex-direction: column;
        width: 100%;
        height:100%;
        min-height: 80px;
        max-height: 10000px;
        position:relative;
        flex:4;
        margin-right: 10px;
        border-left: 2px solid var(--text2); 
        margin-top: 0px;
        border-top: 0;
        padding-top: 0;
    }
    #schedule-day {
        display:flex;
        flex-direction: row;
        height:12.5%;
        border-bottom: 2px solid var(--text2);
        align-items: center;
        justify-content: space-between;
        height:100%;
        min-height:60px;
        max-height: 800px;

    }
  
    #scheduler {
        color: var(--text1);
        display:flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: initial; 
        width:100%;
        margin: 0;
        padding: 0;
    }

    #filters {
        display: flex;
        flex-direction: row;
        justify-content: center; /* Space between logo, nav, and button */
        align-items: left; /* Center items vertically */
        padding: 15px 20px; /* Padding around the header */
        background-color: #ffffff; /* Background color */
        color: car(--first); /* Text color */
        border-bottom: 2px solid black;
        margin: 4px;
        
    }
    #filter-options{
        width: 30%;
        margin:5px;
        margin-left: 0;
        height: 50px;
    }
    #nav-items {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width:150px;
    }

</style>