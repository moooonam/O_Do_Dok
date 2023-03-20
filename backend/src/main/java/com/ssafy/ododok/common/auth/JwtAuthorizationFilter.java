package com.ssafy.ododok.common.auth;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.ododok.db.model.RefreshToken;
import com.ssafy.ododok.db.model.User;
import com.ssafy.ododok.db.repository.RefreshTokenRepository;
import com.ssafy.ododok.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    private UserRepository userRepository;
    private RefreshTokenRepository refreshTokenRepository;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, UserRepository userRepository, RefreshTokenRepository refreshTokenRepository) {
        super(authenticationManager);
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
    }



    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        String header = request.getHeader(JwtProperties.ACCESS_HEADER_STRING);
        String email = " ";

        if (header == null || !header.startsWith(JwtProperties.TOKEN_PREFIX)) {
            chain.doFilter(request, response);

        }

        else {
            try {
                String token = request.getHeader(JwtProperties.ACCESS_HEADER_STRING)
                        .replace(JwtProperties.TOKEN_PREFIX, "");

                // 토큰 검증 (이게 인증이기 때문에 AuthenticationManager도 필요 없음)
                // 내가 SecurityContext에 집적접근해서 세션을 만들때 자동으로 UserDetailsService에 있는
                // loadByUsername이 호출됨.
                email = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(token)
                        .getClaim("email").asString();

                if (email != null) {
                    User user = userRepository.findByUserEmail(email);

                    // 인증은 토큰 검증시 끝. 인증을 하기 위해서가 아닌 스프링 시큐리티가 수행해주는 권한 처리를 위해
                    // 아래와 같이 토큰을 만들어서 Authentication 객체를 강제로 만들고 그걸 세션에 저장!
                    PrincipalDetails principalDetails = new PrincipalDetails(user);
                    Authentication authentication = new UsernamePasswordAuthenticationToken(
                            principalDetails, // 나중에 컨트롤러에서 DI해서 쓸 때 사용하기 편함.
                            null, // 패스워드는 모르니까 null 처리, 어차피 지금 인증하는게 아니니까!!
                            principalDetails.getAuthorities());

                    // 강제로 시큐리티의 세션에 접근하여 값 저장
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }

                chain.doFilter(request, response);
            } catch (TokenExpiredException e) {
                System.out.println("토큰이 만료됐어");
                String token = request.getHeader(JwtProperties.REFRESH_HEADER_STRING)
                        .replace(JwtProperties.TOKEN_PREFIX, "");

                try {
                    //refreshToken 만료
                    email = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(token).getSubject();
                    System.out.println("emil 까진 받아왔다?");
                } catch (TokenExpiredException te) {
                    System.out.println("CustomAuthorizationFilter : Refresh Token이 만료되었습니다.");
                    logger.info("CustomAuthorizationFilter : Refresh Token이 만료되었습니다.");
                    response.setContentType(APPLICATION_JSON_VALUE);
                    response.setCharacterEncoding("utf-8");
                    new ObjectMapper().writeValue(response.getWriter(), new ResponseEntity<String>("Refresh Token이 만료되었습니다.", HttpStatus.UNAUTHORIZED));

                }

                Optional<RefreshToken> optMember = refreshTokenRepository.findById(email);

                if (!token.equals(optMember.get().getRefreshToken())) {
                    System.out.println("CustomAuthorizationFilter : Token이 이상합니다.");
                    logger.info("CustomAuthorizationFilter : Token이 이상합니다.");
                    response.setContentType(APPLICATION_JSON_VALUE);
                    response.setCharacterEncoding("utf-8");
                    new ObjectMapper().writeValue(response.getWriter(), new ResponseEntity<String>("유효하지 않은 Refresh Token입니다.", HttpStatus.UNAUTHORIZED));
                } else {

                    User user = userRepository.findByUserEmail(optMember.get().getEmail());

                    // RSA 방식 아니고 Hash 암호방식
                    String accessToken = JWT.create()
                            .withSubject(user.getUserEmail())
                            .withExpiresAt(new Date(System.currentTimeMillis() + JwtProperties.EXPIRATION_TIME))
                            .withClaim("email", user.getUserEmail())
                            .sign(Algorithm.HMAC512(JwtProperties.SECRET));

                    response.setHeader(JwtProperties.ACCESS_HEADER_STRING, JwtProperties.TOKEN_PREFIX+accessToken);
                    chain.doFilter(request, response);

                }

            } catch (Exception e){
                System.out.println("CustomAuthorizationFilter : JWT 토큰이 잘못되었습니다. message : " + e.getMessage());
            }
        }


    }
}
