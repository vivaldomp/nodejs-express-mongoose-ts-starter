#! /bin/sh

export MIGRATE_dbConnectionUri=mongodb://${MONGO_ROOT_USERNAME}:${MONGO_ROOT_PASSWORD}@${MONGO_HOST}:27017/${MONGO_DBNAME}?authSource=admin
until nc -z ${MONGO_HOST} 27017
do
    sleep 1
done
npm run migrate:up