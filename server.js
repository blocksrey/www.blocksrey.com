const http = require("http");
const fs = require("fs");

const port = 3000;

const types = {
	html: "text/html",
	ico: "image/x-icon",
	jpg: "image/jpeg",
	png: "image/png",
	gif: "image/gif",
	css: "text/css",
	js: "text/javascript",
};

var server = http
	.createServer(function (request, response) {
		fs.readFile("." + request.url, function (error, data) {
			if (error) response.end("You don't belong here...");
			else {
				var type =
					types[request.url.substr(request.url.lastIndexOf(".") + 1)] ||
					"text/plain";
				response.setHeader("Content-Type", type);
				response.end(data);
				console.log(request.url, type);
			}
		});
	})
	.listen(port);

console.log("Hosted on port: " + port);
