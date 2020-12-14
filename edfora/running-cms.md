---
title : Running CMS
description : Running CMS
tags : []
---

# Running CMS

[[toc]]

## 1. Clone Repos
1. `git clone  https://nishkal-edfora@bitbucket.org/edfora/cms_dataservice_es6.git`
2. `git clone https://nishkal-edfora@bitbucket.org/edfora/cmsv2_backend_es6.git`
3. `git clone https://nishkal-edfora@bitbucket.org/edfora/cms-frontend-v2.git`

```
.
├─ cmsv2_backend_es6
├─ cms-frontend-v2
└─ cms_dataservice_es6
```

## 2. Set Branches
1. Run `git checkout mylibrary-commons-merge` file in `cms_dataservice_es6`
2. Run `git checkout myLibraryDummy` file in `cms-frontend-v2`
3. Run `git checkout mylibrary` file in `cmsv2_backend_es6`

## 3. Update config files
1. Update `authors.js` file in `cms_dataservice_es6`
2. Update `config.ts` file in `cms-frontend-v2`
3. Optionally update `authors.js` file in `cmsv2_backend_es6`

## 4. Setup cms-commons
1. `cd cms_dataservice_es6/lib`
2. `git clone https://nishkal-edfora@bitbucket.org/edfora/cms-commons edfora-cms-commons`
3. `cd edfora-cms-commons`
4. `git checkout cms-merge-paths`

## 5. Run the following commands
1. Run `src/redis-server` in redis installation directory _(Starting redis server)_
2. Run `npm run authors` (`npm run authors.w` for windows) in `cmsv2_backend_es6`
3. Run `npm run authors` (`npm run authors.w` for windows) in `cms_dataservice_es6`
4. Run `npm run start` in `cms-frontend-v2`

## Debugging
* Comment out `logger.streams.path` key if you're running on windows platform, replace with `"stream": process.stdout`

## MetaData
If setup correctly, 
1. `redis` will run on port `6379`
2. `cms_dataservice_es6` will run on port `3027`
3. `cmsv2_backend_es6` will run on port `3026`