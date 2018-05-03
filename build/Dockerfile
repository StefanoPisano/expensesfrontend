FROM openjdk:8-jdk
COPY expenses-0.0.1.jar /tmp/expenses.jar
COPY application.yml /tmp/application.yml
CMD ["java", "-jar", "/tmp/expenses.jar", "-d", "-Dconfig.file=/tmp/application.yml"]
