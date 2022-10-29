.PHONY: help
help:
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

include _extras.mk

.DEFAULT_GOAL := help

.PHONY: up
up: .docker/.backend.built ## Build the project and drops you into a shell
	@docker-compose run --service-ports --rm backend

.PHONY: up-detached
up-detached: .docker/.backend.built  ## Run server without attaching a TTY
	@docker-compose run --service-ports --detach backend server

.PHONY: test
test: .docker/.backend.built ## Run test inside the container.
	@docker-compose run backend dev test

.PHONY: stop
stop: ## stops containers.
	@docker-compose stop

.PHONY: down
down: ## stop and remove Docker containers
down:
	@docker-compose down

.PHONY: clean
clean: ## remove token. Force rebuild on next up
	-rm .docker/.backend.built

.PHONY: rebuild
rebuild: ## rebuild base Docker images
	@docker-compose down --remove-orphans
	@docker-compose build --no-cache