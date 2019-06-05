# python-demo

## Installation

- Clone the repo
		
		git clone git@github.com:soorya54/python-demo.git

- Change directory and [compose](https://docs.docker.com/compose/install/) the [docker build](https://docs.docker.com/install/)

		cd python-demo && sudo docker-compose build 

- Start the containers

		sudo docker-compose up -d

- Create lod files

		touch logs/celery.log && touch logs/debug.log

- Open bash of the web container

		sudo docker exec -it <container-id> bash

- Create a super user
		
		python manage.py createsuperuser

- Seed the tables

		python manage.py loaddata TasksPriority && python manage.py TasksState

- Start the supervisor inside the container

		supervisord