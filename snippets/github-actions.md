---
title : Github actions encrypt files
description : How to encrypt and decrypt files in github actions.
tags : ['github']
---

# Github encrypt files

!!! note Note
View on github: [Link](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets)
!!!

#### 1. Encrypting and decrypting files
1. Adding files to a tar archive.
```bash
# Where foo and bar are the files you want to encrypt.
tar cvf ./path-to-secrets.tar foo bar
```

2. Encrypting file
```bash
gpg --symmetric --cipher-algo AES256 ./path-to-secrets.tar
```

3. Decrypting file
```bash
gpg --quiet --batch --yes --decrypt --passphrase="$SECRET_KEY" --output ./path-to-output-file.tar ./path-to-input-gpg-file.gpg
```

4. Extracting the tar archive
```bash
# -C is for CWD
tar xvf secrets.tar -C ./out-dir
```