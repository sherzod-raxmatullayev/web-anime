import { MainPage, LoginPage, ProfilPage, SavePage, SearchPage } from "../pages";

export const routes = [
    {id: 1, path: '/', element: <MainPage/>},
    {id: 2, path: '/login', element: <LoginPage/>},
    {id: 3, path: '/register', element: <ProfilPage/>},
    {id: 4, path: '/save', element: <SavePage/>},
    {id: 5, path: '/search', element: <SearchPage/>},


]