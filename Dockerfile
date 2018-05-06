FROM python:3.6.5
ADD . /code
WORKDIR /code
RUN pip install python-dotenv
RUN pip install -r requirements.txt
RUN python safetoswim/setup.py install
CMD ["python", "safetoswim/servers/flask_server.py"]