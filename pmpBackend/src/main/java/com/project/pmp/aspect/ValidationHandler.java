package com.project.pmp.aspect;

import com.project.pmp.dto.GenericResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ValidationHandler {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleInvalidArgument(MethodArgumentNotValidException exception) {
        Map<String, String> errorMessage = new HashMap<>();
        exception.getBindingResult().getFieldErrors().forEach(
                error -> errorMessage.put(error.getField(), error.getDefaultMessage())
        );
        return errorMessage;
        //return new GenericResponse(errorMessage.size()+" Validation Errors Found!",500,errorMessage);
    }

}
