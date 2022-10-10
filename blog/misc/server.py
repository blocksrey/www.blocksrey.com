def page_to_html(page_content):
	return page_content







route_lookup = {}

routes = ('/', ) # include home directory of course

import os

for folder in os.listdir():
	if os.path.isdir(folder):
		routes += ('/' + folder + '/', )

for route in routes:
	route_lookup[route] = page_to_html(open('.' + route + 'page').read())

# http shit
from http.server import HTTPServer, BaseHTTPRequestHandler

class web_server(BaseHTTPRequestHandler):
	def do_GET(self):
		print(self.path)
		self.send_response(200)
		self.end_headers()
		self.wfile.write(route_lookup[self.path].encode())

httpd = HTTPServer(('localhost', 8080), web_server)
httpd.serve_forever()