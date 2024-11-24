# Development 
Instructions for setting up a development environment for this project.

* Clone the repository
* Install the dependencies
* Rename the .env.template file to .env and fill in the values
* Exec seed to [populate the database](localhost:3000/seed)
* Db setup
```
docker compose up -d
```

## Nota:
__email:__ 'test1@google.com'
__password:__ 123456

# Prisma Commands
```
npx prisma init
npx prisma migrate dev
npx prisma generate
```

