<template>
  <div id="navbar">
    <ul>
      <li><a @click="goToAccount"><img src="../../public/Profile.png"></a></li>
      <li><a @click="goToInfo"><img src="../../public/Info.png">Info</a></li>
      <li><a @click="goToTimeOff"><img src="../../public/TimeOff.png">Time Off</a></li>
      <li><a @click="goToSchedule"><img src="../../public/Schedule.png">Schedule</a></li>
      
      <!-- Conditionally show 'Registration' for managers -->
      <li v-if="role === 'Manager'||role=='Admin'">
        <a @click="goToRegistration">
          <img src="../../public/RegistrationIcon.png">Registration
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import axios from '../config/axios.js';  // Assuming axios is set up

export default {
  name: 'Navbar',
  setup() {
    const router = useRouter();
    const role = ref();  // Default role is 'employee'
    
    // Fetch the signed-in user data and set the role
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/user/signedin', {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,  // If the session cookie is required
        });

        if (response.status === 200) {
          role.value = response.data.employeeRole;  // Assuming the role is returned as 'role' in the response
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Call the function to fetch user data
    fetchUserData();

    const goToSchedule = () => {
      router.push('./scheduler');
    };
    const goToTimeOff = () => {
      router.push('./time-off');
    };
    const goToAccount = () => {
      router.push('./account');
    };
    const goToInfo = () => {
      router.push('./info');
    };
    const goToRegistration = () => {
      router.push('./registration');  // Navigate to the registration page for managers
    };

    return {
      goToSchedule,
      goToTimeOff,
      goToAccount,
      goToInfo,
      goToRegistration,
      role,  // Bind the role to the template
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