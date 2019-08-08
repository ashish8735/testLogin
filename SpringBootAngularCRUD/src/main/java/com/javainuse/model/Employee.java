package com.javainuse.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Employee {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long empid;
	private String name;
	private String designation;
	private double salary;
	private String username;
	private String password;
	
	public long getEmpid() {
		return empid;
	}
	public void setEmpId(long empId) {
		this.empid = empId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDesignation() {
		return designation;
	}
	public void setDesignation(String designation) {
		this.designation = designation;
	}
	public double getSalary() {
		return salary;
	}
	public void setSalary(double salary) {
		this.salary = salary;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	@Override	public String toString() {
		return "Employee [empId=" + empid + ", name=" + name + ", designation=" + designation + ", salary=" + salary
				+ ", username=" + username + ", password=" + password + "]";
	}
	
	
}
