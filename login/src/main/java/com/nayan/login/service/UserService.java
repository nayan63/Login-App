package com.nayan.login.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.nayan.login.entity.Customer;
import com.nayan.login.repository.CustomerRepository;

@Service
public class UserService implements UserDetailsService {
	
	@Autowired
	CustomerRepository customerRepo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Customer customer = customerRepo.findByUsername(username);
		
		UserDetails user = User.withUsername(customer.getUsername()).password(customer.getPassword()).authorities("USER").build();
		return user;
	}

}
