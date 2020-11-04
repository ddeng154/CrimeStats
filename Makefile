format:
	black backend/api.py
	black backend/gitlab.py
	black backend/test.py
	black guitests.py

testbackend: 
	python3 backend/test.py

testui:
	python3 guitests.py