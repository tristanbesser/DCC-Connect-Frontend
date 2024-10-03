
<template>
    <div class="rounded-box">
      <slot></slot>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RoundedBox',
  };
  </script>
  
  <style scoped>
  .rounded-box {
    display: flex;
    flex-direction: column;
    padding: 20px;
    width: 624px;
    background: white;
    border-radius: 15px;
  }
  </style>
  