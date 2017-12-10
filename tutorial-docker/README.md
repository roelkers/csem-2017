# Docker Tutorial

- https://docs.docker.com/get-started
- https://docs.docker.com/get-started/part2/
- https://docs.docker.com/get-started/part3/

# Preparations for Upcoming Exercises

## Development Setup

Install Docker on your laptop (recommended: install the Docker Toolbox which includes useful tools like Docker Compose and Kitematic)

https://docs.docker.com/toolbox/overview/

Optional but helpful: set up bash aliases

    - https://kartar.net/2014/03/useful-docker-bash-functions-and-aliases/
    - https://github.com/tcnksm/docker-alias/blob/master/zshrc

On Mac and Windows, you can then open Kitematic and view your containers and the logs in a nice UI. (You might need to hit refresh)

## Using Docker

Build and run a database container

1. `docker build -t postgresdb db`
2. `docker images`
3. `docker run --name postgresdb-1 -d postgresdb`

## Using Docker Compose

Run the command `docker-compose up --build` to spawn up a database container and a node app container as services.

Alternatively, you can bring the services up in the background using detached mode with `up`, see what's going on with `ps` and remove the containers entirely (including data volumes used by mongodb) via `down --volumes`:
1. `docker-compose up -d --build`
2. `docker-compose ps`
3. `docker-compose down --volumes`

## Using Docker Swarm

Deploy (replicated) services with Docker Swarm:

1. `docker swarm init`
2. `docker stack deploy -c docker-compose.yml my-stack`
3. `docker service ls`
4. `docker service ps my-stack_node-app`

Change the number of replicas and repeat steps 2-4.

When you are done, clean up.

Destroy the stack: `docker stack rm my-stack`
Leave the swarm: `docker swarm leave --force`