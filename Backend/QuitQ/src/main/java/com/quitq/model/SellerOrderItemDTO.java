
package com.quitq.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class SellerOrderItemDTO {
    private int orderItemId;          
    private int orderId;
    private String productName;
    private int quantity;
    private double price;
    private OrderStatus status;
    private PaymentStatus paymentStatus;
    private String customerName;
    private String shippingAddress;

}
