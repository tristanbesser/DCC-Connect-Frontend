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
                <img id="images" src="../../public/Indiana.png"></img>
            </div>
            <div id="house-info">
                <div id="phone">
                    <img src="../../public/Phone.svg"></img>
                    <p id="phonenumber">(724) 308-6608</p>
                </div>
                <div id="location">
                    <img src="../../public/Location.svg"></img>
                    <a id="address" target=_blank href="https://www.google.com/maps/place/905+Indiana+Ave,+Farrell,+PA+16121/@41.2149713,-80.4931278,17z/data=!3m1!4b1!4m6!3m5!1s0x8833c02f044c557b:0x3aaf8f64dbf591e!8m2!3d41.2149673!4d-80.4905475!16s%2Fg%2F11hkqrqqj3?authuser=0&entry=ttu&g_ep=EgoyMDI0MTExNy4wIKXMDSoASAFQAw%3D%3D">905 Indiana Ave., Farrell, PA 16121</a>
                </div>
            </div>
        </RoundedBox>
        <RoundedBox>
            <div id="topleftbox">
                <h4>419 Indiana</h4>
            </div>
            <div id="house-picture">
                <img id="images" src="../../public/419Indiana.png"></img>
            </div>
            <div id="house-info">
                <div id="phone">
                    <img src="../../public/Phone.svg"></img>
                    <p id="phonenumber">(724) 308-6682</p>
                </div>
                <div id="location">
                    <img src="../../public/Location.svg"></img>
                    <a id="address" target=_blank href="https://www.google.com/maps/place/419+Indiana+Ave,+Farrell,+PA+16121/@41.2080533,-80.4907467,17z/data=!4m16!1m9!3m8!1s0x8833c0282842616f:0x883608c0932f281e!2s419+Indiana+Ave,+Farrell,+PA+16121!3b1!8m2!3d41.2080149!4d-80.4904823!10e5!16s%2Fg%2F11c18wjv8w!3m5!1s0x8833c0282842616f:0x883608c0932f281e!8m2!3d41.2080149!4d-80.4904823!16s%2Fg%2F11c18wjv8w?authuser=0&entry=ttu&g_ep=EgoyMDI0MTExNy4wIKXMDSoASAFQAw%3D%3D">419 Indiana Ave., Farrell, PA 16121</a>
                </div>
            </div>
        </RoundedBox>
        <RoundedBox>
            <div id="topleftbox">
                <h4>Ridge</h4>
            </div>
            <div id="house-picture">
                <img id="images" src="../../public/Ridge.png"></img>
            </div>
            <div id="house-info">
                <div id="phone">
                    <img src="../../public/Phone.svg"></img>
                    <p id="phonenumber">(724) 383-4162</p>
                </div>
                <div id="location">
                    <img src="../../public/Location.svg"></img>
                    <a id="address" target=_blank href="https://www.google.com/maps/place/1200+W+Ridge+Ave,+Sharpsville,+PA+16150/@41.2591901,-80.4939807,17z/data=!3m1!4b1!4m6!3m5!1s0x8833c0e4e12a54f5:0xf8e2ca73732764a8!8m2!3d41.2591861!4d-80.4914004!16s%2Fg%2F11c2qfzdsw?authuser=0&entry=ttu&g_ep=EgoyMDI0MTExNy4wIKXMDSoASAFQAw%3D%3D">1200 W Ridge Ave., Sharpsville, PA 16150</a>
                </div>
            </div>
        </RoundedBox>
        <RoundedBox>
            <div id="topleftbox">
                <h4>State Street</h4>
            </div>
            <div id="house-picture">
                <img id="images" src="../../public/StateStreet.png"></img>
            </div>
            <div id="house-info">
                <div id="phone">
                    <img src="../../public/Phone.svg"></img>
                    <p id="phonenumber">(878) 202-4291</p>
                </div>
                <div id="location">
                    <img src="../../public/Location.svg"></img>
                    <a id="address" target=_blank href="https://www.google.com/maps/place/5789+E+State+St,+Hermitage,+PA+16148/@41.237954,-80.4064513,17z/data=!3m1!4b1!4m6!3m5!1s0x8833be5689eabae9:0xe0a07434ade0d57c!8m2!3d41.23795!4d-80.403871!16s%2Fg%2F11f3zv3dpm?authuser=0&entry=ttu&g_ep=EgoyMDI0MTExNy4wIKXMDSoASAFQAw%3D%3D">5789 E. State St., Hermitage, PA 16148</a>
                </div>
            </div>
        </RoundedBox>
        <RoundedBox>
            <div id="topleftbox">
                <h4>Dakota</h4>
            </div>
            <div id="house-picture">
                <img id="images" src="../../public/Dakota.png"></img>
            </div>
            <div id="house-info">
                <div id="phone">
                    <img src="../../public/Phone.svg"></img>
                    <p id="phonenumber">(724) 308-7398</p>
                </div>
                <div id="location">
                    <img src="../../public/Location.svg"></img>
                    <a id="address" target=_blank href="https://www.google.com/maps/place/1210+Dakota+St,+Farrell,+PA+16121/@41.217918,-80.4952234,17z/data=!3m1!4b1!4m6!3m5!1s0x8833c02e1e54c47b:0x71a08f73433ee05a!8m2!3d41.217914!4d-80.4926431!16s%2Fg%2F11hs1tbg35?authuser=0&entry=ttu&g_ep=EgoyMDI0MTExNy4wIKXMDSoASAFQAw%3D%3D">1210 Dakota St., Farrell, PA 16121</a>
                </div>
            </div>
        </RoundedBox>
        <RoundedBox>
            <div id="topleftbox">
                <h4>Lunn</h4>
            </div>
            <div id="house-picture">
                <img id="images" src="../../public/Lunn.png"></img>
            </div>
            <div id="house-info">
                <div id="phone">
                    <img src="../../public/Phone.svg"></img>
                    <p id="phonenumber">(724) 308-6470</p>
                </div>
                <div id="location">
                    <img src="../../public/Location.svg"></img>
                    <a id="address" target=_blank href="https://www.google.com/maps/place/322+Lunn+Blvd,+Farrell,+PA+16121/@41.2067113,-80.4845116,3a,75y,269.52h,90t/data=!3m8!1e1!3m5!1si4s6Ut7_9OBsujH5YcAmhw!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D0%26panoid%3Di4s6Ut7_9OBsujH5YcAmhw%26yaw%3D269.516!7i16384!8i8192!4b1!4m6!3m5!1s0x8833ea9d9a92764f:0xcc0155c7f58d8bdb!8m2!3d41.206709!4d-80.4848764!16s%2Fg%2F11c4x1688w?authuser=0&entry=ttu&g_ep=EgoyMDI0MTExNy4wIKXMDSoASAFQAw%3D%3D">322 Lunn Blvd., Farrell, PA 16121</a>
                </div>
            </div>
        </RoundedBox>
        <RoundedBox>
            <div id="topleftbox">
                <h4>King</h4>
            </div>
            <div id="house-picture">
                <img id="images" src="../../public/King.png"></img>
            </div>
            <div id="house-info">
                <div id="phone">
                    <img src="../../public/Phone.svg"></img>
                    <p id="phonenumber">(724) 308-6220</p>
                </div>
                <div id="location">
                    <img src="../../public/Location.svg"></img>
                    <a id="address" target=_blank href="https://www.google.com/maps/place/2129+King+Dr,+Hermitage,+PA+16148/@41.2283727,-80.470283,19z/data=!4m16!1m9!3m8!1s0x8833c06c603f635d:0xfa74d3c52cc01123!2s2129+King+Dr,+Hermitage,+PA+16148!3b1!8m2!3d41.2286877!4d-80.4702792!10e5!16s%2Fg%2F11c28wm4s6!3m5!1s0x8833c06c603f635d:0xfa74d3c52cc01123!8m2!3d41.2286877!4d-80.4702792!16s%2Fg%2F11c28wm4s6?authuser=0&entry=ttu&g_ep=EgoyMDI0MTExNy4wIKXMDSoASAFQAw%3D%3D">2129 King Dr., Hermitage, PA 16148</a>
                </div>
            </div>
        </RoundedBox>
        <RoundedBox>
            <div id="topleftbox">
                <h4>Bond</h4>
            </div>
            <div id="house-picture">
                <img id="images" src="../../public/Bond.png"></img>
            </div>
            <div id="house-info">
                <div id="phone">
                    <img src="../../public/Phone.svg"></img>
                    <p id="phonenumber">(724) 308-6008</p>
                </div>
                <div id="location">
                    <img src="../../public/Location.svg"></img>
                    <a id="address" target=_blank href="https://www.google.com/maps/place/1012+Bond+St,+Farrell,+PA+16121/@41.2091712,-80.4961326,17z/data=!4m16!1m9!3m8!1s0x8833c02a668aad33:0x92cd2b2f978266fa!2s1012+Bond+St,+Farrell,+PA+16121!3b1!8m2!3d41.2093745!4d-80.4961083!10e5!16s%2Fg%2F11c2qdz46f!3m5!1s0x8833c02a668aad33:0x92cd2b2f978266fa!8m2!3d41.2093745!4d-80.4961083!16s%2Fg%2F11c2qdz46f?authuser=0&entry=ttu&g_ep=EgoyMDI0MTExNy4wIKXMDSoASAFQAw%3D%3D">1012 Bond St., Farrell, PA 16121</a>
                </div>
            </div>
        </RoundedBox>
        <RoundedBox>
            <div id="topleftbox">
                <h4>Greenwood</h4>
            </div>
            <div id="house-picture">
                <img id="images" src="../../public/Greenwood.png"></img>
            </div>
            <div id="house-info">
                <div id="phone">
                    <img src="../../public/Phone.svg"></img>
                    <p id="phonenumber">(724) 308-7019</p>
                </div>
                <div id="location">
                    <img src="../../public/Location.svg"></img>
                    <a id="address" target=_blank href="https://www.google.com/maps/place/430+Greenwood+Dr,+Hermitage,+PA+16148/@41.2274531,-80.4761745,17z/data=!4m16!1m9!3m8!1s0x8833c06abb2b7921:0x3d73049baf651c31!2s430+Greenwood+Dr,+Hermitage,+PA+16148!3b1!8m2!3d41.2274665!4d-80.4764636!10e5!16s%2Fg%2F11crt0dqlm!3m5!1s0x8833c06abb2b7921:0x3d73049baf651c31!8m2!3d41.2274665!4d-80.4764636!16s%2Fg%2F11crt0dqlm?authuser=0&entry=ttu&g_ep=EgoyMDI0MTExNy4wIKXMDSoASAFQAw%3D%3D">430 Greenwood Dr., Hermitage, PA 16148</a>
                </div>
            </div>
        </RoundedBox>
        <RoundedBox>
            <div id="topleftbox">
                <h4>French</h4>
            </div>
            <div id="house-picture">
                <img id="images" src="../../public/French.png"></img>
            </div>
            <div id="house-info">
                <div id="phone">
                    <img src="../../public/Phone.svg"></img>
                    <p id="phonenumber">(724) 308-6526</p>
                </div>
                <div id="location">
                    <img src="../../public/Location.svg"></img>
                    <a id="address" target=_blank href="https://www.google.com/maps/place/1171+French+St,+Sharon,+PA+16146/@41.219115,-80.4902181,17z/data=!3m1!4b1!4m6!3m5!1s0x8833c03a99dd55af:0x6a50257bdcc2328b!8m2!3d41.219111!4d-80.4876378!16s%2Fg%2F11kxjt_dhy?authuser=0&entry=ttu&g_ep=EgoyMDI0MTExNy4wIKXMDSoASAFQAw%3D%3D">1171 French St., Sharon, PA 16146</a>
                </div>
            </div>
        </RoundedBox>
        <RoundedBox>
            <div id="topleftbox">
                <h4>Morefield</h4>
            </div>
            <div id="house-picture">
                <img id="images" src="../../public/Morefield.png"></img>
            </div>
            <div id="house-info">
                <div id="phone">
                    <img src="../../public/Phone.svg"></img>
                    <p id="phonenumber">(724) 308-7113</p>
                </div>
                <div id="location">
                    <img src="../../public/Location.svg"></img>
                    <a id="address" target=_blank href="https://www.google.com/maps/place/3885+Morefield+Rd+%239,+Hermitage,+PA+16148/@41.226673,-80.4392075,17z/data=!3m1!4b1!4m5!3m4!1s0x8833bf9443b5d789:0xac0184857975e753!8m2!3d41.226669!4d-80.4366272?authuser=0&entry=ttu&g_ep=EgoyMDI0MTExNy4wIKXMDSoASAFQAw%3D%3D">3885 Morefield Rd., Apt. 9, Hermitage, PA 16148</a>
                </div>
            </div>
        </RoundedBox>
        <RoundedBox>
            <div id="topleftbox">
                <h4>Shady</h4>
            </div>
            <div id="house-picture">
                <img id="images" src="../../public/Shady.png"></img>
            </div>
            <div id="house-info">
                <div id="phone">
                    <img src="../../public/Phone.svg"></img>
                    <p id="phonenumber">(724) 308-6451</p>
                </div>
                <div id="location">
                    <img src="../../public/Location.svg"></img>
                    <a id="address" target=_blank href="https://www.google.com/maps/place/1927+Shady+Dr,+Farrell,+PA+16121/@41.210328,-80.4768725,17z/data=!4m16!1m9!3m8!1s0x8833c01f63ec8ef1:0x880ac06ef000dbc7!2s1927+Shady+Dr,+Farrell,+PA+16121!3b1!8m2!3d41.2101333!4d-80.4768648!10e5!16s%2Fg%2F11c2qkw6yb!3m5!1s0x8833c01f63ec8ef1:0x880ac06ef000dbc7!8m2!3d41.2101333!4d-80.4768648!16s%2Fg%2F11c2qkw6yb?authuser=0&entry=ttu&g_ep=EgoyMDI0MTExNy4wIKXMDSoASAFQAw%3D%3D">1927 Shady Dr., Farrell, PA 16121</a>
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
