var moment = require('moment');
var fromNow = v => moment(v).fromNow();

var segments = require('../segments/segments').choices;
export default function (nga, admin) {

    var API='http://test.api.qfplan.com/';//admin/access/login.json;
    var customer = admin.getEntity('customers');
    customer.listView().url(function(){
     return  API+'Admin/user/list.json';
    })
        .title('Users')
        .fields([
            nga.field('user_id')
                  .isDetailLink(true),
            nga.field('nickname') // use last_name for sorting
                .label('Name'),
            nga.field('email', 'number')
                .cssClasses('hidden-xs'),
            nga.field('telephone', 'number')
                .label('telephone')
                 .cssClasses('hidden-xs'),
            nga.field('score', 'amount')
                .cssClasses('hidden-xs'),
            nga.field('reg_time', 'datetime')
                .cssClasses('hidden-xs'),
            nga.field('gender')
                .label('gender')
                .cssClasses('hidden-xs'),
            nga.field('area_id')
                .cssClasses('hidden-xs'),
        ])
        .sortField('nickname')
        .sortDir('DESC')
        .listActions(['<ma-edit-button entry="::entry" entity="::entity" size="xs" label="Details"></ma-edit-button>']);
      /*  .exportFields([
            nga.field('avatar', 'text'),
            nga.field('last_name', 'template').label('Name').template(entry => entry.values.first_name + ' ' + entry.values.last_name),
            nga.field('last_seen', 'datetime'),
            nga.field('nb_commands', 'number').label('Commands'),
            nga.field('total_spent', 'amount'),
            nga.field('latest_purchase', 'datetime'),
            nga.field('has_newsletter', 'boolean').label('Newsletter'),
            nga.field('segments', 'template').template(entry => `${entry.values.groups}`),
        ])*/
    customer.editionView().url(function(orderID){
     return  API+'Admin/user.json?id='+orderID;
    })
        .title('<img   width="50" style="vertical-align: text-bottom"/> user  details')
        .fields([
             nga.field('user_id')
                  .isDetailLink(true),
            nga.field('nickname') // use last_name for sorting
                .label('Name'),
            nga.field('email', 'number')
                .cssClasses('hidden-xs'),
            nga.field('telephone', 'number')
                .label('telephone')
                 .cssClasses('hidden-xs'),
            nga.field('score', 'amount')
                .cssClasses('hidden-xs'),
            nga.field('reg_time', 'datetime')
                .cssClasses('hidden-xs'),
            nga.field('gender')
                .label('gender')
                .cssClasses('hidden-xs'),
            nga.field('area_id')
                .cssClasses('hidden-xs'),
                ])
    return customer;
}
