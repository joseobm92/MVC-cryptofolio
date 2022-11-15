const watchlistHandler = async () => {
   // event.preventDefault();
  
    const cryptoRank = parseInt(document.querySelector('#crypto-cmc').dataset.rank);
    
    const cryptoName = document.querySelector('#crypto-name').dataset.name;
    const cryptoSymbol = document.querySelector('#crypto-symbol').dataset.symbol;    
    const cryptoPrice = parseFloat(document.querySelector('#crypto-price').dataset.price);  
    const cryptoMc = parseFloat(document.querySelector('#crypto-mc').dataset.mc);    
    const cryptoCircSupply = parseFloat(document.querySelector('#crypto-circ-supply').dataset.cs);  
    const cryptoTotalSupply = parseFloat(document.querySelector('#crypto-total-supply').dataset.ts);

    console.log(cryptoName);
    console.log(cryptoSymbol);
    console.log(typeof(cryptoPrice));
    console.log(cryptoMc);
    console.log(cryptoCircSupply);
    console.log(cryptoTotalSupply);
  
      const response = await fetch('/api/watchlist', {
        method: 'POST',
        body: JSON.stringify({ cryptoRank, cryptoName, cryptoSymbol, cryptoPrice, 
            cryptoMc, cryptoCircSupply, cryptoTotalSupply }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/watchlist');
      } else {
        alert(response.statusText);
      }

  };

  document
  .querySelector('#watchlist-btn')
  .addEventListener('click', watchlistHandler);