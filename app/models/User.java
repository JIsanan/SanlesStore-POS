package models;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.avaje.ebean.Model;
import com.fasterxml.jackson.annotation.JsonFormat;
import play.data.format.Formats;

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
    public String authToken;

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

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss")
    @Formats.DateTime(pattern = "yyyy-MM-dd")
    public Date addedDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss")
    @Formats.DateTime(pattern = "yyyy-MM-dd")
    public Date updatedDate;

    public static Finder<Integer, User> find = new Finder<>(User.class);

}
