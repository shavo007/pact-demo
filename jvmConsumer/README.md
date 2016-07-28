#JVM Consumer

##Locally

* start up pact broker using docker containers (File can be found here
https://github.com/shavo007/docker-pact-postgres/blob/master/docker-compose-pact.yml)

```
docker-compose --file docker-compose-pact.yml  up --build

```

* start the microservice if not already started


* publish pact to pact broker

```
./gradlew build
./gradlew pactPublish
```

View the pact has published at http://localhost/ui/relationships
