import moment from 'moment';
import productsEditionTemplate from './productsEditionTemplate.html';

var fromNow = v => moment(v).fromNow();

export default function (nga, admin) {
 
    var API='http://test.api.qfplan.com/';//admin/access/login.json;
    var products = admin.getEntity('products');
    products.listView().url(function(){
     return  API+'Admin/system/areas/cache.json';
    })
        .title('All  Redis Caches')
        .fields([
            nga.field('id').isDetailLink(true),
            nga.field('name', 'string')
                .cssClasses('hidden-xs'),
            nga.field('status', 'float')
                .format('0')
                .cssClasses('hidden-xs'),
            nga.field('level', 'number')
                .cssClasses('hidden-xs'),
            nga.field('time', 'datetime')
                .cssClasses('hidden-xs'),
            nga.field('admin_id', 'number')
                .cssClasses('hidden-xs'),
        ])
      /*  .filters([
            nga.field('q', 'template')
                .label('')
                .pinned(true)
                .template('<div class="input-group"><input type="text" ng-model="value" placeholder="Search" class="form-control"></input><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span></div>'),
            nga.field('category_id', 'reference')
                .label('Category')
                .targetEntity(admin.getEntity('categories'))
                .targetField(nga.field('name')),
            nga.field('width_gte', 'number')
                .label('Min width'),
            nga.field('width_lte', 'number')
                .label('Max width'),
            nga.field('height_gte', 'number')
                .label('Min height'),
            nga.field('height_lte', 'number')
                .label('Max height'),
            nga.field('stock_lte', 'template')
                .label('Low stock')
                .defaultValue(10)
        ])
                */
        .listActions(['edit', 'delete']);
    products.creationView()
        .title('Create new Poster')
        .fields([
            nga.field('reference')
                .validation({required: true })
                .cssClasses('col-sm-4'),
            nga.field('price', 'amount')
                .validation({required: true })
                .cssClasses('col-sm-4'),
            nga.field('width', 'float')
                .validation({required: true })
                .cssClasses('col-sm-2'),
            nga.field('height', 'float')
                .validation({required: true })
                .cssClasses('col-sm-2'),
            nga.field('category_id', 'reference')
                .label('Category')
                .targetEntity(admin.getEntity('categories'))
                .targetField(nga.field('name'))
                .validation({required: true })
                .cssClasses('col-sm-4'),
            nga.field('stock', 'number')
                .validation({required: true, min: 2 })
                .cssClasses('col-sm-2'),
            nga.field('thumbnail')
                .validation({required: true })
                .cssClasses('col-sm-4'),
            nga.field('image')
                .validation({required: true })
                .cssClasses('col-sm-4'),
            nga.field('description', 'wysiwyg')
        ]);
    products.editionView().title('Put Area Cache')
    .url(function(){
     return  API+'Admin/system/areas/cache.json';
    })
       // .template(productsEditionTemplate)
       .fields(
         
            );



    return products;
}
