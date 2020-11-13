from flask_restful import Resource
import requests

# Retrieves and formats user stats from gitlab
class Stats(Resource):
    commitsURL = (
        "https://gitlab.com/api/v4/projects/21298954/repository/commits?per_page=-1"
    )
    issuesURL = "https://gitlab.com/api/v4/projects/21298954/issues?per_page=100"

    # Retrieves commits, issues, and name
    # returns formatted commits, issues, and names
    def get(self):
        commits = requests.get(self.commitsURL).json()
        issues = requests.get(self.issuesURL).json()

        stats = {"total": {"commits": 0, "issues": 0, "tests": 11}}

        shortenName = lambda name: name.split()[0].lower()

        for c in commits:
            name = shortenName(c["committer_name"])
            if name in stats:
                stats[name]["commits"] += 1
            else:
                stats[name] = {"commits": 1, "issues": 0, "tests": 11}
            stats["total"]["commits"] += 1

        for i in issues:
            if i["state"] == "closed":
                names = [shortenName(assignee["name"]) for assignee in i["assignees"]]
                for n in names:
                    if n in stats:
                        stats[n]["issues"] += 1
                    else:
                        stats[n] = {"commits": 0, "issues": 1, "tests": 11}
                if not names:
                    for s in stats:
                        if s != "total":
                            stats[s]["issues"] += 1
                stats["total"]["issues"] += 1

        return [{"name": n, **stats[n]} for n in stats]
