#!/usr/bin/env bash

cd /opt/mediabyte/app

# image can run in multiple modes
if [[ "${1}" == "shell" ]]; then
  exec /bin/bash
else
  exec "$@"
fi
