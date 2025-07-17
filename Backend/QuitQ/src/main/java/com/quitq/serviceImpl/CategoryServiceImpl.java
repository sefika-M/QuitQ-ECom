package com.quitq.serviceImpl;

import com.quitq.exception.ResourceNotFoundException;
import com.quitq.model.Category;
import com.quitq.repo.CategoryRepository;
import com.quitq.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepo;

    @Override
    public Category addCategory(Category category) {
        return categoryRepo.save(category);
    }

    @Override
    public Category updateCategory(int id, Category updatedCategory) {
        Category existing = categoryRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
        existing.setCatName(updatedCategory.getCatName());
        return categoryRepo.save(existing);
    }

    @Override
    public void deleteCategory(int id) {
        if (!categoryRepo.existsById(id)) {
            throw new ResourceNotFoundException("Category not found with id: " + id);
        }
        categoryRepo.deleteById(id);
    }

    @Override
    public Category getCategoryById(int id) {
        return categoryRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepo.findAll();
    }
}
