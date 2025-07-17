
package com.quitq.config;

import lombok.Data;

@Data
public class OrderRequest {
    private int userId;
    private String shippingAddress; 
    private String paymentMode; 
}
