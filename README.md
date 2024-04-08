# SDP2: Node back-end

# Team

| Github username    | name                 |
|:-------------------|:---------------------|
| lorenzohanssens    | Lorenzo Hanssens     |
| IndraVanWynendaele | Indra Van Wynendaele |
| AnkeJanssens       | Anke Janssens        |
| ynoynaert          | Youna Noynaert       |
| LaraSchoukenss     | Lara Schoukens       |


# Config

1. Copy the contents of `.env.example` into .env
2. Change the necessary fields (e.g. database login if you want to use a local schema).
3. Install the required dependencies by running `yarn`
4. Seed and migrate the database by running `node ace db:wipe && node ace migration:run && node ace db:seed` or `yarn wms`
5. If you are also running the front-end app on localhost, adjust `config\session.ts` and config inside of the cookie object, set sameSite: 'lax' instead of 'none'.

> Step 5 is very important! Otherwise you might not be able to log in because of CORS!



# Start-up

1. Run the `yarn dev` command.


# Running tests
1. Copy the contents of .env.example into .env.test.
2. Configure the appropriate database connection inside of .env.test.
3. Make sure the `SESSION_DRIVER` variable is set to `memory` (`SESSION_DRIVER=memory`).
4. Run the `yarn test` command. If necessary, add the `--watch` parameter for hot reloading tests.
5. If you want to see the coverage run `yarn coverage`



# API Docs

- [AdonisJs docs](https://docs.adonisjs.com)
- [Lucid ORM docs](https://lucid.adonisjs.com/)
- [Soft Deletes](https://github.com/lookinlab/adonis-lucid-soft-deletes)
- [Japa Test docs](https://docs.adonisjs.com/guides/testing) 
- [Japa Official docs](https://japa.dev/docs/introduction)
