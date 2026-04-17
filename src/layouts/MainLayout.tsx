import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <main>
        <header>Head</header>

        <Outlet />

        <footer>Footer</footer>
    </main>
  )
}

export default MainLayout;