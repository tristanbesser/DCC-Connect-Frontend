<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import axios from '../config/axios.js';

import type Shift from "@/models/shift.js";
import { CoverageOptions, coverageTypeToString } from "@/models/coverageRequests/coverageOptions.js"
import type CoverageRequest from '@/models/coverageRequests/coverageRequest.js';
import type CoverageRequestQueryParams from '@/models/coverageRequests/coverageRequestQueryParams.js';
import { formatAddress, type Address } from '@/models/address.js';
import type User from '@/models/user.js';
import type Location from '@/models/location.js';
import type CoverageRequestDetail from '@/models/coverageRequests/CoverageRequestDetail.js';
import type ShiftLocation from '@/models/shiftLocation.js';

const router = useRouter();


defineOptions({
  name: 'time-off',
});
const API_URL = "https://localhost:32769/";
const COVERAGE_OPTIONS = CoverageOptions;

// State variables
const TRADES_AND_PICKUPS = "Trades & Pickups"
const MY_COVERAGE = "My Coverage Requests"
const MY_TIME_OFF="My Time Off"
const activeUser = ref<User>();
const myCoverageRequests = ref<CoverageRequestDetail[]>([]);
const otherEmployeesCoverageRequests = ref<CoverageRequestDetail[]>([]);
const myTimeOffRequests = ref([]);
const fetchActiveUser = async () => {
  try {
    const response = await axios.get(`${API_URL}user/signedin`, { withCredentials: true });
    activeUser.value = response.data;
    console.log
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching active user:', error);
    //Consider redirecting to sign in page on 401 here
  }
};
const fetchTimeOff = async () => {
  try {
    const response = await axios.get(`${API_URL}timeoff/get`, { withCredentials: true });
    myTimeOffRequests.value = response.data;
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching time off:', error);
    //Consider redirecting to sign in page on 401 here
  }
};
const fetchCoverageRequests = async (params: CoverageRequestQueryParams, target: any) => {
  try {
    const response = await axios.get(`${API_URL}coverage/get/detailed`, {
      withCredentials: true,
      params: params,
    });
    target.value = response.data;
    console.log(response.data)
  } catch (error) {
    console.error('Error fetching coverage requests:', error);
  }
};

onMounted(async () => {
  console.log("mount")
  await fetchActiveUser();
  let startDate = new Date(Date.now());
  let endDate = new Date(startDate.getDay() + 31);
  fetchCoverageRequests({ employeeID: activeUser.value?.id, startAvailability: startDate, endAvailability: endDate }, myCoverageRequests);
  console.log(myCoverageRequests)
  fetchCoverageRequests({ requiredRole: activeUser.value?.employeeRole }, otherEmployeesCoverageRequests);
  console.log(otherEmployeesCoverageRequests.value)
  fetchTimeOff()
});

const goToRequest = () => {
  router.push('./request');
};

const request_type = ref([MY_COVERAGE,MY_TIME_OFF, 'Available shifts', TRADES_AND_PICKUPS]);
const selectedType = ref(MY_COVERAGE);
const currentDate = new Date();
type LocationDictionary = {
  [key: string]: {
    streetAddress: Address;
    patientName?: string | null;
  };
}
const locationsToDict = (shiftLocations: ShiftLocation[]) => {
  const reducer = (accumulator: LocationDictionary, location: ShiftLocation) => { const { id, ...rest } = location; accumulator[id] = rest; return accumulator; }
  return shiftLocations.reduce(reducer, {});
}
const locations = ref<LocationDictionary>({})
const shifts = ref([]);
const requests = ref([]);
/*Populate this to the result of this request.
axios.get(apiurl3+"coverage/get",{
  params:
  {
    employeeID:"POPULATE THIS BASED ON ACTIVE"
    }
    })*/
const shiftTrades = ref([]);
const availableShifts = ref([]);
const offers = ref([]);
const takeShift = (offer) => {
  // Find the index of the offer in the array
  const index = availableShifts.value.findIndex(o => o === offer);
  console.log(offer.id)
  axios.post(API_URL + "/employees/pickup", {
    openShiftID: offer.id,
    employeeID: "POPULATE THIS WITH THE ID OF THE WORKING EMPLOYEE"
  }).then(response => {
    if (index !== -1) {
      availableShifts.value.splice(index, 1);
    }
    alert("Successfully took shift.")
  }).catch(error => {
    console.log(index)
    console.log(error)
    alert("Failed to pick up shift.")
  })
  // Remove the offer if it exists

};

axios.get(API_URL + "shifts/get", {
  params: {
    openShiftsOnly: true
  }
}).then(response => {
  console.log(response.data)
  availableShifts.value = response.data
})
axios.get(API_URL + "location/get", { withCredentials: true }).then((response: { data: ShiftLocation[]; }) => {
  console.log(response.data)
  locations.value = locationsToDict(response.data);
})
function isManagerApprovedToString(isApproved:null|boolean){
  if(isApproved==null){
    return "Awaiting action from manager."
  }
  return isApproved?"Approved":"Denied";
}

function getListStyle(request) {
  const requestStartDate = new Date(request.start_date); // Convert start_date to a Date object
  if (requestStartDate < currentDate) {
    return {
      width: `95%`,
      minHeight: '60px',
      backgroundColor: 'var(--background)', // Apply the current color for the background
      color: 'var(--text1)',         // Text color
      display: 'flex',               // Center content
      justifyContent: 'center',      // Horizontally center
      alignItems: 'center',          // Vertically center
      borderRadius: '10px',          // Rounded corners
      margin: '2px',                 // Add spacing
      justifyContent: 'space-between',
      padding: '5px',
    };
  } else {
    return {
      display: 'none',
    };
  }
}

