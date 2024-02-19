import React, { useState, useEffect } from 'react';

export default function StockTable({ stocks }) {
    const [localStocks, setLocalStocks] = useState([]);
    const [sortedByName, setSortedByName] = useState(false);
    const [sortedByPrice, setSortedByPrice] = useState(false);
    const [sortedByPercent, setSortedByPercent] = useState(false);

    useEffect(() => {
        setLocalStocks(stocks);
    }, [stocks]);

    const sortStocksByName = () => {
        setLocalStocks(prevStocks => {
            let sortedStocks;
            if (sortedByName) {
                sortedStocks = [...prevStocks].reverse();
            } else {
                sortedStocks = [...prevStocks].sort((a, b) => a.name.localeCompare(b.name));
            }
            setSortedByName(!sortedByName);
            setSortedByPrice(false);
            setSortedByPercent(false);
            return sortedStocks;
        });
    };

    const sortStocksByPrice = () => {
        setLocalStocks(prevStocks => {
            let sortedStocks;
            if (sortedByPrice) {
                sortedStocks = [...prevStocks].reverse();
            } else {
                sortedStocks = [...prevStocks].sort((a, b) => parseFloat(a.price.replace(/[^0-9.-]+/g, "")) - parseFloat(b.price.replace(/[^0-9.-]+/g, "")));
            }
            setSortedByPrice(!sortedByPrice);
            setSortedByName(false);
            setSortedByPercent(false);
            return sortedStocks;
        });
    };

    const sortStocksByPercent = () => {
        setLocalStocks(prevStocks => {
            let sortedStocks;
            if (sortedByPercent) {
                sortedStocks = [...prevStocks].reverse();
            } else {
                sortedStocks = [...prevStocks].sort((a, b) => {
                    const changeA = parseFloat(a.percentChange.replace('%', ''));
                    const changeB = parseFloat(b.percentChange.replace('%', ''));
                    return changeB - changeA;
                });
            }
            setSortedByPercent(!sortedByPercent);
            setSortedByName(false);
            setSortedByPrice(false);
            return sortedStocks;
        });
    };

    return (
        <div className="overflow-x-auto p-20">
            <table className="rounded-lg w-full text-sm text-left text-gray-400">
                <thead className="text-xs text-gray-400 uppercase bg-gray-800">
                    <tr>
                        <th scope="col" className="px-6 py-3">Symbol</th>
                        <th scope="col" onClick={sortStocksByName} className="px-6 py-3 underline cursor-pointer">Name</th>
                        <th scope="col" onClick={sortStocksByPrice} className="px-6 py-3 underline cursor-pointer">Price</th>
                        <th scope="col" onClick={sortStocksByPercent} className="px-6 py-3 underline cursor-pointer">Change(%)</th>
                    </tr>
                </thead>
                <tbody>
                    {localStocks.map(stock => (
                        <tr className="bg-gray-700 border-b border-gray-800" key={stock.symbol}>
                            <td className="px-6 py-4">
                                <img className="rounded-lg" src={stock.logo} alt="" style={{ display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }} />
                                {stock.symbol}
                            </td>
                            <td className="px-6 py-4 underline">
                                <a href={stock.href}>{stock.name}</a>
                            </td>
                            <td className={`px-6 py-4 ${stock.percentChange.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                                {stock.price}
                            </td>
                            <td className={`px-6 py-4 ${stock.percentChange.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                                {stock.percentChange}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
