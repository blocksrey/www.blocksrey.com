local DEFAULT_PAGE_FOLDER = 'blocksrey'
local DEFAULT_PAGE_FILE = 'page.htm'

local https = require('https')

local function openClose(path, mode, func, ...)
	local file = io.open(path, mode)
	if file then
		return
			file[func](file, ...),
			file:close()
	end
end

local function readClose(path)
	return openClose(path, 'r', 'read', 'a')
end

local function URLS_URLO(URLS)
	local URLO = {}
	for string in URLS:gmatch('([^/]+)') do
		table.insert(URLO, string)
	end
	return URLO
end

local function URLO_URLS(URLO)
	return table.concat(URLO, '/')
end

local function URLS_URLSE(URLS)
	return URLS:match('[^.]+$')
end

local URLSE_MIME_ = {}
URLSE_MIME_.htm = 'text/html'
URLSE_MIME_.css = 'text/css'
URLSE_MIME_.js = 'text/javascript'
URLSE_MIME_.ico = 'image/x-icon'
URLSE_MIME_.png = 'image/png'
URLSE_MIME_.jpg = 'image/jpeg'
URLSE_MIME_.gif = 'image/gif'
URLSE_MIME_.glsl = 'text/plain'
URLSE_MIME_.swf = 'application/x-shockwave-flash'
URLSE_MIME_.wasm = 'application/wasm'

local function URLS_MIME(URLS)
	local URLSE = URLS_URLSE(URLS)
	return
		URLSE_MIME_[URLSE] or
		print('No type for:'..URLS)
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

for directory in io.popen('ls -d */'):lines() do
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

local function readURLO(URLO)
	if #URLO == 0 then
		table.insert(URLO, DEFAULT_PAGE_FOLDER)
		table.insert(URLO, DEFAULT_PAGE_FILE)
	elseif not fetch(URLO) then
		table.insert(URLO, 1, DEFAULT_PAGE_FOLDER)
	end
	return fetch(URLO)
end

local options = {
	ca = readClose('ssl/intermediate.cert.pem');
	cert = readClose('ssl/domain.cert.pem');
	key = readClose('ssl/private.key.pem');
}

local function onRequest(request, response)
	local data = readURLO(URLS_URLO(request.url))
	if data then
		response:setHeader('Content-Type', URLS_MIME(request.url))
	end
	response:finish(data)
end

https.createServer(options, onRequest):listen(443)

print('Listening...')