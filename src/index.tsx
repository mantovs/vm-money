import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App';

import { createServer, Model } from 'miragejs';

createServer({

  models:{
    transactions: Model
  },

  seeds(server){
    server.db.loadData({
      transactions: [{
        id: 1,
        title: 'teste',
        type: 'deposit',
        category: 'Dev',
        amout: 500,
        createdAt: new Date()
      }]
    })
  },

  routes(){
    this.namespace = 'api';

    this.get('/transactions',() => {
      return this.schema.all('transactions')
    });

    this.post('/transactions',(schema, request) => {

      const data = JSON.parse(request.requestBody);

      schema.create('transactions',data);

      return  data;
    })
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
