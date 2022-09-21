// Node.bs by Jeff Skinner

let https = require('https') // More like, express
let fs = require('fs')

let PORT = 443

let options = {
	key: fs.readFileSync('ssl/private.key.pem'),
	cert: fs.readFileSync('ssl/domain.cert.pem'),
	ca: fs.readFileSync('ssl/intermediate.cert.pem'),
}

let types = {
	html: 'text/html',
	ico: 'image/x-icon',
	jpg: 'image/jpeg',
	png: 'image/png',
	gif: 'image/gif',
	css: 'text/css',
	js: 'text/javascript',
	wasm: 'application/wasm',
	otf: 'font/otf',
}

function getRequestOrigin(request) {
	return request.headers['x-forwarded-for'] || request.connection.remoteAddress // Still don't get this
}

function getRequestDestinationMIME(request) {
	return (
		types[request.url.substr(request.url.lastIndexOf('.') + 1)] || 'text/plain' // Don't like anything after ||
	)
}

// readFileAsync?
function getRequestFileData(URL) {
	fs.readFile('.' + URL, (error, data) => {
		if (error) return null
		else return data
	})
}

function parseURL(url) {
	return 'blocksrey' + url + (url === '/' && 'index.htm' || '')
}

https
	.createServer(options, (request, response) => {
		let origin = getRequestOrigin(request)
		// console.log(origin)
		fs.appendFile('dynamic/history', origin + '\n', (error) => {
			if (error) console.log('Write error')
		})
		fs.readFile('.' + request.url, (error, data) => {
			if (error)
				fs.readFile('.' + request.url, (error, data) => {
					if (error) response.end(origin + ", you don't belong here...")
					else {
						response.setHeader(
							'Content-Type',
							getRequestDestinationMIME(request)
						)
						response.end(data)
					}
				})
			else {
				// console.log(getRequestDestinationMIME(request))
				response.setHeader('Content-Type', getRequestDestinationMIME(request))
				response.end(data)
			}
		})
	})
	.listen(PORT)

console.log('Hosted on port: ' + PORT)
