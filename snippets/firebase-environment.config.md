---
title : Firebase environment variables.
description : How to set up environment variables for firebase functions.
tags : ['firebase']
---

# Firebase functions:config:set

!!! note Note
View on firebase: [Link](https://firebase.google.com/docs/functions/config-env)
!!!

#### 1. To set environment variables
```bash
firebase functions:config:set someservice.key="THE API KEY" someservice.id="THE CLIENT ID"
```

#### 2. To get environment variables
```bash
firebase functions:config:get someservice
```

* which returns 

```json
{
  "someservice": {
    "key":"THE API KEY",
    "id":"THE CLIENT ID"
  }
}
```