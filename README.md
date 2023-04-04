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

## License

Nest is [MIT licensed](LICENSE).
