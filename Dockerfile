FROM nikolaik/python-nodejs

RUN ls && pwd
RUN git clone https://gitlab.com/alyhirani/crimestats.git

RUN ls && pwd
WORKDIR /crimestats

RUN ls && pwd
RUN git pull --force

RUN ls && pwd
RUN cd frontend && yarn install && yarn build

RUN ls && pwd
RUN pip3 install -r backend/requirements.txt

EXPOSE 80

CMD python3 backend/api.py