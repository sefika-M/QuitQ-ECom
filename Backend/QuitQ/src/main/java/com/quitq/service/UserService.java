package com.quitq.service;

import com.quitq.model.User;

import java.util.List;

public interface UserService {

    User register(User user, String companyName); // companyName = null for non-sellers
    User getUserById(int id);
    List<User> getUserByName(String name);
    List<User> getAllUsers();
    void deleteUser(int id);

}
