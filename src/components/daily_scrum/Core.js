import moment from 'moment';

export default class Core {
    checkAssignees (filter, issue) {
            const id_list = issue.assignees.nodes.map(d=>d.id);

            const id_list_filterd = id_list.reduce((list, id)=> {
                if (filter.assignee.indexOf(id)===-1)
                    list.push(id);

                return list;
            }, []);

        return id_list_filterd.length > 0;
    }
    checkStatus (filter, issue) {
        if (!filter.status.Close && issue.closedAt)
            return false;

        if (!filter.status.Open && !issue.closedAt)
            return false;

        return true;
    }
    checkYesterday (filter, issue) {
        const yesterday = moment().startOf('day').add('d',-1);
        console.log(filter.others.Yesterday);
        console.log(moment(issue.updatedAt));
        console.log(yesterday.format('YYYY-MM-DD'));
        console.log(yesterday.toISOString());

        if (filter.others.Yesterday)
            if (moment(issue.updatedAt).isBefore(yesterday))
                return false;

        return true;
    }
    filteringIssue (filter, issues) {
        return issues.reduce((list, issue) => {
            if (this.checkAssignees(filter, issue) &&
                this.checkStatus(filter, issue) &&
                this.checkYesterday(filter, issue))
                list.push(issue);

            return list;
        }, []);
    }
    addPool (data, pool) {
        if (pool.ht[data.id])
            return;

        data.issues = [];

        pool.ht[data.id] = data;
        pool.list.push(data);
    }
    issues2projects (issues) {
        const projects = { ht:{}, list: [] };

        for (const issue of issues) {
            if (issue.projectCards.nodes[0]) {
                const p = issue.projectCards.nodes[0].column.project;

                this.addPool(p, projects);

                projects.ht[p.id].issues.push(issue);
            }
        }

        return projects;
    }
    pointFromIssueBody (v) {
        const ret = /.*@Point:\s+(\d+).*/.exec(v);

        if (!ret) return '';

        return ret[1] * 1;
    }
}
