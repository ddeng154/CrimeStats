from flask import Flask, render_template
from flask_cors import CORS
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_restless import APIManager
from gitlab import Stats as GitLabStats
app = Flask(
    __name__,
    static_folder="../frontend/build/static",
    template_folder="../frontend/build",
)
CORS(app)

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def index(path):
    return render_template("index.html")
# add gitlab data to api
api = Api(app)
api.add_resource(GitLabStats, "/api/gitlabstats")

# allow connection to GCP database
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "postgresql://postgres:cactusjack77@35.239.4.145/crimestats"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
manager = APIManager(app, flask_sqlalchemy_db=db)

# model of county for SQLAlchemy
class County(db.Model):
    id = db.Column(db.Unicode, primary_key=True)
    name = db.Column(db.Unicode)
    state = db.Column(db.Unicode)
    median_income = db.Column(db.Integer)
    total_pop = db.Column(db.Integer)
    black_pop = db.Column(db.Integer)
    white_pop = db.Column(db.Integer)
    pacific_pop = db.Column(db.Integer)
    native_pop = db.Column(db.Integer)
    asian_pop = db.Column(db.Integer)
    area = db.Column(db.Float)
    longitude = db.Column(db.Float)
    latitude = db.Column(db.Float)

# model of police departments for SQLAlchemy
class Police(db.Model):
    ori = db.Column(db.Unicode, primary_key=True)
    name = db.Column(db.Unicode)
    pop = db.Column(db.Integer)
    num_male_officers = db.Column(db.Integer)
    num_female_officers = db.Column(db.Integer)
    num_civilians = db.Column(db.Integer)
    dept_type = db.Column(db.Unicode)
    div_name = db.Column(db.Unicode)
    reg_name = db.Column(db.Unicode)
    density_per_1000 = db.Column(db.Float)

# model of crimes for SQLAlchemy
class Crime(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ori = db.Column(db.Unicode)
    type = db.Column(db.Unicode)
    o_white = db.Column(db.Integer)
    o_black = db.Column(db.Integer)
    o_pacific = db.Column(db.Integer)
    o_native = db.Column(db.Integer)
    o_asian = db.Column(db.Integer)
    v_white = db.Column(db.Integer)
    v_black = db.Column(db.Integer)
    v_pacific = db.Column(db.Integer)
    v_native = db.Column(db.Integer)
    v_asian = db.Column(db.Integer)

# model of link between police dpts and counties for SQLAlchemy
class PoliceCountyLink(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    county_id = db.Column(db.Unicode)
    ori = db.Column(db.Unicode)

# add all the endpoints for generic calls, i.e. get all police
def AddEndpoint(model, name, single=None):
    postprocessors = {} if single is None else {"GET_SINGLE": [single]}
    manager.create_api(
        model, methods=["GET"], collection_name=name, postprocessors=postprocessors
    )

# create the links to police departments and crimes from specific county
def countySingle(result):
    links = PoliceCountyLink.query.filter_by(county_id=result["id"]).all()
    oris = {link.ori for link in links}
    result["police_departments"] = []
    result["crimes"] = []
    for ori in oris:
        police = Police.query.get(ori)
        if police is not None:
            name = police.name
            result["police_departments"].append({"ori": ori, "name": name})
            result["crimes"].extend(
                [
                    {"id": c.id, "type": c.type, "pd_name": name}
                    for c in Crime.query.filter_by(ori=ori).all()
                ]
            )

# create the links to crimes and counties for a specific police department
def policeSingle(result):
    links = PoliceCountyLink.query.filter_by(ori=result["ori"]).all()
    cids = {link.county_id for link in links}
    result["counties"] = [
        {"id": cid, "name": County.query.get(cid).name} for cid in cids
    ]
    result["crimes"] = [
        {
            "id": c.id,
            "type": c.type,
            "total": c.o_white + c.o_black + c.o_asian + c.o_pacific + c.o_native,
        }
        for c in Crime.query.filter_by(ori=result["ori"]).all()
    ]

# create the links to counties and police departments from specific crime
def crimeSingle(result):
    links = PoliceCountyLink.query.filter_by(ori=result["ori"]).all()
    cids = {link.county_id for link in links}
    result["counties"] = [
        {"id": cid, "name": County.query.get(cid).name} for cid in cids
    ]
    result["pd_name"] = Police.query.get(result["ori"]).name


AddEndpoint(County, "counties", countySingle)
AddEndpoint(Police, "police_departments", policeSingle)
AddEndpoint(Crime, "crimes", crimeSingle)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80, threaded=True, debug=True)
