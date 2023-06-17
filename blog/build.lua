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
--]]



local function readclose(iofunc, input)
	local handle = iofunc(input)
	return handle:read('a'), handle:close()
end









local function parseplog(path)
	local state = ''
	local title = path:gsub('\\', ''):match("/(.*)"):sub(1, -5)
	state = state..'<title>'..title..'</title>'
	state = state..'<link href="../blocksrey/style.css" rel=stylesheet>'
	state = state..'<a href="index.htm">Backtrack</a>'

	do
		local content = readclose(io.open, path)

		--Iterate through the lines of the file, looking for headers
		local toc = {}
		for line in content:gmatch('%[(.-)]') do
			table.insert(toc, line)
		end
		tochtm = ''
		if #toc > 0 then
			tochtm = '<h3 align=center>CHAPTERS</h3>'
			local tocstuff = ''
			for i, v in next, toc do
				tocstuff = tocstuff..i..'. '..'<a href="#'..v:upper()..'">'..v..'</a><br>'
			end
			tochtm = tochtm..'<table align=center cellpadding=0 cellspacing=0><td>'..tocstuff..'</td></table>'
		end
		state = state..tochtm

		state = state..'<h1 align=center><a href="'..title..'.htm">'..title..'</a></h1>'

		content = content:gsub('<([%w_/%.%?%%=~&-]+%.(%w+))>', function(path, ext)
			ext = ext:lower()
			path = title..'/'..path
			if ext == 'jpg' or ext == 'png' or ext == 'gif' or ext == 'webp' then
				return '<div align=center><img height=200 src="'..path..'"></div>'
			elseif ext == 'mp4' or ext == 'ogg' or ext == 'webm' or ext == 'mov' then
				return '<div align=center><video height=200 src="'..path..'" controls></video></div>'
			end
		end)

		content = content:gsub('%(([%w_/%.%?%%=~&-]+)%)', function(path)
			return '<a href="'..title..'/'..path..'">'..path..'</a>'
		end)

		content = content:gsub('%[([^\n]+)%]', function(match)
			local uppered = match:upper()
			return '<h3 id="'..uppered..'">'..uppered..'</h3>'
		end)

		content = (content..'\n\n'):gsub('([^\n]+)(\n\n)', '<p align=left>%1</p>')--Add <p> tags around paragraphs

		state = state..content
	end

	state = state..'<img src=../blocksrey/barbed_wire.gif>'

	local plogfiles = ''
	plogfiles = plogfiles..'<h3>FILES CONTAINED IN THIS PLOG</h3>'
	local listed = readclose(io.popen, 'ls "'..title..'"')--this will break if there are double quotes in the name
	for filename in listed:gmatch('[^\n]+') do
		plogfiles = plogfiles..'<a href="'..title..'/'..filename..'">'..filename..'</a><br>'
	end
	plogfiles = '<table align=right><td>'..plogfiles..'</td></table>'

	state = state..plogfiles

	state = state..'<div align=center><font size=1><img src=../blocksrey/barrio_logo_huge.gif align=texttop><a href=../puniko/index.htm>&copy 2022, Jeffrey Skinner. All rights reserved.</a></font></div>'

	return state
end






readclose(io.popen, 'rm *.htm')

local homehtm = ''
homehtm = homehtm..'<title>Enter the Plog</title>'
homehtm = homehtm..'<link href="../blocksrey/style.css" rel=stylesheet>'
homehtm = homehtm..'<a href="../index.htm">Backtrack</a>'

homehtm = homehtm..'<h3 align=right>Ancient chronicles litter this asylum...</h3>'

local list = ''
local listed = readclose(io.popen, 'ls')
for title in listed:gmatch('[^\n]+') do
	local path = title..'/'..title..'.plg'

	local ploghandle = io.open(path)
	if ploghandle then
		list = list..'<li><a href="'..title..'.htm">'..title..'</a></li>'

		local handle = io.open(title..'.htm', 'w')
		handle:write(parseplog(path))
		handle:close()

		ploghandle:close()
	end
end

homehtm = homehtm..list

homehtm = homehtm..'<img src=../blocksrey/barbed_wire.gif>'
homehtm = homehtm..'<div align=center><font size=1><img src=../blocksrey/barrio_logo_huge.gif align=texttop><a href=../puniko/index.htm>&copy 2022, Jeffrey Skinner. All rights reserved.</a></font></div>'

local handle = io.open('index.htm', 'w')
handle:write(homehtm)
handle:close()