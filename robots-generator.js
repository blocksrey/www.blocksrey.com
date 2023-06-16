const fs = require('fs')
const path = require('path')

const sitemapUrl = 'https://www.blocksrey.com/sitemap.xml'

const disallowedFolders = []

// Recursively check folders and add those without index.htm to the disallowed list
const checkFolder = (folderPath) => {
	const files = fs.readdirSync(folderPath)
	if (!files.includes('index.htm')) {
		const disallowedPath = folderPath.split(path.sep).join('/')
		disallowedFolders.push(disallowedPath)
	} else {
		files.forEach((file) => {
			const filePath = path.join(folderPath, file)
			if (fs.statSync(filePath).isDirectory()) {
				checkFolder(filePath)
			}
		})
	}
}

checkFolder('./') // Start at the root directory

const robotsTxt = `User-agent: *
${disallowedFolders.map((folder) => `Disallow: /${folder}`).join('\n')}

Sitemap: ${sitemapUrl}`

fs.writeFileSync('robots.txt', robotsTxt)
console.log('robots.txt file generated successfully!')