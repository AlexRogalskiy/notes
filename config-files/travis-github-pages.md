---
title : travis-github-pages.yaml
description : Travis github pages base config.
tags : ['config-files', 'travis']
---

# .travis-github-pages.yaml

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
  local_dir: [dist-dir] # e.g. local_dir: ./.vuepress/dist
  provider: pages
  skip_cleanup: true
  github_token: $GITHUB_TOKEN
  fqdn: [subdomain].[domain].[ext] #e.g. fqdn: notes.nishkal.in
  on:
    branch: master
```