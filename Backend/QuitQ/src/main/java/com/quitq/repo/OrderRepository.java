
package com.quitq.repo;

import com.quitq.model.Order;
import com.quitq.model.OrderStatus;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findByUserUserId(int userId);
    long countByOrderStatus(OrderStatus status); 

    long countByOrderDate(LocalDate date);

    @Query("SELECT SUM(o.totalAmount) FROM Order o")
    Double sumOfAllOrderAmounts();

    @Query("SELECT COUNT(o) FROM Order o WHERE DATE(o.orderDate) = CURRENT_DATE")
    long countTodayOrders();

    @Query("SELECT SUM(o.totalAmount) FROM Order o WHERE o.orderDate BETWEEN :start AND :end")
    Double sumOrderAmountByDateRange(LocalDateTime start, LocalDateTime end);



}
