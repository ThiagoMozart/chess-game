#!/bin/bash


build:
	docker-compose build

start:
	docker-compose up

test:
	docker-compose run --rm web npm test

stop:
	docker-compose down
