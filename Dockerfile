FROM python:3.6.5
MAINTAINER John Need "john.need@gmail.com"
ADD . /code
WORKDIR /code
RUN pip install -r requirements.txt; python safetoswim/setup.py install
CMD ["python", "safetoswim/servers/flask_server.py"]