---
title : travis-firebase-hosting.yaml
description : Travis firebase hosting base config.
tags : ['config-files', 'travis']
---

# .travis-firebase-hosting.yaml

```yml
sudo: required
dist: trusty

language: node_js
cache: 
  - npm
  - directories:
    - ./build

notifications:
  email:
    on_success: never
    on_failure: change

matrix:
  include:
    - os: linux
      node_js: lts/*

install:
  - npm install

script:
  - npm run build

deploy:
  provider: firebase
  token:
    secure: "YOUR ENCRYPTED token"
  project: "myapp-staging"
  local_dir: "dist"
  skip_cleanup: true

after_deploy:
  - npm run after-deploy
```