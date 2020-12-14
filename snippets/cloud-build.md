---
title : Setup cloud build
description : Setup cloud-build gor google-cloud platform.
tags : ['google-cloud', 'firebase']
---

# Setup cloud build

!!! note Note
View on fireship: [Link](https://fireship.io/lessons/ci-cd-with-google-cloud-build/)
!!!

#### 1. Goto [Build Page](https://console.cloud.google.com/cloud-build/builds)

#### 2. Go to triggers in the sidebar and select trigger.

#### 3. Setup local dev environment.

1. Add the .env file with all the environment variables.

2. Get the Keys from [google-cloud-iam.](https://console.cloud.google.com/security/kms) 

3. Run the following command.
```sh
gcloud kms encrypt   --plaintext-file=.env   --ciphertext-file=.env.enc   --location=global   --keyring=cloud-build-keyring   --key=cloud-build-key
```

3. Add the `cloudbuild.yaml` file at the root of your project. Copy the config file reference fron [here.](/config-files/cloudbuild-yaml.md) 
4. Push to the repo.