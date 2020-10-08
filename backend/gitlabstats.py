from flask_restful import Resource
import requests

class GitLabStats(Resource):
    headers = {'private_token': '1b13PazxJ5_DELouxJ3-'}

    commitsURL = "https://gitlab.com/api/v4/projects/21298954/repository/commits?per_page=100"
    issuesURL = "https://gitlab.com/api/v4/projects/21298954/issues?per_page=100"

    def get(self):
        commits = requests.get(GitLabStats.commitsURL, headers=GitLabStats.headers).json()
        issues = requests.get(GitLabStats.issuesURL, headers=GitLabStats.headers).json()

        stats = {"Total": {"commits": 0, "issues": 0}}

        shortenName = lambda name: name.split()[0]

        for c in commits:
            name = shortenName(c["committer_name"])
            if name in stats:
                stats[name]["commits"] += 1
            else:
                stats[name] = {"commits": 1, "issues": 0}
            stats["Total"]["commits"] += 1

        for i in issues:
            if i["state"] == "closed":
                names = [shortenName(assignee["name"]) for assignee in i["assignees"]]
                for n in names:
                    if n in stats:
                        stats[n]["issues"] += 1
                    else:
                        stats[n] = {"commits": 0, "issues": 1}
                stats["Total"]["issues"] += 1

        return [{"name": n, **stats[n]} for n in stats]