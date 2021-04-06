local https = require("https")

local options = {
	key = io.open("ssl/private.key.pem"):read("a");
	cert = io.open("ssl/domain.cert.pem"):read("a");
	ca = io.open("ssl/intermediate.cert.pem"):read("a");
}

https.createServer(options, function(request, response)
	local handle = io.open("."..request.url)
	if handle then
		response:finish(handle:read("a"))
		handle:close()
	else
		response:finish()
	end
end):listen(443)