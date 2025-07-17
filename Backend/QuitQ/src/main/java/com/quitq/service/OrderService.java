
package com.quitq.service;

import com.quitq.config.OrderRequest;
import com.quitq.model.Order;
import com.quitq.model.OrderItem;
import com.quitq.model.ProductSalesDTO;
import com.quitq.model.SellerOrderItemDTO;

import java.util.List;

public interface OrderService {
    String placeOrder(OrderRequest request);
    List<Order> getOrdersByUserId(int userId);
    List<OrderItem> getItemsByOrderId(int orderId);
    List<Order> getOrdersBySellerId(int sellerId);
    List<ProductSalesDTO> getSalesReportBySeller(int sellerId);
    void updateOrderItemStatus(int orderItemId, String status);
    List<SellerOrderItemDTO> getOrderItemsBySellerId(int sellerId);


}
