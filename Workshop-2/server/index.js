const express = require('express');
const cors = require("cors");
const app = express();


// check for cors
app.use(cors({
  domains: '*',
  methods: "*"
}));


// listen to GET requests on /hello
app.get('/hello', function (req, res) {
  res.send('Hello World');
});


app.get('/tipocambio', function (req, res) {
  const type = req.query.type;
  
  if (type === 'usd') {
    res.send({
      "TipoCompraDolares" : "608",
      "TipoVentaDolares" : "621"
      });
  } else if (type === 'eur'){
    res.send({
      "TipoCompraEuros" : "731.85",
      "TipoVentaEuros" : "761.9"
    });
  } else {
    res.send({message: "Tipo de moneda no valida"})
  }

});


app.listen(3000, () => console.log(`Example app listening on port 3000!`))
