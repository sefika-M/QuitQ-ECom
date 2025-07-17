package com.quitq.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {
	
	private Map<String, Object> buildError(HttpStatus status, String message, String path) {
        Map<String, Object> error = new HashMap<>();
        error.put("timestamp", LocalDateTime.now());
        error.put("status", status.value());
        error.put("error", status.getReasonPhrase());
        error.put("message", message);
        error.put("path", path);
        return error;
    }

	@ExceptionHandler(MethodArgumentNotValidException.class)
	    public ResponseEntity<Map<String, String>> handleValidationErrors(MethodArgumentNotValidException ex) {
	        Map<String, String> errors = new HashMap<>();
	        ex.getBindingResult().getFieldErrors().forEach(err ->
	            errors.put(err.getField(), err.getDefaultMessage()));
	        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
	    }

	@ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> handleNotFound(ResourceNotFoundException ex, HttpServletRequest request) {
        return new ResponseEntity<>(buildError(HttpStatus.NOT_FOUND, ex.getMessage(), request.getRequestURI()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<?> handleUserNotFound(UsernameNotFoundException ex, HttpServletRequest request) {
        return new ResponseEntity<>(buildError(HttpStatus.NOT_FOUND, ex.getMessage(), request.getRequestURI()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<?> handleBadCredentials(BadCredentialsException ex, HttpServletRequest request) {
        return new ResponseEntity<>(buildError(HttpStatus.UNAUTHORIZED, "Incorrect email or password", request.getRequestURI()), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> handleIllegalArgs(IllegalArgumentException ex, HttpServletRequest request) {
        return new ResponseEntity<>(buildError(HttpStatus.BAD_REQUEST, ex.getMessage(), request.getRequestURI()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGeneric(Exception ex, HttpServletRequest request) {
        return new ResponseEntity<>(buildError(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), request.getRequestURI()), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}