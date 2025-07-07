const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());


app.use('/battery', require('./routes/battery'));
app.use('/car', require('./routes/car'));
app.use('/manufacturer', require('./routes/manufacturer'));
app.use('/recycler', require('./routes/recycler'));
app.use('/owner', require('./routes/owner'));

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
