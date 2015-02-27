# About
epfl.polls is a basic on-line poll/survey application written in node.js with express, jade, stylus, passport and some other useful package.

# Installation

```
$ git clone https://github.com/domq/epfl.polls.git
$ cd epfl.polls
$ npm install
$ node bin/www
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

Check http://stackoverflow.com/questions/21656420/failed-to-load-c-bson-extension

### EADDRINUSE
Check that there are no other node server on the same port
<code>lsof -i:3000</code>
And kill it if there is one.

# Notes

## Update fork
https://help.github.com/articles/syncing-a-fork/

1. <code>git remote add upstream https://github.com/domq/epfl.polls.git</code>
1. <code>git fetch upstream</code>
1. <code>git checkout master</code>
1. <code>git merge upstream/master</code>
