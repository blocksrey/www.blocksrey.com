local DEFAULT_PAGE_FOLDER = "nullgame"
local DEFAULT_PAGE_FILE = "index.html"

local https = require("https")

local function openClose(path, mode, func, ...)
	local file = io.open(path, mode)
	if file then
		return
			file[func](file, ...),
			file:close()
	end
end

local function readClose(path)
	return openClose(path, "r", "read", "a")
end

local function URLS_URLO(URLS)
	local URLO = {}
	for string in URLS:gmatch("([^/]+)") do
		table.insert(URLO, string)
	end
	return URLO
end

local function URLO_URLS(URLO)
	return table.concat(URLO, "/")
end

local cache = {}

local function fetch(URLO)
	local URLS = URLO_URLS(URLO)
	if not cache[URLS] then
		cache[URLS] = readClose(URLS)
	end
	return cache[URLS]
end

local directories = {}

for directory in io.popen("ls -d */"):lines() do
	directories[directory:sub(1, -2)] = true
end

local function readURLO(URLO)
	if URLO[1] then
		if directories[URLO[1]] then
			local contents = fetch(URLO)
			if contents then
				return contents
			end
			table.insert(URLO, DEFAULT_PAGE_FILE)
			return fetch(URLO)
		else
			table.insert(URLO, 1, DEFAULT_PAGE_FOLDER)
			return fetch(URLO)
		end
	else
		return fetch({DEFAULT_PAGE_FILE})
	end
end

local options = {
	ca = readClose("ssl/intermediate.cert.pem");
	cert = readClose("ssl/domain.cert.pem");
	key = readClose("ssl/private.key.pem");
}

local function onRequest(request, response)
	response:finish(readURLO(URLS_URLO(request.url)))
end

https.createServer(options, onRequest):listen(443)

print("Listening...")