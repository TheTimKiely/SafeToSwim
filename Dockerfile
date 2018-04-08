FROM python:3.6.2
MAINTAINER John Need "john.need@gmail.com"
COPY safetoswim /app
WORKDIR /app
RUN pip install --upgrade pip; pip install -r requirements.txt;
ENTRYPOINT ["python"]
CMD ["servers/flask_server.py"]