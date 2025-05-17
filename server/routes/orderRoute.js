import express from 'express';
import authUser from '../middlewares/authUser.js';
import { getAllOrders, getUserOrder, placeOrderCOD } from '../controllers/orderController.js';
import authSeller from '../middlewares/authSeller.js';

const orderRouter = express.Router();

orderRouter.post('/cod', authUser, placeOrderCOD)
orderRouter.get('/is-auth', authUser, getUserOrder)
orderRouter.get('/logout', authSeller, getAllOrders)

export default orderRouter;