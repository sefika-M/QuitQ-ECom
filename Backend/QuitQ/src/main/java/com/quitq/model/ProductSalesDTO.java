
package com.quitq.model;

public class ProductSalesDTO {

    private String productName;
    private int totalQuantitySold;
    private double totalRevenue;

    // Getters and Setters
    public String getProductName() {
        return productName;
    }
    public void setProductName(String productName) {
        this.productName = productName;
    }

    public int getTotalQuantitySold() {
        return totalQuantitySold;
    }
    public void setTotalQuantitySold(int totalQuantitySold) {
        this.totalQuantitySold = totalQuantitySold;
    }

    public double getTotalRevenue() {
        return totalRevenue;
    }
    public void setTotalRevenue(double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }
}
