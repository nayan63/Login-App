package com.nayan.login.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nayan.login.model.JwtRequest;
import com.nayan.login.model.JwtResponse;
import com.nayan.login.service.UserService;
import com.nayan.login.utility.JWTUtility;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class HomeController {

	@Autowired
	private JWTUtility jwtUtility;
	
	@Autowired
	private AuthenticationManager authManager;
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/dashboard")
	public String home()
	{
		return "Welcome to Dashboard";
	}
	
	@PostMapping("/authenticate")
	public JwtResponse authentication(@RequestBody JwtRequest jwtRequest) throws Exception
	{
		try {
			authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            jwtRequest.getUsername(),
                            jwtRequest.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }

        final UserDetails userDetails
                = userService.loadUserByUsername(jwtRequest.getUsername());

        final String token =
                jwtUtility.generateToken(userDetails);

        return  new JwtResponse(token);
	}
}
