#!/bin/bash


build:
	docker-compose build

start:
	docker-compose up

test:
	docker-compose run --rm web npm test

test-cli:
	docker-compose run --rm web npm test -- --watchAll=false

stop:
	docker-compose down
