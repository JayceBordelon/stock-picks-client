import React, { useEffect, useState } from 'react'
import { fetchDataFromServer } from '../helpers/apiHelper';
import StockTable from '../components/StockTable';

export default function Home() {
    const [stocks, setStocks] = useState([]);
    const getStockInfo = async () => {
        const stocksRes = await fetchDataFromServer("/scrape");
        console.log(stocksRes);
        setStocks(stocksRes);
    }

    useEffect(() => {
        getStockInfo();
    }, [])
    return (
        <>
            {stocks.length > 0 ? <StockTable stocks={stocks} /> : "LOADING"}
        </>

    )
}
