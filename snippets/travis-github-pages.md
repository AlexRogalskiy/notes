---
title : Setup github pages with travis.
description : Setup github pages with travis CI/CD pipeline.
tags : ['travis']
---

# Setup travis

!!! note Note
View on youtube: [Link](https://www.youtube.com/watch?v=SKXkC4SqtRk)

View travis-ci official deployment guide: [Link](https://docs.travis-ci.com/user/deployment/pages/)
!!!

#### 1. Add a personal access token on github.

#### 2. Make sure to have required "homepage" field in package.json.
e.g.
```json
{
    ...
    "homepage": "https://nishkalkashyap.github.io/notes",
}
```

#### 3. Enable build on travis-ci, and add personal access token in environment variables.

#### 4. Copy base .travis.yml fron [here](/config-files/travis-github-pages.md)

#### 5. Add A records of custom domain like so.

| Type | Name        | Value           |
| ---- | ----------- | --------------- |
| A    | [domain] | 185.199.108.153 |
| A    | [domain] | 185.199.109.153 |
| A    | [domain] | 185.199.110.153 |
| A    | [domain] | 185.199.111.153 |

!!! warning Warning
If using a subdomain. Instead of adding A records, add a single CNAME record. e.g.
!!!

| Type  | Name        | Value                        |
| ----- | ----------- | ---------------------------- |
| CNAME | [subdomain] | [github-user-name].github.io |