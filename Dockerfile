FROM python:3
ENV PYTHONUNBUFFERED 1
RUN mkdir /var/app
WORKDIR /var/app
COPY requirements.txt /var/app/
RUN pip install -r requirements.txt
COPY . /var/app/
RUN apt-get update && apt-get install -y supervisor nano
COPY supervisor/. /etc/supervisor/
CMD ["/usr/bin/supervisord"]
