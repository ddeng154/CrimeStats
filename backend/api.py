from flask import Flask
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy
from flask_restless import APIManager
from gitlab import Stats as GitLabStats

app = Flask(__name__)
api = Api(app)

api.add_resource(GitLabStats, '/api/gitlabstats')

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:cactusjack77@35.239.4.145/crimestats'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Test(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode)

manager = APIManager(app, flask_sqlalchemy_db=db)
manager.create_api(Test)

if __name__ == '__main__':
    app.run(debug=True)