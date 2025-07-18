package com.quitq.repo;

import com.quitq.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmailAndPassword(String email, String password);
    List<User> findByNameContainingIgnoreCase(String name);
    Optional<User> findByEmail(String email);

}
