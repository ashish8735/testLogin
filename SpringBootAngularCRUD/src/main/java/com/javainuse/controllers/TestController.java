package com.javainuse.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.javainuse.customexception.CustomException;
import com.javainuse.model.Employee;
import com.javainuse.repo.EmployeeReporistary;
import com.javainuse.services.EmployeeService;

@CrossOrigin
@RestController
public class TestController {

	@Autowired
	private EmployeeService employeeService;
	@Autowired
	private EmployeeReporistary e;
	
	@RequestMapping(value="/login",method=RequestMethod.POST)
	public ResponseEntity<Object> loginEmployee(@RequestBody Employee employee) 
	{
		
		String username = employee.getUsername();
		String password = employee.getPassword();
		Optional<Employee> list=e.findByUsernameAndPassword(username, password);
	//	Optional<Employee> list=employeeService.logincheck(username, password);
		System.out.println(username);
		System.out.println(password);
		if(list.isPresent()) {
			return new ResponseEntity<Object>(new CustomException(username),HttpStatus.OK);
		}
		else {
			//return new ResponseEntity<Object>(new CustomException("Wrong UserName Password"),HttpStatus.OK);
			return null;
		}	
	}
	@RequestMapping(value="/find/{empId}")
	public Employee find(@PathVariable long empId){
		System.out.println("empId=" + empId);
		Employee empList = employeeService.findByEmpId(empId);
		System.out.println("EmpList==" + empList.toString());
		return empList;
		
	}
	@RequestMapping(value="/register", method=RequestMethod.POST)
	public ResponseEntity<Object> registerEmployee(@RequestBody Employee employee) {
		e.save(employee);
		//employeeService.registerEmployee(employee);
		return new ResponseEntity<Object>(new CustomException("Register Sucessfull"), HttpStatus.OK);
	}
	 @GetMapping("/getAll")
	    public List<Employee> getAllPosts() {
	        return e.findAll();
	    }
	/*
	 * @GetMapping(produces = "application/json") public List<Employee> firstPage()
	 * { return employees; }
	 */
	
	/*
	 * @DeleteMapping(path = { "/{id}" }) public Employee delete(@PathVariable("id")
	 * int id) { Employee deletedEmp = null; for (Employee emp : employees) {
	 * if(emp.getEmpId().equals(id)) { employees.remove(emp); deletedEmp = emp;
	 * break; } } return deletedEmp; }
	 */

	/*
	 * @PostMapping public Employee create(@RequestBody Employee user) {
	 * employees.add(user); System.out.println(employees); return user; }
	 */

	/*
	 * private static List<Employee> createList() { List<Employee> tempEmployees =
	 * new ArrayList<>(); Employee emp1 = new Employee(); emp1.setName("ram");
	 * emp1.setDesignation("manager"); emp1.setEmpId("1"); emp1.setSalary(3000);
	 * 
	 * Employee emp2 = new Employee(); emp2.setName("sham");
	 * emp2.setDesignation("developer"); emp2.setEmpId("2"); emp2.setSalary(4000);
	 * tempEmployees.add(emp1); tempEmployees.add(emp2); return tempEmployees; }
	 */

}