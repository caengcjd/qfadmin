export default function (nga, admin) {
   var API='http://test.api.qfplan.com/';//admin/access/login.json;
    var commands = admin.getEntity('commands');
    commands.listView().url(function(){
     return  API+'Admin/order/list.json';
    })
        .sortField('date')
        .sortDir('DESC')
        .fields([
              nga.field('id','number'),
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
                                    nga.field('buyer_nickname'),
                                 //   nga.field('buyer_email'),
                               //     nga.field('buyer_name'),
                                    nga.field('abnormal_name','string'),
                                    nga.field('abnormal_id','number').isDetailLink(true).label('异常订单编号'),
                                 //   nga.field('abnormal_time','datetime'),
                                    nga.field('abnormal_status','string')
                                    //mga.field('buyer_phone'),
                                   // "buyer_avatar": "430b645cabdb557d.png",       // 买家头像
                              
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
                                    nga.field('buyer_nickname'),      
                                    nga.field('abnormal_name','string'),
                                    nga.field('abnormal_id','number').isDetailLink(true).label('异常订单编号abnormal_id').editable(false),
                                    nga.field('abnormal_time','datetime'),
                                    nga.field('abnormal_status','string'),
                                       nga.field('reason','string'),
                                          nga.field('abnormal_finish_time','datetime'),
                                             nga.field('amount_return','number').format('$0,0.00').editable(true).label('退款金额'),
                                             nga.field('number_return','number').format('$0,0.00').editable(true).label('退款number'),
                                                nga.field('qf_pay_id','number').label(' 清风支付编号'),
                                                   nga.field('qf_pay_time','datetime').label('清风支付时间'),
                                                      nga.field('qf_pay_status','string').label('qf_pay_status'),
                                                         nga.field('buyer_amount','number').label('买家收取金额'),
                                                            nga.field('seller_amount','number').format('$0,0.00').label('卖家收取金额'),
                                                              nga.field('admin_id','number').format('$0,0.00').label('异常订单操作管理员编号')

            //nga.field('returned', 'boolean')
        ])

    return commands;
}
