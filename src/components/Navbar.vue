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
        goToInfo
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
    background-color: #F7F8F9;
    overflow: hidden;
    list-style-type: none;
    top: 0;
    justify-content: right;
    box-shadow: 0px 4px 5px #C0C0C0;
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

li {
  display: flex;
  align-items: center;
  float: right;
  cursor: pointer;
}

a {
  display: flex;
  font-family: 'Poppins';
  color: #2857A3;
  text-decoration: none;
  align-items: center;
  text-align: center;
  padding: 8px;
}

</style>