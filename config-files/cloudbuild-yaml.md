---
title : cloudbuild.yaml
description : Cloud build config file.
tags : ['config-files']
---

# cloudbuild.yml

```yml
steps:
# Decrypt
- name: gcr.io/cloud-builders/gcloud
  args:
  - kms
  - decrypt
  - --ciphertext-file=.env.enc
  - --plaintext-file=.env
  - --location=global
  - --keyring=cloud-build-keyring
  - --key=cloud-build-key

# install
- name: 'gcr.io/cloud-builders/npm'
  args : ['install']

# build
- name: 'gcr.io/cloud-builders/npm'
  args : ['run','cloud-build']

# deploy
- name: 'gcr.io/cloud-builders/npm'
  args : ['run','deploy-ci']
```