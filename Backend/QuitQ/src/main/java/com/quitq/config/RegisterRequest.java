
package com.quitq.config;
import jakarta.validation.constraints.*;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
	
    @NotBlank(message = "Name is required")
    private String name;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;
    
    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;
    
    @NotBlank(message = "Gender is required")
    private String gender;
    
    @NotBlank(message = "Contact number is required")
    @Pattern(regexp = "\\d{10}", message = "Contact number must be 10 digits")
    private String contactNumber;

    @NotBlank(message = "Address is required")
    private String address;
    
    @NotBlank(message = "Role is required")
    private String role;
    
    private String companyName;  // Only for sellers
}
