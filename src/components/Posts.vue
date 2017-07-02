<template>
    <section class="container">
        <ul class="post-list">
            <li class="post-list__item" v-for="post in posts" v-bind:key="post">
                <router-link :to="cutUrl(post.link)" class="post-list__link">
                    <time class="post-list__date">
                      {{ parseDate(post.date) }}
                    </time>
                    <h1 class="post-list__heading" v-html="post.title.rendered"></h1>
                    <p class="post-list__excerpt" v-html="post.excerpt.rendered"></p>
                </router-link>
            </li>
        </ul>
    </section>
</template>

<script>
    import Backend from '../../config/backend'

    export default {
        name: 'Posts',
        data() {
            return {
                posts: []
            }
        },
        methods: {
            getPosts() {
                this.$http.get(`${Backend()}/wp-json/wp/v2/posts`)
                    .then(response => {
                        this.posts = response.body;
                    });
            },
            cutUrl(url) {
                return url.replace(`${Backend()}/`, '');
            },
            parseDate(date) {
                return new Date(
                    Date.parse(date)).toLocaleString(
                        'en-GB',
                        {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                        }
                    )
            }
        },
        created() {
            this.getPosts()
        },
        watch: {
            '$route' (to, from) {
                this.getPosts()
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
