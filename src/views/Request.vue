<script setup lang="ts">

import { faAlignJustify } from '@fortawesome/free-solid-svg-icons/faAlignJustify';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '@/components/Navbar.vue';


const router = useRouter();

defineOptions({
    name: 'request',
});

const startDate = ref('');
const endDate = ref('');
const comment = ref('');

const handleSubmit = () => {
    console.log("Start Date:", startDate.value);
    console.log("End Date:", endDate.value);
    console.log("Comment:", comment.value);

    router.push('/time-off');
};

</script>
<template>
    <Navbar></Navbar>
    <h1>Request Time Off</h1>
    <div id="InputFields">
        <p> Start Date: </p>
        <input type="date" v-model="startDate" />
    </div>
    <div>
        <p> End Date: </p>
        <input type="date" v-model="endDate" />
    </div>
    <div>
        <p> Comment: </p>
        <textarea v-model="comment" placeholder="Reason for request:"></textarea>
    </div>
    <div>
            <button @click="handleSubmit">Submit</button>
        </div>
</template>

<style scoped>
#request-container {
    display: flex;
    flex-direction: column;

}
</style>