<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import axios from '../config/axios.js';

const router = useRouter();

defineOptions({
  name: 'create-shift',
});

// Form fields for creating a shift
const shift = ref({
  id: {}, // Will store the ObjectId
  location: "",
  shiftPeriod: {
    start: "",
    end: "",
  },
  requiredRole: "",
  employeeID: {},
});

const employees = ref([]);

// Utility function to convert an id object to a MongoDB ObjectId string
const convertIdToObjectId = (id: any): string | null => {
  if (id && id.timestamp && id.machine && id.increment) {
    return `${id.timestamp.toString(16)}${id.machine.toString(16)}${id.increment.toString(16)}`;
  }
  return null; // Return null if transformation isn't possible
};

// Fetch employees from the backend
const getEmployees = async () => {
  try {
    const response = await axios.post('/employees/get', {}, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    employees.value = response.data; // Assuming the response is an array of employees
  } catch (error) {
    console.error("Error fetching employee data:", error);
  }
};

getEmployees();

// Watcher to update role and id when employeeID changes
const setRequiredRole = () => {
  const employee = employees.value.find(emp => emp.id.timestamp === shift.value.employeeID);

  if (employee) {
    // Log to confirm employee is found
    console.log("Matched Employee:", employee);

    // Transform `id` to ObjectId and assign requiredRole
    shift.value.employeeID = employee.id.timestamp;
    shift.value.requiredRole = employee.employeeRole || employee.role || ""; // Fallback if key differs

    // Log the assigned role
    console.log("Assigned Role:", shift.value.requiredRole);
  } else {
    console.error("No matching employee found for ID:", shift.value.employeeID);
  }
};


watch(() => shift.value.employeeID, setRequiredRole, { immediate: true });

// Submit the shift details to the backend
const submitShift = async () => {
  const startDateTime = new Date(shift.value.shiftPeriod.start).toISOString();
  const endDateTime = new Date(shift.value.shiftPeriod.end).toISOString();

  // Transform employeeID
  const transformedEmployeeID = convertIdToObjectId(shift.value.employeeID);
  if (!transformedEmployeeID) {
    console.error("Invalid employeeID:", shift.value.employeeID);
    return; // Stop execution if the employeeID transformation fails
  }

  // Transform id if required
  const transformedId = convertIdToObjectId(shift.value.id);

  // Construct the request body
  const requestBody = {
    id: transformedId || {}, // Use the transformed ID or an empty object
    location: shift.value.location,
    employeeID: transformedEmployeeID, // Use the transformed employeeID
    requiredRole: shift.value.requiredRole,
    shiftPeriod: {
      start: startDateTime,
      end: endDateTime,
    },
  };

  console.log("Request Body:", JSON.stringify(requestBody, null, 2));

  const apiurl = "https://localhost:32782/shifts/create";

  try {
    const response = await axios.put(apiurl, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Shift created successfully:", response.data);
  } catch (error) {
    console.error("Error creating shift:", error);
    if (error.response) {
      console.error("Response:", error.response.data);
    }
  }
};
</script>



<template>
    <Navbar></Navbar>
    <div id="create-shift-container">
        
        <h1 id="page-title">Create a Shift</h1>

        <div id="form-container">
            <div class="form-group">
                <label for="startTime">Start Time:</label>
                <input type="datetime-local" id="startTime" v-model="shift.shiftPeriod.start" />
            </div>

            <div class="form-group">
                <label for="endTime">End Time:</label>
                <input type="datetime-local" id="endTime" v-model="shift.shiftPeriod.end" />
            </div>

            <div class="form-group">
                <label for="location">Location:</label>
                <select id="location" v-model="shift.location" required>
                    <option value="Woodside">Woodside</option>
                    <option value="419 Indiana">419 Indiana</option>
                    <option value="Indiana">Indiana</option>
                    <option value="Ridge">Ridge</option>
                    <option value="State Street">State Street</option>
                    <option value="Dakota">Dakota</option>
                    <option value="Lunn">Lunn</option>
                    <option value="King">King</option>
                    <option value="Bond">Bond</option>
                    <option value="Greenwood">Greenwood</option>
                    <option value="French">French</option>
                    <option value="Morefield">Morefield</option>
                    <option value="Shady">Shady</option>
                </select>
            </div>

            <div class="form-group">
                <div>
                    <label for="employee">Employee:</label>
                        <select v-model="shift.employeeID" id="employee" required>
                            <option value="" disabled>Select Employee</option>
                    <!-- Loop through employees and bind employee ID -->
                            <option v-for="employee in employees" :key="employee.id.timestamp" :value="employee.id.timestamp">
                                {{ employee.firstName }} {{ employee.lastName }}
                            </option>
                        </select>
                </div>
            </div>

            <div id="submit-button-container">
                <button @click="submitShift" class="action-button">Submit</button>
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
