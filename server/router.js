function route(handle, pathname, response, postData) {
    console.log("About to route a request for " + pathname)

    for (var member in handle) {
        if (pathname.match(new RegExp(member, "i")) && typeof handle[member] === 'function') {
            handle[member](response, postData, pathname)
            return
        }
    }

    console.log("No request handler found for " + pathname)
    response.writeHead("404", {"Content-Type": "text/html"})
    response.write("404 Not found")
    response.end()
}

exports.route = route