package net.csonkadavidit.webdevapplication.persistence.user.repo;

import net.csonkadavidit.webdevapplication.persistence.user.data.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
}
