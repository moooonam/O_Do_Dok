package com.ssafy.ododok.api.service;

import com.ssafy.ododok.db.model.Role;
import com.ssafy.ododok.db.model.User;

public interface TeamUserService {
    Role getUserRole(User user);
}
