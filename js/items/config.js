export default function (nga, admin) {

   var API='http://test.api.qfplan.com/';//admin/access/login.json;
    var categories = admin.getEntity('items');
      categories.listView().url(function(){
     return  API+'Admin/ware/type.json';
    })
      .title('Goods  Types')
        .sortField('date')
        .fields([
              nga.field('name'),
              nga.field('remark'),
              nga.field('status','string'),
              nga.field('father_id','number')
        ])
        .listActions([/*'<ma-filtered-list-button entity-name="products" filter="{ category_id: entry.values.id }" size="xs" label="Related products"></ma-filtered-list-button>', */'edit', 'delete']);
    categories.creationView().url(function(){
     return  API+'Admin/ware/type.json';
    })
    .title('Create new ')
        .fields([
            nga.field('remark'),
            nga.field('father_id','number'),
            nga.field('name')
                .validation({ required: true }),
            nga.field('status','string'),
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
     return  API+'ware/type.json';
    })
        .fields(
            nga.field('remark'),
            nga.field('father_id','number'),
            nga.field('name')
                .validation({ required: true }),
            nga.field('status','string')
            ).onSubmitSuccess(['progression', 'notification', '$state', 'entry', 'entity','ngDialog', function(progression, notification, $state, entry, entity,ngDialog) {
    // stop the progress bar
               // console.log(notification,entry,entity);//,);
                progression.done();
                // add a notification
                switch(entry.values.Code){
                    case '9001':
                           notification.log(`分类编号未找到! `, { addnCls: 'humane-flatty-success' });
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



        

    return categories;
}
