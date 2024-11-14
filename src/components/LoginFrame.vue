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
    justify-content: center;
    padding: 20px;
    width: 624px;
    background: white;
    border-radius: 15px;
    box-shadow: 0px 0px 8px 6px #C0C0C0;
  }
  </style>
