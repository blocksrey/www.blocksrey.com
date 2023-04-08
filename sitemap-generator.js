const fs = require('fs')
const path = require('path')

const baseUrl = 'https://www.example.com/' // replace with your website's base URL
const rootDir = '.' // replace with the name of your website's root directory

// recursively find all files in the specified directory and its subdirectories
function getDirectoriesContainingIndexFile(dir, directoriesList = []) {
	const files = fs.readdirSync(dir)
	for (const file of files) {
		const filePath = path.join(dir, file)
		if (fs.statSync(filePath).isDirectory()) {
			if (fs.existsSync(path.join(filePath, 'index.htm'))) {
				directoriesList.push(filePath)
			} else {
				getDirectoriesContainingIndexFile(filePath, directoriesList)
			}
		}
	}
	return directoriesList
}

// generate the sitemap XML and write it to a file
function generateSitemap() {
	const directoriesList = getDirectoriesContainingIndexFile(rootDir)
	const urls = directoriesList.map(dir => {
		const path = dir.replace(rootDir, '') + '/'
		return `<url><loc>${baseUrl}${path}</loc></url>`
	})
	urls.push(`<url><loc>${baseUrl}</loc></url>`) // add root URL to sitemap
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}</urlset>`
	fs.writeFileSync('./sitemap.xml', sitemap)
}

generateSitemap()