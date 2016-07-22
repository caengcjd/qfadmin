export default function (nga, admin) {

   var API='http://test.api.qfplan.com/';//admin/access/login.json;
    var categories = admin.getEntity('tag-value').identifier(nga.field('_id'));
      categories.listView().url(function(){
     return  API+'Admin/ware/type/tag/value.json';
    })
      .title('Tag Value')
        .sortField('_id')
        .fields([
          nga.field('_id').isDetailLink(true),
              nga.field('name'),
              nga.field('status'),
              nga.field('tag_id'),
              nga.field('admin_id'),
              nga.field('remark')
        ])
        .listActions(['edit', 'delete']);
    categories.creationView().url(function(){
     return  API+'Admin/ware/type/tag/value.json';
    })
    .title('Create new ')
        .fields([
              nga.field('name'),
              nga.field('status'),
              nga.field('tag_id'),
              nga.field('remark')
        ]).onSubmitSuccess(['progression', 'notification', '$state', 'entry', 'entity','ngDialog', function(progression, notification, $state, entry, entity,ngDialog) {
    // stop the progress bar
               // console.log(notification,entry,entity);//,);
                progression.done();
                // add a notification
                switch(entry.values.Code){
                    case '2000':
                           notification.log(`Element #${entry.values.Msg} : ${entry.values.info} `, { addnCls: 'humane-flatty-success' });
                           break;
                    case '1002':
                           notification.log(`mongodb 数据库错误`, { addnCls: 'humane-flatty-success' });
                           break;
                    default:
                          notification.log(`Element # add  Successfully `, { addnCls: 'humane-flatty-success' });
                }
                // redirect to the list view
                //$state.go($state.get('list'), { entity: entity.name() });
                // cancel the default action (redirect to the edition view)
                return false;
            }]);
    categories.editionView().title('Edit Area').url(function(ID){
       return  API+'Admin/ware/type/tag/value.json?id='+ID;
    })
        .fields(
           nga.field('_id').editable(false),
             nga.field('name')
                .validation({ required: true }),
              nga.field('status'),
              nga.field('tag_id').editable(false),
              nga.field('admin_id').editable(false),
              nga.field('remark','string')
            ).onSubmitSuccess(['progression', 'notification', '$state', 'entry', 'entity','ngDialog', function(progression, notification, $state, entry, entity,ngDialog) {
    // stop the progress bar
               // console.log(notification,entry,entity);//,);
                progression.done();
                // add a notification
                switch(entry.values.Code){
                    case '2000':
                           notification.log(`标签值编号格式错误 `, { addnCls: 'humane-flatty-success' });
                           break;
                    case '1002':
                           notification.log(`mongodb 数据库错误`, { addnCls: 'humane-flatty-success' });
                           break;
                    default:
                            notification.log(`Element # add  Successfully `, { addnCls: 'humane-flatty-success' });
                }
                // redirect to the list view
                //$state.go($state.get('list'), { entity: entity.name() });
                // cancel the default action (redirect to the edition view)
                return false;
            }])

              categories.deletionView().title('Delete Tag-Value').url(function(ID){
                return  API+'Admin/ware/type/tag/value/:'+ID+'.json';
    })

    return categories;
}
