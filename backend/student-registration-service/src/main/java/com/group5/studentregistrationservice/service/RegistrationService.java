package com.group5.studentregistrationservice.service;

import com.group5.studentregistrationservice.model.Registration;
import com.group5.studentregistrationservice.repository.RegistrationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class RegistrationService {

    private final RegistrationRepository repository;

    public RegistrationService(RegistrationRepository repository) {
        this.repository = repository;
    }

    public Registration registerStudent(Long studentId, Long courseId) {
        Registration registration = new Registration();
        registration.setStudentId(studentId);
        registration.setCourseId(courseId);
        registration.setRegistrationDate(LocalDate.now());
        registration.setStatus(Registration.RegistrationStatus.PENDING);
        return repository.save(registration);
    }

    public List<Registration> getRegistrationsForStudent(Long studentId) {
        return repository.findByStudentId(studentId);
    }

    public void cancelRegistration(Long registrationId) {
        repository.deleteById(registrationId);
    }
}
