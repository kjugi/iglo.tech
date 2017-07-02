<template>
    <section class="container">
        <ul class="post-list">
            <li class="post-list__item" v-for="post in posts" v-bind:key="post">
                <router-link :to="cutUrl(post.link)" class="post-list__link">
                    <time class="post-list__date">
                      {{ parseDate(post.date) }}
                    </time>
                    <h1 class="post-list__heading" v-html="post.title"></h1>
                    <p class="post-list__excerpt" v-html="post.excerpt"></p>
                </router-link>
            </li>
        </ul>
    </section>
</template>

<script>
    import Backend from '../../config/backend'

    export default {
        data() {
            return {
                posts: this.$store.getters.activeContent
            }
        },
        methods: {
            cutUrl(url) {
                return url.replace(`${Backend()}/`, '');
            },
            parseDate(date) {
                return new Date(Date.parse(date))
                    .toLocaleString(
                        'en-GB',
                        {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                        }
                    )
            }
        }
    }
</script>

<style lang="scss">
    .post-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin: 0;
        padding: 0;
        list-style: none;
        &__item {
            @media screen and (min-width: 700px) {
                width: 50%;
            }
        }
        &__link {
            display: block;
            padding: 20px;
            text-decoration: none;
            color: #000;
        }
        &__date {
            font-size: 12px;
            text-transform: uppercase;
        }
        &__heading {
            font-weight: bold;
            margin: 0;
        }
        &__excerpt {
            line-height: 1.5;
            img {
                max-width: 100%;
                height: auto;
            }
        }
    }
</style>
