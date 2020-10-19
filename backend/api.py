from flask import Flask, render_template
from flask_cors import CORS
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_restless import APIManager
from gitlab import Stats as GitLabStats

app = Flask(__name__, static_folder='../frontend/build/static', template_folder='../frontend/build')
CORS(app)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template('index.html')

api = Api(app)
api.add_resource(GitLabStats, '/api/gitlabstats')

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:cactusjack77@35.239.4.145/crimestats'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
manager = APIManager(app, flask_sqlalchemy_db=db)

class County(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode)

class PoliceDepartment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode)

class Crime(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode)

class LinkCountyPoliceDepartment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    county_id = db.Column(db.Integer)
    police_department_id = db.Column(db.Integer)

def AddEndpoint(model, name, single=None):
    postprocessors = {} if single is None else {'GET_SINGLE': [single]}
    manager.create_api(model, methods=['GET'], collection_name=name, postprocessors=postprocessors)

def countySingle(result):
    links = LinkCountyPoliceDepartment.query.filter_by(county_id=result['id']).all()
    convert = lambda pd: {'id': pd.id, 'name': pd.name}
    result['police_departments'] = [convert(PoliceDepartment.query.get(link.police_department_id)) for link in links]

def policeDepartmentSingle(result):
    links = LinkCountyPoliceDepartment.query.filter_by(police_department_id=result['id']).all()
    convert = lambda c: {'id': c.id, 'name': c.name}
    result['counties'] = [convert(County.query.get(link.county_id)) for link in links]

AddEndpoint(County, 'counties', countySingle)
AddEndpoint(PoliceDepartment, 'police_departments', policeDepartmentSingle)
AddEndpoint(Crime, 'crimes')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, threaded=True, debug=True)