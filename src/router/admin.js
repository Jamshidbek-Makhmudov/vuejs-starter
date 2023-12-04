

 export const adminRoutes = {
     path: '/admin',
     redirect: { name: 'admin-main' },
            component: () => import('../layouts/AdminLayout.vue'),
            children: [
                {
                    path: "main",
                    name: "admin-main",
                    component: () => import("../pages/admin/MainView.vue")
                },
                {
                    path: "users",
                    name: "admin-users",
                    component: () => import("../pages/admin/Users.vue")
                },
                {
                    path: "admins",
                    name: "admin-admins",
                    component: () => import("../pages/admin/Admins.vue")
                },
                {
                    path: "products",
                    name: "admin-products",
                    component: () => import("../pages/admin/Products.vue")
                },
            ]


}

