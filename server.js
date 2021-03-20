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

function getRequestOrigin(request) {
	return request.headers["x-forwarded-for"] || request.connection.remoteAddress;
}

http
	.createServer(function (request, response) {
		var origin = getRequestOrigin(request);
		console.log(origin);
		fs.appendFile("history", origin + "\n", function (error) {
			if (error) console.log("Write error");
		});
		fs.readFile("." + request.url, function (error, data) {
			if (error) response.end(origin + ", you don't belong here...");
			else {
				var type =
					types[request.url.substr(request.url.lastIndexOf(".") + 1)] ||
					"text/plain";
				response.setHeader("Content-Type", type);
				response.end(data);
				//console.log(request.url, type);
			}
		});
	})
	.listen(port);

console.log("Hosted on port: " + port);
