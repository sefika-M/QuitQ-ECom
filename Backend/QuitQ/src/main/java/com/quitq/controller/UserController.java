
package com.quitq.controller;

import com.quitq.config.JwtService;
import com.quitq.config.LoginRequest;
import com.quitq.config.LoginResponse;
import com.quitq.config.RegisterRequest;
import com.quitq.config.UserDetailsServiceImpl;
import com.quitq.model.User;
import com.quitq.repo.UserRepository;
import com.quitq.service.UserService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.*;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class UserController {

    @Autowired
    private UserService userService;
    
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;
    
    @Autowired
    private UserRepository userRepo;
    
    @Autowired
    private UserDetailsServiceImpl userDetailsServiceImpl;


    @PostMapping("/user/register")
    public ResponseEntity<User> register(@Valid @RequestBody RegisterRequest request) {
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setGender(request.getGender());
        user.setContactNumber(request.getContactNumber());
        user.setAddress(request.getAddress());
        user.setRole(request.getRole());

        User registeredUser = userService.register(user, request.getCompanyName());
        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
    }

    
    @PostMapping("/user/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        try{
        	authenticationManager.authenticate(
        
            new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(),
                loginRequest.getPassword()
            )
        );
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
        
        UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(loginRequest.getEmail());

        String token = jwtService.generateToken(userDetails);


        User user = userRepo.findByEmail(loginRequest.getEmail())
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        LoginResponse response = new LoginResponse(token, user.getRole(), user.getUserId());


        return ResponseEntity.ok(response);
       
    }


    @GetMapping("/getById/{id}")
    public ResponseEntity<User> getUserById(@PathVariable int id) {
            User user = userService.getUserById(id);
            return ResponseEntity.ok(user);
 
    }
    
    
    @GetMapping("/getUserByName/{name}")
    public ResponseEntity<List<User>> getUserByName(@PathVariable String name) {
        List<User> users = userService.getUserByName(name);
        if (users.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(users);
    }
    
    @GetMapping("/getAllUsers")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    
    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<Map<String, String>> deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(Collections.singletonMap("message", "User deleted successfully"));
    }


}
