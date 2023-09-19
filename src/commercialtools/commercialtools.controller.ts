import { Controller, Get, Request, Post, Response } from '@nestjs/common';
import axios from 'axios';
import { getAccessToken } from './services/get-access-token';

@Controller()
export class CommercialToolsController {
  constructor() {}
  @Get('/products')
  async home(@Request() req, @Response() res) {
    const token = await getAccessToken();
    const url = `https://api.${process.env.CTP_REGION}.commercetools.com/${process.env.CTP_PROJECT_KEY}/products`;
    const products = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.send(products.data);
  }

  @Get('/customers')
  async customers(@Request() req, @Response() res) {
    const token = await getAccessToken();
    const url = `https://api.${process.env.CTP_REGION}.commercetools.com/${process.env.CTP_PROJECT_KEY}/customers`;
    const customers = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.send(customers.data);
  }

  @Get('/orders')
  async orders(@Request() req, @Response() res) {
    const token = await getAccessToken();
    const url = `https://api.${process.env.CTP_REGION}.commercetools.com/${process.env.CTP_PROJECT_KEY}/orders`;
    const orders = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.send(orders.data);
  }
}
