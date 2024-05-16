<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

framework TypeScript starter repository & Temporal Tool.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test
```


## Procedures For Setting Up Nest JS & Temporal Projects

## Run Temporal

```bash
# Run Worker
$ npm run workers
```


## Additional Packages

```bash
# Validation Zod
$ npm i zod

# Type Orm Prisma
$ npm install --save-dev prisma

# Logger File & console
$ npm install winston
$ npm install nest-winston
$ npm install winston-daily-rotate-file

# Hashing Password Bcrypt
$ npm install bcrypt
$ npm install --save-dev @types/bcrypt

# UUID
$ npm install uuid
$ npm install --save-dev @types/uuid

# Config Nest
$ npm install @nestjs/config
```
<!-- - Validation - [zod] (npm i zod) 
- Type Orm - [prisma] (npm install --save-dev prisma)
- Logger - [nest-winston] (npm install winston && npm install nest-winston && npm install winston-daily-rotate-file)
- Hashing Password - [Bcrypt] (npm install bcrypt & npm install --save-dev @types/bcrypt)
- UUID - [UUID] (npm install uuid & npm install --save-dev @types/uuid)
- Config Nest - [Config] (npm install @nestjs/config) -->

## Init Prisma

```bash
# Init Prisma
$ npm prisma init

# Migration
$ npx prisma migrate dev --name init

# Generate Prisma CLient
$ npx prisma generate
```
<!-- 
- npm prisma init - (Init Prisma)
- npx prisma migrate dev --name init - (Migration)
- npx prisma generate - (Generate Prisma Client) -->

## Init Temporal 
```bash
# Init Activity
$ npm i @temporalio/activity

# Init Client 
$ npm i @temporalio/client

# Init Cammon
$ npm i @temporalio/common

# Init Worker
$ npm i @temporalio/worker

# Init Workflow
$ npm i @temporalio/workflow
```

## Setup Project

- Delete file
  - app.controller.ts
  - app.service.ts
  - app.service.ts
  - app.controller.spec.ts
- Buat Common Module 
  - nest generate module common (digunakan untuk menyimpan module seperti prisma, logging,dll) 


  