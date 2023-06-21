local url = 'https://www.blocksrey.com/'

local sitemapname = 'sitemap.xml'

local robotshand = io.open('robots.txt')
robotshand:write('user-agent: *\ndisallow: /')

local sitemaphand = io.open(sitemapname)
sitemaphand:write('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')

local pathshand = io.popen('fd .htm')
for path in pathshand:lines() do
	sitemaphand:write('<url><loc>'..url..path..'</loc></url>')
	robotshand:write('\nallow: /'..path)
end

sitemaphand:write('</urlset>')
sitemaphand:close()

robotshand:write('\n\nsitemap: '..url..sitemapname)
pathshand:close()