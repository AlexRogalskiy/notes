---
title : SSH
description : How to use ssh
tags : []
---

# SSH

!!! note Note
Digital ocean tutorial: [Link](https://www.digitalocean.com/docs/droplets/how-to/add-ssh-keys/to-existing-droplet/)
bradtraversy: [Link](https://gist.github.com/bradtraversy/f03df587f2323b50beb4250520089a9e)
!!!

#### 1. Generate ssh key
```bash
ssh-keygen

// variation
ssh-keygen -t ras
```

#### 2. Copy to server
```bash
// login to server

nano ~/.ssh/authorized_keys
```

#### 3. Change SSH config
```bash
// edit config here
sudo nano /etc/shell/sshd_config

// after editing
sudo systemctl reload sshd
```

#### 4. Create new user with sudo
```bash
$ adduser my-user-name

$ id my-user-name

$ usermod -aG sudo my-user-name

$ id my-user-name
```



