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
const COVERAGE_OPTIONS = CoverageOptions;

// State variables
const TRADES_AND_PICKUPS = "Trades & Pickups"
const MY_COVERAGE = "My Coverage Requests"
const MANAGER_APPROVAL = "Manager Approval"
const activeUser = ref<User>();
const myCoverageRequests = ref<CoverageRequestDetail[]>([]);
const otherEmployeesCoverageRequests = ref<CoverageRequestDetail[]>([]);
const myTimeOffRequests = ref([]);

const fetchActiveUser = async () => {
  try {
    const response = await axios.get('user/signedin', { withCredentials: true });
    activeUser.value = response.data;
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching active user:', error);
    //Consider redirecting to sign in page on 401 here
  }
};
const fetchTimeOff = async () => {
  try {
    const response = await axios.get('timeoff/get', { withCredentials: true });
    myTimeOffRequests.value = response.data;
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching time off:', error);
    //Consider redirecting to sign in page on 401 here
  }
};
const fetchCoverageRequests = async (params: CoverageRequestQueryParams): Promise<CoverageRequestDetail[]> => {
  try {
    const response = await axios.get('coverage/get/detailed', {
      withCredentials: true,
      params: params,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching coverage requests:', error);
    return [];
  }
};

onMounted(async () => {
  console.log("mount");
  await fetchActiveUser();
  let startDate = new Date(Date.now());
  let endDate = new Date(startDate.getDay() + 1000);
  var myCoverage: CoverageRequestDetail[]
  var queryParams:CoverageRequestQueryParams={};
  if(activeUser.value?.employeeRole==="Employee"){
    queryParams={ requiredRole: activeUser.value?.employeeRole }
  }
  // Fetch coverage requests that the active user has requested to cover (these should show in My Coverage Requests)
  fetchCoverageRequests(
    queryParams ,
  ).then(result => {
    myCoverageRequests.value = result.filter(detail => detail.shift.employeeID === activeUser.value?.id)
    otherEmployeesCoverageRequests.value = result.filter(detail => detail.shift.employeeID !== activeUser.value?.id)
  });
  
  fetchTimeOff();
});



const goToRequest = () => {
  router.push('./request');
};

const request_type = ref([MY_COVERAGE, TRADES_AND_PICKUPS]);
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
  axios.put("employees/pickup", {
    openShiftID: offer.id,
    employeeID: activeUser.value?.id
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

axios.get("shifts/get", {
  params: {
    openShiftsOnly: true,
    requiredRole: activeUser.value?.employeeRole
  }
}).then(response => {
  console.log(response.data)
  availableShifts.value = response.data
}).catch((err) => { console.log(err) })
axios.get("location/get", { withCredentials: true }).then((response: { data: ShiftLocation[]; }) => {
  console.log(response.data)
  locations.value = locationsToDict(response.data);
})

function isManagerApprovedToString(isApproved: null | boolean) {
  if (isApproved == null) {
    return "Awaiting action from manager."
  }
  return isApproved ? "Approved" : "Denied";
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
      margin: '5px',                 // Add spacing
      justifyContent: 'space-between',
      padding: '5px',
    };
  } else {
    return {
      display: 'none',
    };
  }
}

// Add this method to format the date and time
function formatDateTime(dateTime: string): string {
  const options = {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  };
  return new Date(dateTime).toLocaleString('en-US', options);
}


</script>


<template>
  <Navbar></Navbar>

  <div id="filters">
    <h1>Schedule Change Requests</h1>
    <!-- Row of clickable options -->
    <div id="options">
      <div v-for="option in request_type" :key="option" :class="['option-item', { selected: selectedType === option }]"
        @click="selectedType = option">
        {{ option }}
      </div>
      <div v-if="activeUser?.employeeRole === 'Manager'" :key="MANAGER_APPROVAL"
        :class="['option-item', { selected: selectedType === MANAGER_APPROVAL }]"
        @click="selectedType = MANAGER_APPROVAL">
        {{ MANAGER_APPROVAL }}
      </div>
    </div>

  </div>
  <!-- Display My Coverage Requests -->
  <div v-if="selectedType == MY_COVERAGE">
    <div id="available-shifts">
      <div class="info-cards" v-if="myCoverageRequests.length === 0"
        style="text-align: center; font-size: 24px; font-weight: bold; padding: 20px;">
        No active requests.
      </div>
      <div class="info-cards" v-for="(request, index) in myCoverageRequests" :key="index"
        :style="getOtherOfferedStyle(request)">
        <div style="width: 300px;">{{ formatAddress(locations[request.shift.location].streetAddress) }}</div>
        <div>{{ new Date(request.shift.shiftPeriod.start).toLocaleDateString() }} </div>
        <div>{{ new Date(request.shift.shiftPeriod.end).toLocaleDateString() }}</div>
        <div>Type:&nbsp;{{ coverageTypeToString(request.coverageRequest.coverageType) }}</div>
      </div>
    </div>
  </div>

  <!-- Display Trades & Pickups -->
  <div v-if="selectedType == TRADES_AND_PICKUPS">
    <div id="available-shifts">
      <div class="info-cards" v-if="otherEmployeesCoverageRequests.length === 0"
        style="text-align: center; font-size: 24px; font-weight: bold; padding: 20px;">
        No trades or pickups available.
      </div>
      <div class="info-cards" v-for="(request, index) in otherEmployeesCoverageRequests" :key="index"
        :style="getOtherOfferedStyle(request)">
        <div style="width: 300px;">{{ formatAddress(locations[request.shift.location].streetAddress) }}</div>
        <div>{{ new Date(request.shift.shiftPeriod.start).toLocaleDateString() }} </div>
        <div>{{ new Date(request.shift.shiftPeriod.end).toLocaleDateString() }}</div>
        <div>{{ coverageTypeToString(request.coverageRequest.coverageType) }}</div>
        <button @click="takeShift(request)">Take Shift</button>
      </div>
    </div>
  </div>

  <div v-if="selectedType == MANAGER_APPROVAL">
    <div id="available-shifts">

    </div>
  </div>



</template>

<style scoped>
#take-shift {
  display: flex;
}

#available-shifts {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.info-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: white;
  border-radius: 15px;
  box-shadow: 0px 0px 8px 6px #C0C0C0;
  margin-bottom: 5px;
}

#filters {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  /* Space out items more evenly */
  align-items: center;
  /* Center items vertically */
  padding: 15px 20px;
  background-color: #ffffff;
  color: var(--first);
  border-bottom: 2px solid black;
  margin: 4px;
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

div {
  font-family: 'Poppins';
}
</style>
