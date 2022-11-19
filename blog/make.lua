local popen = io.popen
local open = io.open

local function exec(input)
	local hand = popen(input)
	return hand:read('*a'), hand:close()
end

local htm_head =
	'<!doctype html>'
	..'\n<link rel=stylesheet href=../blocksrey/style.css>'
	..'\n<a href=../blocksrey/index.htm><img src=../blocksrey/blocksrey.gif></a>'
	..'\n<div>'

local index_s = htm_head

local function parse(info)
	index_s =
		index_s
		.."\n<a href='"..info.title..".htm'>"..info.title..'</a>'
	return
		htm_head
		..'\n<title>'..info.title..'</title>'
		..'\n<h2><p>'..info.title..'</p></h2>'
		..'<p>'..info.content..'</p>'
		..'\n<p>'..info.modified..'</p>'
		..'<p>'..info.created..'</p>'
		..'\n</div>'
end

exec('rm *.htm')

local ls_str = exec('ls')

for f_name in ls_str:gmatch('[^\n]+') do
	local path = f_name..'/page.txt'
	local e_path = f_name:gsub('[ ]', '\\ '):gsub('[&]', '\\&')..'/page.txt'

	local page_h = open(path, 'r')

	if page_h then
		local info = {}

		info.title = f_name
		info.content = page_h:read('*a')
		info.created = exec('stat '..e_path..' | grep Birth')
		info.modified = exec('stat '..e_path..' | grep Modify')

		local htm_h = open(f_name..'.htm', 'w')
		htm_h:write(parse(info))
		htm_h:close()

		page_h:close()
	else
		print('Error opening '..path)
	end
end

local htm_h = open('index.htm', 'w')
htm_h:write(index_s)
htm_h:close()

















local tokens = {
	['!['] = embed_image;
	[']'] = end_embed_image;
	['```'] = start_and_end_code;
	['`'] = bold_start_and_end;
}

local function predict(char)
	for tok, call in next, tokens do
		print('asd')
		if tok:sub(1, 1) == char then
			return tok
		end
	end
end

local content = "Lmao I'm Jeff! ![This is some sugar syntax] ```cpp int main() {}```"

local function step_char(char)
	local tokname_maybe = predict(char)
	print(char, tokname_maybe)
end

for i = 1, #content do
	local state = step_char(content:sub(i, i))
end