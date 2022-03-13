import moment from 'moment';

/* **************************************************************** */
/*                                                                  */
/*   Utilities                                                      */
/*                                                                  */
/* **************************************************************** */
export function s2d (str) {
    if (!str || typeof str !== 'string')
        return null;

    const ret = /(\d+)[-|/](\d+)[-|/](\d+)/.exec(str);

    if (!ret)
        return null;

    const m = moment([
        ret[1] * 1,
        ret[2] * 1 - 1,
        ret[3] * 1
    ]);

    if(!m.isValid())
        return null;

    return m;
}
