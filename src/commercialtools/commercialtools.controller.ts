import { Controller, Get, Request, Post, Response } from '@nestjs/common';
import { ClientService } from './client-service';
import { buildResponseObjectFromProduct } from './services/build-product-object';

@Controller()
export class CommercialToolsController {
  constructor(private readonly clientService: ClientService) {}
  @Get('/products')
  async home(@Request() req, @Response() res): Promise<void> {
    const products = await this.clientService.apiRoot
      .products()
      .get()
      .execute();
    const formatedProducts = buildResponseObjectFromProduct(products);

    res.send(formatedProducts);
  }

  @Get('/customers')
  async customers(@Request() req, @Response() res): Promise<void> {
    const customers = await this.clientService.apiRoot
      .customers()
      .get()
      .execute();
    res.send(customers);
  }

  @Get('/orders')
  async orders(@Request() req, @Response() res): Promise<void> {
    const orders = await this.clientService.apiRoot.orders().get().execute();
    res.send(orders);
  }
}
