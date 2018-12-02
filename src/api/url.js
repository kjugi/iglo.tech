const isDev = process.env.NODE_ENV === 'development' || false

export default isDev ? 'http://localhost:3000' : '/api'
