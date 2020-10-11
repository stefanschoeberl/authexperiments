# Authentication Experiments with Angular, Spring Boot, Keycloak and OpenID Connect

## Prerequisites
* Docker and Docker Compose
* Java 14
* npm (tested with 6.14.8)
* Node.js (tested with 12.19.0)

## Setup

### Start Keycloak
```
$ docker-compose up -d
```

A new realm "MyRealm" will be created

### Build and start backend
```
$ ./gradlew build
$ java -jar build/libs/authexperiments-0.0.1-SNAPSHOT.jar
```

### Build and start frontend
```
$ cd frontend
$ npm install
$ npm start
```

## Usage

* Frontend application: [http://localhost:4200](http://localhost:4200)
* Keycloak Admin Console: [http://localhost:8080/auth/admin](http://localhost:8080/auth/admin)
  * Username: admin
  * Password: admin