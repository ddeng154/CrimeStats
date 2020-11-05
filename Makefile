format:
	black backend/api.py
	black backend/gitlab.py
	black backend/test.py
	black guitests.py

testbackend:
	cd backend
	python3 test.py

testui:
	cd guitests
	python3 guitests.py