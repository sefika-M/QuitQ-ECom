package com.quitq.serviceImpl;

import com.quitq.model.OrderStatus;
import com.quitq.repo.*;
import com.quitq.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SellerRepository sellerRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Map<String, Object> getAdminSummary() {
        Map<String, Object> summary = new HashMap<>();

        summary.put("totalUsers", userRepository.count());
        summary.put("totalSellers", sellerRepository.count());
        summary.put("totalProducts", productRepository.count());
        summary.put("totalOrders", orderRepository.count());
        summary.put("deliveredOrders", orderRepository.countByOrderStatus(OrderStatus.DELIVERED));
        summary.put("pendingOrders", orderRepository.countByOrderStatus(OrderStatus.PLACED)); 
        summary.put("todayOrders", orderRepository.countTodayOrders());
        summary.put("totalSales", orderRepository.sumOfAllOrderAmounts());
        summary.put("totalCategories", categoryRepository.count());
        summary.put("salesLast7Days", getSalesLast7Days());

        return summary;
    }

    private List<Map<String, Object>> getSalesLast7Days() {
        List<Map<String, Object>> last7DaysSales = new ArrayList<>();
        LocalDate today = LocalDate.now();

        for (int i = 6; i >= 0; i--) {
            LocalDate date = today.minusDays(i);
            LocalDateTime start = date.atStartOfDay();
            LocalDateTime end = date.atTime(23, 59, 59); // End of the day

            Double sales = orderRepository.sumOrderAmountByDateRange(start, end);
            Map<String, Object> daySale = new HashMap<>();
            daySale.put("date", date.toString());
            daySale.put("totalSales", sales != null ? sales : 0.0);
            last7DaysSales.add(daySale);
        }

        return last7DaysSales;
    }

}
