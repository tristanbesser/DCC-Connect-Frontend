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
    const shifts = ref<shift[]>([]);
    const employees = ref<employee[]>([]);
    const selectedLocation = ref('');
    const selectedEmployee = ref('');
    const locations = ref<{ id: string, streetAddress: string }[]>([]);

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const getDayStyle = (day: string) => {
        if (day === "Sunday") {
            return { paddingLeft: "10px" }; // Add extra padding to Sunday
        }
        return {}; // Otherwise no extra
    };

    // Fetch employee details by employee ID
    const fetchEmployee = async (employeeID: string) => {
        try {
            const response = await axios.get(`employees/get/${employeeID}`, {
                headers: { "Content-Type": "application/json" },
            });
            return response.data;
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

    const fetchShifts = async () => {
        try {
            const response = await axios.get('shifts/get', {
                headers: { "Content-Type": "application/json" },
            });

            const updatedShifts = await Promise.all(response.data.map(async (shift: shift) => {
                const employee = shift.employeeID ? await fetchEmployee(shift.employeeID) : null;
                const assignedEmployeeName = employee
                    ? `${employee.firstName} ${employee.lastName}`
                    : "Unassigned";

                const startDate = new Date(shift.shiftPeriod.start);
                const formattedDate = format(startDate, 'MM/dd');
                const dayOfWeek = daysOfWeek[startDate.getDay()];

                const location = locations.value.find(loc => loc.id === shift.location)?.streetAddress || "Unknown location";

                return {
                    ...shift,
                    day: `${dayOfWeek}, ${formattedDate}`,
                    start_time: new Date(shift.shiftPeriod.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    end_time: new Date(shift.shiftPeriod.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    assignedEmployeeName,
                    location
                };
            }));

            const uniqueEmployees = updatedShifts.reduce((acc, shift) => {
                if (!acc.some((emp: employee) => emp.id === shift.employeeID)) {
                    acc.push({ id: shift.employeeID, name: shift.assignedEmployeeName });
                }
                return acc;
            }, []);

            employees.value = uniqueEmployees;
            shifts.value = updatedShifts;
        } catch (error) {
            console.error("Error fetching shifts:", error);
        }
    };

    const fetchLocations = async () => {
        try {
            const response = await axios.get('location/get', {
                headers: { "Content-Type": "application/json" },
            });
            locations.value = response.data.map((location: any) => ({
                id: location.id,
                streetAddress: location.streetAddress.streetAddress
            }));

            if (locations.value.length > 0) {
                selectedLocation.value = locations.value[0].streetAddress;
            }
        } catch (error) {
            console.error("Error fetching locations:", error);
        }
    };

    onMounted(() => {
        fetchShifts();
        fetchLocations();
    });

    const filteredShifts = computed(() => {
        let filtered = shifts.value;
        if (selectedLocation.value) {
            filtered = filtered.filter(shift => shift.location === selectedLocation.value);
        }
        if (selectedEmployee.value) {
            filtered = filtered.filter(shift => shift.employeeID === selectedEmployee.value);
        }
        return filtered;
    });

    const formatHour = (hour) => {
        const ampm = hour < 12 ? "AM" : "PM";
        const formattedHour = hour % 12 || 12;
        return `${formattedHour} ${ampm}`;
    };

    const getShiftColor = (shift: shift) => {
        return shift.assignedEmployeeName === "Unassigned" ? "#FF6347" : "#32CD32";
    };

    const getRandomColor = () => {
        const r = Math.floor(Math.random() * 128); // Random value from 0 to 127 (darker range)
        const g = Math.floor(Math.random() * 128);
        const b = Math.floor(Math.random() * 128);

        return `rgb(${r}, ${g}, ${b})`;
    };

    function getNextDay(date) {
        const nextDay = new Date(date); // Clone the original date
        nextDay.setDate(date.getDate() + 1); // Add one day
        return nextDay.getDay(); // Get the next day of the week
    }

    const computeShiftStyle = (shift) => {
        const startDate = new Date(shift.shiftPeriod.start);
        const endDate = new Date(shift.shiftPeriod.end);

        const shifts = [];
        shifts.push(shift);

        const totalMinutesInDay = 1440;  // Total minutes in a day (24 hours * 60 minutes)

        return shifts.map((s, index) => {
            const startMinutes = new Date(s.shiftPeriod.start).getHours() * 60 + new Date(s.shiftPeriod.start).getMinutes();
            let endMinutes = new Date(s.shiftPeriod.end).getHours() * 60 + new Date(s.shiftPeriod.end).getMinutes();

            // If the shift crosses midnight, adjust the end time
            if (endMinutes < startMinutes) {
                endMinutes += totalMinutesInDay;  // Add 1440 minutes to the end time to account for the next day
            }

            const left = (startMinutes / totalMinutesInDay) * 100;  // This controls the horizontal position
            let width = ((endMinutes - startMinutes) / totalMinutesInDay) * 100;  // Controls the width

            // Scale width by a factor of 2 for more noticeable shifts
            width *= 1.2;

            // Ensure there's a minimum width to prevent it from being too small
            width = Math.max(width, 20);  // Minimum width of 20%

            // Adjust for second shift
            let adjustedLeft = left;
            let adjustedWidth = width;

            return {
                left: `${adjustedLeft}%`,  // Horizontal position
                width: `${adjustedWidth}%`,  // Horizontal width (scaled)
                backgroundColor: getRandomColor(),
                position: 'absolute',
                top: '0',  // Align to the top of the container
                bottom: '0',  // Keep shifts within the container
                borderRadius: '5px',
                overflow: 'visible',
                color: '#fff',
                padding: '2px',
                fontSize: '12px',
                textAlign: 'center',
                zIndex: 1,
                start_time: formatTime(new Date(s.shiftPeriod.start)),
                end_time: formatTime(new Date(s.shiftPeriod.end)),
                day: s.day,
            };
        });
    };




    // Example formatTime function (if you don't have one)
    function formatTime(date) {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }



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
                </div>
                <div id="schedule-days">
                    <div v-for="(day, index) in daysOfWeek" :key="index" class="schedule-day" :style="getDayStyle(day)">
                        <div class="day-label">{{ day }}</div>
                        <div class="day-schedule">
                            <div v-for="(shift, index) in filteredShifts.filter(s => s.day.includes(day))"
                                 :key="index"
                                 class="shift-block"
                                 :style="computeShiftStyle(shift)">
                                <div>{{ shift.assignedEmployeeName }}</div>
                                <div>{{ shift.start_time }} - {{ shift.end_time }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    #filters {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
    }

    #shifts-section {
        margin-top: 20px;
    }

    .shift-item {
        margin-bottom: 15px;
        padding: 10px;
        background-color: #f9f9f9;
        border-radius: 5px;
    }

    .shift-time {
        font-weight: bold;
    }

    .shift-employee,
    .shift-location {
        margin-top: 5px;
    }

    #create-shift-btn {
        padding: 10px 15px;
        background-color: #007bff;
        color: white;
        border: none;
        cursor: pointer;
    }

        #create-shift-btn:hover {
            background-color: #0056b3;
        }

    #schedule-container {
        display: flex;
        flex-direction: row;
        margin-top: 40px;
    }

    #schedule-time {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 20px;
    }

    .time-label {
        font-weight: bold;
        text-align: center;
    }

    #schedule-days {
        display: flex;
        flex-direction: row;
        overflow-x: auto;
    }

    .schedule-day {
        position: relative;
        width: 200px;
        margin-right: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between; /* Ensure the items are evenly spaced */
        height: 100%; /* Ensure it fills up the height properly */
    }

        .schedule-day:last-child {
            margin-right: 0;
        }


    .day-label {
        text-align: center;
        font-weight: bold;
        margin-bottom: 5px;
    }

    .day-schedule {
        position: relative;
        width: 100%;
        height: 80vh;
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 10px;
        background-color: #f9f9f9;
        overflow: visible;
        box-sizing: border-box;
    }


    .shift-block {
        position: absolute;
        border-radius: 5px;
        color: white;
        padding: 5px;
        font-size: 12px;
        text-align: center;
        border: 2px solid black;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        transition: background-color 0.3s ease, box-shadow 0.3s ease; /* Smooth transition effects */
    }

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

    .schedule-day {
        position: relative;
        width: 200px;
        margin-right: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between; /* Ensure the items are evenly spaced */
        height: 100%; /* Ensure it fills up the height properly */
    }

        .schedule-day:last-child {
            margin-right: 0;
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
