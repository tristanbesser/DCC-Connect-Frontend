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
const locations=ref([])
const shifts = ref([]);
const requests = ref([]);
/*Populate this to the result of this request.
axios.get(apiurl3+"coverage/get",{
  params:
  {
    employeeID:"POPULATE THIS BASED ON ACTIVE"
  }
})*/

const availableShifts = ref([]);
const offers = ref([]);

const takeShift = (offer) => {
  // Find the index of the offer in the array
  const index = availableShifts.value.findIndex(o => o === offer);
  console.log(offer.id)
  axios.post(apiurl3+"/employees/pickup",{
  openShiftID: offer.id,
  employeeID: "POPULATE THIS WITH THE ID OF THE WORKING EMPLOYEE"
}).then(response=>{
  if (index !== -1) {
    availableShifts.value.splice(index, 1);
  }
  alert("Successfully took shift.")
}).catch(error=>{
  console.log(index)
  console.log(error)
  alert("Failed to pick up shift.")
})
  // Remove the offer if it exists
  
};
class Shift {
    constructor(start_time, day, location, duration){
        this.start_time = start_time;
        this.day = day;
        this.location = location;
        this.duration = duration;
    }
}
class request {
    constructor(start_date, end_date, reason){
        this.start_date = start_date;
        this.end_date = end_date;
        this.reason = reason;
    }
}
class shiftOffer {
    constructor(owner, shift){
        this.owner = owner;
        this.shift = shift;
    }
}

shifts.value.push(new Shift(7, 0, 'Location 1', 4));
requests.value.push(new request('2024-11-17', '2024-11-17', "i hate my parents"));
requests.value.push(new request('2024-11-17', '2024-11-17', "i hate my parents"));
requests.value.push(new request('2024-11-17', '2024-11-17', "i hate my parents"));
requests.value.push(new request('2024-11-17', '2024-11-17', "i hate my parents"));

offers.value.push(new shiftOffer('Jamie', new Shift(7, 0, 'Location 1', 4)));
offers.value.push(new shiftOffer('self', new Shift(7, 0, 'Location 1', 4)));
offers.value.push(new shiftOffer('self', new Shift(7, 0, 'Location 1', 4)));
offers.value.push(new shiftOffer('Josh', new Shift(7, 0, 'Location 1', 4)));
offers.value.push(new shiftOffer('Angela', new Shift(7, 0, 'Location 1', 4)));

axios.get(apiurl3+"shifts/get",{
    params:{
    openShiftsOnly:true
  }}).then(response=>{
    console.log(response.data)
    availableShifts.value=response.data})
axios.get(apiurl3+"location/get").then(response=>{
    console.log(response.data)
    locations.value=response.data.reduce((acc, item) => { const { id, ...rest } = item; acc[id] = rest; return acc; }, {});})


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
            justifyContent:'space-between',
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
            justifyContent:'space-between',
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
            justifyContent:'space-between',
            padding: '5px',
        };
    } else {
        return {
            display: 'none',
        };
    }
}
type Address = { streetAddress: string; 
  apartmentNumber?: string | null; 
  city: string; 
  state: string; 
  postalCode: string; 
  country: string; };
  function formatAddress(address: Address): string { const { streetAddress, apartmentNumber, city, state, postalCode } = address; return `${streetAddress}${apartmentNumber ? ', ' + apartmentNumber : ''}, ${city}, ${state} ${postalCode}`; }

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
    <div v-for="(request, index) in offers" :key="index" :style="getOfferStyle(request)">
        <div>{{ request.shift.start_time }} - {{ request.shift.duration +  request.shift.start_time}}</div>
        <div>{{ request.shift.location }}</div>
        <div>{{ request.shift.start_time }}</div>
        <div>{{ request.owner }}</div>
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
