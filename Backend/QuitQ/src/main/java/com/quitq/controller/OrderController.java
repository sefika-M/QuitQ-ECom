package com.quitq.controller;

import com.quitq.config.OrderRequest;
import com.quitq.model.Order;
import com.quitq.model.OrderItem;
import com.quitq.model.ProductSalesDTO;
import com.quitq.model.SellerOrderItemDTO;
import com.quitq.service.OrderService;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/placeOrder")
    public ResponseEntity<Map<String, Object>> placeOrder(@RequestBody OrderRequest request) {
        String confirmation = orderService.placeOrder(request);
        Map<String, Object> response = new HashMap<>();
        response.put("message", confirmation);
        response.put("status", "success");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


    @GetMapping("/getOrdersByUserId/{userId}")
    public ResponseEntity<List<Order>> getOrdersByUser(@PathVariable int userId) {
        List<Order> orders = orderService.getOrdersByUserId(userId);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/getItemsByOrderId/{orderId}")
    public ResponseEntity<List<OrderItem>> getItems(@PathVariable int orderId) {
        List<OrderItem> items = orderService.getItemsByOrderId(orderId);
        return ResponseEntity.ok(items);
    }
    @GetMapping("/getOrdersBySellerId/{sellerId}")
    public ResponseEntity<List<Order>> getOrdersBySellerId(@PathVariable int sellerId) {
        List<Order> orders = orderService.getOrdersBySellerId(sellerId);
        return ResponseEntity.ok(orders);
    }
    @GetMapping("/sellerSalesReport/{sellerId}")
    public ResponseEntity<List<ProductSalesDTO>> getSalesReport(@PathVariable int sellerId) {
        List<ProductSalesDTO> report = orderService.getSalesReportBySeller(sellerId);
        return ResponseEntity.ok(report);
    }
    
    @PutMapping("/updateOrderItemStatus")
    public ResponseEntity<String> updateOrderItemStatus(
            @RequestParam int orderItemId,
            @RequestParam String status) {

        try {
            orderService.updateOrderItemStatus(orderItemId, status.toUpperCase());
            return ResponseEntity.ok("Order item status updated successfully.");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order item not found.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid order status: " + status);
        }
    }


    @GetMapping("/getOrderItemsBySellerId/{sellerId}")
    public ResponseEntity<List<SellerOrderItemDTO>> getOrderItemsBySellerId(@PathVariable int sellerId) {
        List<SellerOrderItemDTO> items = orderService.getOrderItemsBySellerId(sellerId);
        return ResponseEntity.ok(items);
    }



}
