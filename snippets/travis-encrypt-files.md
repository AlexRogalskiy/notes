---
title : Travis encrypt files
description : How to encrypt and decrypt files in travis.
tags : ['travis']
---

# Travis encrypt files

!!! note Note
View on travis: [Link](https://docs.travis-ci.com/user/encrypting-files/)
!!!

#### 1. Encrypting a single file
```bash
# use --add flag to automatically add decrypt script to .travis.yml.
travis encrypt-file inputFilePath outputFilePath --add
```

#### 2. Encrypting multiple files
1. Adding files to a tar archive.
```bash
# Where foo and bar are the files you want to encrypt.
tar cvf secrets.tar foo bar
travis encrypt-file secrets.tar --add
```

2. Extracting the tar archive
```yml
//-C is for CWD
- tar xvf secrets.tar -C ./out-dir
```


