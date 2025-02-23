// import { BadgeCheck, ChartNoAxesCombined, LayoutDashboard, ShoppingBasket } from "lucide-react";
// import { Fragment } from "react";
// import { useNavigate } from "react-router-dom";
// import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";


// export const adminSidebarMenuItems = [
//   {
//     id:'dashboard',
//     lable:'Dashboard',
//     path:'/admin/dashboard',
//   },
//   {
//     id:'products',
//     lable:'Products',
//     path:'/admin/products',
//     icon:<ShoppingBasket />,
//   },
//   {
//     id:'orders',
//     lable:'Orders',
//     path:'/admin/orders',
//     icon: <BadgeCheck />,
//   }
// ]


// function MenuItems({ setOpen }){
//  const navigate = useNavigate();

//  return (
//     <nav className="mt-8 flex-col flex gap-2">
//       {adminSidebarMenuItems.map((menuItem) => (
//         <div
//           key={menuItem.id}
//           onClick={() => {
//             navigate(menuItem.path);
//             setOpen ? setOpen(false) : null;
//           }}
//           className="flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
//         >
//           {menuItem.icon}
//           <span>{menuItem.label}</span>
//         </div>
//       ))}
//     </nav>
//   );

// }

// function AdminSideBar({ open, setOpen }) {
//   const navigate = useNavigate();

//     return (
//      <Fragment>
//         <Sheet open={open} onOpenChange={setOpen}>
//         <SheetContent side="left" className="w-64">
//           <div className="flex flex-col h-full">
//             <SheetHeader className="border-b">
//               <SheetTitle className="flex gap-2 mt-5 mb-5">
//                 <ChartNoAxesCombined size={30} />
//                 <h1 className="text-2xl font-extrabold">Admin Panel</h1>
//               </SheetTitle>
//             </SheetHeader>
//             <MenuItems setOpen={setOpen} />
//           </div>
//         </SheetContent>
//       </Sheet>
//      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
//         <div
//           onClick={() => navigate("/admin/dashboard")}
//           className="flex cursor-pointer items-center gap-2"
//         >
//           <ChartNoAxesCombined size={30} />
//           <h1 className="text-2xl font-extrabold">Admin Panel</h1>
//         </div>
//         <MenuItems />
//       </aside>
//      </Fragment>

//     );
//   }
  
//   export default AdminSideBar;

import { BadgeCheck, ChartNoAxesCombined, LayoutDashboard, ShoppingBasket } from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket size={20} />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck size={20} />,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();

  return (
    <nav className="mt-6 flex flex-col gap-2">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            setOpen ? setOpen(false) : null;
          }}
          className="flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition"
        >
          {menuItem.icon}
          <span className="font-medium">{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 bg-gray-900 text-white">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b border-gray-700 pb-4">
              <SheetTitle className="flex items-center gap-3 mt-4">
                <ChartNoAxesCombined size={30} className="text-white" />
                <h1 className="text-2xl font-extrabold">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-gray-800 bg-gray-900 p-6 text-white">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-3 mb-6"
        >
          <ChartNoAxesCombined size={30} className="text-white" />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;
