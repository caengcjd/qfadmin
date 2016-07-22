export default function (nga, admin) {
    return nga.menu()
        .addChild(nga.menu()
            .title('Visitors')
            .icon('<span class="fa fa-users fa-fw"></span>')
            .active(path => path.indexOf('/customers') === 0) // active() is the function that determines if the menu is active
            .addChild(nga.menu()
                .title('Leads')
             //   .link('/customers/list?search={"has_ordered":"false"}') // use the same entity list for several menu items
                .icon('<span class="fa fa-user-times fa-fw"></span>')) // no active() function => will never appear active
            .addChild(nga.menu(admin.getEntity('customers')).title('Users')
                .icon('<span class="fa fa-tags fa-fw"></span>'))
            .addChild(nga.menu()
                .title('Segments')
                .link('/segments') // this state isn't handled by ng-admin - no problem
                .active(path => path == '/segments')
                .icon('<span class="fa fa-scissors fa-fw"></span>'))
        )
        .addChild(nga.menu()
            .title('Sales')
            .icon('<span class="fa fa-shopping-cart fa-fw"></span>')
            .active(path => path.indexOf('/commands') === 0)
            .addChild(nga.menu()
                .title('Orders')
                .link('/commands/list?search={"status":"ordered"}')
                .icon('<span class="fa fa-credit-card fa-fw"></span>'))
           /* .addChild(nga.menu()
                .title('Invoices')
                .link('/commands/list?search={"status":"delivered"}')
                .icon('<span class="fa fa-usd fa-fw"></span>'))
            .addChild(nga.menu()
                .title('Cancels')
                .link('/commands/list?search={"status":"cancelled"}')
                .icon('<span class="fa fa-hand-o-left fa-fw"></span>'))
                */
        )
        .addChild(nga.menu()
            .title('Catalog')
            .icon('<span class="fa fa-th-list fa-fw"></span>')
            .addChild(nga.menu(admin.getEntity('categories')).title('areas')
                .icon('<span class="fa fa-tags fa-fw"></span>')).
            addChild(nga.menu(admin.getEntity('products')).title('areas  cache')// nga.menu(entity) sets defaults title, link and active values correctly
               .icon('<span class="fa fa-picture-o fa-fw"></span>'))
        ).addChild(nga.menu()
            .title('Products')
            .icon('<span class="fa fa-th-list fa-fw"></span>')
            .addChild(nga.menu(admin.getEntity('items')).title('Items')
                .icon('<span class="fa fa-tags fa-fw"></span>')).
            addChild(nga.menu(admin.getEntity('tags')).title('Tags')// nga.menu(entity) sets defaults title, link and active values correctly
               .icon('<span class="fa fa-picture-o fa-fw"></span>')).
              addChild(nga.menu(admin.getEntity('tag-value')).title('Tags values')// nga.menu(entity) sets defaults title, link and active values correctly
               .icon('<span class="fa fa-picture-o fa-fw"></span>'))

        )
        .addChild(nga.menu(admin.getEntity('reviews'))
            .icon('<span class="fa fa-comments fa-fw"></span>'))
        .addChild(nga.menu()
            .title('Configuration')
            .icon('<span class="fa fa-cog fa-fw"></span>')
            .link('/settings/show/1')
            .active(path => path.indexOf('/settings') === 0)
        )
    ;
}
