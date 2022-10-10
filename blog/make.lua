local popen = io.popen
local open = io.open

local function exec(input)
	local stream = popen(input)
	return
		stream:read('a'),
		stream:close()
end

local index_s = '<!doctype html>\n<link rel=stylesheet href=../blocksrey/style.css>'

local function parse(info)
	index_s = index_s.."\n<a href='"..info.title..".htm'>"..info.title..'</a>'
	return [[<!doctype html>
<link rel=stylesheet href=../blocksrey/style.css>
<title>]]..info.title..[[</title>
<h2><p>]]..info.title..[[</p></h2>
<p>]]..info.content..[[</p>
<p>]]..info.modified..[[</p>
<p>]]..info.created..[[</p>
]]
end

exec('rm *.htm')

local ls_str = exec('ls')

for folder in ls_str:gmatch('[^\n]+') do
	local path = folder..'/page.txt'
	local path_r = path:gsub('[ ]', '\\ ')

	local page_h = open(path, 'r')
	if page_h then
		local info = {}

		info.title = folder
		info.content = page_h:read('a')
		info.created = exec('stat '..path_r..' | grep Birth')
		info.modified = exec('stat '..path_r..' | grep Modify')

		local htm_h = open(folder..'.htm', 'w')
		htm_h:write(parse(info))
		htm_h:close()

		page_h:close()
	end
end

local htm_h = open('index.htm', 'w')
htm_h:write(index_s)
htm_h:close()

print(('Bow & Arrow Game'):gsub('[ ]', '\\ '))