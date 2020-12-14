---
title : Appvoyer encrypt files
description : How to encrypt and decrypt files in appvoyer.
tags : ['appveyor']
---

# Appvoyer encrypt files

!!! note Note
View on appvoyer: [Link](https://www.appveyor.com/docs/how-to/secure-files/)
!!!

#### 1. Encrypting file on development machine

* Download `secure-file` utility by running the following command on development machine:

```bash
# on windows
iex ((New-Object Net.WebClient).DownloadString('https://raw.githubusercontent.com/appveyor/secure-file/master/install.ps1'))

# on linux
curl -sflL 'https://raw.githubusercontent.com/appveyor/secure-file/master/install.sh' | bash -e -
```

* To encrypt a file:
```bash
# on windows
appveyor-tools\secure-file -encrypt C:\path-to\filename-to-encrypt.ext -secret MYSECRET1234

# on linux
./appveyor-tools/secure-file -encrypt /path-to/filename-to-encrypt.ext -secret MYSECRET1234
```

Encrypted file will be saved in the same directory as the input file, but with the `.enc` extension added. You can optionally specify output file name with the `-out` parameter.

#### 2. Decrypting files during an AppVeyor build
* Put the “secret” value to the project environment variables on the Environment tab of the project settings or in the `appveyor.yml` as a [secure variable](https://ci.appveyor.com/tools/encrypt):

```yaml
environment:
  my_secret:
    secure: BSNfEghh/l4KAC3jAcwAjgTibl6UHcZ08ppSFBieQ8E=
```
* To decrypt the file, add these lines to the `install` section of your project config:
```yaml
install:
  - ps: iex ((New-Object Net.WebClient).DownloadString('https://raw.githubusercontent.com/appveyor/secure-file/master/install.ps1'))
  - cmd: appveyor-tools\secure-file -decrypt path-to\encrypted-filename.ext.enc -secret %my_secret%
  - sh: ./appveyor-tools/secure-file -decrypt path-to/encrypted-filename.ext.enc -secret $my_secret
```
The line starting with `cmd:` will run on Windows-based images only and the line starting with `sh:` on Linux.
!!! warning Note
Note that file won’t be decrypted on Pull Request builds as secure variables are not set during PR build.
!!!


