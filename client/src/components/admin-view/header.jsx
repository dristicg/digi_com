
import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";


function handleLogout() {
  console.log("Logging out...");
  // Add logout logic here (e.g., clearing user state, redirecting)
}


function AdminHeader({ setOpen }) {
  // const dispatch = useDispatch()

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white border-b">
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow bg-[#1A202C] text-white hover:bg-[#2D3748]"
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
}

  
  export default AdminHeader;