import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { CategoryClient } from "./component/client";
import { CategoryColumn } from "./component/colums";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 py-6">
        <CategoryClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default CategoriesPage;
