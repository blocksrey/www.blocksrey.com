local file_name = arg[1]:gsub('\\', '')
local file = io.open(arg[1])
local state = file:read('a')
file:close()

-- Iterate through the lines of the file, looking for headers
local toc = {}
for line in state:gmatch('%[(.-)]') do table.insert(toc, line) end
if #toc > 0 then
	-- Build the TOC HTML
	toc_html = '<h2>Table of Contents</h2>'
	for i, v in next, toc do toc_html = toc_html..i..'. '..'<a href="#'..v..'">'..v..'</a><br>' end
	toc_html = '<div class=toc>'..toc_html..'</div>'
else
	toc_html = ''
end

state = state:gsub('<([%w_/%.%?%%=~&-]+%.(%w+))>', function(path, ext)
	path = file_name..'/'..path
	if ext == 'jpg' or ext == 'jpeg' or ext == 'png' or ext == 'gif' or ext == 'webp' then
		return '<img src="'..path..'">'
	elseif ext == 'mp4' or ext == 'ogg' or ext == 'webm' then
		return '<video src="'..path..'" controls></video>'
	end
end)

state = state:gsub('%(([%w_/%.%?%%=~&-]+)%)', function(path)
	return '<a href="'..path..'">'..path..'</a>'
end)

-- Create paragraph headers
state = state:gsub('%[([^\n]+)%]', '<h2 id="%1">%1</h2>')

-- Add <p> tags around paragraphs
state = (state..'\n\n'):gsub('([^\n]+)(\n\n)', '<p>%1</p>')

state = '<title>'..file_name..'</title>'..state
state = '<a href="'..file_name..'.htm"><h1>'..file_name..'</h1></a>'..toc_html..state
state = '<br><a href=index.htm>Back</a>'..state

print(state)