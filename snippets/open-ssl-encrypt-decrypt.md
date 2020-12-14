---
title : OpenSSL encrypt/decrypt files.
description : How to use openSSL to encrypt/decrypt files.
tags : []
---

# OpenSSL encrypt/decrypt files.

!!! note Note
View on stackoverflow: [Link](https://stackoverflow.com/questions/16056135/how-to-use-openssl-to-encrypt-decrypt-files)
!!!

#### 1. To encrypt
```bash
openssl enc -aes-256-cbc -in un_encrypted.data -out encrypted.data
```

#### 2. To decrypt
```bash
//with password prompt
openssl enc -d -aes-256-cbc -in encrypted.data -out un_encrypted.data

//without password prompt
openssl enc -d -aes-256-cbc -in encrypted.data -out un_encrypted.data -k [MyPassword]
e.g. openssl enc -d -aes-256-cbc -in encrypted.data -out un_encrypted.data -k 123456789
```