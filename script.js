const headers = {'private_token': '1b13PazxJ5_DELouxJ3-'}

const commitsURL = "https://gitlab.com/api/v4/projects/21298954/repository/commits?all=true"
const issuesURL = "https://gitlab.com/api/v4/projects/21298954/issues"

fetch(commitsURL, {headers: headers})
.then(res=>{return res.json()})
.then(data=>(processData(data, getCommitNames, "-commits")))

fetch(issuesURL, {headers: headers})
.then(res=>{return res.json()})
.then(data=>(processData(data, getIssueNames, "-issues")))

function getCommitNames(commit) {
    const committer = shortenName(commit.committer_name)
    const author = shortenName(commit.committer_name)
    
    if (committer === author) {
        return [committer]
    } else {
        return [committer, author]
    }
}

function getIssueNames(issue) {
    let names = []
    if (issue.state === "closed") {
        for (assignee of issue.assignees) {
            names.push(shortenName(assignee.name))
        }
    }
    return names
}

function shortenName(name) {
    return name.split(" ")[0].toLowerCase()
}

function processData(data, getNames, idSuffix) {
    let dict = {total: 0}
    for (obj of data) {
        for (name of getNames(obj)) {
            if (name in dict) {
                dict[name]++
            } else {
                dict[name] = 1
            }
        }
        dict.total++
    }

    for (name in dict) {
        const id = name + idSuffix
        if (document.getElementById(id)) {
            document.getElementById(id).innerHTML = dict[name]
        }
    }
}
