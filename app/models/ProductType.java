package models;

import com.avaje.ebean.Model;
import com.fasterxml.jackson.annotation.JsonFormat;
import play.data.format.Formats;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
public class ProductType extends Model{
    @Id
    public Integer id;

    @NotNull
    @Size(max = 50)
    public String typeName;

    @NotNull
    public boolean isdeleted;

    @ManyToOne
    public User updatedBy;

    @NotNull
    @ManyToOne
    public User createdBy;

    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss")
    @Formats.DateTime(pattern = "yyyy-MM-dd")
    public Date addedDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss")
    @Formats.DateTime(pattern = "yyyy-MM-dd")
    public Date updatedDate;

    public static Finder<Integer, ProductType> find = new Finder<>(ProductType.class);

}
