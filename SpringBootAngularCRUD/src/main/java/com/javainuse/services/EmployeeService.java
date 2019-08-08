package com.javainuse.services;

import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.javainuse.model.Employee;
import com.javainuse.repo.EmployeeReporistary;

@Service
public class EmployeeService {

	@Autowired
	static
	EmployeeReporistary employeeReporistary;
	@PersistenceContext
	private EntityManager entityManager;
	
	public Optional<Employee> logincheck(String username, String password)
	{
		Optional<Employee> e =employeeReporistary.findByUsernameAndPassword(username, password);
		System.out.println(e);
		return e;
	}
	
	public void registerEmployee(Employee employee) {
		
		employeeReporistary.save(employee);
	}

	public Employee findByEmpId(long id) {
		return entityManager.find(Employee.class, id);
	}
    
}
