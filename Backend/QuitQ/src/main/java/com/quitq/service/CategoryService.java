
package com.quitq.service;

import com.quitq.model.Category;

import java.util.List;

public interface CategoryService {
    Category addCategory(Category category);
    Category updateCategory(int id, Category category);
    void deleteCategory(int id);
    Category getCategoryById(int id);
    List<Category> getAllCategories();
}
