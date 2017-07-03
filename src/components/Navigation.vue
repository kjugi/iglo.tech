<template>
    <nav class="navigation">
        <button class="menu-trigger"
                v-bind:class="{ 'menu-trigger--open': isMenuOpen }"
                v-on:click="toggleMenu"
        >
            <div class="menu-trigger__icon">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <span class="menu-trigger__label">
                Menu
            </span>
        </button>
        <ul class="main-menu"
            v-bind:class="{ 'main-menu--open': isMenuOpen }"
        >
            <li v-for="item in menu">
                <router-link :to="item.url" class="main-menu__item">
                    {{ item.title }}
                </router-link>
            </li>
        </ul>
    </nav>
</template>
<script>
    import Backend from '../../config/backend'

    export default {
        name: 'Navigation',
        data() {
            return {
                menu: [],
                isMenuOpen: false
            }
        },
        methods: {
            getMenu() {
                this.$http.get(`${Backend()}/wp-json/headless/v1/menu/main-menu`)
                    .then(response => {
                        this.parseMenuData(response.body)
                    });
            },
            parseMenuData(data) {
                data.forEach(function (item) {
                    // To get flat structure
                    if (item.menu_item_parent === "0") {
                        this.menu.push({
                            title: item.title,
                            url: this.cutUrl(item.url)
                        })
                    }
                }, this);
            },
            cutUrl(url) {
                return url.replace(`${Backend()}`, '');
            },
            toggleMenu() {
                this.isMenuOpen = !this.isMenuOpen
            },
            closeMenu() {
                this.isMenuOpen = false
            }
        },
        created() {
            this.getMenu()
        },
        watch: {
            '$route' (to, from) {
                this.closeMenu()
            }
        }
    }
</script>

<style lang="scss">
    .navigation {
        @media (min-width: 600px) {
            display: flex;
            align-items: center;
            width: 100%;
            background: #16a085;
        }
    }

    .menu-trigger {
        position: absolute;
        top: 10px;
        left: 10px;
        padding: 5px;
        margin: 0;
        z-index: 20;
        background: none;
        outline: none;
        border: none;
        cursor: pointer;

        @media (min-width: 600px) {
            display: none;
        }

        &--open {
            .menu-trigger__icon {
                span {
                    &:nth-child(1) {
                        top: calc(50% - 3px);
                        transform: rotate(135deg);
                    }

                    &:nth-child(2) {
                        opacity: 0;
                        left: -100%;
                    }

                    &:nth-child(3) {
                        bottom: calc(50% - 3px);
                        transform: rotate(-135deg);
                    }
                }
            }
        }

        &__icon {
            position: relative;
            display: block;
            margin: auto;
            width: 40px;
            height: 30px;
            span {
                display: block;
                position: absolute;
                left: 0;
                height: 6px;
                width: 100%;
                background: #1abc9c;
                border-radius: 9px;
                opacity: 1;
                transition: all 300ms ease-in-out;

                &:nth-child(1) {
                    top: 0;
                }

                &:nth-child(2) {
                    top: 0;
                    bottom: 0;
                    margin: auto;
                }

                &:nth-child(3) {
                    bottom: 0;
                }
            }
        }
        &__label {
            display: block;
            margin-top: 8px;
            text-align: center;
            text-transform: uppercase;
            color: #1abc9c;
        }
    }

    .main-menu {
        position: fixed;
        z-index: 10;
        top: 0;
        left: 100%;
        width: calc(100% - 80px);
        height: 100vh;
        margin: 0;
        padding: 20px;
        list-style: none;
        background: #16a085;
        transition: transform 300ms ease-in-out;

        @media screen and (min-width: 600px) {
            position: static;
            display: flex;
            align-items: center;
            height: auto;
            width: auto;
            margin: auto;
            padding: 0;
        }

        &--open {
            transform: translateX(-100%);
        }

        &__item {
            display: block;
            padding: 20px;
            text-decoration: none;
            color: #fff;
            text-transform: uppercase;
            transition: all 300ms ease-in-out;
            &.router-link-active {
                background: rgba(255, 255, 255, 0.2);
            }
        }
    }
</style>
