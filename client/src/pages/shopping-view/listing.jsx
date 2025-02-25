

import ProductFilter from "@/components/shopping-view/filter";
//import ProductDetailsDialog from "@/components/shopping-view/product-details";
//import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { useToast } from "@/components/ui/use-toast";
import { sortOptions } from "@/config";
import { fetchAllProducts } from "@/store/admin/products-slice";
// import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import {
    fetchAllFilteredProducts,
    fetchProductDetails,
} from "@/store/shop/products-slice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useSearchParams } from "react-router-dom";



function ShoppingListing() {
    const dispatch = useDispatch();
    const { productList, productDetails } = useSelector(
        (state) => state.shopProducts
    );
    const [sort, setSort] = useState(null);
    const [filters, setFilters] = useState({});

    function handleSort(value) {
        setSort(value);
    }

    function handleFilter(getSectionId, getCurrentOption) {
        let cpyFilters = { ...filters };
        const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

        if (indexOfCurrentSection === -1) {
            cpyFilters = {
                ...cpyFilters,
                [getSectionId]: [getCurrentOption],
            };
        } else {
            const indexOfCurrentOption =
                cpyFilters[getSectionId].indexOf(getCurrentOption);

            if (indexOfCurrentOption === -1)
                cpyFilters[getSectionId].push(getCurrentOption);
            else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
        }

        setFilters(cpyFilters);
        sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
    }

    useEffect(() => {
        dispatch(fetchAllFilteredProducts())
    }, [dispatch]);

    console.log(productList, "productList");


  //  console.log(productItem.image, "Image URL"); // ✅ Correct Placement to see wherather image is rendering
  
    return (
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6" >
            <ProductFilter filters={filters} handleFilter={handleFilter} />
            <div className="bg-background w-full rounded-lg shadow-sm">
                <div className="p-4 border-b flex items-center justify-between">
                    <h2 className="text-lg font-extrabold">All Products</h2>
                    <div className="flex items-center gap-3">
                        <span className="text-muted-foreground">
                            {productList?.length} Products
                        </span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center gap-1"
                                >
                                    <ArrowUpDownIcon className="h-4 w-4" />
                                    <span>Sort by</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[200px]">
                                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                                    {sortOptions.map((sortItem) => (
                                        <DropdownMenuRadioItem
                                            value={sortItem.id}
                                            key={sortItem.id}
                                        >
                                            {sortItem.label}
                                        </DropdownMenuRadioItem>
                                    ))}
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>


                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                    {productList && productList.length > 0
                        ? productList.map((productItem) => (
                            
                            <ShoppingProductTile
                                handleGetProductDetails={handleGetProductDetails}
                                product={productItem}
                                handleAddtoCart={handleAddtoCart}
                            />
                        ))
                        : null}
                </div>
            </div>
        </div>
    );
}

export default ShoppingListing;