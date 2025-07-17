
package com.quitq.config;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {
    private String token;
    private String role;
    private int userId;
}

