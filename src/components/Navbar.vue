<template>
    <div id="navbar">
      <ul>
        <li><a @click="goToAccount"><img src="../../public/Profile.png"></a></li>
        <li><a @click="goToInfo"><img src="../../public/Info.png">Info</a></li>
        <li><a @click="goToTimeOff"><img src="../../public/TimeOff.png">Time Off</a></li>
        <li><a @click="goToSchedule"><img src="../../public/Schedule.png">Schedule</a></li>
      </ul>
    </div>
  </template>
  
  <script>
  import { useRouter } from 'vue-router'; // Import Vue Router

  export default {
    name: 'Navbar',
    setup() {
      const router = useRouter();
      const goToSchedule = () => {
        router.push('./scheduler'); // Push to the route
      };
      const goToTimeOff = () => {
        router.push('./time-off'); // Push to the route
      };
      const goToAccount = () => {
        router.push('./account'); // Push to the route
      };
      const goToInfo = () => {
        router.push('./info'); // Push to the route
      };
  
      return {
        goToSchedule,
        goToTimeOff,
        goToAccount,
        goToInfo,
      };
    },
  };
  </script>
  
<style scoped>
p {
    font-size: 64px;
    overflow: hidden;
}
    
img {
    margin: 10px
}
#navbar{
    display: flex;
    position: sticky;
    background-color: var(--second);
    overflow: hidden;
    list-style-type: none;
    top: 0;
    justify-content: right;
    box-shadow: 0px 4px 5px var(--third);
}
ul {
  display: flex;
  position: sticky;
  overflow: hidden;
  top: 0;
  flex-direction: row-reverse;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

a {
  display: flex;                /* Ensure it's a flex container */
  font-family: 'Poppins';
  color: #2857A3;
  text-decoration: none;
  align-items: center;
  text-align: center;
  padding: 8px;
  cursor: pointer;             /* Add this line to make the cursor a pointer */
  width: 100%;                  /* Ensure the anchor takes up the full width of the li */
}

li {
  display: flex;
  align-items: center;
  float: right;
  width: 100%;                  /* Ensure li takes up the full width for the link */
}


</style>
<!-- const data = {for use in the integration of backend and frontend, very basic commands for refference later!!
  shiftPeriod: {
    start: "2024-11-15T19:50:04.613Z",
    end: "2024-11-15T19:50:04.613Z"
  },
  location: "string",
  role: 0,
  employeeID: "string"
};

fetch('http://localhost:5207/shift/create/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Success:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  }); -->
