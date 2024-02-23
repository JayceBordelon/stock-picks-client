import React, {useState, useEffect} from 'react'
import { fetchDataFromServer } from '../helpers/apiHelper';
import StockTable from '../components/StockTable';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';

export default function Popular() {
    const [stocks, setStocks] = useState([]);
    const getStockInfo = async () => {
        const stocksRes = await fetchDataFromServer("/scrape/popular");
        setStocks(stocksRes);
    }
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("uid")){
          navigate("/");
          return;
        }
        getStockInfo();
    }, [])
  return (
    <div>
        {stocks.length > 0 ? <StockTable stocks={stocks} title="Today's Most Traded" /> : <Loading message="Fetching Most Traded Stock Data" />}
    </div>
  )
}
