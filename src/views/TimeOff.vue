<script setup lang="ts">

import { faAlignJustify } from '@fortawesome/free-solid-svg-icons/faAlignJustify';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '@/components/Navbar.vue';


const router = useRouter();

defineOptions({
    name: 'time-off',
});
const goToRequest = () => {
  router.push('./request')
  };



const options = ref(['Requested', 'Accepted', 'Rejected', 'Offers', 'Show All']);
const selectedOption = ref('Show All');
const request_type = ref(['My time off requests', 'My offered shifts', 'Available shifts']);
const selectedType = ref('My time off requests');

const requests = ref([]);
/* owner: the owner, type: time off request or shift offer, recipient: person who took shift or manager who approved time off */
class request {
    constructor(owner, type, recipient){
        this.owner = owner;
        this.type = type;
        this.recipient = recipient;
    }
}

function getShiftStyle(request) {
    // Use the selectedOption value and compare it with the shift location
    if(request.location === selectedOption.value || selectedOption.value === 'Show All'){
        return {
            position: 'absolute',
            top: `${50 + 50 * shift.day + 2 + shift.day * 1.5}px`,
            left: `${4 + 4 * shift.start_time}%`,
            width: `${4 * shift.duration}%`,
            height: '50px',
            backgroundColor: 'blue',
            color: 'black',
            display: 'flex',                // Center content
            justifyContent: 'center',       // Horizontally center
            alignItems: 'center',           // Vertically center
            borderRadius: '10px',           // Rounded corners
        };
    }
    else{
        return {
            display:'none',
        }
    }
    return {};
}

</script>

<template>
    <Navbar></Navbar>
    <div id = 'filters'>
            <h1>Schedule Change Requests</h1>
            <select id="options" v-model="selectedOption">
                <option v-for="option in options" :key="option" :value="option">
                    {{ option }}
                </option>
            </select>
            <select id="options" v-model="selectedType">
                <option v-for="option in request_type" :key="option" :value="option">
                    {{ option }}
                </option>
            </select>
            <div id = "request">
                <a @click="goToRequest">Make a Request...</a>
            </div>

        </div>
</template>

<style scoped>
#filters {
        display: flex;
        flex-direction: column;
        justify-content: left;
        align-items: center; /* Center items vertically */
        padding: 15px 20px; /* Padding around the header */
        background-color: #ffffff; /* Background color */
        color: #4f4f4f; /* Text color */
        border-bottom: 2px solid rgb(44, 44, 44);
}
#options {
    width: 35%;
    align-items: flex-start;
    align-self: flex-start;
    justify-content: left;
}
#request {
    width: 30%;
    align-items: flex-start;
    align-self: flex-start;
    justify-content: left;
    background-color: aliceblue;
    padding: 5px;
    border-radius: 10px;
}
</style>