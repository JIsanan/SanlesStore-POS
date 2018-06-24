package models;

import java.util.HashSet;
import java.util.Set;

import com.avaje.ebean.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class User extends Model{
    @Id
    public Integer id;

    @NotNull
    @Size(max = 50)
    public String user;

    @NotNull
    @Size(max = 50)
    public String position;

    @NotNull
    @Size(max = 50)
    public String password;

    @NotNull
    public boolean isdeleted;

    @ManyToOne
    public User updatedBy;

    @ManyToOne
    public User createdBy;

    public static Finder<Integer, User> find = new Finder<>(User.class);

}
