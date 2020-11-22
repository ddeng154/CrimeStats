format:
	black backend/api.py
	black backend/gitlab.py
	black backend/test.py
	black guitests/guitests.py
	
testbackend:
	cd backend && pip install -r requirements.txt && python3 test.py

testfrontend:
	cd frontend && yarn install && yarn run test

testselenium:
	cd guitests && pip install selenium
	cd guitests && pip install webdriver_manager
	cd guitests && apt-get update -q -y
	cd guitests && apt-get --yes install libnss3
	cd guitests && apt-get --yes install libgconf-2-4
	cd guitests && apt-get install libx11-xcb1
	cd guitests && curl -sS -L \
		https://dl.google.com/linux/linux_signing_key.pub | apt-key add -
	cd guitests && apt-get update -q -y
	cd guitests && apt-get install -y google-chrome-stable
	cd guitests && python3 guitests.py

build:
	sudo docker build . -t "hiranialy/crimestats"

deploy:
	sudo docker run -d -p 80:80 "hiranialy/crimestats"