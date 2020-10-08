from flask import Flask
from flask_restful import Resource, Api

from gitlab import Stats as GitLabStats

app = Flask(__name__)
api = Api(app)

api.add_resource(GitLabStats, '/api/gitlabstats')

if __name__ == '__main__':
    app.run(debug=True)