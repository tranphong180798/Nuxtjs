const middleware = {}

middleware['class'] = require('..\\middleware\\class.js')
middleware['class'] = middleware['class'].default || middleware['class']

export default middleware
