package com.quitq.serviceImpl;

import com.quitq.exception.ResourceNotFoundException;
import com.quitq.model.Seller;
import com.quitq.model.User;
import com.quitq.repo.SellerRepository;
import com.quitq.repo.UserRepository;
import com.quitq.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private SellerRepository sellerRepo;


    @Autowired
    private UserRepository userRepo;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User register(User user, String companyName) {
        // 1. Save the user
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepo.save(user);

        // 2. If the user is a seller, also save to sellers table
        if ("SELLER".equalsIgnoreCase(user.getRole())) {
            Seller seller = new Seller();
            seller.setUser(savedUser);
            seller.setCompanyName(companyName);
            sellerRepo.save(seller);
        }

        return savedUser;
    }


   

    @Override
    public User getUserById(int id) {
        return userRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with id: " + id));
    }

    @Override
    public List<User> getUserByName(String name) {
        List<User> users = userRepo.findByNameContainingIgnoreCase(name);
        if (users.isEmpty()) {
            throw new ResourceNotFoundException("No customers found with name: " + name);
        }
        return users;
    }
    
    
    @Override
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @Override
    public void deleteUser(int id) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // If the user is a seller
        if ("SELLER".equalsIgnoreCase(user.getRole())) {
            // 1. Find the seller entry
            Seller seller = sellerRepo.findByUserUserId(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Seller not found"));

            // 2. Delete all products linked to this seller
            seller.getProducts().clear(); // this will help if using orphanRemoval or Cascade
            sellerRepo.save(seller); // persist clearing of relationship

            // Alternatively: productRepo.deleteBySeller(seller); // if using productRepo
            // or productRepo.deleteAll(seller.getProducts());     // if you have product list
            
            // 3. Delete the seller
            sellerRepo.delete(seller);
        }

        // 4. Delete the user
        userRepo.delete(user);
    }


    
}
