<template>
    <div id ="navbar">
        <ul>
            <li><a href="account.asp"><img src="../../Profile.png"></a></li>

            <li><a href="contact.asp"><img src="../../Info.png">Info</a></li>

            <li><a href="news.asp"><img src="../../TimeOff.png">Time Off</a></li>

            <li><a href="default.asp"><img src="../../Schedule.png">Schedule</a></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Navbar'
}
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