<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import axios from '../config/axios.js';

// Reactive data
const employees = ref([]); // Array to store employee data
const shift = ref({
  id: "",
  location: "",
  shiftPeriod: {
    start: "",
    end: "",
  },
  requiredRole: "",  // This will hold the role for the shift
});

const apiurl3 = "https://localhost:32775/employees/get"

// Method to fetch employees
const getEmployees = async () => {
  try {
    const response = await axios.get(apiurl3, {}, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Employee data fetched:", response.data);
    employees.value = response.data; // Assuming the response is an array of employee objects
  } catch (error) {
    console.error("Error fetching employee data:", error);
  }
};

// Call getEmployees when the component is mounted
onMounted(() => {
  getEmployees();
});

// Handle employee selection and update the shift object
const handleEmployeeSelect = (employeeID: string) => {
  const selectedEmployee = employees.value.find(emp => emp.id.timestamp === employeeID || emp.id === employeeID);
  if (selectedEmployee) {
    shift.value.requiredRole = selectedEmployee.role || selectedEmployee.employeeRole || "Unknown"; // Set role based on the employee data
  }
};

const apiurl = "https://localhost:32775/shifts/create";
const apiurl2 = "https://localhost:32775/shifts/assign";

// Create and assign a shift
const handleCreateAndAssignShift = async () => {
  try {
    // Step 1: Create the shift
    const createResponse = await axios.post(apiurl, {
      location: shift.value.location,
      shiftPeriod: {
        start: new Date(shift.value.shiftPeriod.start).toISOString(),
        end: new Date(shift.value.shiftPeriod.end).toISOString(),
      },
      requiredRole: shift.value.requiredRole,  // Include the role in the request
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Shift created successfully:", createResponse.data);

    // Extract the created shift ID
    const createdShiftId = createResponse.data.id; // Adjust key as per your API response
    if (!createdShiftId) {
      throw new Error("Shift creation failed: No shift ID returned.");
    }

    // Step 2: Assign the shift to the selected employee
    const assignResponse = await axios.put(apiurl2, {
      shiftIDString: createdShiftId,
      employeeIDString: shift.value.employeeID,
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Shift assigned successfully:", assignResponse.data);

  } catch (error) {
    console.error("Error in creating or assigning shift:", error);
    alert("Failed to create or assign shift. Check the console for details.");
  }
};
</script>



<template>
  <Navbar></Navbar>
  <div id="create-shift-container">
    <h1 id="page-title">Create a Shift</h1>

    <div id="form-container">
      <!-- Form for creating a shift -->
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
        <label for="employee">Employee:</label>
        <select v-model="shift.employeeID" id="employee" @change="handleEmployeeSelect(shift.employeeID)" required>
          <option value="" disabled>Select Employee</option>
          <!-- Ensure you match the employee structure -->
          <option v-for="employee in employees" 
                  :key="employee.id.timestamp || employee.id" 
                  :value="employee.id.timestamp || employee.id">
            {{ employee.firstName }} {{ employee.lastName }}
          </option>
        </select>
      </div>

      <div id="submit-button-container">
        <button @click.prevent="handleCreateAndAssignShift" class="action-button">Create and Assign</button>
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
