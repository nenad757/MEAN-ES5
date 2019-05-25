MEAN Starter (ES5 version)
====================


WHAT IS IT?

This is a MEAN js starter written in ES5.
It implements **passport authentification**.


- ES5 version (server and client)
- passport authentification
- gulp as task manager
- ejs as view engine
- bootstrap 3+


FAST USE

1. in project root directory, install npm modules :
   - `npm install`
   
2. launch bower module install:
   - `bower install` 
   
3. launch **mongoDb**
   - console : `mongod`   

4. launch GULP (default : to build and watch)
   - `node server`

##DEVELOPER

**Don't forget to configure your database setting and passport secrets when thinking about production :**
- in ./server/config dir.



1. default gulp task (build & watch)
   - `gulp`
   
2. build task (dev)
   - `gulp build` 
   
3. ditrib. task
   - `gulp dist`   

4. cleaning tasks
   - cleaning public dir : `gulp public:clean`
   - cleaning dist dir : `gulp dist:clean`
