<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '@/components/Navbar.vue';

const router = useRouter();

defineOptions({
    name: 'create-shift',
});

// Shift Class
class Shift {
    constructor(start_time, day, location, duration) {
        this.start_time = start_time;
        this.day = day;
        this.location = location;
        this.duration = duration;
    }
}

// Form fields for creating a shift
const startTime = ref('');
const day = ref('');
const location = ref('');
const duration = ref(0);
const locations = ref(['Location 1', 'Location 2', 'Location 3', 'Show All']);

const employees = ref(['Johnson Meijers', 'John Smits', 'Goku', 'Chris']); // Temp list
const defaultEmployee = ref(employees.value[0]);

const handleSubmit = () => {
    const newShift = new Shift(
        startTime.value,
        day.value,
        location.value,
        parseInt(duration.value, 10)
    );

    console.log('Created Shift:', newShift);

    router.push('./scheduler'); // Navigate after creation
};
</script>


<template>
    <Navbar></Navbar>
    <div id="create-shift-container">
        
        <h1 id="page-title">Create a Shift</h1>

        <div id="form-container">

            <div class="form-group">
                <label for="endDate">Date:</label>
                <input type="date" id="endDate" v-model="endDate" />
            </div>

            <div class="form-group">
                <label for="startTime">Time:</label>
                <input type="time" id="startTime" v-model="startTime" />
            </div>

            

            <div class="form-group">
                <label for="location">Location:</label>
                <select id="location" v-model="location">
                    <option v-for="loc in locations" :key="loc" :value="loc">
                        {{ loc }}
                    </option>
                </select>
            </div>

            <div class="form-group">
                <label for="duration">Duration (hours):</label>
                <input
                    type="number"
                    id="duration"
                    v-model="duration"
                    placeholder="Enter duration in hours"
                    min="1"
                />
            </div>

            <div class="form-group">
                <label for="employee">Employee:</label>
                <select id="employee" v-model="defaultEmployee">
                    <option v-for="employee in employees" :key="employee" :value="employee">
                        {{ employee }}
                    </option>
                </select>
            </div>

            <div id="submit-button-container">
                <button @click="handleSubmit" class="action-button">Submit</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Page container */
#create-shift-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--text1);
}

/* Page title */
#page-title {
    font-size: 32px;
    font-weight: bold;
    text-align: center;
    color: var(--text1);
    margin-bottom: 20px;
    border-bottom: 4px solid var(--first);
    padding-bottom: 10px;
    width: 60%;
}

/* Form container */
#form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60%;
    margin: 20px auto;
    background-color: var(--background);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

/* Form groups */
.form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    width: 100%;
}

label {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
    color: var(--text2);
}

input,
select {
    padding: 10px;
    font-size: 14px;
    border: 1px solid var(--text2);
    border-radius: 5px;
    width: 100%;
}

/* Submit button container */
#submit-button-container {
    margin-top: 20px;
    width: 100%;
}

/* Action button */
.action-button {
    width: 100%;
    padding: 10px 20px;
    background-color: var(--second);
    color: var(--text1);
    border: none;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    text-align: center;
}

.action-button:hover {
    background-color: var(--first);
    color: var(--background);
}
</style>
