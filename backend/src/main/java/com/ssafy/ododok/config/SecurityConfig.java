package com.ssafy.ododok.config;

import com.ssafy.ododok.common.auth.JwtAuthenticationFilter;
import com.ssafy.ododok.common.auth.JwtAuthorizationFilter;
import com.ssafy.ododok.db.repository.RefreshTokenRepository;
import com.ssafy.ododok.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private CorsConfig corsConfig;


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)	//세션을 사용하지 않겠다는 뜻
                .and()
                .formLogin().disable()	// form 로그인을 사용하지 않겠다.
                .httpBasic().disable()	// 기본적인 http 로그인 방식을 사용하지 않겠다.
                .apply(new MyCustomDsl())
                .and()
                .authorizeRequests()
                .anyRequest().permitAll();
        return http.build();
    }

    public class MyCustomDsl extends AbstractHttpConfigurer<MyCustomDsl, HttpSecurity> {
        @Override
        public void configure(HttpSecurity http) throws Exception {
            AuthenticationManager authenticationManager = http.getSharedObject(AuthenticationManager.class);
            http
                    .addFilter(corsConfig.corsFilter())
                    .addFilter(new JwtAuthenticationFilter(authenticationManager, refreshTokenRepository))
                    .addFilter(new JwtAuthorizationFilter(authenticationManager, userRepository, refreshTokenRepository));
        }
    }

}
