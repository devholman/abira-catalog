import { useState } from "react";

export type Item = {
  color: string;
  material: string;
  size: string;
  category: string;
  quantity: number;
  itemNames: string[];
};

const FulfillmentTable = ({ items }: { items: Item[] }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Item;
    direction: "asc" | "desc";
  } | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const sortedItems = [...items].sort((a, b) => {
    if (sortConfig) {
      const { key, direction } = sortConfig;
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    }
    return 0;
  });

  const requestSort = (key: keyof Item) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <table className='min-w-full bg-white shadow-sm text-black'>
      <thead>
        <tr>
          <th className='px-4 py-2'>
            <button onClick={() => requestSort("color")}>Color</button>
          </th>
          <th className='px-4 py-2'>
            <button onClick={() => requestSort("material")}>Material</button>
          </th>
          <th className='px-4 py-2'>
            <button onClick={() => requestSort("size")}>Size</button>
          </th>
          <th className='px-4 py-2'>
            <button onClick={() => requestSort("category")}>Category</button>
          </th>
          <th className='px-4 py-2'>
            <button onClick={() => requestSort("quantity")}>Quantity</button>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedItems.map((item, index) => (
          <>
            <tr key={index}>
              <td
                className='border px-4 py-2'
                onClick={() => setShowDetails((prev) => !prev)}
              >
                {item.color}
              </td>
              <td className='border px-4 py-2'>{item.material}</td>
              <td className='border px-4 py-2'>{item.size}</td>
              <td className='border px-4 py-2'>{item.category}</td>
              <td className='border px-4 py-2'>{item.quantity}</td>
            </tr>
            <tr
              className={`text-gray-600 indent-4 ${
                !showDetails ? "hidden" : ""
              }`}
            >
              {" "}
              {item.itemNames.join(", ")}
            </tr>
          </>
        ))}
      </tbody>
    </table>
  );
};
export default FulfillmentTable;
