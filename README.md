# VGQuotes - Client

Frontend of my simple videogame quotes project, done mostly to get a basic social media-like posts queue working. Scroll down to the bottom to fetch older posts, newer posts are automatically fetched each 7s. Made with React.

## Installation

In order for the project to work, clone it and do an `npm install`. After that, just add a .env file to its root folder containing the following:

```
VITE_API = ["http://localhost:XXXX", "https://..."] #local and remote APIs to fetch data from
VITE_USE_LOCAL_API = false #will fetch from the local if true, remote if false
```

Then you just need an `npm run dev` to start the server.

Bear in mind that you're gonna need to get the [VGQuotes-API](https://gitlab.com/vgquotes/vgquotes-api) up and running so the client has somewhere to fetch data from.