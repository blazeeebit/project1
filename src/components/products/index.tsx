import React from "react";
import { TabsMenu } from "../tabs";
import { TabsContent } from "../ui/tabs";
import { SideSheet } from "../sheet";
import { Plus } from "lucide-react";
import { CreateProductForm } from "../forms/product/form";

type ProductTableProps = {
  id: string;
};

export const ProductTable = ({ id }: ProductTableProps) => {
  return (
    <div>
      <div>
        <h2 className="font-bold text-2xl">Products</h2>
        <p className="text-sm font-light">
          Add products to your store and set them live to accept payments from
          customers.
        </p>
      </div>
      <TabsMenu
        className="w-full flex justify-start"
        triggers={[
          {
            label: "All products",
          },
          { label: "Live" },
          { label: "Deactivated" },
        ]}
        button={
          <div className="flex-1 flex justify-end">
            <SideSheet
              description="Add products to your store and set them live to accept payments from
          customers."
              title="Add a product"
              className="flex items-center gap-2 bg-orange px-4 py-2 text-black font-semibold rounded-lg text-sm"
              trigger={
                <>
                  <Plus size={20} />
                  <p>Add Product</p>
                </>
              }>
              <CreateProductForm id={id} />
            </SideSheet>
          </div>
        }>
        <TabsContent value="All products">yo</TabsContent>
      </TabsMenu>
    </div>
  );
};
