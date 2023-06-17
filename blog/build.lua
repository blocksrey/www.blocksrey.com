--[[
local function node(tag, inner)
	local state = '
	local children = {}
	if tag then
		state = '<'..tag
	end
	if inner then
		state = state..'>'..inner
	else
		state = state..'>'
	end
	return {
		set = function(attr) for k, v in next, attr do
			state = state:gsub('<'..tag, '<'..tag..' '..k..'='..v..')
			end
		end;
		insert = function(child)
			table.insert(children, child)
			inner = true
		end;
		close = function()
			for _, child in next, children do
				state = state..child.close()
			end
			if inner then
				state = state..'</'..tag..'>'
			end
			return state
		end
	}
end



local doc = node('!doctype htm')
local head = node('head')
local body = node('body')

local title = node('title', 'My Awesome Page')
head.insert(title)

local header = node('h1', 'Welcome to My Awesome Page!')
local paragraph = node('p', 'This is a sample paragraph.')
local image = node('img')
image.set({src = 'image.jpg', alt = 'A sample image'})

body.insert(header)
body.insert(paragraph)
body.insert(image)

doc.insert(head)
doc.insert(body)

local finalhtm = doc.close()

print(finalhtm)
]]



local function readclose(iofunc, input)
	local handle = iofunc(input)
	return handle:read('a'), handle:close()
end









local function parseplog(path)
	local title = path:gsub('\\', ''):match("/(.*)"):sub(1, -5)
	local file = io.open(path)
	local state = file:read('a')
	file:close()

	state = state..'<title>'..title..'</title>'
	state = state..'<link href="../blocksrey/style.css" rel=stylesheet>'

	state = state..'<p align=left><a href="index.htm">Back</a></p>'
	state = state..'<img src=../blocksrey/horizontal_rule.gif>'
	state = state..'<p align=left><a href="'..title..'.htm"><h1>'..title..'</h1></a></p>'

	--Iterate through the lines of the file, looking for headers
	local toc = {}
	for line in state:gmatch('%[(.-)]') do
		table.insert(toc, line)
	end
	if #toc > 0 then
		tochtm = '<h2>TOC</h2>'
		for i, v in next, toc do
			tochtm = tochtm..i..'. '..'<a href="#'..v..'">'..v..'</a><br>'
		end
		tochtm = '<div align=left>'..tochtm..'</div>'
	else
		tochtm = ''
	end
	state = state..tochtm

	state = state:gsub('<([%w_/%.%?%%=~&-]+%.(%w+))>', function(path, ext)
		ext = ext:lower()
		path = title..'/'..path
		if ext == 'jpg' or ext == 'jpeg' or ext == 'png' or ext == 'gif' or ext == 'webp' then
			return '<div align=center><img height=200 src="'..path..'"></div>'
		elseif ext == 'mp4' or ext == 'ogg' or ext == 'webm' or ext == "mov" then
			return '<video src="'..path..'" controls></video>'
		end
	end)

	state = state:gsub('%(([%w_/%.%?%%=~&-]+)%)', function(path)
		return '<a href="'..title..'/'..path..'">'..path..'</a>'
	end)

	state = state:gsub('%[([^\n]+)%]', '<h2 id="%1">%1</h2>')--Create paragraph headers
	state = (state..'\n\n'):gsub('([^\n]+)(\n\n)', '<p align=left>%1</p>')--Add <p> tags around paragraphs

	state = state..'<img src=../blocksrey/horizontal_rule.gif>'

	state = state..'<h3>Files contained in this Plog:</h3>'
	local listed = readclose(io.popen, 'ls "'..title..'"')--this will break if there are double quotes in the name
	for filename in listed:gmatch('[^\n]+') do
		state = state..'<p align=left><a href="'..title..'/'..filename..'">'..filename..'</a></p>'
	end

	return state
end




--[[
local doc = node('!doctype htm')

do
	local style = node('link')
	style.set({rel = 'stylesheet', href = '../blocksrey/style.css'})
	doc.insert(style)
end
]]

--shared.insert('<!doctype htm>')
--shared.insert('<link rel=stylesheet href=../blocksrey/style.css>')
--shared.insert('<a href=../blocksrey/index.htm><img src=../blocksrey/blocksrey.gif></a>')

--local homehtm = node('!doctype htm')

local homehtm = ''
homehtm = homehtm..'<title>Enter the Plog</title>'
homehtm = homehtm..'<link href="../blocksrey/style.css" rel=stylesheet>'

local function parse(info)
	homehtm = homehtm..'<br><a href="'..info.title..'.htm">'..info.title..'</a>'
	return info.content
end

readclose(io.popen, 'rm *.htm')

local listed = readclose(io.popen, 'ls')

for title in listed:gmatch('[^\n]+') do
	local path = title..'/'..title..'.plg'

	local ploghandle = io.open(path)
	if ploghandle then
		local info = {}

		info.title = title
		info.content = parseplog(path)

		local handle = io.open(title..'.htm', 'w')
		handle:write(parse(info))
		handle:close()

		ploghandle:close()
	end
end

homehtm = homehtm..'<p align=left><a href="../index.htm">Back</a></p>'
homehtm = homehtm..'<img src=../blocksrey/horizontal_rule.gif>'
homehtm = homehtm..'<h2>An uncharted novel awaits you...</h2>'
homehtm = '<div align=left>'..homehtm..'</div>'

local handle = io.open('index.htm', 'w')
handle:write(homehtm)
handle:close()