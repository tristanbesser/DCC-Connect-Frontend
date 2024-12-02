<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import axios from '../config/axios.js';
import { useRouter } from 'vue-router';
import { format } from 'date-fns';
import Navbar from '@/components/Navbar.vue';

const router = useRouter();

defineOptions({
  name: 'scheduler',
});

// Navigation function to create shifts page
const goToCreateShifts = () => {
  router.push('./create-shifts');
};

// Data for storing shifts, employees, and selected filters
const shifts = ref<shift[]>([]); // Reactive array for holding shift objects
const employees = ref<employee[]>([]); // Will store employee details in an array
const selectedLocation = ref(''); // For storing selected location from dropdown
const selectedEmployee = ref(''); // For storing selected employee from dropdown
const locations = ref<{ id: string, streetAddress: string }[]>([]); // Store locations with ID and address

// Days of the week for mapping
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Fetch employee details by employee ID
const fetchEmployee = async (employeeID: string) => {
  try {
    const response = await axios.get(`https://localhost:32770/employees/get/${employeeID}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // Assume the API returns employee details
  } catch (error) {
    console.error(`Error fetching employee ${employeeID}:`, error);
    return null;
  }
};

interface shiftPeriod {
  start: number;
  end: number;
}

interface shift {
  employeeID: string;
  shiftPeriod: shiftPeriod;
  location: string;
  color: string;
  assignedEmployeeName: string;
  day: string;
  start_time: number;
  end_time: number;
}

interface employee {
  name: string;
  id: number;
}

// Fetch shifts from the API
const fetchShifts = async () => {
  try {
    const response = await axios.get('https://localhost:32770/shifts/get', {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Shifts fetched successfully:", response.data);
    
    const updatedShifts = await Promise.all(response.data.map(async (shift: shift) => {
      const employee = shift.employeeID ? await fetchEmployee(shift.employeeID) : null;
      const assignedEmployeeName = employee
        ? `${employee.firstName} ${employee.lastName}`
        : "Unassigned";

      const startDate = new Date(shift.shiftPeriod.start);
      const formattedDate = format(startDate, 'MM/dd'); // Format date as 'MM/dd'
      const dayOfWeek = daysOfWeek[startDate.getDay()]; // Get the day of the week

      // Convert location ID to streetAddress
      const location = locations.value.find(loc => loc.id === shift.location)?.streetAddress || "Unknown location";

      return {
        ...shift,
        day: `${dayOfWeek}, ${formattedDate}`, // Combine the day of the week and the date
        start_time: new Date(shift.shiftPeriod.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        end_time: new Date(shift.shiftPeriod.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        duration: Math.round((new Date(shift.shiftPeriod.end).getTime() - new Date(shift.shiftPeriod.start).getTime()) / 3600000),
        assignedEmployeeName,
        employeeID: shift.employeeID, // Keep employeeID for filtering
        location // Use the converted streetAddress
      };
    }));

    // Use a Set to filter out duplicate employees
    const uniqueEmployees = updatedShifts.reduce((acc, shift) => {
      if (!acc.some((emp: employee) => emp.id === shift.employeeID)) {
        acc.push({ id: shift.employeeID, name: shift.assignedEmployeeName });
      }
      return acc;
    }, []); 

    employees.value = uniqueEmployees; // Only unique employees

    shifts.value = updatedShifts;
  } catch (error) {
    console.error("Error fetching shifts:", error);
  }
};

// Fetch locations from the API
const fetchLocations = async () => {
  try {
    const response = await axios.get('https://localhost:32770/location/get', {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Locations fetched successfully:", response.data);
    locations.value = response.data.map((location: any) => ({
      id: location.id,
      streetAddress: location.streetAddress.streetAddress
    }));

    // Set the selected location to the first available location
    if (locations.value.length > 0) {
      selectedLocation.value = locations.value[0].streetAddress;
    }
  } catch (error) {
    console.error("Error fetching locations:", error);
  }
};

// Fetch shifts and locations when the component is mounted
onMounted(() => {
  fetchShifts();
  fetchLocations();
});

// Computed property to filter shifts by location and employee
const filteredShifts = computed(() => {
  let filtered = shifts.value;

  // Filter by location
  if (selectedLocation.value) {
    filtered = filtered.filter(shift => shift.location === selectedLocation.value);
  }

  // Filter by employee
  if (selectedEmployee.value) {
    filtered = filtered.filter(shift => shift.employeeID === selectedEmployee.value);
  }

  return filtered;
});
</script>

<template>
  <Navbar></Navbar>
  <div id='scheduler'>
    <div style="text-align: center; font-size: 18px; margin-top: 10px;">Options</div>
    <div id='filters'>
      <div id="filter-options">
        <!-- Location Dropdown -->
        <select id="location" v-model="selectedLocation">
          <option v-for="location in locations" :key="location.id" :value="location.streetAddress">
            {{ location.streetAddress }}
          </option>
        </select>
      </div>

      <!-- Employee Dropdown -->
      <div id="filter-options">
        <select id="employee" v-model="selectedEmployee">
          <option value="">All Employees</option>
          <option v-for="employee in employees" :key="employee.id" :value="employee.id">
            {{ employee.name }}
          </option>
        </select>
      </div>

      <!-- Create Shift Button -->
      <div id="filter-options">
        <button class="create-shift-btn" @click="goToCreateShifts">
          Create Shifts
        </button>
      </div>
    </div>

    <div id="split-screen-container">
      <div id="shift-list-container">
        <h1 id="shift-list-title">Shifts</h1>
        <div id="shift-list-scroll">
          <!-- Display Filtered Shifts -->
          <div v-for="(shift, index) in filteredShifts" :key="index" class="shift-card" :style="{ borderColor: shift.color }">
            <div class="shift-card-header">
              <div class="shift-location">{{ shift.location }}</div>
              <div class="shift-day">{{ shift.day }}</div>
            </div>

            <div class="shift-card-body">
              <div class="shift-time">{{ shift.start_time }} - {{ shift.end_time }}</div>
              <div class="shift-employee">Assigned to: {{ shift.assignedEmployeeName }}</div>
            </div>

            <div class="shift-card-footer">
              <button style="color: white; background-color: ;">Offer Shift</button>
            </div>
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
    background-color: #1F4691;
    border: none;
    justify-content: center;
    align-items: center;
    width: 100%;
    border-radius: 15px;
    color: #f0f0f0;
    padding: 10px 50px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    font-family: 'Poppins';
    cursor: pointer;
  }

  .create-shift-btn:hover {
    background-color: #17346d;
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

    #shift-list-scroll {
        display: flex;
        flex-direction: column;
        gap: 15px; /* Add space between cards */
        padding: 10px;
        max-height: 80vh; /* Add scrolling if the list gets too long */
        overflow-y: auto;
        align-items: center;
    }

    .shift-card {
  display: flex;
  flex-direction: row; /* Arrange items in a row */
  justify-content: space-between; /* Space out elements */
  align-items: center; /* Vertically align items */
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%; /* Ensure the card stretches to the full width of its container */
  margin-bottom: 16px; /* Space between cards */
  gap: 15px;
}

.shift-card-header {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.shift-card-body,
.shift-card-footer {
  display: flex;
  flex-direction: column; /* Keep each section vertically aligned */
  justify-content: space-between;
  align-items: flex-start;
}

.shift-card-header {
  width: 20%; /* Adjust width of the header section */
}

.shift-card-body {
  width: 50%; /* Adjust width of the body section */
  align-items: center;
}

.shift-card-footer {
  display: flex;
  justify-content: flex-end; /* Align "Options" button to the right */
  width: 30%; /* Adjust footer section width */
  align-items: center; /* Vertically center the options button */
}

.shift-day,
.shift-location,
.shift-time,
.shift-employee {
  margin-bottom: 8px; /* Uniform margin for inner text */
}

.shift-card-footer button {
  padding: 8px 12px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.shift-card-footer button:hover {
  background-color: #e0e0e0;
}



</style>
