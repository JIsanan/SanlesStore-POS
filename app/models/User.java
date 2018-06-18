package models;

import java.util.HashSet;
import java.util.Set;

import com.avaje.ebean.Model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class User extends Model{
    @Id
    public Integer id;
    public String User;
    public String Position;
    public String Password;
    public User(){

    }

    public static Finder<Integer, User> find = new Finder<>(User.class);

}
