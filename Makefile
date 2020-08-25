SHELL := /bin/bash -o pipefail
VERSION := "$(shell git describe --tags --abbrev=0)"
TAG ?= $(VERSION)
IP_ADDRESS := $(shell ipconfig getifaddr en0)

PUBLIC_URL=sundial.click
BACKEND_URL=http://$(IP_ADDRESS):8080

.PHONY: serve
serve: env
	echo "REACT_APP_BASE_URL=$(BACKEND_URL)" >> .env
	npm run serve

.PHONY: build
build: env
	npm run build
	rm -r -f docs
	mv dist docs
	echo "$(PUBLIC_URL)" > docs/CNAME

.PHONY: env
env: export REACT_APP_SUNDIAL_TAG=$(TAG)
env:
	-rm .env
	@echo "REACT_APP_SUNDIAL_TAG=$(shell echo $(REACT_APP_SUNDIAL_TAG))" > .env
	@echo "Wrote REACT_APP_SUNDIAL_TAG to .env with the given version: $(shell echo $(REACT_APP_SUNDIAL_TAG))"