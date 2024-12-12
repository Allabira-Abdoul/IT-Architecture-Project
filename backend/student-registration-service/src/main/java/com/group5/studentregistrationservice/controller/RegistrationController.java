package com.group5.studentregistrationservice.controller;

import com.group5.studentregistrationservice.model.Registration;
import com.group5.studentregistrationservice.service.RegistrationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/registrations")
public class RegistrationController {

    private final RegistrationService service;

    public RegistrationController(RegistrationService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Registration> registerStudent(
            @RequestParam Long studentId,
            @RequestParam Long courseId) {
        return ResponseEntity.ok(service.registerStudent(studentId, courseId));
    }

    @GetMapping("/{studentId}")
    public ResponseEntity<List<Registration>> getRegistrationsForStudent(
            @PathVariable Long studentId) {
        return ResponseEntity.ok(service.getRegistrationsForStudent(studentId));
    }

    @DeleteMapping("/{registrationId}")
    public ResponseEntity<Void> cancelRegistration(
            @PathVariable Long registrationId) {
        service.cancelRegistration(registrationId);
        return ResponseEntity.noContent().build();
    }
}
