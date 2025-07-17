
package com.quitq.serviceImpl;

import com.quitq.config.OrderRequest;
import com.quitq.exception.ResourceNotFoundException;
import com.quitq.model.*;
import com.quitq.repo.*;
import com.quitq.service.EmailService;
import com.quitq.service.OrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepo;
    @Autowired
    private OrderItemRepository orderItemRepo;
    @Autowired
    private CartItemRepository cartItemRepo;
    @Autowired
    private ProductRepository productRepo;
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private EmailService emailService;
    @Autowired
    private WalletRepository walletRepo;

    @Override
    @Transactional
    public String placeOrder(OrderRequest request) {
        User user = userRepo.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<CartItem> cartItems = cartItemRepo.findByUser(user);
        if (cartItems.isEmpty()) {
            throw new ResourceNotFoundException("Cart is empty");
        }

        double total = 0;
        for (CartItem item : cartItems) {
            total += item.getProduct().getPrice() * item.getQuantity();
        }
        
        PaymentMode mode;
        try {
            mode = PaymentMode.valueOf(request.getPaymentMode().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new ResourceNotFoundException("Invalid payment mode: " + request.getPaymentMode());
        }
        
        PaymentStatus paymentStatus = PaymentStatus.PENDING;
        
        if (mode != PaymentMode.COD) {
            Wallet wallet = walletRepo.findByUser(user)
                    .orElseThrow(() -> new ResourceNotFoundException("Wallet not found"));

            if (wallet.getWalBalance() < total) {
                throw new ResourceNotFoundException("Insufficient wallet balance");
            }

            wallet.setWalBalance(wallet.getWalBalance() - total);
            walletRepo.save(wallet);
            paymentStatus = PaymentStatus.PAID;
        }
        
      
        Order order = new Order();
        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());
        
        String shippingAddress = request.getShippingAddress();
        order.setShippingAddress(
            (shippingAddress == null || shippingAddress.trim().isEmpty())
                ? user.getAddress()
                : shippingAddress
        );

        order.setTotalAmount(total);
        order.setPaymentStatus(paymentStatus);
        order.setOrderStatus(OrderStatus.PLACED);
        order.setPaymentStatus(paymentStatus);
        order.setPaymentMode(mode);
        

        Order savedOrder = orderRepo.save(order);

        for (CartItem item : cartItems) {
        	Product product = item.getProduct();
        	int quantity = item.getQuantity();

        	// Validate stock
        	if (product.getStock() < quantity) {
        	    throw new ResourceNotFoundException("Not enough stock for product: " + product.getProductName());
        	}

        	// Deduct stock
        	product.setStock(product.getStock() - quantity);
        	productRepo.save(product);
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(savedOrder);
            Product product1 = productRepo.findById(item.getProduct().getProductId())
            	    .orElseThrow(() -> new ResourceNotFoundException("Product not found")); // This fetches product WITH seller

            	orderItem.setProduct(product1);
            orderItem.setQuantity(item.getQuantity());
            orderItem.setPrice(item.getProduct().getPrice());
            System.out.println("Saving item: " + item.getProduct().getProductName());

            orderItemRepo.save(orderItem);
        }

        cartItemRepo.deleteAll(cartItems);

        // Send email confirmation
        emailService.sendOrderConfirmationEmail(user, savedOrder);
        return "Order placed successfully!";
    }

    @Override
    public List<Order> getOrdersByUserId(int userId) {
        return orderRepo.findByUserUserId(userId);
    }

    @Override
    public List<OrderItem> getItemsByOrderId(int orderId) {
        return orderItemRepo.findByOrderOrderId(orderId);
    }
    
    @Override
    public List<Order> getOrdersBySellerId(int sellerId) {
        List<OrderItem> allItems = orderItemRepo.findAll();
        Set<Integer> sellerOrderIds = new HashSet<>();

        for (OrderItem item : allItems) {
            if (item.getProduct().getSeller().getSellerId() == sellerId) {
                sellerOrderIds.add(item.getOrder().getOrderId());
            }
        }

        return orderRepo.findAllById(sellerOrderIds);
    }
    
    @Override
    public List<ProductSalesDTO> getSalesReportBySeller(int sellerId) {
        List<OrderItem> items = orderItemRepo.findAll();
        Map<String, ProductSalesDTO> salesMap = new HashMap<>();

        for (OrderItem item : items) {
            Product p = item.getProduct();
            if (p.getSeller().getSellerId() == sellerId) {
                String name = p.getProductName();
                ProductSalesDTO dto = salesMap.getOrDefault(name, new ProductSalesDTO());
                dto.setProductName(name);
                dto.setTotalQuantitySold(dto.getTotalQuantitySold() + item.getQuantity());
                dto.setTotalRevenue(dto.getTotalRevenue() + item.getQuantity() * item.getPrice());
                salesMap.put(name, dto);
            }
        }

        return new ArrayList<>(salesMap.values());
    }
    
    @Override
    public void updateOrderItemStatus(int orderItemId, String status) {
        OrderItem item = orderItemRepo.findById(orderItemId)
            .orElseThrow(() -> new ResourceNotFoundException("Order item not found"));

        OrderStatus newStatus;
        try {
            newStatus = OrderStatus.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new ResourceNotFoundException("Invalid order status: " + status);
        }

        item.setStatus(newStatus);
        orderItemRepo.save(item);
        Order order = item.getOrder();
        List<OrderItem> allItems = orderItemRepo.findByOrderOrderId(order.getOrderId());

        // ✅ Check if ALL items now have the same final status
        boolean allSame = allItems.stream()
            .map(OrderItem::getStatus)
            .allMatch(s -> s == newStatus);

        // ✅ If so, update order status too
        if (allSame) {
            order.setOrderStatus(newStatus);
            orderRepo.save(order);
    }}
    
    @Override
    public List<SellerOrderItemDTO> getOrderItemsBySellerId(int sellerId) {
    	System.out.println("Fetching order items for sellerId: " + sellerId);
        List<OrderItem> allItems = orderItemRepo.findAll();
        List<SellerOrderItemDTO> dtoList = new ArrayList<>();

        for (OrderItem item : allItems) {
            Product product = item.getProduct();
            System.out.println("Checking item productId=" + product.getProductId());
            if (product.getSeller().getSellerId() == sellerId) {
                Order order = item.getOrder();
                User customer = order.getUser();

                SellerOrderItemDTO dto = new SellerOrderItemDTO();
                dto.setOrderItemId(item.getOrderItemId()); 
                dto.setOrderId(order.getOrderId());
                dto.setProductName(product.getProductName());
                dto.setQuantity(item.getQuantity());
                dto.setPrice(item.getPrice());
                dto.setStatus(item.getStatus());
                dto.setPaymentStatus(order.getPaymentStatus());
                dto.setCustomerName(customer.getName());
                dto.setShippingAddress(order.getShippingAddress());

                dtoList.add(dto);
            }
        }
        return dtoList;
    }




}
