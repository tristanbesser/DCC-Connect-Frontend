<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '@/components/Navbar.vue';

const router = useRouter();

defineOptions({
    name: 'request-time-off',
});

const startDate = ref('');
const endDate = ref('');
const comment = ref('');

const handleSubmit = () => {
    console.log('Start Date:', startDate.value);
    console.log('End Date:', endDate.value);
    console.log('Comment:', comment.value);

    router.push('/time-off');
};
</script>

<template>
    <Navbar></Navbar>
    <div id="request-page">
        

        <h1 id="page-title">Request Time Off</h1>

        <div id="form-container">
            <div class="form-group">
                <label for="startDate">Start Date:</label>
                <input type="date" id="startDate" v-model="startDate" />
            </div>

            <div class="form-group">
                <label for="endDate">End Date:</label>
                <input type="date" id="endDate" v-model="endDate" />
            </div>

            <div class="form-group">
                <label for="comment">Comment:</label>
                <textarea
                    id="comment"
                    v-model="comment"
                    placeholder="Reason for request..."
                ></textarea>
            </div>

            <div id="submit-button-container">
                <button @click="handleSubmit" class="action-button">Submit</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Main container */
#request-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    min-height: 100vh;
    background-color: var(--background);
    color: var(--text1);
    padding: 0;
    margin: 0;
}

/* Page title */
#page-title {
    font-size: 32px;
    font-weight: bold;
    text-align: center;
    color: var(--text1);
    margin: 20px 0;
    border-bottom: 4px solid var(--first);
    padding-bottom: 10px;
    width: 60%;
}

/* Form container */
#form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60%;
    margin: 20px auto;
    background-color: var(--background-light);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

/* Form groups */
.form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    width: 100%;
}

label {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
    color: var(--text2);
}

input,
textarea {
    padding: 10px;
    font-size: 14px;
    border: 1px solid var(--text2);
    border-radius: 5px;
    width: 100%;
    background-color: var(--input-background);
}

/* Textarea styling */
textarea {
    resize: none;
    height: 100px;
}

/* Submit button container */
#submit-button-container {
    margin-top: 20px;
    width: 100%;
}

/* Action button */
.action-button {
    width: 100%;
    padding: 10px 20px;
    background-color: var(--second);
    color: var(--text1);
    border: none;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    text-align: center;
}

.action-button:hover {
    background-color: var(--first);
    color: var(--background);
}
</style>
