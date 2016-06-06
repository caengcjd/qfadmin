export default function (nga, admin) {
   var API='http://test.api.qfplan.com/';//admin/access/login.json;
    var commands = admin.getEntity('commands');
    commands.listView().url(function(){
     return  API+'Admin/order/list.json';
    })
        .sortField('date')
        .sortDir('DESC')
        .fields([
              nga.field('id'),
                nga.field('order_main_id'),
                  nga.field('goods_name'),
                    nga.field('quality'),
                       nga.field('con'),
                          nga.field('trade_model'), 
                             nga.field('area_id'),
                                nga.field('goods_id'),
                                   nga.field('quality'),
                                      nga.field('seller_id'),
            nga.field('buyer_status'),
                nga.field('seller_status'),
                    nga.field('handle_status'),
                        nga.field('pay_status'),
                            nga.field('seller_nickname'),
                                nga.field('buyer_id'),
                                    nga.field('order_name'),
                                    nga.field('order_status'),
                                    nga.field('pay_id'),
                                    nga.field('buyer_nickname')
        ])
        /*
        .filters([
            nga.field('q', 'template')
                .label('')
                .pinned(true)
                .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span></div>'),
            nga.field('customer_id', 'reference')
                .label('Customer')
                .targetEntity(admin.getEntity('customers'))
                .targetField(nga.field('last_name').map((v, e) => e.first_name + ' ' + e.last_name))
                .remoteComplete(true, {
                    searchQuery: function(search) { return { q: search }; }
                }),
            nga.field('status', 'choice')
                .choices([
                    { label: 'ordered', value: 'ordered' },
                    { label: 'delivered', value: 'delivered' },
                    { label: 'cancelled', value: 'cancelled' }
                ]),
            nga.field('date_gte', 'datetime')
                .label('Passed since'),
            nga.field('date_lte', 'datetime')
                .label('Passed before'),
            nga.field('total_gte', 'amount')
                .label('Min amount'),
            nga.field('returned', 'boolean')
        ])
        */
        .listActions(['<ma-edit-button entry="::entry" entity="::entity" size="xs" label="Details"></ma-edit-button>']);
    commands.editionView().url(function(orderID){
     return  API+'Admin/order/'+orderID+'.json';
    })
        .title('Command # order details ')
        .fields([
            nga.field('id').editable(false),
            nga.field('order_main_id')
                .editable(false),
            nga.field('goods_name'). editable(false),,
            nga.field('quality')
                .editable(false),
            nga.field('order_main_id')
                .editable(false),
             nga.field('con'),
                          nga.field('trade_model'), 
                             nga.field('area_id'),
                                nga.field('goods_id'),
                                   nga.field('quality'),
                                      nga.field('seller_id'),
                                       nga.field('buyer_nickname'),
            nga.field('buyer_status'),
                nga.field('seller_status'),
                    nga.field('handle_status'),
                        nga.field('pay_status'),
                            nga.field('seller_nickname'),
                                nga.field('buyer_id'),
                                    nga.field('order_name'),
                                    nga.field('order_status'),
                                    nga.field('pay_id'),
                                    nga.field('buyer_nickname')
            //nga.field('returned', 'boolean')
        ])

    return commands;
}
