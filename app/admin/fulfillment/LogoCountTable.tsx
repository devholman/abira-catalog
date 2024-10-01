import React from "react";

const LogoCountTable = ({
  logoCount,
}: {
  logoCount: Record<string, number>;
}) => {
  return (
    <div className='overflow-x-auto'>
      <table className='table-auto w-full text-black'>
        <thead>
          <tr>
            <th className='px-4 py-2 text-left'>Item Title</th>
            <th className='px-4 py-2 text-left'>Total Count</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(logoCount).map(([title, count]) => (
            <tr key={title}>
              <td className='border px-4 py-2'>{title}</td>
              <td className='border px-4 py-2'>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogoCountTable;
