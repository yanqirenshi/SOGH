function SEED_CLASSES () {
    return [
        { _id: 1010000, _parent: 10003, label: 'Filter' },
        { _id: 1010001, _parent: 10001, label: 'GithubApiV3' },
        { _id: 1010002, _parent: 10001, label: 'GithubApiV4' },
        { _id: 1010003, _parent: 10002, label: 'Gtd' },
        { _id: 1010004, _parent: 10000, label: 'Issue' },
        { _id: 1010005, _parent: 10003, label: 'Pool' },
        { _id: 1010006, _parent: 10002, label: 'ProductBacklog' },
        { _id: 1010007, _parent: 10002, label: 'ProductBacklogs' },
        { _id: 1010008, _parent: 10002, label: 'Scrum' },
        { _id: 1010009, _parent: 100,   label: 'Sogh' },
        { _id: 1010010, _parent: 10000, label: 'Milestone' },
        { _id: 1010011, _parent: 10000, label: 'Project' },
        { _id: 1010012, _parent: 10000, label: 'Repository' },
        { _id: 1010013, _parent: 10001, label: 'Loader' },
        { _id: 1010014, _parent: 10003, label: 'Label' },
        { _id: 1010015, _parent: 10003, label: 'Column' },
        { _id: 1010016, _parent: 10004, label: 'ProductBacklogs' },
        { _id: 1010017, _parent: 10004, label: 'ProductBacklog' },
        { _id: 1010018, _parent: 10004, label: 'SprintPlanning' },
        { _id: 1010019, _parent: 10004, label: 'ScrumTimeline' },
        { _id: 1010020, _parent: 10004, label: 'ScrumProjects' },
        { _id: 1010021, _parent: 10004, label: 'Reports' },
        { _id: 1010022, _parent: 10004, label: 'PanelCreateIssue' },
        { _id: 1010023, _parent: 10004, label: 'ViwerIssues' },
    ];
}

const WORKPACKAGES = [
    ...SEED_CLASSES(),
].map(d => {
    const wp = {...d};
    wp._class = 'WORKPACKAGE';
    return wp;
});

export default WORKPACKAGES;
