# Go Hackdash
A Challenge platform for hackathons. Check it [out here](http://gohackdash.org)

## Compile and run the project

### It's required to have installed
* [Node 0.10+](http://nodejs.org/)
* [Mongo 2.4+](https://www.mongodb.org/)
* [NPM 2+](http://npmjs.org/)

if you have npm v1 update it by
```bash
npm install -g npm
```

To get started:  
1. Clone this project  
2. `cd go-hackdash/`

The code consist in two parts, the NodeJS server under `lib/` dir and a React client project inside `client/` dir, which is compiled with a grunt task.  
To configure the server you must add a `config/config.json` and a `config/config.test.json`, a config.sample file can be used as a base to those files.

**its recommended to set different database names on each config file, so running tests wont destroy your dev data**

After created those config files: 

1. `npm install`
2. `cd client/`
3. `npm install`

[GruntJS](http://gruntjs.com/getting-started) is required to compile the client javascript and the less source. If you have not installed the client yet run:
```bash
npm install -g grunt-cli
```

To compile the client just run 
```bash
cd client/
grunt
```
This will put `go-hackdas.js` and `go-hackdash.css` files into `public/` dir so it will be available by the website.

Now run the server:
```bash
npm start
```

### Contribute

Fork this repo and follow the steps above.

There are Test for each part of the code client and server.
To run server tests just run at the root:
```bash
npm test
```

For client step into `client/` folder and run:
```bash
cd client/
grunt test
```

From here just create the tests for the new magic code and place a pull request when you are ready.
