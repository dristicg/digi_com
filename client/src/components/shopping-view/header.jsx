import {
    HousePlug, LogOut, Menu, ShoppingCart, UserCog
} from "lucide-react";
import {
    Link,
    useLocation,
    useNavigate,
    useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";



function MenuItems() {

    return (<nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
        {shoppingViewHeaderMenuItems.map((menuItem) => (
            <Link className="text-sm font-medium cursor-pointer"
                key={menuItem.id}>
                {menuItem.label}
            </Link>

        ))}
    </nav>
);
}

function ShoppingHeader() {
    //  const { isAuthenticated } = useSelector((state) => state.auth);  if user is authencated
    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background">
            <div className="flex h-16 items-center justify-between px-4 md:px-6">
                <Link to="/shop/home" className="flex items-center gap-2">
                    <HousePlug className="h-6 w-6" />
                    <span className="font-bold">Ecommerce</span>
                </Link>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="lg:hidden">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle header menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-full max-w-xs">
                        <MenuItems />
                        {/* <HeaderRightContent /> */}
                    </SheetContent>
                </Sheet>
                <div className="hidden lg:block">
                    <MenuItems />
                </div>

                {/* <div className="hidden lg:block">
                    <HeaderRightContent />
                </div> */}

            </div>
        </header>
    );
}

export default ShoppingHeader;