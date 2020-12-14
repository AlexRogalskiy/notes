---
title : travis-github-release.yaml
description : Travis github release base config.
tags : ['config-files', 'travis']
---

# .travis-github-release.yaml

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
  - npm run download

deploy:
  overwrite: true
  provider: releases
  api_key: $GITHUB_TOKEN
  file_glob: true
  file: out/*
  skip_cleanup: true
  draft: true
```