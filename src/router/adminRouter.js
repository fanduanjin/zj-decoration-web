import Layout from '@/admin/views/layout'

export default [

    {
        path: '/admin',
        name: 'admin.index',
        component: Layout,
        meta: { title: '首页' },
        children: [{
            path: '',
            meta: { title: '首页' },
            component: () =>
                import ('@/admin/views')
        }]
    },
    {
        path: '/admin/user',
        meta: { title: '用户管理' },
        component: Layout,
        children: [{
            path: '',
            meta: { title: '用户列表' },
            component: () =>
                import ('@/admin/views/user')
        }]
    },
    {
        path: '/admin/goods',
        meta: { title: '商品管理' },
        component: Layout,
        children: [{
                path: '',
                meta: { title: '商品列表' },
                component: () =>
                    import ('@/admin/views/goods')
            },
            {
                path: 'category',
                meta: { title: '商品分类' },
                component: () =>
                    import ('@/admin/views/goods/category')
            },
            {
                path: 'type',
                meta: { title: '商品类型' },
                component: () =>
                    import ('@/admin/views/goods/type')
            }
        ]
    },
]