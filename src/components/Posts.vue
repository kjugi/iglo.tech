<template>
    <section class="posts">
        <div class="loader" v-if="loading" v-cloak>
            <svg class="loader--icon">
                <loader fill="#1d1d1d"/>
            </svg>
            Loading...
        </div>
        <ul class="post-list" v-else>
            <li class="post-list__item" v-for="post in posts">
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
    import loader from '../assets/loader.svg'

    export default {
        name: 'Posts',
        components: {
            loader
        },
        data() {
            return {
                posts: [],
                loading: false,
            }
        },
        methods: {
            getPosts() {
                this.$http.get(`${Backend()}/wp-json/wp/v2/posts`, {
                    before: () => {
                        this.loading = true;
                    }
                })
                    .then(response => {
                        this.posts = response.body;
                    })
                    .then(() => {
                        this.loading = false;
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
    .posts {
        width: 90%;
        max-width: 1000px;
        margin: auto;
    }

    .loader {
        display: flex;
        flex-direction: column;
        align-items: center;

        &--icon {
            display: block;
            width: 100%;
            max-width: 100px;
            height: 50px;
        }
    }

    .loader-svg { 
        opacity: 0; 
        animation: hideShow 1s ease infinite; 
    } 
    
    @keyframes hideShow { 
        0% { 
            opacity: 0;
        }
        50% {
            opacity: 1;
        } 
        100% {
            opacity: 0;
        } 
    }

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
