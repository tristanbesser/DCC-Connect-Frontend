<script setup lang="ts">

import { faAlignJustify } from '@fortawesome/free-solid-svg-icons/faAlignJustify';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import RoundedBox from '../components/LoginFrame.vue';


const router = useRouter();

defineOptions({
    name: 'info',
});

</script>

<template>
    <Navbar></Navbar>
    <div id="heading">
        <h1>Location Information</h1>
    </div>
    <div id="holder">
        <RoundedBox>
            <div id="topleftbox">
                <h4>Woodside</h4>
            </div>
            <div id="house-picture">
                <img id="images" src="../../public/Woodside.png"></img>
            </div>
            <div id="house-info">
                <div id="phone">
                    <img src="../../public/Phone.svg"></img>
                    <p id="phonenumber">(724) 308-6883</p>
                </div>
                <div id="location">
                    <img src="../../public/Location.svg"></img>
                    <a id="address" target=_blank href="https://www.google.com/maps/place/1948+Woodside+Dr,+Hermitage,+PA+16148/@41.2373816,-80.473626,16z/data=!3m1!4b1!4m6!3m5!1s0x8833c06639e5fa0d:0xa2d1bd930b8c010a!8m2!3d41.2373816!4d-80.473626!16s%2Fg%2F11c4mncpqf?authuser=0&entry=ttu&g_ep=EgoyMDI0MTExMy4xIKXMDSoASAFQAw%3D%3D">1948 Woodside Dr. Hermitage, PA 16148</a>
                </div>
            </div>
        </RoundedBox>
        <RoundedBox>
            <div id="topleftbox">
                <h4>Indiana</h4>
            </div>
            <div id="house-picture">
                <img id="images" src="../../public/Woodside.png"></img>
            </div>
            <div id="house-info">
                <div id="phone">
                    <img src="../../public/Phone.svg"></img>
                    <p id="phonenumber">(724) 308-6883</p>
                </div>
                <div id="location">
                    <img src="../../public/Location.svg"></img>
                    <a id="address" target=_blank href="https://www.google.com/maps/place/1948+Woodside+Dr,+Hermitage,+PA+16148/@41.2373816,-80.473626,16z/data=!3m1!4b1!4m6!3m5!1s0x8833c06639e5fa0d:0xa2d1bd930b8c010a!8m2!3d41.2373816!4d-80.473626!16s%2Fg%2F11c4mncpqf?authuser=0&entry=ttu&g_ep=EgoyMDI0MTExMy4xIKXMDSoASAFQAw%3D%3D">1948 Woodside Dr. Hermitage, PA 16148</a>
                </div>
            </div>
        </RoundedBox>
        <RoundedBox>
            <div id="topleftbox">
                <h4>419 Indiana</h4>
            </div>
            <div id="house-picture">
                <img id="images" src="../../public/Woodside.png"></img>
            </div>
            <div id="house-info">
                <div id="phone">
                    <img src="../../public/Phone.svg"></img>
                    <p id="phonenumber">(724) 308-6883</p>
                </div>
                <div id="location">
                    <img src="../../public/Location.svg"></img>
                    <a id="address" target=_blank href="https://www.google.com/maps/place/1948+Woodside+Dr,+Hermitage,+PA+16148/@41.2373816,-80.473626,16z/data=!3m1!4b1!4m6!3m5!1s0x8833c06639e5fa0d:0xa2d1bd930b8c010a!8m2!3d41.2373816!4d-80.473626!16s%2Fg%2F11c4mncpqf?authuser=0&entry=ttu&g_ep=EgoyMDI0MTExMy4xIKXMDSoASAFQAw%3D%3D">1948 Woodside Dr. Hermitage, PA 16148</a>
                </div>
            </div>
        </RoundedBox>
        <RoundedBox>
            <div id="topleftbox">
                <h4>Ridge</h4>
            </div>
            <div id="house-picture">
                <img id="images" src="../../public/Woodside.png"></img>
            </div>
            <div id="house-info">
                <div id="phone">
                    <img src="../../public/Phone.svg"></img>
                    <p id="phonenumber">(724) 308-6883</p>
                </div>
                <div id="location">
                    <img src="../../public/Location.svg"></img>
                    <a id="address" target=_blank href="https://www.google.com/maps/place/1948+Woodside+Dr,+Hermitage,+PA+16148/@41.2373816,-80.473626,16z/data=!3m1!4b1!4m6!3m5!1s0x8833c06639e5fa0d:0xa2d1bd930b8c010a!8m2!3d41.2373816!4d-80.473626!16s%2Fg%2F11c4mncpqf?authuser=0&entry=ttu&g_ep=EgoyMDI0MTExMy4xIKXMDSoASAFQAw%3D%3D">1948 Woodside Dr. Hermitage, PA 16148</a>
                </div>
            </div>
        </RoundedBox>
        <RoundedBox>
            <div id="topleftbox">
                <h4>State Street</h4>
            </div>
            <div id="house-picture">
                <img id="images" src="../../public/Woodside.png"></img>
            </div>
            <div id="house-info">
                <div id="phone">
                    <img src="../../public/Phone.svg"></img>
                    <p id="phonenumber">(724) 308-6883</p>
                </div>
                <div id="location">
                    <img src="../../public/Location.svg"></img>
                    <a id="address" target=_blank href="https://www.google.com/maps/place/1948+Woodside+Dr,+Hermitage,+PA+16148/@41.2373816,-80.473626,16z/data=!3m1!4b1!4m6!3m5!1s0x8833c06639e5fa0d:0xa2d1bd930b8c010a!8m2!3d41.2373816!4d-80.473626!16s%2Fg%2F11c4mncpqf?authuser=0&entry=ttu&g_ep=EgoyMDI0MTExMy4xIKXMDSoASAFQAw%3D%3D">1948 Woodside Dr. Hermitage, PA 16148</a>
                </div>
            </div>
        </RoundedBox>
        <RoundedBox>
            <div id="topleftbox">
                <h4>Dakota</h4>
            </div>
            <div id="house-picture">
                <img id="images" src="../../public/Woodside.png"></img>
            </div>
            <div id="house-info">
                <div id="phone">
                    <img src="../../public/Phone.svg"></img>
                    <p id="phonenumber">(724) 308-6883</p>
                </div>
                <div id="location">
                    <img src="../../public/Location.svg"></img>
                    <a id="address" target=_blank href="https://www.google.com/maps/place/1948+Woodside+Dr,+Hermitage,+PA+16148/@41.2373816,-80.473626,16z/data=!3m1!4b1!4m6!3m5!1s0x8833c06639e5fa0d:0xa2d1bd930b8c010a!8m2!3d41.2373816!4d-80.473626!16s%2Fg%2F11c4mncpqf?authuser=0&entry=ttu&g_ep=EgoyMDI0MTExMy4xIKXMDSoASAFQAw%3D%3D">1948 Woodside Dr. Hermitage, PA 16148</a>
                </div>
            </div>
        </RoundedBox>
        <RoundedBox>
            <div id="topleftbox">
                <h4>Lunn</h4>
            </div>
            <div id="house-picture">
                <img id="images" src="../../public/Woodside.png"></img>
            </div>
            <div id="house-info">
                <div id="phone">
                    <img src="../../public/Phone.svg"></img>
                    <p id="phonenumber">(724) 308-6883</p>
                </div>
                <div id="location">
                    <img src="../../public/Location.svg"></img>
                    <a id="address" target=_blank href="https://www.google.com/maps/place/1948+Woodside+Dr,+Hermitage,+PA+16148/@41.2373816,-80.473626,16z/data=!3m1!4b1!4m6!3m5!1s0x8833c06639e5fa0d:0xa2d1bd930b8c010a!8m2!3d41.2373816!4d-80.473626!16s%2Fg%2F11c4mncpqf?authuser=0&entry=ttu&g_ep=EgoyMDI0MTExMy4xIKXMDSoASAFQAw%3D%3D">1948 Woodside Dr. Hermitage, PA 16148</a>
                </div>
            </div>
        </RoundedBox>
        <RoundedBox>
            <div id="topleftbox">
                <h4>King</h4>
            </div>
            <div id="house-picture">
                <img id="images" src="../../public/Woodside.png"></img>
            </div>
            <div id="house-info">
                <div id="phone">
                    <img src="../../public/Phone.svg"></img>
                    <p id="phonenumber">(724) 308-6883</p>
                </div>
                <div id="location">
                    <img src="../../public/Location.svg"></img>
                    <a id="address" target=_blank href="https://www.google.com/maps/place/1948+Woodside+Dr,+Hermitage,+PA+16148/@41.2373816,-80.473626,16z/data=!3m1!4b1!4m6!3m5!1s0x8833c06639e5fa0d:0xa2d1bd930b8c010a!8m2!3d41.2373816!4d-80.473626!16s%2Fg%2F11c4mncpqf?authuser=0&entry=ttu&g_ep=EgoyMDI0MTExMy4xIKXMDSoASAFQAw%3D%3D">1948 Woodside Dr. Hermitage, PA 16148</a>
                </div>
            </div>
        </RoundedBox>
        <RoundedBox>
            <div id="topleftbox">
                <h4>Bond</h4>
            </div>
            <div id="house-picture">
                <img id="images" src="../../public/Woodside.png"></img>
            </div>
            <div id="house-info">
                <div id="phone">
                    <img src="../../public/Phone.svg"></img>
                    <p id="phonenumber">(724) 308-6883</p>
                </div>
                <div id="location">
                    <img src="../../public/Location.svg"></img>
                    <a id="address" target=_blank href="https://www.google.com/maps/place/1948+Woodside+Dr,+Hermitage,+PA+16148/@41.2373816,-80.473626,16z/data=!3m1!4b1!4m6!3m5!1s0x8833c06639e5fa0d:0xa2d1bd930b8c010a!8m2!3d41.2373816!4d-80.473626!16s%2Fg%2F11c4mncpqf?authuser=0&entry=ttu&g_ep=EgoyMDI0MTExMy4xIKXMDSoASAFQAw%3D%3D">1948 Woodside Dr. Hermitage, PA 16148</a>
                </div>
            </div>
        </RoundedBox>
        <RoundedBox>
            <div id="topleftbox">
                <h4>Maplewood</h4>
            </div>
            <div id="house-picture">
                <img id="images" src="../../public/Woodside.png"></img>
            </div>
            <div id="house-info">
                <div id="phone">
                    <img src="../../public/Phone.svg"></img>
                    <p id="phonenumber">(724) 308-6883</p>
                </div>
                <div id="location">
                    <img src="../../public/Location.svg"></img>
                    <a id="address" target=_blank href="https://www.google.com/maps/place/1948+Woodside+Dr,+Hermitage,+PA+16148/@41.2373816,-80.473626,16z/data=!3m1!4b1!4m6!3m5!1s0x8833c06639e5fa0d:0xa2d1bd930b8c010a!8m2!3d41.2373816!4d-80.473626!16s%2Fg%2F11c4mncpqf?authuser=0&entry=ttu&g_ep=EgoyMDI0MTExMy4xIKXMDSoASAFQAw%3D%3D">1948 Woodside Dr. Hermitage, PA 16148</a>
                </div>
            </div>
        </RoundedBox>
        <RoundedBox>
            <div id="topleftbox">
                <h4>French</h4>
            </div>
            <div id="house-picture">
                <img id="images" src="../../public/Woodside.png"></img>
            </div>
            <div id="house-info">
                <div id="phone">
                    <img src="../../public/Phone.svg"></img>
                    <p id="phonenumber">(724) 308-6883</p>
                </div>
                <div id="location">
                    <img src="../../public/Location.svg"></img>
                    <a id="address" target=_blank href="https://www.google.com/maps/place/1948+Woodside+Dr,+Hermitage,+PA+16148/@41.2373816,-80.473626,16z/data=!3m1!4b1!4m6!3m5!1s0x8833c06639e5fa0d:0xa2d1bd930b8c010a!8m2!3d41.2373816!4d-80.473626!16s%2Fg%2F11c4mncpqf?authuser=0&entry=ttu&g_ep=EgoyMDI0MTExMy4xIKXMDSoASAFQAw%3D%3D">1948 Woodside Dr. Hermitage, PA 16148</a>
                </div>
            </div>
        </RoundedBox>
        <RoundedBox>
            <div id="topleftbox">
                <h4>Greenwood</h4>
            </div>
            <div id="house-picture">
                <img id="images" src="../../public/Woodside.png"></img>
            </div>
            <div id="house-info">
                <div id="phone">
                    <img src="../../public/Phone.svg"></img>
                    <p id="phonenumber">(724) 308-6883</p>
                </div>
                <div id="location">
                    <img src="../../public/Location.svg"></img>
                    <a id="address" target=_blank href="https://www.google.com/maps/place/1948+Woodside+Dr,+Hermitage,+PA+16148/@41.2373816,-80.473626,16z/data=!3m1!4b1!4m6!3m5!1s0x8833c06639e5fa0d:0xa2d1bd930b8c010a!8m2!3d41.2373816!4d-80.473626!16s%2Fg%2F11c4mncpqf?authuser=0&entry=ttu&g_ep=EgoyMDI0MTExMy4xIKXMDSoASAFQAw%3D%3D">1948 Woodside Dr. Hermitage, PA 16148</a>
                </div>
            </div>
        </RoundedBox>
    </div>
</template>

<style scoped>
    #address {
        padding-left: 10px;
        margin: 0;
    }
    #location {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-bottom: 20px;
    }
    #phonenumber {
        padding-left: 10px;
        margin: 0;
    }
    #phone {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-bottom: 20px;
    }
    #house-info {
        display: flex;
        justify-content: left;
        flex-direction: column;
    }
    #images {
        object-fit: fill;
        width:584px;
    }
    #house-picture {
        display: flex;
        justify-content: center;
        width: 100%;
        padding: 15px;
    }
    .rounded-box {
        margin: 10px;
        justify-content: flex-start;
    }
    #heading {
        display: flex;
        color: #1F4691;
        background-color: #D0E1F9;
        justify-content: center;
        align-items: center;
        font-family: "Poppins";
        padding: 25px;
    }
    #holder {
        display: flex;
        height: 100%;
        flex-wrap: wrap;
        justify-content: center;
        font-family: "Poppins";
        background-color: #D0E1F9;
    }
</style>
