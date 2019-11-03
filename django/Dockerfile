# Use the pyhton:3.7.4 image
FROM python:3.7.4-stretch

# Set locales to en_US.utf-8
RUN apt-get -y update && apt-get install -y locales && rm -rf /var/lib/apt/lists/* \
    && localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8
ENV LANG en_US.utf8

# Layer for python support
RUN apt-get -y update && apt-get install -y build-essential libssl-dev libffi-dev python3-dev

RUN apt-get -y update && apt-get -y install apt-transport-https ca-certificates

# Begin of mandatory layers for Microsoft ODBC Driver 13 for Linux
RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
RUN curl https://packages.microsoft.com/config/debian/9/prod.list > /etc/apt/sources.list.d/mssql-release.list
RUN apt-get -y update && ACCEPT_EULA=Y apt-get install -y msodbcsql17
RUN apt-get install -y unixodbc-dev
# End of mandatory layers for Microsoft ODBC Driver 13 for Linux

# Set the working directory to /app
WORKDIR /app

# Install the dependencies
RUN pip install pip --upgrade
ADD ./requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt

# Copy the current directory contents into the container at /app 
ADD . /app

# run the command to start gunicorn
ENTRYPOINT ["sh", "entrypoint.sh"]