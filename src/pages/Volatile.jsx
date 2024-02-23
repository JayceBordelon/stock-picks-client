import React, {useState, useEffect} from 'react'
import { fetchDataFromServer } from '../helpers/apiHelper';
import StockTable from '../components/StockTable';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';

export default function Volatile() {
    const [stocks, setStocks] = useState([]);
    const navigate = useNavigate();
    const getStockInfo = async () => {
        const stocksRes = await fetchDataFromServer("/scrape/volatile");
        setStocks(stocksRes);
    }

    useEffect(() => {
        if (!localStorage.getItem("uid")){
          navigate("/");
          return;
        }
        getStockInfo();
    }, [])
  return (
    <div>
        {stocks.length > 0 ? <StockTable stocks={stocks} title="Today's Most Volatile" /> : <Loading message="Fetching Volatile Stock Data" />}
    </div>
  )
}
