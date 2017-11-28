# Docker Tutorial

https://docs.docker.com/get-started
https://docs.docker.com/get-started/part2/
https://docs.docker.com/get-started/part3/

# Preparations for upcoming exercises

## Development Setup

1. Install Docker on your laptop (recommended: install the Docker Toolbox which includes useful tools like Docker Compose and Kitematic)
    - https://docs.docker.com/toolbox/overview/

- Optional but helpful: set up bash aliases
    - https://kartar.net/2014/03/useful-docker-bash-functions-and-aliases/
    - https://github.com/tcnksm/docker-alias/blob/master/zshrc

## Getting Started

- Run the command `docker-compose up --build`

Alternatively, you can bring the services up in the background using detached mode with `up`, see what's going on with `ps` and remove the containers entirely (including data volumes used by mongodb) via `down --volumes`:
- `docker-compose up -d --build`
- `docker-compose ps`
- `docker-compose down --volumes`

You can then open Kitematic (refresh) and view your containers and the logs in a nice UI.

