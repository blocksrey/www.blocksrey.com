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








local romanmap = {
	{1000, 'M'},
	{900, 'CM'},
	{500, 'D'},
	{400, 'CD'},
	{100, 'C'},
	{90, 'XC'},
	{50, 'L'},
	{40, 'XL'},
	{10, 'X'},
	{9, 'IX'},
	{5, 'V'},
	{4, 'IV'},
	{1, 'I'}
}

local function roman(number)
	local roman = ''

	for i = 1, #romanmap do
		local pair = romanmap[i]
		local value = pair[1]
		local numeral = pair[2]
		while number >= value do
			roman = roman..numeral
			number = number - value
		end
	end

	return roman
end





local function readclose(handle)
	return handle:read('a'), handle:close()
end




local function parseplog(path)
	local state = ''
	local title = path:gsub('\\', ''):match('/(.*)'):sub(1, -5)
	state = state..'<title>'..title..'</title>'--title
	state = state..'<link href=../shared/style.css rel=stylesheet>'--stylesheet
	state = state..'<a href=index.htm>Backtrack</a>'--back button

	do
		local plogsrc = readclose(io.open(path))

		plogsrc = plogsrc:gsub('*([%a ]+)*', '<b>%1</b>')--boldify
		plogsrc = plogsrc:gsub('_([%a ]+)_', '<u>%1</u>')--underline
		plogsrc = plogsrc:gsub('/([%a ]+)/', '<i>%1</i>')--italicize

		plogsrc = plogsrc:gsub('\n\n*', '\n')--newlines
		plogsrc = (plogsrc..'\n'):gsub('%s*(.-)%s*\n', '<p>%1</p>')--paragraphs
		plogsrc = plogsrc:gsub('%((https?://%S+)%)', '(<a href="%1">%1</a>)')--hyperlinks

		--table of contents
		local toc = {}
		for line in plogsrc:gmatch('%[(.-)]') do
			table.insert(toc, line)
		end
		tochtm = ''
		if #toc > 0 then
			tochtm = '<h3 align=center>CHAPTERS</h3>'
			local tocstuff = ''
			for i, v in next, toc do
				tocstuff = tocstuff..roman(i)..'. <a href="#'..v..'">'..v..'</a><br>'
			end
			tochtm = tochtm..'<table align=center cellpadding=0 cellspacing=0><td>'..tocstuff..'</td></table>'
		end
		state = state..tochtm

		state = state..'<h1 align=center><a href="'..title..'.htm">'..title..'</a></h1>'--title header

		--embedded videos
		plogsrc = plogsrc:gsub('<([%w_%s/%.%?%%=~&-]+%.(%w+))>', function(path, ext)
			ext = ext:lower()
			path = title..'/'..path
			if ext == 'jxl' or ext == 'jpg' or ext == 'png' or ext == 'gif' or ext == 'webp' then
				return '<div align=center><img height=140 src="'..path..'"></div>'
			elseif ext == 'mkv' or ext == 'mp4' then
				return '<div align=center><video height=140 src="'..path..'" controls loop></video></div>'
			elseif ext == 'flac' or ext == 'ogg' or ext == 'mp3' then
				return '<div align=center><audio src="'..path..'"></audio></div>'
			end
		end)

		--paragraph headers
		plogsrc = plogsrc:gsub('<p>%[(.-)%]</p>', function(heading)
			return '<h3 id="'..heading..'">'..heading:upper()..'</h3>'
		end)

		state = state..plogsrc
	end

	state = state..'<img src=../shared/barbed_wire.gif>'

	local plogfiles = ''
	plogfiles = plogfiles..'<h3>FILES CONTAINED IN THIS PLOG</h3>'
	local listed = readclose(io.popen('ls "'..title..'"'))--this will break if there are double quotes in the name
	for filename in listed:gmatch('[^\n]+') do
		plogfiles = plogfiles..'* <a href="'..title..'/'..filename..'">'..filename..'</a><br>'
	end
	plogfiles = '<table align=right><td>'..plogfiles..'</td></table>'

	state = state..plogfiles

	state = state..'<div align=center><font size=1><img src=../shared/barrio_logo_huge.gif align=texttop><a href=../puniko/index.htm>Copyright (c) 2023 Jeffrey Skinner. All rights reserved.</a></font></div>'

	return state
end






readclose(io.popen('rm *.htm'))

local homehtm = ''
homehtm = homehtm..'<title>Enter the Plog</title>'
homehtm = homehtm..'<link href=../shared/style.css rel=stylesheet>'
homehtm = homehtm..'<a href=../index.htm>Backtrack</a>'

homehtm = homehtm..'<h3 align=right>Ancient chronicles litter this asylum...</h3>'

local list = ''
local listed = readclose(io.popen('ls'))
for title in listed:gmatch('[^\n]+') do
	local path = title..'/'..title..'.plg'

	local ploghandle = io.open(path)
	if ploghandle then
		list = list..'* <a href="'..title..'.htm">'..title..'</a><br>'

		local handle = io.open(title..'.htm', 'w')
		handle:write(parseplog(path))
		handle:close()

		ploghandle:close()
	else
		print('error opening '..path)
	end
end

homehtm = homehtm..list

homehtm = homehtm..'<img src=../shared/barbed_wire.gif>'
homehtm = homehtm..'<div align=center><font size=1><img src=../shared/barrio_logo_huge.gif align=texttop><a href=../puniko/index.htm>Copyright (c) 2023 Jeffrey Skinner. All rights reserved.</a></font></div>'

local handle = io.open('index.htm', 'w')
handle:write(homehtm)
handle:close()