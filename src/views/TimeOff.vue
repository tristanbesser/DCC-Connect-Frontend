<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import axios from '../config/axios.js';
const router = useRouter();

defineOptions({
  name: 'time-off',
});

const goToRequest = () => {
  router.push('./request');
};
const apiurl3 = "https://localhost:32769/"

const request_type = ref(['My time off requests', 'My offered shifts', 'Available shifts']);
const selectedType = ref('My time off requests');
const currentDate = new Date();
const locations = ref(['Ridge', 'Lunn', 'Greenwood', 'Dakota', 'Woodside', 'Indiana', '419 Indiana', 'King']);
const availableShifts = ref([]);

const shifts = ref<shift[]>([]); // Reactive array for holding shift objects
const requests = ref<request[]>([]);  // Typing requests as an array of request
const offers = ref<shiftOffer[]>([]);  // Typing offers as an array of shiftOffer

/*Populate this to the result of this request.
axios.get(apiurl3+"coverage/get",{
  params:
  {
    employeeID:"POPULATE THIS BASED ON ACTIVE"
  }
})*/


interface shiftPeriod {
  start: number;
  end: number;
}
interface request{
  start_date: number;
  end_date: number;
  reason: string;
  owner: string;
}

interface shiftOffer {
  owner: string;
  shift: shift;
  shiftPeriod: shiftPeriod;
}

interface shift {
  employeeID: string;
  shiftPeriod: shiftPeriod;
  location: Address;
  color: string;
  assignedEmployeeName: string;
  day: string;
  start_time: number;
  end_time: number;
  start_day: string; //this is a placeholder until proper data is imported!
  duration: number; //another useless placeholder.
}
interface employee {
  name: string;
  id: number;
  lastName: string;
}

type Address = { streetAddress: string; 
  apartmentNumber?: string | null; 
  city: string; 
  state: string; 
  postalCode: string; 
  country: string; };
  function formatAddress(address: Address): string { const { streetAddress, apartmentNumber, city, state, postalCode } = address; return `${streetAddress}${apartmentNumber ? ', ' + apartmentNumber : ''}, ${city}, ${state} ${postalCode}`; }


const takeShift = (offer: any) => {
  // Find the index of the offer in the array
  const index = availableShifts.value.findIndex(o => o === offer);
  console.log(offer.id)
  axios.post(apiurl3+"/employees/pickup",{
  openShiftID: offer.id,
  employeeID: "POPULATE THIS WITH THE ID OF THE WORKING EMPLOYEE"//lol
}).then((response: any)=>{
  if (index !== -1) {
    availableShifts.value.splice(index, 1);
  }
  alert("Successfully took shift.")
}).catch((error: any)=>{
  console.log(index)
  console.log(error)
  alert("Failed to pick up shift.")
})
  // Remove the offer if it exists
  
};

axios.get(apiurl3+"shifts/get",{
    params:{
    openShiftsOnly:true
  }}).then((response: any)=>{
    console.log(response.data)
    availableShifts.value=response.data})
axios.get(apiurl3+"location/get").then((response: any)=>{
    console.log(response.data)
    locations.value=response.data.reduce((acc: any, item: any) => { const { id, ...rest } = item; acc[id] = rest; return acc; }, {});})


function getListStyle(request: request) {
    const requestStartDate = new Date(request.start_date); // Convert start_date to a Date object
    if (requestStartDate < currentDate) {
        return {
            width: `95%`,
            minHeight: '60px',
            backgroundColor: 'var(--background)', // Apply the current color for the background
            color: 'var(--text1)',         // Text color
            display: 'flex',               // Center content
            alignItems: 'center',          // Vertically center
            borderRadius: '10px',          // Rounded corners
            margin: '2px',                 // Add spacing
            justifyContent:'space-between',
            padding: '5px',
        };
    } else {
        return {
            display: 'none',
        };
    }
}
function getOfferStyle(shiftOffer: shiftOffer) {
    if (shiftOffer.owner == 'self') {
        return {
            width: `95%`,
            minHeight: '60px',
            backgroundColor: 'var(--background)', // Apply the current color for the background
            color: 'var(--text1)',         // Text color
            display: 'flex',               // Center content
            alignItems: 'center',          // Vertically center
            borderRadius: '10px',          // Rounded corners
            margin: '2px',                 // Add spacing
            justifyContent:'space-between',
            padding: '5px',
        };
    } else {
        return {
            display: 'none',
        };
    }
}
function getOtherOfferedStyle(shiftOffer: shiftOffer) {
    if (shiftOffer.owner != 'self') {
        return {
            width: `95%`,
            minHeight: '60px',
            backgroundColor: 'var(--background)', // Apply the current color for the background
            color: 'var(--text1)',         // Text color
            display: 'flex',               // Center content
            alignItems: 'center',          // Vertically center
            borderRadius: '10px',          // Rounded corners
            margin: '2px',                 // Add spacing
            justifyContent:'space-between',
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
      <div
        v-for="option in request_type"
        :key="option"
        :class="['option-item', { selected: selectedType === option }]"
        @click="selectedType = option"
      >
        {{ option }}
      </div>
    </div>
    
  </div>
<div v-if="selectedType == 'My time off requests'">
    <div v-for="(request, index) in requests" :key="index" :style="getListStyle(request)">
        <div>{{request.start_date}} - {{ request.end_date }}</div>
        <div>{{ request.reason }}</div>
    </div>
</div>
<div v-if="selectedType == 'My offered shifts'">
    <div v-for="(shiftOffer, index) in offers" :key="index" :style="getOfferStyle(shiftOffer)">
        <div>{{ shiftOffer.shift.start_time }} - {{ shiftOffer.shift.duration +  shiftOffer.shift.start_time}}</div>
        <div>{{ shiftOffer.shift.location }}</div>
        <div>{{ shiftOffer.shift.start_time }}</div>
        <div>{{ shiftOffer.owner }}</div>
    </div>
</div>
<div v-if="selectedType == 'Available shifts'">
    <div v-for="(shiftOffer, index) in offers" :key="index" :style="getOtherOfferedStyle(shiftOffer)">
      <div style="width: 300px;"></div>
      <!--{{ formatAddress(locations[shiftOffer.shift.location].streetAddress) }}</div> -->
      <div>{{ shiftOffer.shift.location }}</div>
      <div>{{ shiftOffer.shiftPeriod.start }} </div>
      <div>{{ shiftOffer.shiftPeriod.end }}</div>
      <button @click="takeShift(shiftOffer)">Take Shift</button>
    </div>
</div>

                
</template>

<style scoped>
#filters {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; /* Center items vertically */
  padding: 15px 20px;
  background-color: var(--background);
  color: #4f4f4f;
  border-bottom: 2px solid var(--text2);
}

#options {
  display: flex;
  justify-content: center;
  gap: 20px; /* Add space between items */
  margin-top: 20px;
}

#card {
    height:150px;
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
  text-decoration: underline; /* Underline the selected option */
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
