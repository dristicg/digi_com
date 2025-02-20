import { BadgeCheck, ChartNoAxesCombined, LayoutDashboard, ShoppingBasket } from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";


export const adminSidebarMenuItems = [
  {
    id:'dashboard',
    lable:'Dashboard',
    path:'/admin/dashboard',
  },
  {
    id:'products',
    lable:'Products',
    path:'/admin/products',
    icon:<ShoppingBasket />,
  },
  {
    id:'orders',
    lable:'Orders',
    path:'/admin/orders',
    icon: <BadgeCheck />,
  }
]


function MenuItems(){
 const navigate = useNavigate();

 return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            setOpen ? setOpen(false) : null;
          }}
          className="flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          {menuItem.icon}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );

}

function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();

    return (
     <Fragment>
     <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2"
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
     </Fragment>

    );
  }
  
  export default AdminSideBar;