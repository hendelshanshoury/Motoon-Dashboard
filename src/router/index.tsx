import { createBrowserRouter } from 'react-router-dom';
import BlankLayout from '../components/Layouts/BlankLayout';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import { routes } from './routes';
import React from 'react';
import Cookies from 'universal-cookie';
import Error404 from '../pages/Pages/Error404';
const cookie = new Cookies();

const finalRoutes = routes.map((route) => {
    return {
        ...route,
        element:
            route.layout === 'blank' ? (
                <BlankLayout>{!route.protectedFor.includes(cookie.get('user')?.type) ? route.element : <Error404 />}</BlankLayout>
            ) : (
                <DefaultLayout>{!route.protectedFor.includes(cookie.get('user')?.type) ? route.element : <Error404 />}</DefaultLayout>
            ),
    };
});

const router = createBrowserRouter(finalRoutes);

export default router;
