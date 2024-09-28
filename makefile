.PHONY: build up down logs clean

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f

clean:
	docker-compose down -v --rmi all --remove-orphans
	docker image prune

# add more as needed

dcu:
	docker-compose up --build

logs:
	docker-compose logs -f

logsbe:
	docker-compose logs backend

logsfe:
	docker-compose logs frontend

start: build up