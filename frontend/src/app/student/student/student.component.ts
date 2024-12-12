import { Component } from '@angular/core';
import { RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Student {
  rollNo: number;
  studentID: string;
  firstName: string;
  lastName: string;
  gender: string;
  class: string;
  selected: boolean;
}

// Type for keys of the Student interface
type StudentKey = keyof Student;


@Component({
  selector: 'app-student',
  standalone: true,
  imports: [RouterModule,CommonModule, FormsModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})

export class StudentComponent {
  
  students = [
    { rollNo: 1, studentID: 'S001', firstName: 'Nzukam', lastName: 'Tagne', gender: 'M', class: 'INGE 4ISI EN', selected: false },
    { rollNo: 2, studentID: 'S002', firstName: 'Valdez', lastName: 'Dhelia', gender: 'F', class: 'INGE 3SRT FR', selected: false }
  ];
  
  
  searchInput: string = '';
  filterColumn: StudentKey |'' = '';
  filterValue: string = '';
  isActionsMenuVisible: boolean = false;
  isModalOpen: boolean = false;

  newStudent = { firstName: '', lastName: '', studentID: '', contact: '', email: '', dob: '', gender: 'M', class: '' };

    // Filtered student list
    get filteredStudents() {
      return this.filterStudents();
    }
  
    // Function to filter students
    filterStudents() {
      const lowerSearch = this.searchInput.toLowerCase();
      const lowerFilterValue = this.filterValue.toLowerCase();
  
      return this.students.filter(student => {
        // Combine search and column-based filtering
        let matchesSearch = true;
        
        if (this.searchInput) {
          matchesSearch = Object.values(student).some(val =>
            val.toString().toLowerCase().includes(lowerSearch)
          );
        }
  
        let matchesFilter = true;
        if (this.filterColumn && this.filterValue) {
          matchesFilter = student[this.filterColumn as keyof typeof student]?.toString().toLowerCase().includes(lowerFilterValue);
        }
  
        return matchesSearch && matchesFilter;
      });
    }

  // Toggle Actions Menu
  toggleActionsMenu() {
    this.isActionsMenuVisible = !this.isActionsMenuVisible;
  }

  // Open Create Student Modal
  openCreateStudentModal() {
    this.isModalOpen = true;
    this.newStudent = { firstName: '', lastName: '', studentID: '', contact: '', email: '', dob: '', gender: 'M', class: '' };
  }

  // Close Modal
  closeModal() {
    this.isModalOpen = false;
  }

  // Create New Student
  createStudent() {
    if (this.newStudent.firstName && this.newStudent.lastName && this.newStudent.studentID) {
      this.students.push({ ...this.newStudent, rollNo: this.students.length + 1, selected: false });
      this.isModalOpen = false; // Close the modal after creation
    } else {
      alert('Please fill all required fields');
    }
  }

  // Edit Student
  editStudent(student: any) {
    // Logic to edit a student
    alert(`Editing student ${student.firstName} ${student.lastName}`);
  }

  // Delete Student
  deleteStudent(student: any) {
    this.students = this.students.filter(s => s.studentID !== student.studentID);
  }

  // Import Students
  importStudents(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file: File = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const content = reader.result as string;
        const lines = content.split('\n').slice(1); // Skip header line

        lines.forEach(line => {
          const [studentID, firstName, lastName, gender, className] = line.split(',');
          if (studentID && firstName && lastName && gender && className) {
            this.students.push({
              rollNo: this.students.length + 1,
              studentID: studentID.trim(),
              firstName: firstName.trim(),
              lastName: lastName.trim(),
              gender: gender.trim(),
              class: className.trim(),
              selected: false
            });
          }
        });
      };

      reader.readAsText(file);
    }
  }

  // Export Students
  exportStudents() {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'RollNo,StudentID,FirstName,LastName,Gender,Class\n'; // Header row

    this.students.forEach(student => {
      csvContent += `${student.rollNo},${student.studentID},${student.firstName},${student.lastName},${student.gender},${student.class}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'students.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // View Details of a Student
  viewDetails(student: any) {
    alert(`
      Student Details:
      ---------------------
      Roll No: ${student.rollNo}
      Student ID: ${student.studentID}
      Name: ${student.firstName} ${student.lastName}
      Gender: ${student.gender}
      Class: ${student.class}

    `);
  }

  // Select All Students
  selectAllStudents(event: any) {
    const isChecked = event.target.checked;
    this.students.forEach(student => student.selected = isChecked);
  }
}
