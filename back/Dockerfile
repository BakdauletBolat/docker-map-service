FROM python:3.9-alpine

WORKDIR /usr/src/app

RUN apk update \
    && apk add --virtual build-deps gcc python3-dev musl-dev \
    && apk add postgresql \
    && apk add postgresql-dev \
    && pip3 install psycopg2 \
    && apk add jpeg-dev zlib-dev libjpeg \
    && apk add -u zlib-dev \
    && pip3 install Pillow \
    && apk del build-deps 
    

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip

COPY ./req.txt /usr/src/app

RUN pip install -r req.txt

COPY . /usr/src/app