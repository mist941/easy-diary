#!/bin/bash

cd ../

docker build \
  --build-arg POSTGRES_USER=diary_user \
  --build-arg POSTGRES_PASSWORD=diary_user_password_2025 \
  --build-arg POSTGRES_DB=easy_diary \
  --build-arg DB_HOST=db \
  --build-arg SECRET_KEY=J8mG1zBOkFOdEl9HPQel1BPYkIaNvkhh \
  -t ivanstatkevich/easy-diary:latest .