format:
	black backend/api.py
	black backend/gitlab.py
	black backend/test.py
	black guitests/guitests.py
	
testpostman:
	newman --version
	newman run postman.json

testbackend:
	cd backend && pip install -r backend/requirements.txt && python3 test.py

testfrontend:
	cd frontend && yarn install && yarn run test

testselenium:
	pip install selenium
	pip install webdriver_manager
	apt-get update -q -y
	apt-get --yes install libnss3
	apt-get --yes install libgconf-2-4
	apt-get install libx11-xcb1
	curl -sS -L https://dl.google.com/linux/linux_signing_key.pub | apt-key add -
	apt-get update -q -y
	apt-get install -y google-chrome-stable
	cd guitests && python3 guitests.py

build:
	sudo docker build . -t "hiranialy/crimestats"

deploy:
	sudo docker run -d -p 80:80 "hiranialy/crimestats"