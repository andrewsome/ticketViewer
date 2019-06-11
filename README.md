# Ticket Viewer
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) with a Node.js server proxy.

## Getting started

### Prerequisites
1. Node: any version starting with 8.4.0 or greater
  - run `node --version` to check current node version
  - If you need to upgrade or install [NodeJs](http://nodejs.org/) : suggest to install via [Node Version Manager NVM](https://github.com/creationix/nvm)

2. A clone or download of this repo on your local machine

### Installation
1. `cd ticketViewer` to go into the project root
2. `npm install`to install the npm dependencies

### Running locally
1. `npm run dev` to start
2. open `http://localhost:3000/` to view the site in the browser


### Running test
1. make sure to run `npm run dev` first and keep the server running
2. `npm run test-e2e` to lauch the test

## Implementation details

I want to make it possible to run one command and then run the React app and an Express server at the same time.  This implementation was referenced to [Set up a React app with a Node.js server proxy
](https://www.twilio.com/blog/react-app-with-node-js-server-proxy).

All config variables are stored in `server/config.json` file. It should be added to `.gitignore` because we don't want to share username and password. However, for demo purpose, I have created a trial account which only lasts for 14 days. So to make installation easier, I haven't git ignore the config.json file.

![example](http://g.recordit.co/Y71neoHXU8.gif)


Other references: 

1. [Make HTTP Requests in Node.js](https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html)
2. [React Router](https://reacttraining.com/react-router/web/example/basic)
3. [React Router params](https://scotch.io/courses/using-react-router-4/route-params)
4. [React Router V4 How to go back](https://stackoverflow.com/questions/46681387/react-router-v4-how-to-go-back)
5. [How to parse query string](https://stackoverflow.com/questions/43216569/how-to-get-query-parameters-in-react-router-v4)
6. [query-string](https://github.com/sindresorhus/query-string)
7. [react-table server side data](https://codesandbox.io/s/github/tannerlinsley/react-table/tree/master/archives/v6-examples/react-table-server-side-data)
8. [React-table](https://github.com/tannerlinsley/react-table/tree/v6#props)
9. [React modifies query string without reloading](https://stackoverflow.com/questions/10970078/modifying-a-query-string-without-reloading-the-page)

## Test with Cypress
I use [Cypress](https://www.cypress.io/) for end-to-end tests. 

![example](http://g.recordit.co/n0MeKvwKll.gif)

