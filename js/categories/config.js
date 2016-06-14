export default function (nga, admin) {

   var API='http://test.api.qfplan.com/';//admin/access/login.json;
    var categories = admin.getEntity('categories');
      categories.listView().url(function(){
     return  API+'Admin/system/areas.json';
    })
      .title('Area  List')
        .sortField('date')
        .fields([
              nga.field('id','number'),
              nga.field('name'),
              nga.field('status','string'),
              nga.field('areaId','number'),
              nga.field('time','datetime'),
              nga.field('trade_model')
        ])
        .listActions([/*'<ma-filtered-list-button entity-name="products" filter="{ category_id: entry.values.id }" size="xs" label="Related products"></ma-filtered-list-button>', */'edit', 'delete']);
    categories.creationView().url(function(){
     return  API+'Admin/system/areas.json';
    })
    .title('Create new Area')
        .fields([
            nga.field('name')
                .validation({ required: true }),
            nga.field('status','string'),
            nga.field('areaId','number'),
            nga.field('trade_model','choice').
            choices([
                { value:'0',label:null},//-null 1-S 2-P 3-SP'},
                {value:'1',label:'S'},
                {value:'2',label:'P'},
                {value:'3',label:'SP'}
                ]),
            nga.field('', 'template')
                .label('')
                .editable(false)
                .template('<span class="pull-right"></span>')

        ]).onSubmitSuccess(['progression', 'notification', '$state', 'entry', 'entity','ngDialog', function(progression, notification, $state, entry, entity,ngDialog) {
    // stop the progress bar
               // console.log(notification,entry,entity);//,);
                progression.done();
                // add a notification
                switch(entry.values.Code){
                    case '2000':
                           notification.log(`Element #${entry.values.Msg} : ${entry.values.info} `, { addnCls: 'humane-flatty-success' });
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
     return  API+'Admin/system/area/'+ID+'.json';
    })
        .fields(nga.field('id').editable(false),
              nga.field('name'),
              nga.field('status','string'),
              nga.field('areaId'),
              nga.field('time','datetime'),
             nga.field('trade_model','choice').
             choices([
                { value:'0',label:null},//-null 1-S 2-P 3-SP'},
                {value:'1',label:'S'},
                {value:'2',label:'P'},
                {value:'3',label:'SP'}
                ])
            ).onSubmitSuccess(['progression', 'notification', '$state', 'entry', 'entity','ngDialog', function(progression, notification, $state, entry, entity,ngDialog) {
    // stop the progress bar
               // console.log(notification,entry,entity);//,);
                progression.done();
                // add a notification
                switch(entry.values.Code){
                    case '2000':
                           notification.log(`Element #${entry.values.Msg} : ${entry.values.info} `, { addnCls: 'humane-flatty-success' });
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
