<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from '../config/axios.js';
import { useRouter } from 'vue-router';
import Navbar from '@/components/Navbar.vue';

const router = useRouter();

defineOptions({
    name: 'scheduler',
});

const goToCreateShifts = () => {
    router.push('./create-shifts');
};

// Data for storing shifts
const shifts = ref([]);

// Fetch shifts from the API
const fetchShifts = async () => {
  try {
    const response = await axios.get('https://localhost:32773/shifts/get', {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Shifts fetched successfully:", response.data);
    shifts.value = response.data.map(shift => ({
      ...shift,
      day: new Date(shift.shiftPeriod.start).getDay(), // Calculate the day of the week
      start_time: new Date(shift.shiftPeriod.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      end_time: new Date(shift.shiftPeriod.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      duration: Math.round((new Date(shift.shiftPeriod.end).getTime() - new Date(shift.shiftPeriod.start).getTime()) / 3600000), // Calculate duration in hours
      assignedEmployeeName: shift.assignedEmployee 
        ? `${shift.assignedEmployee.firstName} ${shift.assignedEmployee.lastName}`
        : "Unassigned",
    }));
  } catch (error) {
    console.error("Error fetching shifts:", error);
  }
};

// Fetch shifts when the component is mounted
onMounted(() => {
  fetchShifts();
});



</script>



<template>
    <Navbar></Navbar>
    <div id = 'scheduler'>
        
        <div style="text-align: center; font-size: 18px; margin-top: 10px">Options</div>
        <div id = 'filters'>
            
                <div id="filter-options">
                    <select id="options" v-model="selectedOption">
                        <option v-for="option in options" :key="option" :value="option" id="">
                            {{ option }}
                        </option>
                    </select>
                </div>
                <div id="filter-options">
                    <select id="options" v-model="defaultEmployee">
                        <option v-for="option in employees" :key="option" :value="option" id="">
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
                <div id="shift-list-scroll">
  <div
    v-for="(shift, index) in shifts"
    :key="index"
    class="shift-item"
    :style="{ borderColor: shift.color }"
  >
    <div class="shift-day">{{ shift.day }}</div>
    <div class="shift-location">{{ shift.location }}</div>
    <div class="shift-time">{{ shift.start_time }} - {{ shift.end_time }}</div>
    <button class="btn btn-secondary dropdown-toggle" type="button">
      Options
    </button>
  </div>
</div>

                
            </div>
            <div id="schedule-container">
                <div id="schedule-time">
                    <div>7 AM </div>
                    <div>8 AM </div>
                    <div>9 AM</div>
                    <div>10 AM</div>
                    <div>11 AM</div>
                    <div>12 PM</div>
                    <div>1 PM</div>
                    <div>2 PM</div>
                    <div>3 PM</div>
                    <div>4 PM</div>
                    <div>5 PM</div>
                    <div>6 PM</div>
                    <div>7 PM</div>
                    <div>8 PM</div>
                    <div>9 PM</div>
                    <div>10 PM</div>
                    <div>11 PM</div>
                    <div>12 AM</div>
                    <div>1 AM</div>
                    <div>2 AM</div>
                    <div>3 AM</div>
                    <div>4 AM</div>
                    <div>5 AM</div>
                    <div>6 AM</div>                    
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

    /* Styling for filter options */
    #filters {
        display: flex;
        flex-direction: row;
        justify-content: space-around; /* Space out items more evenly */
        align-items: center; /* Center items vertically */
        padding: 15px 20px;
        background-color: #ffffff;
        color: var(--first);
        border-bottom: 2px solid black;
        margin: 4px;
    }

    #filter-options {
        width: 30%; /* Adjusted width for better alignment */
        margin: 5px;
        display: flex;
        justify-content: center; /* Center the dropdown */
        align-items: center; /* Center the content vertically */
    }

    select {
        width: 100%;
        padding: 10px;
        font-size: 16px;
        border: 1px solid var(--text1);
        border-radius: 5px;
        background-color: var(--background);
        color: var(--text1);
        cursor: pointer;
    }

    select:focus {
        border-color: var(--first);
        outline: none;
    }

    /* Styling for shift list info */
    #shift-list-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 0 10px;
        box-sizing: border-box;
        color: var(--first);
    }

    #Shift-list-scroll {
        overflow-y: auto;
        width: 90%;
        height: 100%;
    }

    #Shift-list-title {
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--text1);
        font-size: 50px;
        width: 60%;
        border-bottom: 5px solid var(--first);
    }

    /* Styling for split screen */
    #split-screen-container {
        display: flex;
        border: 5px;
        width: 100%;
        height: 100%;
    }

    #shift-list-container {
        width: 33%;
        flex: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 5px;
        border: 5px;
    }

    #schedule-container {
        display: flex;
        flex-direction: column;
        width: 100vw;
        min-height: 80px;
        flex: 4;
        margin-right: 10px;
        border-left: 2px solid var(--text2);
        padding-top: 0;
        overflow-x: auto;
    }

    #schedule-time {
        display: flex;
        justify-content: space-between;
        white-space: nowrap;
        padding-left: 50px;
        width: 100vw;
    }

    #schedule-day {
        display: flex;
        flex-direction: row;
        border-bottom: 2px solid var(--text2);
        align-items: center;
        justify-content: space-between;
        height: 100%;
        width: 100vw;
        min-height: 60px;
    }

    /* General styling for the scheduler */
    #scheduler {
        color: var(--text1);
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100vh;
        font-family: "Poppins";
    }

    /* Navbar and other containers */
    #nav-items {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 150px;
    }

    p {
        font-family: "Poppins";
    }
</style>
