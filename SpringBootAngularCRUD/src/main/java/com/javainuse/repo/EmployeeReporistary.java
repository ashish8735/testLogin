package com.javainuse.repo;

import java.util.Optional;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.javainuse.model.Employee;
@Repository
public interface EmployeeReporistary extends JpaRepository<Employee, Long> {

	public Optional<Employee> findByUsernameAndPassword(String username, String password);

	//@Query("select * from employee where emp_id=?")
	//public List<Employee> findByEmpId(@Param("emp_id") long empId);
	
}
