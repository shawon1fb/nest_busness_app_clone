network:
	docker network create busness-app

postgres:
	docker run --name postgres12 --network busness-app -p 5432:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=secret -d postgres:12-alpine

startDB:
	docker start postgres12

createdb:
	docker exec -it postgres12 createdb --username=root --owner=root busness

dropdb:
	docker exec -it postgres12 dropdb busness

watch:
	yarn start:dev