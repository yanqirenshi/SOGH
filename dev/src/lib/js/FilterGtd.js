import Filter from './Filter.js';

export default class FilterGtd extends Filter {
    constructor (filter) {
        super({});
    }
    issues2filter (old_filter, issues) {
        const projects = {};
        const milestones = {};

        const active = (type, milestone) => {
            const old = old_filter[type].ht[milestone.id];
            return old ? old.active : true;
        };

        for (const issue of issues) {
            const milestone = issue.milestone;
            if (milestone && !milestones[milestone.id]) {
                milestones[milestone.id] = milestone;
                milestones[milestone.id].active = active('milestones', milestone);
            }

            const cards = issue.projectCards.nodes;
            if (cards.length>0)
                for (const card of cards) {
                    if (!card.column)
                        continue;

                    const project = card.column.project;

                    if (!projects[project.id]) {
                        projects[project.id] = project;
                        projects[project.id].active = active('projects', project);
                    }
                }
        }

        return {
            projects:   { ht: projects,   list: Object.values(projects) },
            milestones: { ht: milestones, list: Object.values(milestones) },
            contents: old_filter.contents,
        };
    }
    apply (filter, issues) {
        const ope = (ht,d) => {
            ht[d.id] = d.active;
            return ht;
        };

        const projects = filter.projects.list.reduce(ope, {});
        const milestones = filter.milestones.list.reduce(ope, {});

        return issues.filter(d => {
            // milestone
            if (d.milestone && milestones[d.milestone.id]===false)
                return false;

            // project
            const cards = d.projectCards.nodes;
            let exist = false;
            if (cards.length > 0)
                for (const card of cards) {
                    if (!card.column) continue;

                    if (projects[card.column.project.id])
                        exist = true;
                }

            if (!exist)
                return false;


            if (filter.contents.word.trim()!=='') {
                const word = filter.contents.word.toUpperCase();

                if (filter.contents.targets.labels && d.projectCards.nodes.length>0) {
                    const x = d.projectCards.nodes.find(d => {
                        return d.column.name.toUpperCase().indexOf(word) > 0;
                    });

                    if (!x) return false;
                }

                if (filter.contents.targets.title) {
                    if (d.title.toUpperCase().indexOf(word)===-1)
                        return false;
                }
            }

            return true;
        });
    }

}
