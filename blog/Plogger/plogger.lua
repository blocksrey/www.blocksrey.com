local gsub = string.gsub

local file_name = arg[1]:match("([^/\\]+)%.%a+")
local file = io.open(arg[1], 'r')
local text = file:read('a')
file:close()

-- Create an empty table to store the TOC items
local toc = {}

-- Iterate through the lines of the file, looking for headers
for line in text:gmatch('%[(.-)%]') do
    table.insert(toc, line)
end

-- Build the TOC HTML
local toc_html = '<h2>Table of Contents</h2>'
for i, item in ipairs(toc) do
    toc_html = toc_html..i..'. '..'<a href="#'..item..'">'..item..'</a><br>'
end
toc_html = '<div class="toc">'..toc_html..'</div>'

text = gsub(text, '%[([^\n]+)%]', '<h2 id="%1">%1</h2>')

-- Replace URLs with appropriate HTML
text = gsub(text, '(%a+://[%w_/%.%?%%=~&-]+%.(%a+))', function(link, ext)
    if ext == 'jpg' or ext == 'jpeg' or ext == 'png' or ext == 'gif' or ext == 'webp' then
        return '<img src="'..link..'">'
    elseif ext == 'mp4' or ext == 'ogg' or ext == 'webm' then
        return '<video src="'..link..'" controls></video>'
    else
        return '<a href="'..link..'">'..link..'</a>'
    end
end)

-- Add <p> tags around paragraphs
text = gsub(text..'\n\n', '([^\n]+)(\n\n)', '<p>%1</p>%2')

text = '<html><head><title>'..file_name..'</title></head><body><h1>'..file_name..'</h1>'..toc_html..text

print(text)