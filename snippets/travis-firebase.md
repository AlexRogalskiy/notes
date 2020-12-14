---
title : Setup firebase hosting with travis.
description : Setup firebase hosting with travis CI/CD pipeline.
tags : ['travis']
---

# Setup travis

!!! note Note
View travis-ci official deployment guide: [Link](https://docs.travis-ci.com/user/deployment/firebase/)
!!!

#### 1. Generate firebase token.
```sh
# This generates a token, e.g. "1/AD7sdasdasdKJA824OvEFc1c89Xz2ilBlaBlaBla"
firebase login:ci
# Encrypt this token
travis encrypt "1/AD7sdasdasdKJA824OvEFc1c89Xz2ilBlaBlaBla" --add
# This command may generate a warning ("If you tried to pass the name of the repository as the first argument, you probably won't get the results you wanted"). You can ignore it.
```

#### 2. Copy base .travis.yml fron [here](/config-files/travis-firebase-hosting.md)

#### 3. Push code to github.