FROM python:3.6.2
MAINTAINER John Need "john.need@gmail.com"
ADD . /app
WORKDIR /app
RUN pip install --upgrade pip; pip install -r requirements.txt; python safetoswim/setup.py install
ENTRYPOINT ["python"]
CMD ["safetoswim/servers/flask_server.py"]