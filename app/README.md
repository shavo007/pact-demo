#PACT DEMO

##Locally

* start up pact broker using docker containers (File can be found here
https://github.com/shavo007/docker-pact-postgres/blob/master/docker-compose-pact.yml)

```
docker-compose --file docker-compose-pact.yml  up --build

```

* start the API

```
java -jar app/build/libs/pact-demo-0.0.1-SNAPSHOT.jar

```

* publish pact to pact broker

```
./gradlew build
./gradlew pactPublish
```

View the pact has published at http://localhost/ui/relationships

* verify the pact against the API

```
./gradlew pactVerify
```

Results of the pact verification can be found at $buildDir/reports/pact
