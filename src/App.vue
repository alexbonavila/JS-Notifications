<template>
<div class="container">
    <div class="row">
    <div class="col-md-12">
    <onesignal></onesignal>
    </div>
    </div>
    </div>
    </template>

    <script>
import Onesignal from './components/Onesignal.vue'
export default {
    components: {
        Onesignal
    }
}
</script>

<style>
body {
    font-family: Helvetica, sans-serif;
    background-color: whitesmoke;
}
</style>