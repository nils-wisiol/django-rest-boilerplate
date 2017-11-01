FROM python:3.6

RUN apt-get update && apt-get install -y \
		mysql-client libmysqlclient-dev \
		postgresql-client libpq-dev \
		sqlite3 \
	--no-install-recommends && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN mkdir /usr/src/app
RUN mkdir /usr/src/app/static
WORKDIR /usr/src/app

COPY requirements.txt /usr/src/app/
RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

COPY . /usr/src/app

EXPOSE 8000
CMD ["./entrypoint.sh"]
