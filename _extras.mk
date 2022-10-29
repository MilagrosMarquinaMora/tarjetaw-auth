.docker/.base.built:
	@docker build -t base-image -f .docker/base.Dockerfile .
	@touch .docker/.base.built

.docker/.backend.built: .docker/backend.Dockerfile .docker/.base.built  # build image for app
	@docker-compose build backend
	@touch .docker/.backend.built

logtail: # How the logs from the last run command.
	@docker logs -f $$(docker ps|grep src|awk '{ print $$1 }' | head -1)