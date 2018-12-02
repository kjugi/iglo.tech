<template>
    <footer class="footer">
        &copy; Copyright iglo.tech 2016 - {{ getYear }}
    </footer>
</template>

<script>
    export default {
        computed: {
            getYear() {
                return new Date().getFullYear()
            }
        }
    }
</script>

<style lang="scss">
    .footer {
        padding: 20px;
        text-align: center;
        background: #1d1d1d;
        color: #fff;
    }
</style>
