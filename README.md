# Installation

<code>npm install passport passport-tequila mongodb stylus express jade express-session connect-mongo<code>

```
passport@0.2.1 node_modules/passport
├── pause@0.0.1
└── passport-strategy@1.0.0

passport-tequila@0.1.2 node_modules/passport-tequila
└── debug@2.1.1 (ms@0.6.2)

stylus@0.42.3 node_modules/stylus
├── css-parse@1.7.0
├── mkdirp@0.3.5
├── sax@0.5.8
└── glob@3.2.11 (inherits@2.0.1, minimatch@0.3.0)

express@4.9.8 node_modules/express
├── range-parser@1.0.2
├── utils-merge@1.0.0
├── merge-descriptors@0.0.2
├── fresh@0.2.4
├── cookie@0.1.2
├── escape-html@1.0.1
├── cookie-signature@1.0.5
├── vary@1.0.0
├── finalhandler@0.2.0
├── parseurl@1.3.0
├── media-typer@0.3.0
├── methods@1.1.0
├── serve-static@1.6.5
├── path-to-regexp@0.1.3
├── depd@0.4.5
├── qs@2.2.4
├── on-finished@2.1.1 (ee-first@1.1.0)
├── etag@1.4.0 (crc@3.0.0)
├── proxy-addr@1.0.6 (forwarded@0.1.0, ipaddr.js@0.1.8)
├── send@0.9.3 (destroy@1.0.3, ms@0.6.2, mime@1.2.11, on-finished@2.1.0)
├── accepts@1.1.4 (negotiator@0.4.9, mime-types@2.0.9)
└── type-is@1.5.7 (mime-types@2.0.9)

mongodb@1.4.31 node_modules/mongodb
├── readable-stream@1.0.33 (isarray@0.0.1, inherits@2.0.1, string_decoder@0.10.31, core-util-is@1.0.1)
├── kerberos@0.0.9 (nan@1.6.2)
└── bson@0.2.19 (nan@1.6.2)

jade@1.6.0 node_modules/jade
├── character-parser@1.2.0
├── commander@2.1.0
├── void-elements@1.0.0
├── mkdirp@0.5.0 (minimist@0.0.8)
├── transformers@2.1.0 (promise@2.0.0, css@1.0.8, uglify-js@2.2.5)
├── constantinople@2.0.1 (uglify-js@2.4.16)
├── with@3.0.1 (uglify-js@2.4.16)
└── monocle@1.1.51 (readdirp@0.2.5)
```

## Configuration

If you are using WebStrom you have to configure file watchers for Jade and Stylus.
```
File > Settings... > Tools > File Watchers
```

### Jade
    File type: Jade
    Scope: Project Files
    Program: $ProjectFileDir$/node_modules/jade/bin/jade.js
    Argument: $FileName$
    Working Directory: $FileDir$
    Output paths to refresh: $FileNameWithoutExtension$.html

### Stylus
    File type: Stylus files
    Scope: Project Files
    Program: $ProjectFileDir$/node_modules/stylus/bin/stylus
    Argument: -u nib $FileName$
    Working Directory: $FileDir$
    Output paths to refresh: $FileNameWithoutExtension$.css

## Launching the server

### Mongod
In your Project File Dir create the DB directory
<code>mkdir mydb</code>
then, launch the mongod service
<code>mongod --dbpath mydb</code>

Now you can launch the app
<code>node bin/www</code>

# Errors
### bson
```
{ [Error: Cannot find module '../build/Release/bson'] code: 'MODULE_NOT_FOUND' }
js-bson: Failed to load c++ bson extension, using pure JS version
events.js:85
      throw er; // Unhandled 'error' event
```
1. check mongod is running
1. check bson and node-gyp are installed

Check [http://stackoverflow.com/questions/21656420/failed-to-load-c-bson-extension]

### EADDRINUSE
Check that there are no other node server on the same port
<code>lsof -i:3000</code>
And kill it if there is one.

# Notes

## Update fork
[https://help.github.com/articles/syncing-a-fork/]
1. <code>git remote add upstream https://github.com/domq/epfl.polls.git</code>
1. <code>git fetch upstream</code>
1. <code>git checkout master</code>
1. <code>git merge upstream/master</code>
