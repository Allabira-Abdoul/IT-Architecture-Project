package com.group5.studentregistrationservice.repository;

import com.group5.studentregistrationservice.model.Registration;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
public interface RegistrationRepository extends JpaRepository<Registration, Long>{
    List<Registration> findByStudentId(Long studentId);
}
