function clearBoth (source, node_class) {
    const source_id = source.id();

    const source_karma = source.karma();

    for (const target_id of Object.keys(source_karma)) {
        const target = source_karma[target_id];

        if (target.constructor.name===node_class) {
            delete source_karma[target_id];
            delete target.karma()[source_id];
        }
    }
}

export function deletesInsert (source, target) {
    const karma_source = source.karma();
    const karma_target = target.karma();

    const id_source = source.id();
    const id_target = target.id();

    // 一旦全部クリアする。
    clearBoth(source, target.constructor.name);

    // 新たに追加する。
    karma_source[id_target] = target;
    karma_target[id_source] = source;
}

export function deletesInserts (source, targets) {
    const karma_source = source.karma();

    const id_source = source.id();

    // 一旦全部クリアする。
    clearBoth(source, targets[0].constructor.name);

    // 新たに追加する。
    for (const target of targets) {
        const karma_target = target.karma();
        const id_target = target.id();

        karma_source[id_target] = target;
        karma_target[id_source] = source;
    }
}
