import React, {useState, useEffect} from 'react'
import { fetchDataFromServer } from '../helpers/apiHelper';
import StockTable from '../components/StockTable';
import Loading from '../components/Loading';

export default function Volatile() {
    const [stocks, setStocks] = useState([]);
    const getStockInfo = async () => {
        const stocksRes = await fetchDataFromServer("/scrape/volatile");
        console.log(stocksRes);
        setStocks(stocksRes);
    }

    useEffect(() => {
        getStockInfo();
    }, [])
  return (
    <div>
        {stocks.length > 0 ? <StockTable stocks={stocks} title="Today's Most Volatile" /> : <Loading />}
    </div>
  )
}
