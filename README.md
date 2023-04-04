## Description

Rest API propulsée par [Nest](https://github.com/nestjs/nest) avec sessions et authentifications avec redis et postgresql

## Installation

```bash
# Installation des dépendances
$ npm install
```

```bash
# Redis & redis commander
$  docker compose up -d
```

```bash
# Insertion du jeu de données dans la bdd postgres
createdb naat
psql naat < jdd.sql
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

## Routes documentation

> #### identifying
> `POST /login`
>> ##### body
>> ```json
>>{
>>    "login": "jdoe",
>>    "password": "P@ssw0rd"
>>}
>>```
> 
>> ##### response
>>```json
>>{
>>    "id": 0,
>>    "login": "jdoe",
>>    "mail": "john@doe.com",
>>    "firstName": "john",
>>    "lastName": "doe",
>>    "isActive": true
>>}
>>```

> #### disconnect
> `POST /logout`
>> Not body required,
>> This endpoint does not return response, only a `204 No Content`

## License

Nest is [MIT licensed](LICENSE).
