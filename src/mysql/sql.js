module.exports = {
    ADD_USER: 'insert into username (uid,user) values(?,?)',
    ADD_CLASSIFY: 'insert into classify (cid,t_name,t_icon,t_type,uid) values(?,?,?,?,?)',
    ADD_LOGIN: 'insert into loginlist (lid,cid,uid,create_time,money) values(?,?,?,?,?)',
    DELETE_LOGIN: 'delete from loginlist where lid=?',
    FIND_USER: 'select * from username where user=?',
    FIND_CLASSIFY: 'select * from classify where (uid=? or uid="*") and t_name=?',
    SELECTALL_LOGIN: 'select l.*,c.t_name,c.t_type,c.t_icon from classify c,loginlist l,username u where u.uid=? and l.uid=u.uid and l.cid=c.cid',
    SELECTTYPE_LOGIN: 'select l.*,c.t_name,c.t_type,c.t_icon from classify c,loginlist l,username u where u.uid=? and l.uid=u.uid and l.cid=c.cid and c.t_type=?',
    SELECTNAME_LOGIN: 'select l.*,c.t_name,c.t_type,c.t_icon from classify c,loginlist l,username u where u.uid=? and l.uid=u.uid and l.cid=c.cid and c.t_name=?'
}