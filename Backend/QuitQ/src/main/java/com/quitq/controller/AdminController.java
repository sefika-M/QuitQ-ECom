package com.quitq.controller;

import com.quitq.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/report-summary")
    public ResponseEntity<Map<String, Object>> getSummary() {
        return ResponseEntity.ok(adminService.getAdminSummary());
    }
}
