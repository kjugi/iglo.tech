<template>
    <section class="post container">
        <time class="post__date">
            {{ parseDate(post.date) }}
        </time>
        <h1 class="post__heading" v-html="post.title"></h1>
        <article class="post__content" v-html="post.content"></article>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                postId: null
            }
        },
        computed: {
            post() {
                return this.$store.state.posts[this.postId] || {}
            }
        },
        methods: {
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
        },
        created() {
            this.postId = this.$route.params.id
            this.$store.dispatch('getPost', this.postId)
        }
    }
</script>

<style lang="scss">
    .post {
        max-width: 700px;
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
</style>
