--[[
local function node(tag, inner)
	local state = ""
	local children = {}
	if tag then state = "<"..tag end
	if inner then
		state = state..">"..inner
	else
		state = state..">"
	end
	return {
		set = function(attr) for k, v in next, attr do state = state:gsub("<"..tag, "<"..tag.." "..k..'="'..v..'"') end end;
		insert = function(child)
			table.insert(children, child)
			inner = true
		end;
		close = function()
			for _, child in next, children do state = state..child.close() end
			if inner then state = state.."</"..tag..">" end
			return state
		end
	}
end



local doc = node("!doctype html")
local head = node("head")
local body = node("body")

local title = node("title", "My Awesome Page")
head.insert(title)

local header = node("h1", "Welcome to My Awesome Page!")
local paragraph = node("p", "This is a sample paragraph.")
local image = node("img")
image.set({src = "image.jpg", alt = "A sample image"})

body.insert(header)
body.insert(paragraph)
body.insert(image)

doc.insert(head)
doc.insert(body)

local final_html = doc.close()

print(final_html)
]]



local function readclose(iofunc, input)
	local handle = iofunc(input)
	return handle:read('a'), handle:close()
end

--[[
local doc = node('!doctype html')

do
	local style = node('link')
	style.set({rel = 'stylesheet', href = '../blocksrey/style.css'})
	doc.insert(style)
end
]]

--shared.insert('<!doctype html>')
--shared.insert('<link rel=stylesheet href=../blocksrey/style.css>')
--shared.insert('<a href=../blocksrey/index.htm><img src=../blocksrey/blocksrey.gif></a>')

--local homepage = node('!doctype html')

local homepage = ''

local function parse(info)
	homepage =
		homepage
		.."<a href='"..info.title..".htm'>"..info.title..'</a>'
	return
		'<title>'..info.title..'</title>'
		..'<h2><p>'..info.title..'</p></h2>'
		..'<p>'..info.content..'</p>'
		..'<p>'..info.modified..'</p>'
		..'<p>'..info.created..'</p>'
		..'</div>'
end

--[[
local function parse(info)
	--homepage.insert("<a href='"..info.title..".htm'>"..info.title..'</a>')

	--return shared.fetch()..info.content
	return ''
end
]]

local function escapes(str) return str:gsub("([ %&%*%?%(%)%[%]%{%}%$%;%<%>%|%'%\"%%%#%!%~%^%\\%/%`])", "\\%1") end

readclose(io.popen, 'rm *.htm')

local listed = readclose(io.popen, 'ls')

for fname in listed:gmatch('[^\n]+') do
	local path = fname..'/'..fname..'.plg'

	local ploghandle = io.open(path)

	if ploghandle then
		local info = {}

		info.title = fname
		info.content = readclose(io.popen, 'luajit Plogger/plogger.lua '..escapes(path))
		info.created = readclose(io.popen, 'stat '..escapes(path)..' | grep Birth')
		info.modified = readclose(io.popen, 'stat '..escapes(path)..' | grep Modify')

		local htmlhandle = io.open(fname..'.htm', 'w')
		htmlhandle:write(parse(info))
		htmlhandle:close()

		ploghandle:close()
	else
		print('Error io.opening '..path)
	end
end

local htmlhandle = io.open('index.htm', 'w')
htmlhandle:write(homepage)
htmlhandle:close()