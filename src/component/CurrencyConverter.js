import React ,{useState,useEffect}from 'react'
import { Country_flag } from './countriesflag'
import './Currency.css'
import Axios from 'axios'
import {countryName} from './countryName'
import { FaExchangeAlt } from "react-icons/fa";


const CurrencyConverter = () => {

  const [amount,setAmount]=useState('');
  const [fromCurrency,setFromCurrency]=useState("USD");
  const [toCurrency,setToCurrency]=useState("INR");
  const [convertedAmount,setConvertedAmount]=useState(null);
  const [exchangeRate,setExchangeRate]=useState(null);
  const [currencyOptions, setCurrencyOptions] = useState([]);
     

    useEffect(()=>{
      const getExchangeRate=async ()=>{
        try{
          let url=`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
          const response=await Axios.get(url);
         
          // console.log(response);
          setExchangeRate(response.data.rates[toCurrency]);
          setCurrencyOptions(Object.keys(response.data.rates));

        }catch(error){
          console.error("Error fetching exchange rate:",error);
        }
      }
      getExchangeRate();
    },[fromCurrency,toCurrency])

    useEffect(()=>{
      if(exchangeRate!==null){
        setConvertedAmount((amount* exchangeRate).toFixed(2))
      }
    },[amount,exchangeRate])

    const handleAmountChange=(e)=>{
        const value=parseFloat(e.target.value);
        setAmount(isNaN(value)? 0 : value)
        
    }
    const exchangeConverter=()=>{
      setFromCurrency(toCurrency)
      setToCurrency(fromCurrency)
    }
  return (
   
      <div className="currency-converter">
        <div className="box"></div>
        <div className="data">
          <h1>Currency Converter</h1>
          <div className="input-container">
            <label htmlFor="amt">Amount:</label>
            <input type="number" id="amt" value={amount} onChange={handleAmountChange}/>
          </div>

          <div className="input-container">
            <label htmlFor="fromCurrency">From Currency:</label>
            <div className='select_flag'> 
                <img src={`https://flagcdn.com/${Country_flag[fromCurrency]}.svg`} alt={`${fromCurrency}flag`} className='flag'/>
                <select id="fromCurrency" value={fromCurrency} onChange={e=>setFromCurrency(e.target.value)}>
                  {currencyOptions.map((currency) => (
                    <option key={currency} value={currency}>
                    {`  ${currency} -${countryName[currency]}`}
                    </option>
                  ))}
                </select>
              </div>
          </div>

          <div className='exchange'>
            <h4 onClick={exchangeConverter}><FaExchangeAlt /></h4>
          </div>

          <div className="input-container">
            <label htmlFor="toCurrency">TO Currency:</label>
            <div className='select_flag'> 
              <img src={`https://flagcdn.com/${Country_flag[toCurrency]}.svg`} alt={toCurrency} className='flag'/>
              <select id="toCurrency" value={toCurrency} onChange={e=>setToCurrency(e.target.value)}>
                {currencyOptions.map((currency) => (
                <option key={currency} value={currency}>
                {`  ${currency} -${countryName[currency]}`}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="result">
            <p>{amount} {fromCurrency} is equal to {convertedAmount} {toCurrency}</p>
          </div>
        </div>
      </div>
    
  )
}

export default CurrencyConverter
