#!/bin/bash

export DJANGO_SETTINGS_MODULE=planetary.settings

exec uvicorn planetary.asgi:application \
     --host 0.0.0.0 \
     --port 8000 \
    #  --workers 4 \
"$@"