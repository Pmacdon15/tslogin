# TS Login

## Table of Contents
- [Description](#Description)
- [Features](#Features)
  - [Current Features](#Current-Features) 
  - [Coming Soon](#Coming-Soon)  
- [Cloning](#Cloning)
- [Setup](#Setup)
- [Start Up](#Start-Up)

# Description
 This project develops a robust authentication system for a Next.js application using TypeScript, incorporating industry-standard security measures. It utilizes Bcrypt for password hashing and JSON Web Tokens (JWT) for authentication, ensuring secure user sessions. The system implements HTTP-only cookies to store JWT tokens, providing an additional layer of security. With a focus on user privacy and security, this project demonstrates expertise in Next.js, TypeScript, JWT, and Bcrypt, offering a seamless and efficient authentication experience.

# Features

## Current Features

1. JWT authentication through cookies.

2. Password Hashing.

3. PostgreSQL Backend.


## Coming Soon
1. Logout function to remove auth cookie.

# Cloning

1. Clone repository(git ssh method) run this command: 
```bash
git clone git@github.com:Pmacdon15/tslogin.git
```

# Setup

After cloning run: 
```Bash
cd tslogin
```

Once you are inside of the project directory you will have to run a few commands from the root directory to set the project up.
The commands are:

1. Install dependencies:

 ```Bash
 npm i
 ```

2. Setup .env file, run:

```env
SECRET_KEY_JWT="Phrase can be anything"
PEPPER_PHRASE="Phrase can be anything"

POSTGRES_URL="
POSTGRES_PRISMA_URL=""
POSTGRES_URL_NO_SSL=""
POSTGRES_URL_NON_POOLING=""
POSTGRES_USER="default"
POSTGRES_HOST=""
POSTGRES_PASSWORD=""
POSTGRES_DATABASE=""
```

3. Now we have to build the client easily done by running:
```Bash
npm run build
```

4. Setup port forwarding on your router for both port 3000 and the answer you gave during setup.

# Start up

Project can be easily started from the root by running:
```Bash
npm run start
```


