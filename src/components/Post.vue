
<template>
    <div class="loader" v-if="loading" v-cloak>
        <svg class="loader--icon">
            <loader fill="#1d1d1d"/>
        </svg>
        Loading...
    </div>
    <section class="post" v-else>
        <time class="post__date">
            {{ parseDate(post.post_date) }}
        </time>
        <h1 class="post__heading">
            {{ post.post_title }}
        </h1>
        <article class="post__content" v-html="post.post_content"></article>
    </section>
</template>

<script>
    import Backend from '../../config/backend'
    import loader from '../assets/loader.svg'

    export default {
        data() {
            return {
                post: false,
                loading: false
            }
        },
        components: {
            loader
        },
        methods: {
            getPost() {
                this.$http.get(`${Backend()}/wp-json/headless/v1/post-by-url${this.$route.path}`, {
                    before: () => {
                        this.loading = true;
                    }
                })
                    .then(response => {
                        this.post = response.body;
                    })
                    .then(() => {
                        this.loading = false;
                    });
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
            this.getPost()
        },
        watch: {
            '$route' (to, from) {
                this.getPost()
            }
        }
    }
</script>

<style lang="scss">
    .post {
        width: 90%;
        max-width: 700px;
        margin: auto;
        padding: 20px 0;

        &__date {
            font-size: 12px;
            text-transform: uppercase;
        }
        &__heading {
            font-weight: bold;
            margin: 0;
        }
        &__content {
            margin: 20px 0;
            font-size: 18px;
            line-height: 1.6;
            img,
            video {
                display: block;
                width: auto;
                height: auto;
                max-width: 100%;
                margin: 20px auto;
            }
            a {
                color: #3498db;
                font-weight: bold;
                text-decoration: none;
                transition: color 300ms ease-in-out;
                &:hover {
                    color: #2980b9;
                }
                &:visited {
                    color: #9b59b6;
                    &:hover {
                        color: #8e44ad;
                    }
                }
            }
            blockquote {
                position: relative;
                margin: 10px 0;
                padding: 10px 20px;
                &:before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: 100%;
                    width: 10px;
                    background: #eee;
                }
            }
            pre {
                width: 100%;
                padding: 20px;
                overflow: scroll;
                background: #eee;
            }
        }
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
</style>