function getOfferStyle(request) {
  if (request.owner == 'self') {
    return {
      width: `95%`,
      minHeight: '60px',
      backgroundColor: 'var(--background)', // Apply the current color for the background
      color: 'var(--text1)',         // Text color
      display: 'flex',               // Center content
      justifyContent: 'center',      // Horizontally center
      alignItems: 'center',          // Vertically center
      borderRadius: '10px',          // Rounded corners
      margin: '2px',                 // Add spacing
      justifyContent: 'space-between',
      padding: '5px',
    };
  } else {
    return {
      display: 'none',
    };
  }
}
function getOtherOfferedStyle(request) {
  if (request.owner != 'self') {
    return {
      width: `95%`,
      minHeight: '60px',
      backgroundColor: 'var(--background)', // Apply the current color for the background
      color: 'var(--text1)',         // Text color
      display: 'flex',               // Center content
      justifyContent: 'center',      // Horizontally center
      alignItems: 'center',          // Vertically center
      borderRadius: '10px',          // Rounded corners
      margin: '2px',                 // Add spacing
      justifyContent: 'space-between',
      padding: '5px',
    };
  } else {
    return {
      display: 'none',
    };
  }
}
</script>

<template>
  <Navbar></Navbar>

  <div id="filters">
    <h1>Schedule Change Requests</h1>
    <div id="request">
      <button @click="goToRequest">Make a Request...</button>
    </div>
    <!-- Row of clickable options -->
    <div id="options">
      <div v-for="option in request_type" :key="option" :class="['option-item', { selected: selectedType === option }]"
        @click="selectedType = option">
        {{ option }}
      </div>
    </div>

  </div>
  <div v-if="selectedType == MY_TIME_OFF ">
    <div v-if="myTimeOffRequests.length === 0"
      style="text-align: center; font-size: 24px; font-weight: bold; padding: 20px;">
      No time off requests.
    </div>
    <!-- This block displays our time off requests -->
    <div v-for="(request, index) in myTimeOffRequests" :key="index" >
      <div>Time off request for: {{ new Date(request.timeOffTimeSpan.start).toLocaleDateString() }} - {{ new Date(request.timeOffTimeSpan.end).toLocaleDateString() }}</div>
      <div style="display: block;"><p> <b>Status:</b> {{ isManagerApprovedToString(request.isManagerApproved) }}</p></div>
    </div>
  </div>
  <div v-if="selectedType == MY_COVERAGE">
    <div>
      <label>Status:</label>
      <select style="margin-left: 15px;">
        <option value="open">Open</option>
        <option value="closed">Closed</option>
      </select>
    </div>
    <div v-if="myCoverageRequests.length === 0"
      style="text-align: center; font-size: 24px; font-weight: bold; padding: 20px;">
      No active requests.
    </div>
    <div v-for="(request, index) in myCoverageRequests" :key="index" :style="getOtherOfferedStyle(request)">
      <div style="width: 300px;">{{ formatAddress(locations[request.shift.location].streetAddress) }}</div>
      <div>{{ request.shift.shiftPeriod.start }} </div>
      <div>{{ request.shift.shiftPeriod.end }}</div>
      <div>{{ coverageTypeToString(request.coverageRequest.coverageType) }}</div>

      <button @click="takeShift(request)">Take Shift</button>
    </div>
  </div>
  <div v-if="selectedType == 'Available shifts'">
    <div v-for="(request, index) in availableShifts" :key="index" :style="getOtherOfferedStyle(request)">
      <div style="width: 300px;">{{ formatAddress(locations[request.location].streetAddress) }}</div>
      <div>{{ request.shiftPeriod.start }} </div>
      <div>{{ request.shiftPeriod.end }}</div>
      <button @click="takeShift(request)">Take Shift</button>
    </div>
  </div>
  <div v-if="selectedType == TRADES_AND_PICKUPS">
    <div v-if="otherEmployeesCoverageRequests.length === 0"
      style="text-align: center; font-size: 24px; font-weight: bold; padding: 20px;">
      No trades or pickups available.
    </div>
    <!-- <div v-if="otherEmployeesCoverageRequests.length === 0" style="text-align: center; font-size: 18px; ; padding: 20px;">
      <select>
        <option value="both"> Pickups and Trades</option>
        <option value="pickups"> Pickups Only</option>
        <option value="trades"> Trades On </option>
      </select>
    </div> -->
    <div v-for="(request, index) in otherEmployeesCoverageRequests" :key="index" :style="getOtherOfferedStyle(request)">
      <div style="width: 300px;">{{ formatAddress(locations[request.shift.location].streetAddress) }}</div>
      <div>{{ request.shift.shiftPeriod.start }} </div>
      <div>{{ request.shift.shiftPeriod.end }}</div>
      <div>{{ coverageTypeToString(request.coverageRequest.coverageType) }}</div>
      <button @click="takeShift(request)">Take Shift</button>
    </div>
  </div>


</template>

<style scoped>
#filters {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* Center items vertically */
  padding: 15px 20px;
  background-color: var(--background);
  color: #4f4f4f;
  border-bottom: 2px solid var(--text2);
}

#options {
  display: flex;
  justify-content: center;
  gap: 20px;
  /* Add space between items */
  margin-top: 20px;
}

#card {
  height: 150px;
  width: 90%;
  background-color: var(--third);
  color: var(--text);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;


}

.option-item {
  padding: 10px;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.3s ease-in-out;
}

.option-item:hover {
  text-decoration: underline;
}

.option-item.selected {
  font-weight: bold;
  text-decoration: underline;
  /* Underline the selected option */
}

#request {
  margin-top: 20px;
}

#request button {
  padding: 10px 20px;
  background-color: var(--first);
  color: var(--background);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
}

#request button:hover {
  background-color: var(--second);
  color: var(--text2);
}
</style>
