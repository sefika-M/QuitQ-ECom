
package com.quitq.controller;

import com.quitq.model.Category;
import com.quitq.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/add")
    public ResponseEntity<Category> addCategory(@RequestBody Category category) {
        Category savedCategory = categoryService.addCategory(category);
        return new ResponseEntity<>(savedCategory, HttpStatus.CREATED); // 201 Created
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable int id, @RequestBody Category category) {
        Category updated = categoryService.updateCategory(id, category);
        return ResponseEntity.ok(updated); // 200 OK
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable int id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.ok("Category deleted successfully"); // 200 OK
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable int id) {
        Category category = categoryService.getCategoryById(id);
        return ResponseEntity.ok(category); // 200 OK
    }

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryService.getAllCategories();
        if (categories.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204 No Content
        }
        return ResponseEntity.ok(categories); // 200 OK
    }
}