<template>
    <header class="header">
        <router-link :to="'/'" class="header__logo">
            <logo fill="#fff"/>
        </router-link>
    </header>
</template>

<script>
    import Logo from '../assets/logo.svg'

    export default {
        components: {
            Logo
        }
    }
</script>

<style lang="scss">
    .header {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #1d1d1d;
        &__logo {
            display: block;
            width: 100%;
            max-width: 250px;
            padding: 40px 20px;
        }
    }
</style>
