FROM maven

VOLUME /tmp

WORKDIR /app

ADD . /app

RUN mvn clean install

# ARG JAR_FILE=/app/target/planetary-0.0.1-SNAPSHOT.jar

# COPY ${JAR_FILE} planetary.jar

ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app/target/planetary-0.0.1-SNAPSHOT.jar"]