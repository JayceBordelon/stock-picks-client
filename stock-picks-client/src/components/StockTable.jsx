import React from 'react'

export default function StockTable({stocks}) {
    // Sort stocks by percent change in descending order
  const sortedStocks = stocks.sort((a, b) => {
    // Remove the '%' sign and convert to number
    const changeA = parseFloat(a.percentChange.replace('%', ''));
    const changeB = parseFloat(b.percentChange.replace('%', ''));

    // Descending order
    return changeB - changeA;
  });
  return (
    <div class="overflow-x-auto p-8">
        <table class="rounded-lg w-full text-sm text-left text-gray-400">
            <thead class="text-xs text-gray-400 uppercase bg-gray-800">
                <tr>
                    <th scope="col" class="px-6 py-3">Symbol</th>
                    <th scope="col" class="px-6 py-3">Name</th>
                    <th scope="col" class="px-6 py-3">Price</th>
                    <th scope="col" class="px-6 py-3">Change(%)</th>
                </tr>
            </thead>
            <tbody>
                {sortedStocks && sortedStocks.map(stock => (
                    <tr class='bg-gray-700 border-b border-gray-800' key={stock.symbol}>
                        <td class="px-6 py-4"><img className="rounded-lg" src={stock.logo} alt=""></img>{stock.symbol}</td>
                        <td class="px-6 py-4 underline"><a href={stock.href}>{stock.name}</a></td>
                        <td className={`px-6 py-4 ${stock.percentChange.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{stock.price}</td>
                        <td className={`px-6 py-4 ${stock.percentChange.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                            {stock.percentChange}
                        </td>

                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}
